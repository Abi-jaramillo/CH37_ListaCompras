// El código va aquí -> 
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById ("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById ("alertValidacionesTexto"); 
let tablaListaCompras = document.getElementById("tablaListaCompras"); //esto es una lista de elementos
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos= document.getElementById("contadorProductos");
let productosTotal= document.getElementById("productosTotal");
let precioTotal= document.getElementById("precioTotal");

let precio = 0;
let isValid=true; //true por default, es una función de bandera
let contador = 0;
let costoTotal =0;
let totalEnProductos=0;

let datos = new Array();


btnClear.addEventListener("click", function(event){
    event.preventDefault(); //previene la funcionalidad por default del botón
    txtNombre.value="";
    txtNumber.value="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    contador = 0;
    costoTotal =0;
    totalEnProductos=0;
    contadorProductos.innerText=contador; 
    productosTotal.innerText= totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador); //lo de comillas es la llave y lo que está solo es el valor
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    localStorage.setItem("datos"); //al momento de dar clear borra todos los datos hasta los de localStorage
    datos = new Array();
    cuerpoTabla.innerHTML="";
    txtNombre.focus();
});//btnClear

    function validarCantidad(){
        if(txtNumber.value.length==0){
            return false;
        } //if lenght
        if(isNaN(txtNumber.value)){
            return false;
        }//isNaN para que nos arroje que no es un número
        if(Number(txtNumber.value)<=0){
            return false;
        }//para hacer que los números sean mayores o igual a cero
        return true;
    }//validarCantidad

    function getPrecio(){
        return parseInt((Math.random()*90)*100)/100
    } //se multiplica por 100 para recorrer el punto, ahora, el resultado lo pone en enteros con parseInt y al final se divide entre 100 para sacar los decimales

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none"; //sirven para limpiar las alertas cuando los valores son correctos

    txtNombre.value = txtNombre.value.trim();
    txtNumber.value = txtNumber.value.trim();
    isValid=true;
    txtNombre.style.border="";
    txtNumber.style.border="";


    if(txtNombre.value.length<3){
        alertValidacionesTexto.insertAdjacentHTML("beforeend", 
        `El <strong> Nombre </strong> no es correcto </br>.`);
        alertValidaciones.style.display="block";
        txtNombre.style.border= "solid red thin";
        isValid=false;
    }//si la longitud es menor a 3

    if(! validarCantidad()){
        alertValidacionesTexto.insertAdjacentHTML("beforeend", 
        `La <strong> Cantidad </strong> no es correcta </br>.`);
        alertValidaciones.style.display="block";
        txtNumber.style.border= "solid red thin";
        isValid=false;
    } // El ! es para indicar una negación

    if (isValid){ //variable bandera, tienen un verdardero o false
        contador++;
        precio = getPrecio();
    //agregar los renglones a la tabla
        row= `<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
            </tr>`;
            let elemento =`{"id": ${contador},
                            "nombre": "${txtNombre.value}",
                            "cantidad":${txtNumber.value},
                            "precio": ${precio}
            }`;
            datos.push(JSON.parse(elemento)); //para convertir la cadena en un objeto y meterlo en el arreglo
            console.log(datos);
            localStorage.setItem("datos",JSON.stringify(datos)); //convierte lo que se le pase de datos a cadena
            

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    contadorProductos.innerText=contador; //contador de productos
    totalEnProductos+= parseFloat(txtNumber.value); //para el total de los productos se le suma al numero de productos
    productosTotal.innerText= totalEnProductos;
    costoTotal += precio * parseFloat (txtNumber.value); //multiplica el precio por productos y se suman para dar el total del costo
    precioTotal.innerText=`$ ${costoTotal.toFixed(2)}`;
    
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal); //Para guardar en el localStorage
    
    //Para borrar los campos una vez ya mandando la información es esto: 
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();

    }//if isValid
});//btn Agregar

window.addEventListener("load", function(event){
    event.preventDefault();
    if (this.localStorage.getItem("contadorProductos") !=null){
        contador= Number(this.localStorage.getItem("contadorProductos"));
        totalEnProductos = Number (this.localStorage.getItem("totalEnProductos"));
        costoTotal = Number(this.localStorage.getItem("costoTotal"));

        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    } //if !=null

    if (this.localStorage.getItem("datos")!=null){
        datos=JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => { //función anonima del tipo flecha
        let row =`<tr>
            <td>${r.id}</td>  
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
            </tr>`; //cada uno lo vamos a llamar a r 
            cuerpoTabla.insertAdjacentHTML("beforeend", row); //esto hace que se vean los objetos en la tabla al cerrar y abrir la ventana
        }); //foreach
    }//datos !null
});//window load