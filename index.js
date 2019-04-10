//const functions = require('firebase-functions');
var admin = require("firebase-admin");
var express = require('express')
var app = express()
const { Parser } = require('json2csv');


//var serviceAccount = require("./fir-log1in-94db4-firebase-adminsdk-1n159-5cde24dbbc.json");

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "fir-login-94db4",
        "private_key_id": "5cde24dbbcfafae0301b75dba5693740ec8bc0bd",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC5OmpIHegWhgYi\n/nuyD51OJxUSqRd5kOqTIIqqNNemWHr+bacjfyE36TOawApnTiF2zFvmN2Iw6k3X\nXdV5+/qE1u+Tyxy5GcCD1B1AUJ6pI5v71iuuuhDUCDgKqNEJzRHZ9vD+oiO8Tqj/\n1w86bD29Jk5JE+TRiOHFrDsNsaSUnEAhBjhD7avkNwKmxIfwqpzb/pyfYmDxVqmP\ndeGP9gr2NOZ5YgRRysipX5K57aHnbOnVoW6UO5FJLIYvCXIoFMKgt5tskpcLL+OI\nz9D8hhUHM9cspWyS9hUQRQv0JyrGvHR/2XyZ+CUkdMxqhE4Wj7/PsvhCxBNkiU7Q\nOM/uI6S5AgMBAAECggEADOu84Hs6loCiorQJFaiWbu5Vv1udhDjGTj1TwvAE94j+\nSmuEgFrEytFJDONWznJCLhbvFbH5FuOvSqXUZ4oa5YOXSoJdhnF8Dw4fvL3q9W5D\nGigMW8fFtv68Rw0T6Oi91SwvTzno/4CmtBMQ0EDe9Sf8B8e8G1w+sJL1Ox0wV3/o\n1wpZK9c6OGouym/iE0WiGBPaCZA6HkJH+ybfUI7zZed22i86moo329GhbHZmQzwh\nL6hGXxv4PVZr7ITSe1pL8csCkUd+srcyiBAAgHW02Rn17mj0kfnJZaLVjXOO0zJs\nZZdVdVX7zE5y9ZDnsGDZ2QVSZ+XqRci5gGwaoUk7EQKBgQDq6PM9hPQWH1Nho9xY\nGFzvx8jUoA1xRF8TJ4+wrx2UnoVKmgbnRvairw3zCF7CcPlbWsaG8WmIGGqpSJyS\nt8IXLx6j4lFJy3Luiir/EtAk6GFU3Oj5ohml5Kqe4AO8Ts7Q4mPJpGnoZaY5QCj4\nt0uJiW6+fefFy13Z5UPIMw0kKQKBgQDJ25rEz0o32J6oChJqVvjpBQKAg6Oon1u9\nYklg6DjtdSCeYIYYscZGDGDwhySQF7PW1zmt3CgpYsg3zTEL3PFSfli15Qml/k3E\nVthctkzcvCiDM19o+/FOt5AyKs3i/8rjKh6rRWIo4MFxSwZkUIs5rTAFifYLotDE\nQExuuToOEQKBgQCwhh1DPYWumhuuY9RQ3v33scnY/e0cEKThX/k6bF1uMTE4vkYx\nxcHQvntdBg0vUHYRkEVfYkpLWw3L6CTAnBXeFiqQPKGZMqlLV8i3pQuEsJtzig4I\niSd84jjU6sHj39TKY1VZUZPEb55Zpz0iqZq53+y4eSSSHiCIfSBScQqPAQKBgQCh\nLfMU95gBo7x73R77PlseZVusFnDVsflk7Vg+Qu9B3GahT92DVmBFipjVNnPhgquc\n/toVk1eWREQvGm7xVAh1oGFhTHM50idygQ3eacpR7wRCTwD+KT5zZmuDQ16GxUzR\nus4mYA6TKXQM7KU78HxbH4jaw2BtxiIAsn7VYp2SoQKBgQCtWAcMNEOTR6ebeN6o\nxX7c2xJrFg/1VBYMt0EGq5fdzqazgdYcGEYhml+9OSi3R/Ux+cam97AVZqAgy0K0\n1S5QCCP4oJUaelqwDtvA9xLEnaFY5J26ta9fntpS7B1EMbnjmHn3/bMWyHwm5dLL\n/WvvoLtKQThAu9D5L8Q+ET7r1A==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-1n159@fir-login-94db4.iam.gserviceaccount.com",
        "client_id": "109387911281220347801",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1n159%40fir-login-94db4.iam.gserviceaccount.com"
      }),
    databaseURL: "https://fir-login-94db4.firebaseio.com"
  });

var firestore = admin.firestore();
app.post('/addUser', (req, res)=> {
    res.send(req.query)
    firestore.collection("Mahafuz").add(req.query)
    .catch((e)=>{
        console.log(e);
    }); 
})

app.post("/downloadDb",async (req,res)=>{
 var docData = [];
  console.log("downloadBd");
  const mahafuzCol = firestore.collection("Mahafuz")
  await mahafuzCol.listDocuments()
  .then( listDoc=>{
    listDoc.forEach(data=>{
      mahafuzCol.doc(data.id).get()
      .then(
        doc=>{
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            //console.log('Document data:', doc.data());
            docData.push(doc.data());
          }
        }
      );
    });
    console.log(docData)
  });
});

app.listen(3000,()=>console.log("app om 3000"))
//exports.databaseManager = functions.https.onRequest(app);