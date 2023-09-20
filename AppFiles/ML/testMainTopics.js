const { log } = require("console");
var dandelion = require("node-dandelion");
dandelion.configure({
  "app_key":"25bb08e1da774cf28998fc38d07700b1",
  "app_id":"25bb08e1da774cf28998fc38d07700b1"
});




// TXT SIM: Check for the similitudes between the two strings.
dandelion.txtNex(
    {
      "string": {
        "type":"txt",
        "value": "\"\øCCEs CAS CERTIFIED AUTISM SPECIALIST The International Board of Credentialing and Continuing Education Standards hereby certifies that aubra has successfully fulfilled the requirements as a Certified Autism Specialist. The Certified Autism Sgrcialist (CAS) credential is awarded to professionals working with individuals with autism in thc ond healthcare industries Thc CAS recognizes education, and commitment Of professionals worldwide Myron IBCCES International Board of Credentialing Continuing Education Standards IBCCES BOMd Valid Thru 12-29-2021 CAS205693"
      },
      "extras": [
        {
          "min_confidence": 0.7
        },
        {
          "include": "categories"
        },
      ]
    },
  function(results){
    /***** RESULTS: *****
    { time: 2,
    similarity: 0.4987,
    lang: 'en',
    timestamp: '2015-04-24T15:46:09.625' }
    **********/
   console.log(results)
  }
);