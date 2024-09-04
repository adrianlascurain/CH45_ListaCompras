const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");

// Se obtiene el elemento 0 del HTMLCollection por si a caso se obtiene una lista con más de 1 elemento.
const cuerpoTablas = document.getElementsByTagName("tbody").item(0);


const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let isValid = true;
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array();

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


function getPrecio(){
    return Math.round(Math.random()*10000)/100
}

btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none"
    isValid = true;


    if(txtNombre.value.length < 3){
        txtNombre.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML = "El <strong>nombre</strong> no es correcto.<br/>";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if(!validarCantidad()){    
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "La <strong>cantidad</strong> no es correcta.";
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    if(isValid){
        contador++;
        let precio = getPrecio();
        let row = `<tr>
                        <td>${contador}</td>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;

        let elemento = {"contador": contador, "nombre": txtNombre.value, "cantidad": txtNumber.value, "precio": precio};

        datos.push(elemento);
        localStorage.setItem("datos",JSON.stringify(datos))

        cuerpoTablas.insertAdjacentHTML("beforeend",row)

        costoTotal += precio * Number(txtNumber.value);
        totalEnProductos += Number(txtNumber.value);

        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);

        localStorage.setItem("contador",contador);
        localStorage.setItem("totalEnProductos",totalEnProductos);
        localStorage.setItem("costoTotal",costoTotal);

        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();

    }


}) // btnAgregar.addEventListener


// Blur es el evento cuando un elemento pierde el foco
txtNombre.addEventListener("blur",function(event){
    txtNombre.value = txtNombre.value.trim();
})// txtNombre eventListener

txtNumber.addEventListener("blur",function(event){
    txtNumber.value = txtNumber.value.trim();
})


window.addEventListener("load", function(event){

    if(this.localStorage.getItem("contador") !== null) contador = Number(this.localStorage.getItem("contador")) 
    if(this.localStorage.getItem("totalEnProductos") !== null) totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"))
    if(this.localStorage.getItem("costoTotal") !== null) costoTotal = Number(this.localStorage.getItem("costoTotal"))

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);

    if(this.localStorage.getItem("datos") !== null){
        datos = JSON.parse(this.localStorage.getItem("datos"));

        datos.forEach(r => {
            let row = `<tr>
                            <td>${r.contador}</td>
                            <td>${r.nombre}</td>
                            <td>${r.cantidad}</td>
                            <td>${r.precio}</td>
                        </tr>`;
    
            cuerpoTablas.insertAdjacentHTML("beforeend",row);
        });
    }

})

btnClear.addEventListener("click", function(event){
    event.preventDefault();

    // Limpiar los valores de los campos
    txtNombre.value = "";
    txtNumber.value = "";

    // Limpiar el local storage
    // método .removeItem("Key") - Elimina el contenido con base a su clave
    // localStorage.removeItem("contador");
    // localStorage.removeItem("totalEnProductos");
    // localStorage.removeItem("costoTotal");

    // Reiniciar variables
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;

    // Asignar las variables a los divs
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);

    // Eliminar la tabla
    cuerpoTablas.innerHTML = "";
   
    // método .clear() - Elimina el contenido de todas las claves
    localStorage.clear();

    // Ocultar la alerta
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none"

    // Quitar los bordes
    txtNombre.style.border = "";
    txtNumber.style.border = "";    

    // Manda el foco al campo nombre
    txtNombre.focus()

})