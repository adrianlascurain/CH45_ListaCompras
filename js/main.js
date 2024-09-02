const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad(){
    if(txtNumber.value.length == 0){
        return false
    }

    if(isNaN(txtNumber.value)){
        return false
    }

    if(Number(txtNumber.value) <= 0){
        return false
    }

    return true
} // validarCantidad

btnAgregar.addEventListener("click",function(event){
    event.preventDefault();

    txtNombre.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none"


    if(txtNombre.value.length < 3){
        txtNombre.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "El <strong>nombre</strong> no es correcto.<br/>";
        alertValidaciones.style.display = "block";
    }

    if(!validarCantidad()){    
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "La <strong>cantidad</strong> no es correcta.";
        alertValidaciones.style.display = "block";
    }


}) // btnAgregar.addEventListener


// Blur es el evento cuando un elemento pierde el foco
txtNombre.addEventListener("blur",function(event){
    txtNombre.value = txtNombre.value.trim();
})