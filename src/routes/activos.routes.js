const { Router } = require('express');
//const pool  = require('../db');

const router = Router();
const { getAllActivos, getActivo,createActivo, updateActivo, deleteActivo } = require('../controllers/activos.controllers');

router.get('/activos', getAllActivos);

router.post('/activos', createActivo);

router.put('/activos/:id', updateActivo);

router.delete('/activos/:id', deleteActivo);

router.get('/activos/:id', getActivo);


module.exports = router;