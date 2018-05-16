"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const emailjs = require('emailjs/email');
exports.sendmailfn = functions.database.ref('/sendmail/{emailkey}').onWrite(event => {
    var email = event.after.child("emailid").val();
    var texto = event.after.child("text").val();
    //Hacer otro servidor de correo
    var server = emailjs.server.connect({
        user: "tatiana.barrios.montenegro@gmail.com",
        password: "Am950107!11216",
        host: 'smtp.gmail.com',
        ssl: true
    });
    server.send({
        text: texto,
        from: 'noreply@joinuptest-495af.firebaseapp.com',
        to: email,
        subject: 'Message from JoinUp'
    }, (err, message) => {
        if (err)
            console.log(err);
    });
});
//# sourceMappingURL=index.js.map