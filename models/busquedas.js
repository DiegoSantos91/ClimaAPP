const fs = require('fs');
const axios = require('axios');
const dbPath = './db/database.json';


class Busquedas {
    historial = [];
    constructor() {
        //TO DO: leer DB si existe
        this.leerDB();
    };
    get historialCapitalizado() {
        //capitalizar cada palabra 

        return this.historial;
    }
    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsClima() {
        return {
            appid: process.env.WEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar = '') {
        //peticion http
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            });
            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return [];//retornar lugares
        }


    }
    async clima(lat, lon) {
        try {

            //instancia de axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsClima, lat, lon }
            });
            const resp = await instance.get();
            const { weather, main,clouds } = resp.data;
            //extraer la info de resp.data
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
                prob: clouds.all
            };
        } catch (error) {
            console.log(error)
        }
    }
    async agregarHistorial(lugar = '') {
        //
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar);
        this.guardarDB();

    };
    guardarDB() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(dbPath, JSON.stringify(payload));
    };
    leerDB() {
        //debe de existir 
        if (!fs.existsSync(dbPath)) {
            return null;
        };
        const info = fs.readFileSync(dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.historial = data.historial;
    };


}



module.exports = Busquedas;