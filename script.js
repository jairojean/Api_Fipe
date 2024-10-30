
const axios = require('axios');
const fs = require('fs');

function safeInJsonFile(data,nameFile){ 
    const filePath = `${nameFile}.json`;
    if (fs.existsSync(filePath)) {
        console.log(`O arquivo ${nameFile}.json já existe. Não será criado novamente.`);
    } else {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Dados salvos em ${nameFile}.json`);
    }
   
}

function loadFromJsonFile(nameFile) {
    try {
        const dataJson = fs.readFileSync(`${nameFile}.json`);
        const data = JSON.parse(dataJson);
        return data;
    } catch (error) {
        console.log(`Erro ao carregar o arquivo ${nameFile}.json:`, error);
        return null;
    }
}

async function findBrand(){
    var safeInJson = false;
    try {
        const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        safeInJsonFile(response.data,'Brand');
        return response.data;
    } catch (error) {
        console.log('Houve um problema com a requisição: ', error);
    }
}

//findBrand();

async function findModels(idBrand) {
    try{
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos`);  
        safeInJsonFile(response.data,'Models');
        return response.data;
    } catch(error){
        console.log('Houve um problema com a requisição: ', error);
    }
}
//findModels(21);

async function findYear(idBrand,idModel) {
    try {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos/${idModel}/anos`);
        safeInJsonFile(response.data,'Year');
        return response.data;
    } catch (error) {
        console.log('Houve um problema com a requisição: ', error);
    }
}
//findYear(21,644);

async function findPrice(idBrand,idModel,idYear) {
    try {
        const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/21/modelos/634/anos/1996-1`);
        //safeInJsonFile(response.data,'Price');
        return response.data;
    } catch (error) {
        console.log('Houve um problema com a requisição: ');
    }
}
//findPrice(21,644,'2002-1');

function findCar(idBrand,name) {
    try{
        const dataCars = loadFromJsonFile('Models');
        const filteredModels = dataCars.modelos.filter(car => car.nome && car.nome.includes(name));
        return filteredModels;
    } catch(error){
        console.log('Houve um problema com a requisição: ', error);
    }
}
//findCar(21,'Uno');

async function main() {
    const listYear = [];
    let listPrice = []
    const filteredModels = await findCar(21, 'Uno');
    idUnoModel = filteredModels.map(car =>car.codigo);
 

    for (let i = 0; i < idUnoModel.length; i++) {
        const UnoYear = loadFromJsonFile('Year');
        UnoYear.forEach(year => {
            if (!listYear.includes(year.codigo)) { 
                listYear.push(year.codigo); 
            }
        });
    }      
    for (let i = 0; i <idUnoModel.length; i++) {
        for (let index = 0; index < listYear.length; index++) {
            for(let teste = 0; teste <  1; teste++){
             let priceData  = await findPrice(21,idUnoModel[i],listYear[index]);
             listPrice.push(priceData); // Adiciona o dado retornado à lista
           }   
        }
    }
    console.log(listPrice);
}

main();
