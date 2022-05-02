const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.post("/", authorize, async (req, res) => {
  try {
    const usuario = await pool.query(
      "SELECT nombre FROM usuarios WHERE usuario_id = $1",
      [req.usuario.id] 
    ); 
    
  //if would be req.usuario if you change your payload to this:
    
  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     usuario: user_id
  //   };
    
    res.json(usuario.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
