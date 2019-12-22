// ========================
// PUERTO
// ========================
process.env.PORT = process.env.PORT || 3001;

// ========================
// ENTORNO
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// VENCIMIENTO DEL TOKEN
// ========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ========================
// SEED de AUTENTICACION
// ========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ========================
// GOOGLE CLIENT ID
// ========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '559030665437-frbf88lheimid0j1gkkopu48f1ue8q73.apps.googleusercontent.com';


// ========================
// BASE DE DATOS
// ========================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB

// mongodb://localhost:27017/cafe
// mongodb://<dbuser>:<dbpassword>@ds235239.mlab.com:35239/example-2018