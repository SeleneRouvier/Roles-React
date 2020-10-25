// creamos las funciones
const functions = require('firebase-functions');

// servicio para trabajar con el backend de firebase
const admin = require('firebase-admin');

// inicializamos el proyecto
admin.initializeApp();

const auth = admin.auth();

exports.agregarAdministrador = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {admin: true})
        })
        .then(() => {
            return {message: 'se creó con éxito el administrador'}
        })
        .catch(error => {
            return {error: error}
        })
})

exports.eliminarAdministrador = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'solo admin puede modificar'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {admin: false})
        })
        .then(() => {
            return {message: 'Usuario ya no es administrador'}
        })
        .catch(error => {
            return {error: error}
        })

})

exports.crearAutor = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'no tienes los permisos'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {autor: true})
        })
        .then(() => {
            return {message: 'Usuario ya es Autor'}
        })
        .catch(error => {
            return {error: error}
        })

})

exports.eliminarAutor = functions.https.onCall((data, context) => {

    if(context.auth.token.admin !== true){
        return {error: 'no tienes los permisos'}
    }

    return auth.getUserByEmail(data.email)
        .then(user => {
            return auth.setCustomUserClaims(user.uid, {autor: false})
        })
        .then(() => {
            return {message: 'Usuario eliminado como Autor'}
        })
        .catch(error => {
            return {error: error}
        })

})