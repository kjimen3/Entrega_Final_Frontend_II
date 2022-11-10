/* ---------------------------------- texto --------------------------------- */
//Recibe un texto, si tiene caracteres especiales o numeros, devuelve false
//Si recibe un string vacio devuelve false
function validarTexto(texto) {
    if(!texto.trim().length>0){
        return `Campo vacio.`
    }
    const patt = /^[A-Za-z\s]+$/;
    if (!patt.test(texto)){
        return `No puede contener caracteres especiales o numeros.`
    } 
    else return true
}

//Recibe texto con mayusculas, devuelve un String con las letras capitales en mayus
function normalizarTexto(texto) {
    let nombres = texto.trim().toLowerCase()
    if(nombres.length>0){
        let ArrayNombres = nombres.split(" ")
        let nombresOk = ArrayNombres.map(palabra => {
            palabra = palabra[0].toUpperCase() + palabra.substring(1)
            return palabra
        });
        return nombresOk.join(" ")
    }
    
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    let emailOk=normalizarEmail(email)
    if(!emailOk.length>0){
        return `Campo vacio.`
    }
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(emailOk)?true:'El mail no es valido.'
}

function normalizarEmail(email) {
    return email.trim().toLowerCase()
}

/* -------------------------------- password -------------------------------- */
/*---
Validar contrasenia
* al menos una letra
* al menos un mayus
* al menos un numero
* al menos 8 caracteres---*/

function validarContrasenia(contrasenia) {

    let letras=/[A-z]/ // al menos una letra
    let letrasMayus=/[A-Z]/ // al menos una letra Mayus
    let numero=/\d/ //al menos un numero
    let espacios=/\s/ //sin espacios
    let errores=[] //lista de errores

    if(!contrasenia.trim().length>0){
        errores.push(`Campo vacio.`)
    }
    if(!contrasenia.length>8){
        errores.push(`Debe poseer al menos 8 caracteres.`)
    }
    if(!letras.test(contrasenia)){
        errores.push(`Debe contener una letra (a-Z).`)
    }
    if(!letrasMayus.test(contrasenia)){
        errores.push(`Debe contener una letra mayuscula (A-Z).`)
    }
    if(!numero.test(contrasenia)){
        errores.push(`Debe contener un numero (0-9).`)
    }
    if(espacios.test(contrasenia)){
        errores.push(`No puede tener espacios vacios.`)
    }
    if(errores.length>0){
        return errores
    } else {
        return true
    }
}

function compararContrasenias(contrasenia1, contrasenia2) {
    if(contrasenia1.length>0 && contrasenia2.length>0){
        console.log(contrasenia1, contrasenia2);
        if(contrasenia1 !== contrasenia2){
            return `No coinciden las contraseñas.`
        }
        else return true
    }
    else{
        return `Campo vacio.`
    }
}

/* ----------------- En caso de valores validos o invalidos ----------------- */
/* -------------------- muestra el error o input correcto ------------------- */
function esValido(clase, input){
    const elemento = document.querySelector(`.${clase}`)
    input.classList.remove('errorInvalid')
    input.classList.add('valid')
    elemento.classList.remove('errorInvalid')
    elemento.classList.add('valid')
    //clase name o lastname
    elemento.innerHTML=""


}   

function esInvalido(clase, input, error){
    const elemento = document.querySelector(`.${clase}`)
    input.classList.remove('valid')
    input.classList.add('errorInvalid')
    elemento.classList.remove('valid')
    elemento.classList.add('errorInvalid')
    if(typeof error == "object"){ //en caso de varios errores
        elemento.innerHTML=""
        error.forEach(e => {
            elemento.innerHTML+=`${e}<br>`;
        });
    } else{
        elemento.innerHTML=error
    }
}   






export {
    validarTexto,
    normalizarTexto,
    validarEmail,
    normalizarEmail,
    validarContrasenia,
    compararContrasenias,
    esValido,
    esInvalido
};