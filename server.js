const express = require('express');
const pgp = require('pg-promise')();
const db = pgp("postgres://postgres:admin@localhost:5432/Dashboard")
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/get_all_purpose', getAllPurpose);
app.get('/get_gender', getGender);

app.get('/hello_word',(req,res) => {
  res.send({hello:"hello"});
})

app.get('/get_all_stay', getAllStay);


function getAllStay(req, res, next) {
  var sql = "select AVG(length_of_stay) from length_of_stay;";
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

function getAllPurpose(req, res, next) {
  var sql = "select date,purpose,AVG(no_of_visitors) from gender_purpose group by purpose, date ORDER BY date,purpose asc;";
  var returnData  = [];
  db.any(sql)
    .then(function (data) {
      for(var i = 0; i < data.length-5; i = i + 5){
        var temp = {}
        temp['label'] = data[i]['date'];
        temp['Business'] = data[i]['avg'];
        temp['Commerce'] = data[i+1]['avg'];
        temp['Education'] = data[i+2]['avg'];
        temp['Others'] = data[i+3]['avg'];
        temp['Tourism'] = data[i+4]['avg'];
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
  var sql = "select sex, age_group, avg(no_of_visitors) from age_gender group by sex, age_group order by age_group, sex;";
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
