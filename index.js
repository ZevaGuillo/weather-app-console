require('dotenv').config()

require('colors');
const { readInput, inquirerMenu, pause, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async() => {

    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                // mostrar mensaje
                const terminoBusqueda = await readInput('Ciudad: ');

                // Buscar los lugares
                const lugares = await busquedas.ciudad( terminoBusqueda );
                
                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if( id === '0' ) continue;

                const lugarSelect = lugares.find( l => l.id === id);
                //guardar en db
                busquedas.agregarHistorial(lugarSelect.nombre);                

                // Clima
                const clima = await busquedas.climaLugar( lugarSelect.lat, lugarSelect.lng );

                // Mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSelect.nombre.green);
                console.log('Lng: ', lugarSelect. lng);
                console.log('Lat: ', lugarSelect.lat);
                console.log('Temperatura: ',clima.temp);
                console.log('Mínima: ',clima.temp_min);
                console.log('Máxima: ',clima.temp_max);
                console.log('Como está el clima: ',clima.desc.green);
                
            break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i +  1 }.`.green;
                    console.log(`${idx} ${lugar}`);
                } )

            break;
        }

        if(opt !== 0) await pause();

    } while (opt !== 0);

}

main();
