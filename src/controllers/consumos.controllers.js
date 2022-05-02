const pool = require("../db");

const getAllConsumos = async (req, res, next) => {

  try {
    
    const allConsumos = await pool.query("SELECT * FROM registro_consumo_isf");
    console.log(allConsumos);
    res.json(allConsumos.rows);
  } catch (error) {
    //es.json({ error: error.message });
    next(error);
  }
};

const getConsumo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM registro_consumo_isf WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Registro no encontrado" });
    console.log(result);
    res.json(result.rows[0]);
  } catch (error) {
    // res.json({ error: error.message });
    next(error);
  }
};

const createConsumo = async (req, res, next) => {
  const {
    PERIODO,
    CENTRO_COSTO,
    UNI_LOCATIVA,
    EMPRESA,
    TIPO_SERVICIO,
    NRO_CONTRATO,
    NRO_LECTURA,
    NRO_CLIENTE,
    NRO_MEDIDOR,
    FOTO,
    MONTO,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO registro_consumo_isf ( PERIODO, CENTRO_COSTO, UNI_LOCATIVA, EMPRESA, TIPO_SERVICIO, NRO_CONTRATO, NRO_LECTURA, NRO_CLIENTE, NRO_MEDIDOR, FOTO, MONTO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        PERIODO,
        CENTRO_COSTO,
        UNI_LOCATIVA,
        EMPRESA,
        TIPO_SERVICIO,
        NRO_CONTRATO,
        NRO_LECTURA,
        NRO_CLIENTE,
        NRO_MEDIDOR,
        FOTO,
        MONTO,
      ]
    );
    res.json(result.rows[0]);
  } catch (error) {
    // res.json({ error: error.message });
    next(error);
  }
};

const updateConsumo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      PERIODO,
      CENTRO_COSTO,
      UNI_LOCATIVA,
      EMPRESA,
      TIPO_SERVICIO,
      NRO_CONTRATO,
      NRO_LECTURA,
      NRO_CLIENTE,
      NRO_MEDIDOR,
      FOTO,
      MONTO,
    } = req.body;
  
    const result = await pool.query(
      "UPDATE registro_consumo_isf SET PERIODO = $1, CENTRO_COSTO = $2, UNI_LOCATIVA = $3, EMPRESA = $4, TIPO_SERVICIO = $5, NRO_CONTRATO = $6, NRO_LECTURA = $7, NRO_CLIENTE = $8 , NRO_MEDIDOR = $9 , FOTO =$10, MONTO =$11 WHERE id = $10 RETURNING *",
      [
        PERIODO,
        CENTRO_COSTO,
        UNI_LOCATIVA,
        EMPRESA,
        TIPO_SERVICIO,
        NRO_CONTRATO,
        NRO_LECTURA,
        NRO_CLIENTE,
        NRO_MEDIDOR,
        FOTO,
        MONTO,
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

const deleteConsumo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM registro_consumo_isf WHERE id = $1", [
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
  getAllConsumos,
  getConsumo,
  createConsumo,
  updateConsumo,
  deleteConsumo,
};
