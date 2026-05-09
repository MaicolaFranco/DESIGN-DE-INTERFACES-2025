class MeuEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; }
        :host {
          display: block;
          font-family: "Segoe UI", Arial, sans-serif;
          padding: 30px 20px;
        }
        .container {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
          align-items: stretch;
          justify-content: center;
          max-width: 1000px;
          margin: 0 auto;
        }
        .formulario {
          flex: 1;
          min-width: 280px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(74,144,226,0.13);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .formulario-titulo {
          background: linear-gradient(135deg, #4a90e2, #357abd);
          color: white;
          padding: 12px 20px;
          font-size: 1rem;
          font-weight: 600;
        }
        .formulario-corpo {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: 500;
          margin-top: 10px;
        }
        input {
          width: 100%;
          margin-top: 5px;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          transition: border-color 0.2s;
          font-family: "Segoe UI", Arial, sans-serif;
        }
        input:focus {
          border-color: #4a90e2;
          outline: none;
        }
        button {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          border-radius: 6px;
          border: none;
          background: #4a90e2;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
          font-family: "Segoe UI", Arial, sans-serif;
        }
        button:hover { background: #357abd; }
        .cartao-area {
          flex: 1;
          min-width: 280px;
          display: flex;
        }
        .cartao {
          width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(74,144,226,0.13);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .cartao-titulo {
          background: linear-gradient(135deg, #4a90e2, #357abd);
          color: white;
          padding: 12px 20px;
          font-size: 1rem;
          font-weight: 600;
        }
        .cartao-corpo {
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #mensagem {
          font-size: 18px;
          margin-top: 10px;
          word-wrap: break-word;
        }
        #imgCartao {
          max-width: 100%;
          border-radius: 8px;
          margin-top: 10px;
        }
        .extra-box {
          background: #f0f4ff;
          border-radius: 8px;
          margin-top: 10px;
          padding: 6px;
          font-size: 14px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .container { flex-direction: column; }
        }
      </style>

      <div class="container">
        <section class="formulario">
          <div class="formulario-titulo">Editor de Cartão</div>
          <div class="formulario-corpo">
            <label for="texto">Mensagem:</label>
            <input type="text" id="texto" maxlength="50" placeholder="Digite sua mensagem...">

            <label for="corTexto">Cor do texto:</label>
            <input type="color" id="corTexto" value="#333333">

            <label for="corFundo">Cor do fundo:</label>
            <input type="color" id="corFundo" value="#ffffff">

            <label for="tamanho">Tamanho do texto: <span id="tamanhoValor">16</span>px</label>
            <input type="range" id="tamanho" min="12" max="40" value="16">

            <label for="imagem">Selecionar imagem:</label>
            <input type="file" id="imagem" accept="image/*">

            <button type="button" id="adicionarElemento">Adicionar Caixa</button>
          </div>
        </section>

        <section class="cartao-area">
          <div class="cartao">
            <div class="cartao-titulo">Pré-visualização</div>
            <div class="cartao-corpo">
              <p id="mensagem">Seu cartão aqui</p>
              <img id="imgCartao" src="img/imgPdrao.jpg" alt="Imagem do cartão">
              <div id="extras"></div>
            </div>
          </div>
        </section>
      </div>`;

    this._iniciar();
  }

  _iniciar() {
    const sr = this.shadowRoot;
    const mensagem  = sr.getElementById('mensagem');
    const cartao    = sr.querySelector('.cartao');
    const extras    = sr.getElementById('extras');
    const tamanhoValor = sr.getElementById('tamanhoValor');

    sr.getElementById('texto').addEventListener('input', e => {
      mensagem.textContent = e.target.value || 'Seu cartão aqui';
    });

    sr.getElementById('corTexto').addEventListener('input', e => {
      mensagem.style.color = e.target.value;
    });

    sr.getElementById('corFundo').addEventListener('input', e => {
      cartao.style.backgroundColor = e.target.value;
    });

    sr.getElementById('tamanho').addEventListener('input', e => {
      mensagem.style.fontSize = e.target.value + 'px';
      tamanhoValor.textContent = e.target.value;
    });

    sr.getElementById('imagem').addEventListener('change', e => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = ev => { sr.getElementById('imgCartao').src = ev.target.result; };
        reader.readAsDataURL(file);
      }
    });

    sr.getElementById('adicionarElemento').addEventListener('click', () => {
      if (extras.children.length >= 3) return;
      const div = document.createElement('div');
      div.classList.add('extra-box');
      div.textContent = 'Novo elemento';
      extras.appendChild(div);
    });
  }
}
customElements.define('meu-editor', MeuEditor);