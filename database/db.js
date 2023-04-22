const mysql = require('mysql')
const conection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})
//funcion de  conexion base de datos

conection.connect((error)=>{
    if(error){
        console.log (`este es el erro${error}`)
        return
    }else{
        console.log ('conexion exitosa a la base de datos')
    }
})

module.exports = conection