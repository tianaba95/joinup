import * as functions from 'firebase-functions';
// const functions = require('firebase-functions');
const emailjs = require('emailjs/email');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendmailfn = functions.database.ref('/sendmail/{emailkey}').onWrite(event => {
    var email = event.after.child("emailid").val();

    var server = emailjs.server.connect({
        user: "tatiana.barrios.montenegro@gmail.com",
        password: "Am950107!11216",
        host: 'smtp.gmail.com',
        ssl: true
    });
    
    server.send({
        text: 'You have been upgraded to guide for the JoinUp team',
        from: 'noreply@joinuptest-495af.firebaseapp.com',
        to: email,
        subject: 'You are now a guide'
    }, (err, message) => {
        if (err) 
            console.log(err)    
    })
})