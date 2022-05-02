const pool = require("../db");

const getAllUsuarios = async (req, res, next) => {
  try {
    const allUsuarios = await pool.query("SELECT * FROM usuarios");
    console.log(allUsuarios);
    res.json(allUsuarios.rows);
  } catch (error) {
    //es.json({ error: error.message });
    next(error);
  }
};

const getUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    // res.json({ error: error.message });
    next(error);
  }
};

const createUsuario = async (req, res, next) => {
  const {
    NOMBRE,
    CORREO,
    CONTRASENA,
    ROL,
    ESTADO,
    FECHA_CREACION,
    FECHA_ACTUALIZACION,
    FOTO,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO usuarios ( NOMBRE, CORREO,  CONTRASENA, ROL, ESTADO, FECHA_CREACION, FECHA_ACTUALIZACION, FOTO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        NOMBRE,
        CORREO,
        CONTRASENA,
        ROL,
        ESTADO,
        FECHA_CREACION,
        FECHA_ACTUALIZACION,
        FOTO,
      ]
    );
    res.json(result.rows[0]);
  } catch (error) {
    // res.json({ error: error.message });
    next(error);
  }
};

const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      NOMBRE,
      CORREO,
      CONTRASENA,
      ROL,
      ESTADO,
      FECHA_CREACION,
      FECHA_ACTUALIZACION,
      FOTO,
    } = req.body;

    const result = await pool.query(
      "UPDATE usuarios SET NOMBRE = $1, CORREO = $2, CONTRASENA = $3, ROL = $4, ESTADO = $5, FECHA_CREACION = $6, FECHA_ACTUALIZACION = $7, FOTO = $8 WHERE id = $10 RETURNING *",
      [
        NOMBRE,
        CORREO,
        CONTRASENA,
        ROL,
        ESTADO,
        FECHA_CREACION,
        FECHA_ACTUALIZACION,
        FOTO,
        id,
      ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
