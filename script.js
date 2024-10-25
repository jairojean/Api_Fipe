

// busca pelas marcas -> https://parallelum.com.br/fipe/api/v1/carros/marcas    - onde tem carro pode ser caminhao ou moto tbm

// busca pelos modelos -> https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos   pode passar o codigo da marca que voce quer


const fetch = require('node-fetch');

async function findBrand(){
    try{
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`);
        if(!response.ok){
            throw Error('Resposta da Api não foi Ok.');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
       console.log('Houve um problema com a requisição: ', error);
    }
}
//findBrand();
async function findModels(idBrand) {
    try{
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos`);  
        if(!response.ok){
            throw Error("Resposta da Api de encontrar carros não ok.");
        }
        const dataCars = await response.json();
        console.log(dataCars);
        return dataCars;

    } catch(error){
        console.log('Houve um problema com a requisição: ', error);
    }
}
//findModels(21);


async function findYear(idBrand,idModel) {
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos/${idModel}/anos`);
        if(!response.ok){
            throw Error('Resposta da Api de encontrar o ano não ok.')
        }
        const data = await response.json();
         
        return data;

    } catch (error) {
        console.log('Houve um problema com a requisição: ', error);
    }
}
findYear(21,5940);


async function findPrice(idBrand,idModel,idYear) {
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos/${idModel}/anos/${idYear}`);
        if(!response.ok){
            throw Error('Resposta da Api de encontrar o Valor não ok.')
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log('Houve um problema com a requisição: ', error);
    }
}
//findPrice(21,644,'2002-1');


async function findCar(idBrand,name) {
    try{
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${idBrand}/modelos`);  
        if(!response.ok){
            throw Error("Resposta da Api de encontrar carros não ok.");
        }
        const dataCars = await response.json();
        const filteredModels = dataCars.modelos.filter(car => car.nome && car.nome.includes(name));
        return filteredModels;

    } catch(error){
        console.log('Houve um problema com a requisição: ', error);
    }
}


async function main() {
    const listYear = [];

    const filteredModels = await findCar(21, 'Uno');
    idUnoModel = filteredModels.map(car =>car.codigo);   // id modelo

    
    for (let i = 0; i < idUnoModel.length; i++) {
        const UnoYear = await findYear(21,idUnoModel[i])

        UnoYear.forEach(year => {
            if (!listYear.includes(year.codigo)) { 
                listYear.push(year.codigo); 
            }
        });
        //console.log(UnoYear);
    }
    console.log(listYear);      // id ano
    for (let i = 0; i < idUnoModel.length; i++) {
        for (let index = 0; index < listYear.length; index++) {
             listYear[index];
    
             const listCarPrice = await findPrice(21,idUnoModel[i],listYear[index])
            console.log(listCarPrice); 
        }
       }
}


main();








/*
async function clima(localeId = 3477) {
    const token = 'f66685a8814d0de40b537d7bb4dc09ca'; // Substitua pelo novo token
    try {
        const response = await fetch(`http://apiadvisor.climatempo.com.br/api/v1/climate/rain/locale/3477?token=${token}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro ao buscar dados de clima: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log(data); // Exibe os dados recebidos

        return data; // Retorna os dados recebidos
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Repassa o erro
    }
}
 

clima(); // Chama a função

   */

