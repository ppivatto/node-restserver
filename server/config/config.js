// ========================
// PUERTO
// ========================
process.env.PORT = process.env.PORT || 3001;

// ========================
// ENTORNO
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
// BASE DE DATOS
// ========================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://robhalford:Benja123@cluster0-lixse.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB

// mongodb://localhost:27017/cafe
// mongodb://<dbuser>:<dbpassword>@ds235239.mlab.com:35239/example-2018