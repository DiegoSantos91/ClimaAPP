const { Router}= require('express');
const { buscar } = require('../controllers/buscar');


const api = Router();

api.post('/buscar',[
    
],buscar)



module.exports= api;