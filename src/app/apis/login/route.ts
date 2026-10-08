import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const connection = await mysql.createConnection({
      host: process.env.DB_SERVER,
      user: process.env.DB_USER_LOGIN,
      password: process.env.DB_PASSWORD_LOGIN,
      database: process.env.DB_DATABASE_LOGIN,
      port: Number(process.env.DB_PORT) || 3306,
    });

    const [rows]: any = await connection.execute(
      'SELECT * FROM admins WHERE username = ? AND password = ?',
      [username, password]
    );

    await connection.end();

    if (rows.length > 0) {
      const response = NextResponse.json({ success: true, message: 'Autenticado correctamente' });

      // Establecer cookie estricta de sesión (sin maxAge)
      response.cookies.set({
        name: 'admin_session',
        value: 'active_session_token',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        // Nota: Al eliminar 'maxAge', la cookie se borra al cerrar el navegador o la pestaña.
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Usuario o contraseña incorrectos' },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Error interno conectando a la base de datos' },
      { status: 500 }
    );
  }
}