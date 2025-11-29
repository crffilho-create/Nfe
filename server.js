const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MongoDB Atlas
mongoose.connect(
  'mongodb+srv://CRFFMongoDB:SenhaSegura2025@docfis2025.izrcclz.mongodb.net/docfis2025?retryWrites=true&w=majority&appName=DocFis2025'
)
.then(() => {
  console.log('Conectado ao MongoDB Atlas');
})
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Models
const MaterialServ = require('./models/MaterialServ');
const Remetente = require('./models/Remetente');
const Destinatario = require('./models/Destinatario');

// Rotas externas
const reciboRoutes = require('./reciboServer');
app.use(reciboRoutes);

// Rotas de cadastro simples
app.post('/api/remetente', async (req, res) => {
  try {
    const novoRemetente = new Remetente(req.body);
    await novoRemetente.save();
    res.status(201).send('Remetente salvo com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao salvar remetente');
  }
});

app.get('/api/remetentes', async (req, res) => {
  try {
    const remetentes = await Remetente.find();
    res.status(200).json(remetentes);
  } catch (err) {
    res.status(500).send('Erro ao buscar remetentes');
  }
});

app.post('/api/destinatario', async (req, res) => {
  try {
    const novoDestinatario = new Destinatario(req.body);
    await novoDestinatario.save();
    res.status(201).send('Destinatário salvo com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao salvar destinatário');
  }
});

app.get('/api/destinatarios', async (req, res) => {
  try {
    const destinatarios = await Destinatario.find();
    res.status(200).json(destinatarios);
  } catch (err) {
    res.status(500).send('Erro ao buscar destinatários');
  }
});

app.post('/api/materialserv', async (req, res) => {
  try {
    const novoMaterial = new MaterialServ(req.body);
    await novoMaterial.save();
    res.status(201).send('Material/serviço salvo com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar material/serviço:', err.message);
    res.status(500).send('Erro ao salvar material/serviço');
  }
});

app.get('/api/materialserv', async (req, res) => {
  try {
    const materiais = await MaterialServ.find();
    res.status(200).json(materiais);
  } catch (err) {
    res.status(500).send('Erro ao buscar materiais/serviços');
  }
});

// 🟠 Rota ajustada (serve o HTML direto da pasta public)
app.get('/recibo-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'recibo-form.html'));
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor Express está funcionando!');
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
