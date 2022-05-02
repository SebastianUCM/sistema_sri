const pool = require("../db");

const getAllServicios = async (req, res, next) => {

  try {
    
    const allServicios = await pool.query("SELECT * FROM servicios");
    console.log(allServicios);
    res.json(allServicios.rows);
  } catch (error) {
    //es.json({ error: error.message });
    next(error);
  }
};

const getServicio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM servicios WHERE id = $1", [
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

const createServicio = async (req, res, next) => {
  const {
    CENTRO_COMERCIAL,
    OPERADOR,
    NRO_CONTRATO,
    SUCURSAL,
    OPM_MEDIDOR,
    TARIFA,
    TIPO_MEDIDOR,
    ESTADO,
    PERIODO,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO servicios (CENTRO_COMERCIAL, OPERADOR, NRO_CONTRATO, SUCURSAL, OPM_MEDIDOR, TARIFA, TIPO_MEDIDOR, ESTADO, PERIODO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        CENTRO_COMERCIAL,
        OPERADOR,
        NRO_CONTRATO,
        SUCURSAL,
        OPM_MEDIDOR,
        TARIFA,
        TIPO_MEDIDOR,
        ESTADO,
        PERIODO,
      ]
    );
    res.json(result.rows[0]);
  } catch (error) {
    // res.json({ error: error.message });
    next(error);
  }
};

const updateServicio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      CENTRO_COMERCIAL,
      OPERADOR,
      NRO_CONTRATO,
      SUCURSAL,
      OPM_MEDIDOR,
      TARIFA,
      TIPO_MEDIDOR,
      ESTADO,
      PERIODO,
    } = req.body;
  
    const result = await pool.query(
      "UPDATE servicios SET CENTRO_COMERCIAL = $1, OPERADOR = $2, NRO_CONTRATO = $3, SUCURSAL = $4, OPM_MEDIDOR = $5, TARIFA = $6, TIPO_MEDIDOR = $7, ESTADO = $8 , PERIODO = $9 WHERE id = $10 RETURNING *",
      [
        CENTRO_COMERCIAL,
        OPERADOR,
        NRO_CONTRATO,
        SUCURSAL,
        OPM_MEDIDOR,
        TARIFA,
        TIPO_MEDIDOR,
        ESTADO,
        PERIODO,
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

const deleteServicio = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM servicios WHERE id = $1", [
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
  getAllServicios,
  getServicio,
  createServicio,
  updateServicio,
  deleteServicio,
};
