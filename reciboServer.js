const express = require('express');
const Recibo = require('./models/Recibo');
const MaterialServ = require('./models/MaterialServ');
const Remetente = require('./models/Remetente');
const Destinatario = require('./models/Destinatario');

const router = express.Router();

// Rota para salvar recibo
router.post('/api/recibo', async (req, res) => {
  try {
    console.log("Dados recebidos do formulário:", req.body); // loga o body recebido

    const { remetente, destinatario, materiais, data, observacoes } = req.body;
    const materiaisArray = Array.isArray(materiais) ? materiais : [materiais];

    // Buscar os materiais selecionados
    const materiaisSelecionados = await MaterialServ.find({ _id: { $in: materiaisArray } });
const valorTotal = materiaisSelecionados.length > 0 ? Number(materiaisSelecionados[0].total) : 0;

    //  Buscar último número sequencial
    const ultimoRecibo = await Recibo.findOne().sort({ numero: -1 });
    const proximoNumero = ultimoRecibo ? ultimoRecibo.numero + 1 : 1;

    const novoRecibo = new Recibo({
      numero: proximoNumero,
      remetente,
      destinatario,
      materiais: materiaisArray,
      valor: valorTotal,
      data,
      observacoes
    });

    await novoRecibo.save();
    console.log("Recibo salvo com sucesso:", novoRecibo); // loga o objeto salvo

    res.status(201).send(`Recibo nº ${proximoNumero} salvo com sucesso!`);
  } catch (err) {
    console.error("Erro ao salvar recibo:", err); // mostra erro real no terminal
    res.status(500).send('Erro ao salvar recibo');
  }
});

// Rota para listar recibos
router.get('/api/recibos', async (req, res) => {
  try {
    const recibos = await Recibo.find()
      .populate('remetente')
      .populate('destinatario')
      .populate('materiais');

    res.status(200).json(recibos);
  } catch (err) {
    console.error("Erro ao buscar recibos:", err);
    res.status(500).send('Erro ao buscar recibos');
  }
});


//Rota Buscar recibo por ID
router.get('/api/recibos/:id', async (req, res) => {
  try {
    const recibo = await Recibo.findById(req.params.id)
      .populate('remetente')
      .populate('destinatario')
      .populate('materiais');

    if (!recibo) {
      return res.status(404).send('Recibo não encontrado');
    }

    res.json(recibo);
  } catch (err) {
    console.error("Erro ao buscar recibo:", err);
    res.status(500).send('Erro ao buscar recibo');
  }
});


// Rota para listar remetentes
router.get('/api/remetentes', async (req, res) => {
  try {
    const remetentes = await Remetente.find();
    res.json(remetentes);
  } catch (err) {
    console.error("Erro ao buscar remetentes:", err);
    res.status(500).send('Erro ao buscar remetentes');
  }
});

// Rota para listar destinatários
router.get('/api/destinatarios', async (req, res) => {
  try {
    const destinatarios = await Destinatario.find();
    res.json(destinatarios);
  } catch (err) {
    console.error("Erro ao buscar destinatários:", err);
    res.status(500).send('Erro ao buscar destinatários');
  }
});

// Rota para listar materiais
router.get('/api/materiais', async (req, res) => {
  try {
    const materiais = await MaterialServ.find();
    res.json(materiais);
  } catch (err) {
    console.error("Erro ao buscar materiais:", err);
    res.status(500).send('Erro ao buscar materiais');
  }
});

module.exports = router;
