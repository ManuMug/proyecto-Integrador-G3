window.addEventListener('load',(e)=>{

    let form = document.querySelector('form.formulario')
    let name = document.querySelector('#name')
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let direccion = document.querySelector('#direccion')
    let avatar = document.querySelector('#avatar')

    form.addEventListener('submit', (e)=>{
        
        let errores = []

        if(name.value == ""){
            errores.push('Nombre: Debe Ingresar un Nombre')
        }else if(name.value.length < 2){
            errores.push('Nombre: Debe Ingresar al menos 2 caracteres')
        }

        if(email.value == ""){
            errores.push('Email: Debe Ingresar un Email')
        }

        if(password.value == ""){
            errores.push('Contraseña: Debe Ingresar una Contraseña')
        }

        if(direccion.value == ""){
            errores.push('Direccion: Debe Ingresar una Direccion')
        }

        if(avatar.value == ""){
            errores.push('Avatar: Debe Ingresar un Avatar')
        }

        if(errores.length > 0){
            e.preventDefault()
            let ulErrores = document.querySelector('div.errores ul')
            
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li style='color:orange'>" + errores[i] + "</li>"
            }
        }
    })

})