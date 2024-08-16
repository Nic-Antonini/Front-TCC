const express = require('express'); 
const router = express.Router(); 

// referência a controllers que serão utilizados nas rotas
const UsuariosController = require('../controllers/usuarios'); 

// definição das rotas
router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuario); 
router.patch('/usuarios', UsuariosController.editarUsuario); 
router.delete('/usuarios', UsuariosController.apagarUsuario); 

module.exports = router;
