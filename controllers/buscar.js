const { response, request } = require("express");
const { Busquedas } = require("../models/busquedas");


const buscar = async (req, res) => {
    // const { ciudad } = req.body;
    res.json(req.body)
    // const listCiudades = await Busquedas.ciudad(ciudad);

};

module.exports = {
    buscar
}