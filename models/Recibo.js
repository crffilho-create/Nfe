const mongoose = require('mongoose');

const reciboSchema = new mongoose.Schema({
  numero: { type: Number, unique: true }, //  campo sequencial
  remetente: { type: mongoose.Schema.Types.ObjectId, ref: 'Remetente' },
  destinatario: { type: mongoose.Schema.Types.ObjectId, ref: 'Destinatario' },
  materiais: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaterialServ' }],
  valor: Number,
  data: Date,
  observacoes: String
});

module.exports = mongoose.model('Recibo', reciboSchema);
