window.addEventListener('load',(e)=>{

    let form = document.querySelector('form.formulario')
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')

    /* email.addEventListener("keyup",(e)=>{
        if(e.key == "{"){
            email.style.backgroundColor = "red"
            alert('no se permiten simbolos')
        }
        if(e.key !== "{"){
            email.style.backgroundColor = "white"
        }
    })*/
 
    form.addEventListener('submit', (e)=>{

        let errores = []

        if(email.value == ""){
            errores.push('Email: Debe Ingresar un Email')
        }

        if(password.value == ""){
            errores.push('Contraseña: Debe Ingresar una Contraseña')
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
