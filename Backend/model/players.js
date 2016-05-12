var mongoose = require('mongoose');
var playerSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  responsable: String,
  fechaentrev: Date,
  fechaentrada: Date,
  seleccionado: String,
  dni: String,
  fechanac: Date,
  sexo: String,
  puntualidad: String,
  presentacion: String,
  puestoaprop: String,
  cv: String,
  expediente: String,
  adestacar: String,
  nividiomas: String,
  fechadisp: Date
});
mongoose.model('Player', playerSchema);
