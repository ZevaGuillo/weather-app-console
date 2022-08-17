const fs = require('fs');
const axios = require('axios');

class Busquedas{

    constructor(){
        this.historial = []
        this.dbPath = './db/database.json';
        // TODO: leer db si existe
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historial.map(lugar => {
            return lugar.split(' ')
                        .map( palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1) )
                        .join(' ');
        });
    }

    get paramsMapbox(){
        return {
            'access_token':process.env.MAPBOX_KEY || '',
            'language':'es',
            'limit':5
        }
    }

    async ciudad( lugar = '' ){

        // petición http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const response = await instance.get();
            return response.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            console.log(error)
        }

        
    }

    async climaLugar( lat, lon ) {
        try {
            // instance axios.create
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params:{
                    lat,
                    lon,
                    'appid': process.env.OPENWEATHER || '',
                    'units': 'metric',
                    'lang':'es'
                }
            })

            // response.data
            const response = await instance.get();
            const {weather, main} = response.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max, 
            }
            //return desc: , temp_min, temp_max, temp

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = '' ){
        //TODO: prevenir duplicados
        if( this.historial.includes( lugar.toLowerCase() ) ){
            return;
        }

        this.historial = this.historial.splice(0,5);

        this.historial.unshift( lugar.toLowerCase() );

        // Grabar en db
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)) return null;

        const file = fs.readFileSync(this.dbPath, { encoding: 'utf-8'})
        const data =  JSON.parse(file);
        this.historial = data.historial;
    }
}

module.exports = Busquedas;