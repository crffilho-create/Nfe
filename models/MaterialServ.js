const mongoose = require('mongoose');

const materialServSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  ncmorcodserv: { type: String, required: true },
  quantidade: { type: Number, required: true },
  valor: { type: Number, required: true },
  aliquota: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('MaterialServ', materialServSchema);

