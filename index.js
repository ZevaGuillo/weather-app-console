require('colors');
const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async() => {

    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                // mostrar mensaje
                const lugar = await readInput('Ciudad: ');
                await busquedas.ciudad( lugar );

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temperatura: ');
                console.log('Mínima: ');
                console.log('Máxima: ');
                
            break;

            case 2:
            break;
        }

        if(opt !== 0) await pause();

    } while (opt !== 0);

}

main();