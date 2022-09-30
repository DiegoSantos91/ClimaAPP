const { response, request } = require("express");
const { Busquedas } = require("../models/busquedas");


const buscar = async (req = request, res = response) => {
    // const { ciudad } = req.body;
    console.log('BODY', req.body);
    console.log('PARAMS', req.params);
    console.log('REQUEST', req.query);
    console.log('REQUEST all',req);
    // const {ciudad} = req.body
    res.json((
    req.body
))
    // const listCiudades = await Busquedas.ciudad(ciudad);

};

module.exports = {
    buscar
}