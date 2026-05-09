class MinhaLista extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; }
        :host { display: block; font-family: "Segoe UI", Arial, sans-serif; }
        .lista-box {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(74,144,226,0.13);
          overflow: hidden;
          margin-bottom: 24px;
        }
        .lista-titulo {
          background: linear-gradient(135deg, #4a90e2, #357abd);
          color: white;
          padding: 12px 20px;
          font-size: 1rem;
          font-weight: 600;
        }
        .lista-corpo {
          padding: 10px 20px;
        }
        ::slotted(p) {
          margin: 0;
          padding: 10px 0;
          border-bottom: 1px solid #dce8fb;
          color: #444;
          line-height: 1.5;
        }
        ::slotted(p:last-child) {
          border-bottom: none;
        }
      </style>
      <div class="lista-box">
        <div class="lista-titulo">${this.getAttribute('titulo') || 'Lista'}</div>
        <div class="lista-corpo">
          <slot name="item">Nenhum item.</slot>
        </div>
      </div>`;

    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define('minha-lista', MinhaLista);