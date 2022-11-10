import {validarTexto,
normalizarTexto,
validarEmail,
normalizarEmail,
validarContrasenia,
compararContrasenias,
esValido,
esInvalido} from './utils.js';

//Evaluar si hay un token para mandarlo directo a sus tareas
const jwt = localStorage.getItem('jwt');

if (jwt) {
    //Uso el replace para no guardar en el historial la url anterior
    location.replace('mis-tareas.html');
}


window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form');
    const inputNombre = document.querySelector('#inputNombre');
    const inputApellido = document.querySelector('#inputApellido');
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    const inputPasswordRepetida = document.querySelector('#inputPasswordRepetida');

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
    event.preventDefault();

    //validar nombre
    if(typeof validarTexto(inputNombre.value) == "string"){
        let error = validarTexto(inputNombre.value)
        esInvalido('name', inputNombre, error)
    } else {
        esValido('name',inputNombre)
        inputNombre.value = normalizarTexto(inputNombre.value)
    }
    //validar apellido
    if(typeof validarTexto(inputApellido.value) == "string"){
        let error = validarTexto(inputApellido.value)
        esInvalido('lastname', inputApellido, error)
    } else {
        esValido('lastname', inputApellido)
        inputApellido.value = normalizarTexto(inputApellido.value)
        console.log(inputApellido.value);
    }
    //validar mail
    if(typeof validarEmail(inputEmail.value) == "string"){
        let error = validarEmail(inputEmail.value)
        esInvalido('email', inputEmail, error)
    } else {
        esValido('email', inputEmail)
        inputEmail.value = inputEmail.value.toLowerCase()
        console.log(inputEmail.value);
    }
    //validar contraseña
    if(validarContrasenia(inputPassword.value).length> 0){
        let errores= validarContrasenia(inputPassword.value)
        esInvalido('password', inputPassword, errores)
    }    
    else {
        esValido('password', inputPassword)
    }
    //validar contraseñas iguales
    if(typeof compararContrasenias(inputPassword.value, inputPasswordRepetida.value) == "string"){
        let error= compararContrasenias(inputPassword.value, inputPasswordRepetida.value)
        esInvalido('password-repeat', inputPasswordRepetida, error)
    }    
    else if(validarContrasenia(inputPassword.value).length> 0){
        esInvalido('password-repeat', inputPasswordRepetida, [`Contraseña no valida.`])
    } else {
        esValido('password-repeat', inputPasswordRepetida)
    }

    const hayErrores=document.querySelectorAll('.errorInvalid')

    if(!hayErrores.length>0){
        const usuario = {
            "firstName": inputNombre.value,
            "lastName": inputApellido.value,
            "email": inputEmail.value,
            "password": inputPassword.value
        }
        realizarRegister(usuario);
    }


    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(usuario) {
        const url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users';

        const configuraciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }

        fetch(url, configuraciones)
        .then( respuesta => respuesta.json())
        .then( data => {
            console.log('RESPUESTA DEL SERVIDOR');
            console.log(data)
            
            // si es correcto el usuarios nos llega un token
            // entoces lo guardamos en el deposito para ir a la siguiente pantalla
            if(data.jwt){
                // guardamos ese token que nos llega
                localStorage.setItem('jwt', data.jwt);
                location.replace('mis-tareas.html');
            }
        })
    };


});