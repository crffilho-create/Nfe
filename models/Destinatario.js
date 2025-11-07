const mongoose = require('mongoose');

const destinatarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpjorcpf: { type: String, required: true },
  endereco: { type: String, required: true },
  municipio: { type: String, required: true },
  uf: { type: String, required: true, maxlength: 2 }
});

module.exports = mongoose.model('Destinatario', destinatarioSchema);
