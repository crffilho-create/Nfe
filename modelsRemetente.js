const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(
  'mongodb+srv://CRFFMongoDB:SenhaSegura2025@docfis2025.izrcclz.mongodb.net/?retryWrites=true&w=majority&appName=DocFis2025',
)
.then(() => {
  console.log('Conectado ao MongoDB Atlas');
}).catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Modelo de dados
const Recibo = mongoose.model('Recibo', {
  nome: String,
  valor: Number,
  descricao: String,
  data: Date
});

// Rota para receber dados do formulário
app.post('/api/recibo', async (req, res) => {
  try {
    const novoRecibo = new Recibo(req.body);
    await novoRecibo.save();
    res.status(201).send('Recibo salvo com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao salvar recibo');
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor Express está funcionando!');
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
