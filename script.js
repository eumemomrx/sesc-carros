const XLSX = require("xlsx");
const path = require("path");

const caminho = path.join(__dirname, "testecarros.xlsx");

function read(file){
    const arquivo = XLSX.readFile(file);
    const pagPlanilha = arquivo.SheetNames[0];
    const planilha = arquivo.Sheets[pagPlanilha];

    const retornoJson = XLSX.utils.sheet_to_json(planilha);
    return retornoJson;

}

const carros = read(caminho);
console.log(carros);