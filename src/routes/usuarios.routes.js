const { Router } = require('express');
//const pool  = require('../db');

const router = Router();
const { getAllUsuarios, getUsuario,createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controllers');

router.get('/usuarios', getAllUsuarios);

router.post('/usuarios', createUsuario);

router.put('/usuarios/:id', updateUsuario);

router.delete('/usuarios/:id', deleteUsuario);

router.get('/usuarios/:id', getUsuario);


module.exports = router;