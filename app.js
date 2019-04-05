let fs = require("fs");
let jsonFile = fs.readFileSync("db.json");
let data = JSON.parse(jsonFile);

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on PORT : ${PORT}`);
});

app.get('/all', (request, response) => {
    response.send(data);
});

app.get('/add/:number/:insurance/:fitness/:taxtation/:permit/:puc', (request, response) => {
    let reqData = request.params;

    data.push({
        id: data[data.length - 1].id + 1,
        number: reqData.number,
        insurance: reqData.insurance,
        fitness: reqData.fitness,
        taxtation: reqData.taxtation,
        permit: reqData.permit,
        puc: reqData.puc
    });

    let tempData = JSON.stringify(data, null, 2);

    fs.writeFile('db.json', tempData, (err) => {
        console.log(err);
    });

    response.send(data[data.length - 1]);
});

app.get('/delete/:id', (request, response) => {
    let reqData = request.params;
    let deletedData = data[reqData.id];
    data.splice(reqData.id, 1);

    let tempData = JSON.stringify(data, null, 2);

    fs.writeFile('db.json', tempData, (err) => {
        console.log(err);
    });

    response.send(deletedData);
});


app.get('/update/:id/:number/:insurance/:fitness/:taxtation/:permit/:puc', (request, response) => {
    let reqData = request.params;
    let id = reqData.id;
    data[id].number = reqData.number;
    data[id].insurance = reqData.insurance;
    data[id].fitness = reqData.fitness;
    data[id].taxtation = reqData.taxtation;
    data[id].permit = reqData.permit;
    data[id].puc = reqData.puc;

    let tempData = JSON.stringify(data, null, 2);

    fs.writeFile('db.json', tempData, (err) => {
        console.log(err);
    });

    response.send(data[id]);
});



//Login Check
app.get('/login/:name/:password', (request, response) => {
    let reqData = request.params;
    let isValid = 0;
    if(reqData.name == "ASHFAQUE" && reqData.password == "ashfaque@81") {
        isValid = 1;
    }
    else{
        isValid = 0;
    }
    response.send({
        "valid": isValid
    });
});

//Using static file
app.use(express.static('public'));