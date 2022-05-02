module.exports = function(req, res, next) {
  const { correo, nombre, contrasena } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!correo.length);
    if (![correo, nombre, contrasena].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(correo)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![correo, contrasena].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(correo)) {
      return res.json("Invalid Email");
    }
  }

  next();
};
