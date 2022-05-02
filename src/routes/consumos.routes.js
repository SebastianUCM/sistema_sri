const { Router } = require('express');
//const pool  = require('../db');

const router = Router();
const { getAllConsumos, getConsumo,createConsumo, updateConsumo, deleteConsumo } = require('../controllers/consumos.controllers');

router.get('/consumos', getAllConsumos);

router.post('/consumos', createConsumo);

router.put('/consumos/:id', updateConsumo);

router.delete('/consumos/:id', deleteConsumo);

router.get('/consumos/:id', getConsumo);


module.exports = router;