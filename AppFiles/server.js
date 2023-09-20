/*Express*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

/*Firebase*/
const admin = require('firebase-admin');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const serviceAccount = require('./uberhack-9ded1-firebase-adminsdk-pbcqo-17ba308a93.json');
var custId = 1;

/*Variables*/
var doc;
var custCreated;
var valid = false;

app.use(bodyParser.json());
app.use(function(res, next) {
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

/**Initialize Firebase App */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

/**Create a customer with Firebase Auth and store in Database */
async function createCust(username, first, last, type){
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
    console.log('updated user')
    return true
}
