import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, type, appointmentDate, message } = body;

    // Validación básica de campos requeridos
    if (!firstName || !lastName || !phone || !email || !type || !appointmentDate || !message) {
      return NextResponse.json(
        { success: false, message: "Faltan campos obligatorios en el formulario." },
        { status: 400 }
      );
    }

    // Creación de la conexión utilizando las credenciales principales del .env.local
    const connection = await mysql.createConnection({
      host: process.env.DB_SERVER,
      user: process.env.DB_USER_CONTACTANOS,
      password: process.env.DB_PASSWORD_CONTACTANOS,
      database: process.env.DB_DATABASE_CONTACTANOS, // Toma 'APPOINTMENT_SCH' o cámbialo a 'Contactanos' si así se llama en tu gestor
      port: Number(process.env.DB_PORT) || 3306,
    });

    // Inserción en la tabla 'contactos_formulario' (según la estructura de tu imagen anterior)
    const query = `
      INSERT INTO contactos_formulario 
        (nombre, apellido, telefono, correo, tipo_consulta, fecha_consulta, mensaje, usuario_asignado_id, fecha_registro) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW())
    `;

    const values = [firstName, lastName, phone, email, type, appointmentDate, message];

    await connection.execute(query, values);

    // Cerrar la conexión explícitamente como en tu ejemplo
    await connection.end();

    return NextResponse.json(
      { success: true, message: 'Cita guardada correctamente en la base de datos' },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error al guardar el formulario:", error);
    return NextResponse.json(
      { success: false, message: 'Error interno conectando a la base de datos' },
      { status: 500 }
    );
  }
}