module.exports = {
  apps : [{
    // Configuración para el entorno de PRODUCCIÓN
    name: "carolinavende-page-prod", // Nombre del proceso en PM2
    script: "npm",                    // Usamos npm para ejecutar el script
    args: "run start",                // El comando "npm run start"
    env: {
      NODE_ENV: "production",
      PORT: 3002,
    },
    // Este proceso debe ser usado después de ejecutar "npm run build"
  }, {
    // Configuración para el entorno de DESARROLLO
    name: "carolinavende-page-dev",    // Nombre del proceso en PM2
    script: "npm",                    // Usamos npm para ejecutar el script
    args: "run dev",                  // El comando "npm run dev"
    env: {
      NODE_ENV: "development",
      PORT: 3002,
    },
    // Este proceso no necesita un paso de compilación previo
  }]
};
