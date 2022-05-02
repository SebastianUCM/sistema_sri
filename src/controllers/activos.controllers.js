const pool = require("../db");

const getAllActivos = async (req, res, next) => {

  try {
    
    const allActivos = await pool.query("SELECT * FROM activos");
    console.log(allActivos);
    res.json(allActivos.rows);
  } catch (error) {
    //es.json({ error: error.message });
    next(error);
  }
};

const getActivo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM activos WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Activo no encontrado" });
    console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    // res.json({ error: error.message });
    next(error);
  }
};

const createActivo = async (req, res, next) => {
  const {
    NOMBRE,
    ETIQUETA,
    EMPRESA,
    RESPONSABLE,
    EDIFICIO,
    PISO,
    TIPO_ACTIVO,
    SUBTIPO_ACTIVO,
    SUCURSAL,
    NRO_CONTRATO,
    RUT,
    FECHA_INICIO,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO activos (NOMBRE, ETIQUETA, EMPRESA, RESPONSABLE, EDIFICIO, PISO, TIPO_ACTIVO, SUBTIPO_ACTIVO, SUCURSAL, NRO_CONTRATO, RUT, FECHA_INICIO ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        NOMBRE,
        ETIQUETA,
        EMPRESA,
        RESPONSABLE,
        EDIFICIO,
        PISO,
        TIPO_ACTIVO,
        SUBTIPO_ACTIVO,
        SUCURSAL,
        NRO_CONTRATO,
        RUT,
        FECHA_INICIO,
      ]
    );
    res.json(result.rows[0]);
  } catch (error) {
    // res.json({ error: error.message });
    next(error);
  }
};

const updateActivo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      NOMBRE,
      ETIQUETA,
      EMPRESA,
      RESPONSABLE,
      EDIFICIO,
      PISO,
      TIPO_ACTIVO,
      SUBTIPO_ACTIVO,
      SUCURSAL,
      NRO_CONTRATO,
      RUT,
      FECHA_INICIO,
    } = req.body;
  
    const result = await pool.query(
      "UPDATE activos SET NOMBRE = $1, ETIQUETA = $2, EMPRESA = $3, RESPONSABLE = $4, EDIFICIO = $5, PISO = $6, TIPO_ACTIVO = $7, SUBTIPO_ACTIVO = $8 , SUCURSAL = $9, NRO_CONTRATO = $10, RUT = $11, FECHA_INICIO = $12 WHERE id = $13 RETURNING *",
      [
        NOMBRE,
        ETIQUETA,
        EMPRESA,
        RESPONSABLE,
        EDIFICIO,
        PISO,
        TIPO_ACTIVO,
        SUBTIPO_ACTIVO,
        SUCURSAL,
        NRO_CONTRATO,
        RUT,
        FECHA_INICIO,
  

        id,
      ]
    );
  
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Activo no encontrado",
      });
  
    res.json(result.rows[0]);
  } catch (error) {
      next(error);
  }
};

const deleteActivo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM activos WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Activo no encontrado",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllActivos,
  getActivo,
  createActivo,
  updateActivo,
  deleteActivo,
};
