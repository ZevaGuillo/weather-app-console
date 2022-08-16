const axios = require('axios');

class Busquedas{

    constructor(){
        this.historial = ['Cuenca', 'Guayaquil', 'Quito']

        // TODO: leer db si existe
    }

    get paramsMapbox(){
        return {
            'access_token':'pk.eyJ1IjoiemV2YWd1aWxsbyIsImEiOiJjbDZ3b2Y3MHMyZGQwM2tvZGs5ZHJoZDQ5In0.FtaNhsbnq0Y1aEWZo7IAxg',
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
            console.log(response.data);

            return [];
        } catch (error) {
            return []
        }

        
    }

}

module.exports = Busquedas;