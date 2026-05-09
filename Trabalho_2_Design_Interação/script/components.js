class MeuHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        header {
          background: linear-gradient(135deg, #4a90e2, #357abd);
          color: white;
          padding: 20px;
          text-align: center;
          font-family: "Segoe UI", Arial, sans-serif;
          font-size: 1.4rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }
        header h1 { margin: 0; font-size: 1.6rem; }
        header p  { margin: 4px 0 0; font-size: 0.85rem; opacity: 0.85; }
        @media (max-width: 600px) {
          header h1 { font-size: 1.2rem; }
        }
      </style>
      <header>
        <h1>Interface Web</h1>
        <p>Trabalhos de Design de Interação</p>
      </header>`;
  }
}
customElements.define('meu-header', MeuHeader);


class MeuNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        nav {
          background: #ffffff;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          border-bottom: 1px solid #ddd;
          font-family: "Segoe UI", Arial, sans-serif;
        }
        a {
          color: #333;
          padding: 12px 18px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.25s, color 0.25s;
          border-radius: 0;
          display: inline-block;
        }
        a:hover, a.ativo {
          background: #4a90e2;
          color: white;
        }
        @media (max-width: 480px) {
          a { padding: 10px 12px; font-size: 0.9rem; }
        }
      </style>
      <nav>
        <a href="index.html">Apresentação</a>
        <a href="editor.html">Editor de Cartões</a>
        <a href="prova.html">Prova Online</a>
        <a href="slot.html">Slots</a>
      </nav>`;
  }
}
customElements.define('meu-nav', MeuNav);


class MeuFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        footer {
          margin-top: 30px;
          text-align: center;
          padding: 16px;
          background: #333;
          color: #ddd;
          font-family: "Segoe UI", Arial, sans-serif;
          font-size: 0.9rem;
        }
        footer span { color:rgb(102, 115, 190); font-weight: 600; }
      </style>
      <footer>
        <p>© 2026 · <span>Interface Web</span> · Design de Interação</p>
      </footer>`;
  }
}
customElements.define('meu-footer', MeuFooter);


