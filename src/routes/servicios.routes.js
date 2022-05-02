const { Router } = require('express');
//const pool  = require('../db');

const router = Router();
const { getAllServicios, getServicio,createServicio, updateServicio, deleteServicio } = require('../controllers/servicios.controllers');

router.get('/servicios', getAllServicios);

router.post('/servicios', createServicio);

router.put('/servicios/:id', updateServicio);

router.delete('/servicios/:id', deleteServicio);

router.get('/servicios/:id', getServicio);


module.exports = router;