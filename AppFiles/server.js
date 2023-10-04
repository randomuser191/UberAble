/*Express*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
/*Firebase*/
const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const serviceAccount = require('../uberhack-9ded1-firebase-adminsdk-pbcqo-17ba308a93.json');
var custId = 1;
// const fs = require('fs');
// const pdf = require('pdf-parse');
const T = require('tesseract.js');
const { getStorage, ref, getDownloadURL } = require('firebase/storage');

var dandelion = require("node-dandelion");
dandelion.configure({
  "app_key":"25bb08e1da774cf28998fc38d07700b1",
  "app_id":"25bb08e1da774cf28998fc38d07700b1"
});


/*Variables*/
var doc;
var custCreated;
var valid = false;
var text;
require('firebase/compat/auth');
require('firebase/compat/firestore');
const firebase = require("firebase/compat/app");
const firebaseConfig = {
    apiKey: "AIzaSyB2KC7jVSfQCY8PfHL5J4mHRNOy8sE6Mq4",
    authDomain: "uberhack-9ded1.firebaseapp.com",
    projectId: "uberhack-9ded1",
    storageBucket: "uberhack-9ded1.appspot.com",
    messagingSenderId: "892205616091",
    appId: "1:892205616091:web:f32039b8a828854b7e35fe",
    measurementId: "G-4N0SJ75FH4"
  };

/**Initialize Firebase App */
let fbApp;
if(firebase.apps.length == 0){
    fbApp = firebase.initializeApp(firebaseConfig);
}else{
    fbApp = firebase.app();
}




app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

//Host App on LocalHost
app.listen(port, () => {
    console.log(`listening at port ${port}`);
})


 app.post('/users', async (req, res) =>{//Create a user
    custCreated = '';    
    if(req.body){
        custCreated = await createCust(req.body.e, req.body.u, req.body.f, req.body.l, req.body.t);
    }
    console.log('creating user' + custCreated)
 })

 app.get('/getusers', async (req, res) =>{//Return if customer was successfully created
    res.json({cust: custCreated})
 })

 app.post('/drivers', async (req, res) =>{//Request account data for a driver
    console.log('body ' + req.body)
    if(req.body){
        doc = await getCust(req.body.u, req.body.t);
    }
 })
 app.post('/retusers', async (req, res) =>{//Request account data for a rider
    console.log('body ' + req.body)
    if(req.body){
        doc = await getCust(req.body.u);
    }
 })
 app.get('/getretusers', async (req, res) =>{//Return account data for a rider
    console.log('doc ' + doc)
    res.json({cust: doc})
    doc = '';
    console.log('doc ' + doc)
 })
 app.post('/preferences', async(req, res) => {//Update user preferences
    valid = false;
    console.log(req.body.n)
    valid = await updateUser(req.body.p, req.body.f, req.body.t);
    console.log('valid ' + valid)
})

app.get('/', async (req, res) =>{//Return if preferences were updated
    console.log(valid)
    res.json({test: valid})
 })

 app.post('/analyzeDoc', async (req, res) =>{
    text = await extractText();
 })
 app.get('/analyzeDoc', async (req, res) =>{//Return if preferences were updated
    console.log('get' + text)
    res.json({data: text})
 })

/**Initialize Firebase App */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

/**Create a customer with Firebase Auth and store in Database */
async function createCust(email, username, first, last, type){
    console.log('type' + type)
    if(username.length > 0){
        db.collection(type).doc(username).set({firstName: first, lastName: last});
    }
    return true;
}
/**Return customer Data */
async function getCust(username){
    var document;
    if(username.length > 0){
        document = db.collection('riders').doc(username);
    }
    var docRef = document.get().then(doc => {
        if(doc) return doc.data();
        console.log(doc)
    })
    var retVal = await docRef;
    if(retVal){return JSON.stringify(retVal)}
    return false
}


/**Update preferences of user */
async function updateUser(preference, token, type){
    console.log(token)
    var obj = {};
    obj['preferences'] = preference;
    console.log(obj);
    console.log('obj: ' + JSON.stringify(obj));
    db.collection(type).doc(token).update(obj);
    return true
}

function convertDoc(doc){
    doc.lastModifiedDate = new Date();
    console.log(doc)
    
    let dataBuffer = fs.readFileSync(doc);
    
    pdf(dataBuffer).then(function(data) {
        // use data
    })
    .catch(function(error){
        // handle exceptions
    })
}

async function extractText(){
    const storage = getStorage();
    var imageRef = ref("img.jpg");
    var res;
    var call = await getDownloadURL(ref(storage, imageRef));
        console.log(call)
        if(call.length > 1){
            res = await T.recognize(call, "eng");
        }
    res = res.data.text.replace("/[^\w\s.&-]+/g", "");
    console.log(res)
    dandelion.txtSim(
        {
          "string1": {
            "type":"txt",
            "value":"Autism"
          },
          "string2":{
            "type":"txt",
            "value": res
          },
          "lang":"en",
          "bow":"never"
        },
        function(results){
          console.log(results.similarity)
         if(results.similarity > 0.35){
            setData("Certification of Additional Training in Autism");
         }else{
            setData("Invalid Document")
         }
        }
      );
        return "";
}

function setData(data){
    console.log(data)
    text = data;
}