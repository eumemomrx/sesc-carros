const XLSX = require("xlsx");
const path = require("path");
const express = require("express");
const app = express();

const caminho = path.join(__dirname, "testecarros.xlsx");

function read(file) {
    const arquivo = XLSX.readFile(file);
    const pagPlanilha = arquivo.SheetNames[0];
    const planilha = arquivo.Sheets[pagPlanilha];

    const retornoJson = XLSX.utils.sheet_to_json(planilha);
    return retornoJson;
}

const carros = read(caminho);
// console.log(carros);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    const placa = req.query.placa || '';
    let carroEncontrado = null;

    if (placa) {
        carroEncontrado = carros.find(carro => carro.Placa.toUpperCase() === placa.toUpperCase());
    }

    res.render("index", { carro: carroEncontrado, placa: placa });
});

app.listen(3030, () => {
    console.log("Servidor rodando na porta 3030");
});