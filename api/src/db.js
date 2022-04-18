require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/sharerides`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Usuario, Viaje, Comentarios, Reportados, Vehiculo } = sequelize.models;

Usuario.belongsToMany(Viaje, { through: "usuario_viaje" });
Viaje.belongsToMany(Usuario, { through: "usuario_viaje" });
Usuario.belongsToMany(Comentarios, { through: "usuario_comentarios" });
Comentarios.belongsToMany(Usuario, { through: "usuario_comentarios" });
Usuario.belongsToMany(Reportados, { through: "usuario_reportados" });
Reportados.belongsToMany(Usuario, { through: "usuario_reportados" });
Vehiculo.belongsToMany(Usuario, { through: "usuario_vehiculo"});
Usuario.belongsToMany(Vehiculo, { through: "usuario_vehiculo"});
Vehiculo.hasMany(Viaje);
Viaje.belongsTo(Vehiculo);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
