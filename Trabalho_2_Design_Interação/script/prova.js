class MinhaProva extends HTMLElement {
  questoes = [
    {
      pergunta: 'Qual é a unidade de medida da tensão elétrica no Sistema Internacional (SI)?',
      opcoes: ['Ampere (A)', 'Volt (V)', 'Ohm (Ω)'],
      resposta: 1
    },
    {
      pergunta: 'A resistência elétrica de um condutor é medida em:',
      opcoes: ['Watt (W)', 'Coulomb (C)', 'Ohm (Ω)'],
      resposta: 2
    },
    {
      pergunta: 'De acordo com a Lei de Ohm, a relação correta entre tensão (V), corrente (I) e resistência (R) é:',
      opcoes: ['V = I / R', 'V = I × R', 'V = R / I'],
      resposta: 1
    },
    {
      pergunta: 'A potência elétrica dissipada em um resistor é calculada por:',
      opcoes: ['P = V + I', 'P = V / I', 'P = V × I'],
      resposta: 2
    },
    {
      pergunta: 'A carga elétrica é medida em:',
      opcoes: ['Joule (J)', 'Coulomb (C)', 'Farad (F)'],
      resposta: 1
    }
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; }
        :host {
          display: block;
          font-family: "Segoe UI", Arial, sans-serif;
          max-width: 700px;
          margin: 0 auto;
        }
        .prova-box {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 18px rgba(74,144,226,0.15);
          overflow: hidden;
        }
        .prova-titulo {
          background: linear-gradient(135deg, #4a90e2, #357abd);
          color: white;
          padding: 18px 24px;
          text-align: center;
        }
        .prova-titulo h2 { margin: 0; font-size: 1.3rem; }
        .prova-titulo p  { margin: 4px 0 0; font-size: 0.82rem; opacity: 0.9; }
        .prova-corpo { padding: 20px 24px; }
        .questao {
          background: #f4f8ff;
          border-left: 4px solid #4a90e2;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 18px;
        }
        .questao p {
          margin: 0 0 12px;
          font-weight: 600;
          color: #1a1a2e;
          font-size: 0.97rem;
        }
        .opcoes { display: flex; flex-direction: column; gap: 8px; }
        .opcao-label {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border: 1.5px solid #dce8fb;
          border-radius: 7px;
          padding: 10px 14px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          font-size: 0.93rem;
        }
        .opcao-label:hover { border-color: #4a90e2; background: #eaf2ff; }
        input[type="radio"] { accent-color: #4a90e2; width: 17px; height: 17px; cursor: pointer; flex-shrink: 0; }
        .opcao-label.correta  { background: #e6f9ee; border-color: #2ecc71; color: #1a6b3a; }
        .opcao-label.errada   { background: #fff0f0; border-color: #e74c3c; color: #8b0000; }
        .opcao-label.gabarito { background: #e6f9ee; border-color: #27ae60; }
        .acoes {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 4px 0 8px;
        }
        button {
          padding: 11px 26px;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        button:hover  { opacity: 0.88; transform: translateY(-1px); }
        button:active { transform: translateY(0); }
        #btn-enviar { background: #4a90e2; color: white; }
        #btn-reset  { background: #6c757d; color: white; display: none; }
        .resultado {
          background: #f4f8ff;
          border: 1.5px solid #4a90e2;
          border-radius: 10px;
          padding: 16px 20px;
          margin-bottom: 16px;
          font-size: 0.95rem;
        }
        .resultado .nota {
          font-size: 1.2rem;
          font-weight: 700;
          color: #357abd;
          text-align: center;
          margin-bottom: 12px;
        }
        .resultado .item-errado {
          color: #c0392b;
          margin: 6px 0;
          padding-left: 8px;
          border-left: 3px solid #e74c3c;
        }
        .resultado .item-errado strong { color: #357abd; }
        .resultado.oculto { display: none; }
        @media (max-width: 480px) {
          .prova-corpo { padding: 14px; }
          .questao { padding: 12px; }
        }
      </style>

      <div class="prova-box">
        <div class="prova-titulo">
          <h2>Prova – Grandezas Elétricas</h2>
          <p>Responda todas as questões e clique em Enviar</p>
        </div>
        <div class="prova-corpo">
          <div id="questoes-container"></div>
          <div id="resultado" class="resultado oculto"></div>
          <div class="acoes">
            <button type="button" id="btn-enviar">Enviar Respostas</button>
            <button type="button" id="btn-reset">Responder Novamente</button>
          </div>
        </div>
      </div>`;

    this._renderQuestoes();
    this.shadowRoot.getElementById('btn-enviar').addEventListener('click', () => this._corrigir());
    this.shadowRoot.getElementById('btn-reset').addEventListener('click', () => this._resetar());
  }

  _renderQuestoes() {
    const container = this.shadowRoot.getElementById('questoes-container');
    container.innerHTML = '';

    this.questoes.forEach((q, idx) => {
      const div = document.createElement('div');
      div.classList.add('questao');

      const opcoesHTML = q.opcoes.map((op, i) => `
        <label class="opcao-label" id="label-${idx}-${i}">
          <input type="radio" name="q${idx}" value="${i}">
          ${op}
        </label>`).join('');

      div.innerHTML = `<p>${idx + 1}. ${q.pergunta}</p><div class="opcoes">${opcoesHTML}</div>`;
      container.appendChild(div);
    });
  }

  _corrigir() {
    let acertos = 0;
    const erros = [];

    this.questoes.forEach((q, idx) => {
      const selecionado = this.shadowRoot.querySelector(`input[name="q${idx}"]:checked`);

      if (!selecionado) {
        erros.push({ pergunta: q.pergunta, gabarito: q.opcoes[q.resposta], semResposta: true });
        this.shadowRoot.getElementById(`label-${idx}-${q.resposta}`).classList.add('gabarito');
        return;
      }

      const val = parseInt(selecionado.value, 10);
      if (val === q.resposta) {
        acertos++;
        this.shadowRoot.getElementById(`label-${idx}-${val}`).classList.add('correta');
      } else {
        this.shadowRoot.getElementById(`label-${idx}-${val}`).classList.add('errada');
        this.shadowRoot.getElementById(`label-${idx}-${q.resposta}`).classList.add('gabarito');
        erros.push({ pergunta: q.pergunta, gabarito: q.opcoes[q.resposta], semResposta: false });
      }

      this.shadowRoot.querySelectorAll(`input[name="q${idx}"]`).forEach(r => r.disabled = true);
    });

    const resultadoEl = this.shadowRoot.getElementById('resultado');
    resultadoEl.classList.remove('oculto');

    const porcentagem = Math.round((acertos / this.questoes.length) * 100);
    let html = `<div class="nota">✅ Você acertou ${acertos} de ${this.questoes.length} questões (${porcentagem}%)</div>`;

    if (erros.length > 0) {
      html += `<p><strong>Revise:</strong></p>`;
      erros.forEach(e => {
        const msg = e.semResposta
          ? `<em>Não respondida</em> — resposta correta: <strong>${e.gabarito}</strong>`
          : `Resposta correta: <strong>${e.gabarito}</strong>`;
        html += `<p class="item-errado">${e.pergunta}<br>${msg}</p>`;
      });
    } else {
      html += `<p style="text-align:center;color:#27ae60;font-weight:700;">🎉 Parabéns, gabarito perfeito!</p>`;
    }

    resultadoEl.innerHTML = html;
    this.shadowRoot.getElementById('btn-enviar').style.display = 'none';
    this.shadowRoot.getElementById('btn-reset').style.display = 'inline-block';
  }

  _resetar() {
    const resultadoEl = this.shadowRoot.getElementById('resultado');
    resultadoEl.classList.add('oculto');
    resultadoEl.innerHTML = '';
    this.shadowRoot.getElementById('btn-enviar').style.display = 'inline-block';
    this.shadowRoot.getElementById('btn-reset').style.display = 'none';
    this._renderQuestoes();
  }
}
customElements.define('minha-prova', MinhaProva);