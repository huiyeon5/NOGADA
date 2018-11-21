const express = require('express');
const pgp = require('pg-promise')();
const db = pgp("postgres://postgres:admin@localhost:5432/Dashboard")
const app = express();
var bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/get_all_purpose', getAllPurpose);
app.post('/get_gender', getGender);
app.post('/get_all_stay', getAllStay);
app.post('/get_gender_purpose',getAllGenderPurpose)

app.post('/get_all_purpose_country', getAllPurposeCountry);
app.post('/get_gender_country', getGenderCountry);
app.post('/get_all_stay_country', getAllStayCountry);
app.post('/get_gender_purpose_country',getGenderPurposeCountry)
app.get('/getCountries', getCountries);

function getAllGenderPurpose(req, res, next) {
  var sql = `select purpose, sex, AVG(no_of_visitors) from gender_purpose where date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date group by purpose, sex order by purpose, sex;`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      
      let temp = {}
      for(let i = 0; i < data.length; i = i + 2){
        temp = {}
        temp['purpose'] = data[i]['purpose']
        temp['Female'] = data[i]['avg']
        temp['Male'] = data[i + 1]['avg']
        returnData.push(temp)
      }
      
      returnData.sort((a,b) => {
        (b['Female'] + b['Male']) - (a['Female'] + a['Male'])
      })
      returnData.reverse();
      res.status(200)
        .json({
          status: 'success',
          data: returnData
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getGenderPurposeCountry(req, res, next) {
  console.log("Country: " + req.body.nationality)
  var sql = `select purpose, sex, AVG(no_of_visitors) from gender_purpose where nationality = '${req.body.nationality}' and date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date group by purpose, sex order by purpose, sex;`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      console.log(data);
      let temp = {}
      for(let i = 0; i < data.length; i = i + 2){
        temp = {}
        temp['purpose'] = data[i]['purpose']
        temp['Female'] = parseFloat(data[i]['avg'])
        temp['Male'] = parseFloat(data[i + 1]['avg'])
        returnData.push(temp)
      }

      returnData.sort((a,b) => {
        (b['Female'] + b['Male']) - (a['Female'] + a['Male'])
      })
      returnData.reverse();
      res.status(200)
        .json({
          status: 'success',
          data: returnData
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getAllStay(req, res, next) {
  var sql = `select AVG(length_of_stay) from length_of_stay where date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllStayCountry(req, res, next) {
  var sql = `select AVG(length_of_stay) from length_of_stay where nationality='${req.body.nationality}' and date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getCountries(req, res, next) {
  var sql = "select nationality from age_gender group by nationality order by nationality asc;";
  db.any(sql)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getAllPurpose(req, res, next) {
  var sql = `select date,purpose,AVG(no_of_visitors) as avg from gender_purpose where date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date group by purpose, date ORDER BY date,purpose asc;`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      for(var i = 0; i < data.length; i = i + 4){
        var temp = {}
        temp['label'] = data[i]['date'];
        console.log(`Business before ${data[i]['avg']} and after ${parseFloat(data[i]['avg'])}`)
        temp['Business/Commerce'] = parseFloat(data[i]['avg']);
        temp['Education'] = parseFloat(data[i+1]['avg']);
        temp['Others'] = parseFloat(data[i+2]['avg']);
        temp['Tourism'] = parseFloat(data[i+3]['avg']);
        returnData.push(temp);
      }
      res.status(200)
        .json({
          status: 'success',
          data: returnData
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllPurposeCountry(req, res, next) {
  console.log(`Get All Purpose ${req.body.nationality} ${req.body.toYear}`)
  var sql = `select date,purpose,AVG(no_of_visitors) as avg from gender_purpose where nationality='${req.body.nationality}' and date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date group by purpose, date ORDER BY date,purpose asc;`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      console.log(data.length)
      for(var i = 0; i < data.length-4; i = i + 4){
        var temp = {}
        console.log(i);
        temp['label'] = data[i]['date'];
        temp['Business/Commerce'] = parseFloat(data[i]['avg']);
        temp['Education'] = parseFloat(data[i+1]['avg']);
        temp['Others'] = parseFloat(data[i+2]['avg']);
        temp['Tourism'] = parseFloat(data[i+3]['avg']);
        returnData.push(temp);
      }
      res.status(200)
        .json({
          status: 'success',
          data: returnData
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getGender(req, res, next) {
  var sql = `select sex, age_group, avg(no_of_visitors) from age_gender where date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date group by sex, age_group order by age_group, sex;`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      var tempList = []
      for(let i = 0; i < data.length; i = i + 2){
        let temp = {}
        temp['age_group'] = data[i]['age_group']
        temp['avg'] = data[i]["avg"];
        tempList.push(temp);
      }

      returnData.push(tempList);
      tempList = [];

      for(let i = 1; i < data.length; i = i + 2){
        let temp = {}
        temp['age_group'] = data[i]['age_group']
        temp['avg'] = data[i]['avg'];
        tempList.push(temp);
      }

      returnData.push(tempList);
      res.status(200)
        .json({
          status: 'success',
          data: returnData
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getGenderCountry(req, res, next) {
  var sql = `select sex, age_group, avg(no_of_visitors) from age_gender where nationality='${req.body.nationality}' and date >= '${req.body.fromYear}-${req.body.fromMonth}-01'::date and date <='${req.body.toYear}-${req.body.toMonth}-01'::date group by sex, age_group order by age_group, sex;`;
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      var tempList = []
      for(let i = 0; i < data.length; i = i + 2){
        let temp = {}
        temp['age_group'] = data[i]['age_group']
        temp['avg'] = data[i]["avg"];
        tempList.push(temp);
      }

      returnData.push(tempList);
      tempList = [];

      for(let i = 1; i < data.length; i = i + 2){
        let temp = {}
        temp['age_group'] = data[i]['age_group']
        temp['avg'] = data[i]['avg'];
        tempList.push(temp);
      }

      returnData.push(tempList);
      res.status(200)
        .json({
          status: 'success',
          data: returnData
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
