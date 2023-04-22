// 1 se invocan las expreciones 
const express = require('express')
const app = express();

//2 seteamos urlencoder para capturar los datos del formulario
app.use(express.urlencoded({extended :false}));
app.use(express.json());

//3 invocar dotnv
const dotenv = require('dotenv')
dotenv.config({path:'./env/.env'})

//4 directorio de public

app.use( '/resourse' ,express.static('public'));
app.use( '/resourse' ,express.static(__dirname + '/public'));





//5 Establecemos el motor de plantillas


app.set('view engine', 'ejs');

// 6 invocamos a bcryptjs


//7 var de session 
const session = require('express-session')
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}))
 //8 invocar modulo de conexión a la base de datos


//9 Establecer rutas 

const routes = require('./routes/User')
app.use('/', routes);


const routesAdmin = require('./routes/Admin')
app.use('/admin', routesAdmin);

//servidor

app.listen(3000,() => {

    console.log(`server ok`)
}) 
