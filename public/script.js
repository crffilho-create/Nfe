async function carregarDados() {
  const [remetentes, destinatarios, materiais] = await Promise.all([
    fetch('/api/remetentes').then(r => r.json()),
    fetch('/api/destinatarios').then(r => r.json()),
    fetch('/api/materialserv').then(r => r.json())
  ]);

  preencherSelect('remetente', remetentes);
  preencherSelect('destinatario', destinatarios);
  preencherSelect('materiais', materiais, 'nome');
}

function preencherSelect(id, dados, label = 'nome') {
  const select = document.getElementById(id);
  dados.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item._id;
    opt.textContent = item[label];
    select.appendChild(opt);
  });
}

document.getElementById('reciboForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    remetente: document.getElementById('remetente').value,
    destinatario: document.getElementById('destinatario').value,
    materiais: document.getElementById('materiais').value,
    data: document.getElementById('data').value,
    observacoes: document.getElementById('observacoes').value
  };

  try {
    const response = await fetch('/api/recibo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const msg = await response.text(); // pega mensagem do backend
      alert(msg); // mostra "Recibo nº X salvo com sucesso!"
    } else {
      const erro = await response.text();
      alert('Erro ao salvar recibo: ' + erro);
    }
  } catch (err) {
    alert('Falha na conexão com o servidor: ' + err.message);
  }
});

carregarDados();
