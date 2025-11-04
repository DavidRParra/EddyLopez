import { NextResponse } from "next/server";
import mysql from "serverless-mysql";

const conn = mysql(
    {
        config:{
            host : process.env.DB_SERVER,
            port : Number(process.env.DB_PORT),
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE
        }
    }
);

export async function POST(request: Request) {
    const body = await request.json();

    const {firstName, lastName, phone, email, type, appointmentDate, message} = body;

    if(!firstName || !lastName || !phone || !email || !type || !appointmentDate || !message){
        return NextResponse.json({error: "Todos los campos deben tener datos"}, {status : 400});
    }

    try{
        await conn.query(`INSERT INTO APP_APPOINTMENT_DETAIL_DIM (
        FIRST_NAME,
        LAST_NAME,
        FULL_NAME,
        PHONE,
        EMAIL,
        CONSULTING_DATE,
        CONSULTING_TYPE,
        COMMENT,
        STATUS,
        CREATE_BY,
        USER_ID,
        CREATED_DATE,
        LAST_UPDATE_DATE
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, 
      [firstName.toUpperCase(), 
        lastName.toUpperCase(), 
        (firstName.toUpperCase() + " " + lastName.toUpperCase()), 
        phone, 
        email, 
        appointmentDate, 
        type, 
        message, 
        "ACTIVE", 
        "PAGE", 
        2])
        return NextResponse.json({message: 'Formulario guardado con exito'}, {status : 200});
    } catch(error) {
        return NextResponse.json({error: 'Error al procesar la solicitud'}, {status : 500});
    }
}

