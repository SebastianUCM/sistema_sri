const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const serviciosRoutes = require('./routes/servicios.routes'); 
const activosRoutes = require('./routes/activos.routes'); 
const consumosRoutes = require('./routes/consumos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

const authenticationRoutes = require('./routes/jwtAuth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.use(serviciosRoutes);
// app.use((err, req, res, next) => {
//     return res.json({
//         message: err.message
//     });
// } ) 


// app.listen(4000);
// console.log('Server is running on port 4000');


// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(serviciosRoutes);
app.use(activosRoutes);
app.use(consumosRoutes);
app.use(usuariosRoutes);
app.use(authenticationRoutes);
app.use(dashboardRoutes);

// handling errors
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
});

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
