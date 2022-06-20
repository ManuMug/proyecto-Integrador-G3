window.addEventListener('load', () => {
    let form = document.querySelector('form.formulario')
    let name = document.querySelector("#name")
    let price = document.querySelector("#price")
    let discount = document.querySelector("#discount")
    let category = document.querySelector("#category")
    let description = document.querySelector("#description")
    let image = document.querySelector("#image")

    form.addEventListener('submit', (e)=>{
        
        let errores = []

        if(name.value == ""){
            errores.push('Nombre: Debe Ingresar un Nombre')
        }else if(name.value.length < 3){
            errores.push('Nombre: Debe Ingresar al menos 3 caracteres')
        }

        if(price.value == ""){
            errores.push('Precio: Debe Ingresar un Precio')
        }

        if(discount.value == ""){
            errores.push('Descuento: Debe Ingresar un Descuento')
        }

        if(category.value == ""){
            errores.push('Categoria: Debe Ingresar una Categoria')
        }

        if(description.value == ""){
            errores.push('Descripcion: Debe Ingresar una Descripcion')
        }else if(description.value.length < 15){
            errores.push('Descripcion: Debe Ingresar al menos 15 caracteres')
        }

        if(image.value == ""){
            errores.push('Image: Debe Ingresar una Imagen')
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