const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(
  'mongodb+srv://CRFFMongoDB:SenhaSegura2025@docfis2025.izrcclz.mongodb.net/?retryWrites=true&w=majority&appName=DocFis2025'
)
.then(() => {
  console.log('Conectado ao MongoDB Atlas');
})
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Modelo de dados Recibo
const Recibo = mongoose.model('Recibo', {
  nome: String,
  valor: Number,
  descricao: String,
  data: Date
});

// ✅ Modelo de dados Remetente
const Remetente = mongoose.model('Remetente', {
  nome: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  municipio: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true,
    maxlength: 2
  }
});


// ✅ Modelo de dados Destinatario
const Destinatario = mongoose.model('Destinatario', {
  nome: {
    type: String,
    required: true
  },
  cnpjorcpf: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  municipio: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true,
    maxlength: 2
  }
});

// Rota para salvar recibo
app.post('/api/recibo', async (req, res) => {
  try {
    const novoRecibo = new Recibo(req.body);
    await novoRecibo.save();
    res.status(201).send('Recibo salvo com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao salvar recibo');
  }
});

// Rota para salvar remetente
app.post('/api/remetente', async (req, res) => {
  try {
    const novoRemetente = new Remetente(req.body);
    await novoRemetente.save();
    res.status(201).send('Remetente salvo com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao salvar remetente');
  }
});

// Rota para listar remetente
app.get('/api/remetentes', async (req, res) => {
  try {
    const remetentes = await Remetente.find();
    res.status(200).json(remetentes);
  } catch (err) {
    res.status(500).send('Erro ao buscar remetentes');
  }
});


// Rota para salvar destinatário
app.post('/api/destinatario', async (req, res) => {
  try {
    console.log('📨 Dados recebidos do formulário:', req.body); // log útil
    const novoDestinatario = new Destinatario(req.body);
    await novoDestinatario.save();
    res.status(201).send('Destinatário salvo com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao salvar destinatário:', err.message); // mostra o erro real
    res.status(500).send('Erro ao salvar destinatário');
  }
});;


// Rota para listar destinatários
app.get('/api/destinatarios', async (req, res) => {
  try {
    const destinatarios = await Destinatario.find();
    res.status(200).json(destinatarios);
  } catch (err) {
    res.status(500).send('Erro ao buscar destinatários');
  }
});


//Servir o HTML pelo Express
const path = require('path');

app.get('/remetente', (req, res) => {
  res.sendFile(path.join(__dirname, 'remetente.html'));
});

app.get('/destinatario', (req, res) => {
  res.sendFile(path.join(__dirname, 'destinatario.html'));
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor Express está funcionando!');
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
