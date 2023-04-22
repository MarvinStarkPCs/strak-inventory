   //conexion api
   const form = document.getElementById('registerlogin');
   form.addEventListener('submit', (event) => {
     event.preventDefault();
   
     const user = document.getElementById('username').value;
     const password = document.getElementById('password').value;
     const password2 = document.getElementById('confimacionContraseña').value;
     
     if (user === '' || password === ''|| password2 === '') {
Swal.fire('CAMPOS VACIOS');
}else if (password !== password2) {
Swal.fire('La contraseña no coincide');
return false;
}else {
       fetch('/api/register', {
       method: 'POST',
       body: JSON.stringify({ user, password }),
       headers: {
         'Content-Type': 'application/json'
       }
     })
     .then( response => {
     
       if (response.ok) { 
         Swal.fire({
           title: 'Exitosa!',
           icon: 'success',
           html:`Registrado!`,
           showCloseButton: true,
           focusConfirm: false,
           reverseButtons: true,
           focusCancel: true,
           confirmButtonText:`Confimar`
         }).then((result) => {
           if (result.value) {
             window.location.href = '/index.html';
           }
         }); 

} else  {
console.log(response)
Swal.fire({title: 'Este usuario ya existe!',
           icon: 'warning',
})
  
}
     })
     }

     

});
   
