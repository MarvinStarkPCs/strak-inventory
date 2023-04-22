
const express = require('express')
const app = express()
const bcryptjs = require('bcryptjs')
const bodyParser = require('body-parser');
app.use(express.json())
const connection = require('./database/db')

//////////////////////////////////////////////////////
// iniciar sesión


app.post('/api/login', (req,res)=>{
    let user = req.body.user;
    let password = req.body.password;
 
    if (!user || !password) {
        res.status(400).json('Debe ingresar un usuario y una contraseña');
        console.log(password)
        return;

    }
 
    let sql = 'SELECT * FROM userpassword WHERE user = ?';
    connection.query(sql, [user], async function(error, results) {
        
        if (error) {
            res.status(500).send('Error al iniciar sesión');
        } else {
            if (results.length > 0) {

                let hash = results[0].password;
                                
                const valid = await bcryptjs.compare(password, hash);
                
                if( !valid )  {
                    res.status(500).send('Error al comparar las contraseñas');
                    return;
                }

                res.send({ message: "Inicio de sesión exitoso" });

            } 
        }

    });
 });
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//registro de usuarios
app.post('/api/register', function(req, res) {
    let user = req.body.user;
    let password = req.body.password;

    let sqlCheck = 'SELECT * FROM userpassword WHERE user = ?';
    connection.query(sqlCheck, [user], (error, results) => {
        if (error) {
            res.status(500).send('Error al verificar el usuario')
            return;
        }

        if (results.length > 0) {
            return res.json({
                ok: false,
                msg: 'Usuairo existe'
            })
       
        }
    
        const saltRounds = 10;

        bcryptjs.hash(password, saltRounds, (err, hash) => {

            if (err) {
            
                res.status(500).send('Error al crear el hash de la contraseña');
                return;

            }

            let sql = 'INSERT INTO userpassword (user, password) VALUES  (?, ?)';
            let values = [user, hash];
            connection.query(sql, values, (error,) => {
                if (error) {
                    res.status(500).send('Error al registrar el usuario')
                } else {
                    return res.json({
                        ok : true,
                        msg : "Usuario Registrado!"
                    })
                }
            });
        });
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// restablecer contraseña 


app.use(bodyParser.json());

// restablecer contraseña 
app.post('/api/restablecer-contrasena',(req, res) => {
    const user = req.body.user;
    const password = req.body.password;
  
    let sqlCheck = 'SELECT * FROM userpassword WHERE user = ?';
    connection.query(sqlCheck, [user], (error, results) => {
      if (results.length > 0) {
        // Hashear la nueva contraseña
        bcryptjs.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error en el servidor');
          } else {
            const sqlCheckupdate ='UPDATE userpassword SET password = ? WHERE user = ?'
            connection.query(sqlCheckupdate, [hashedPassword, user],(error) => {
              if (error) {
                console.error(error);
                res.status(500).send('Error en el servidor');
              } else {
                res.status(200).send('Contraseña restablecida exitosamente');
              }
            });
          }
        });
      } else {
        res.status(400).send('El usuario  no existe en la base de datos');
      }
    });
  })
  
  app.listen(3020,() => {

    console.log(` api funcionando`)
}) 
