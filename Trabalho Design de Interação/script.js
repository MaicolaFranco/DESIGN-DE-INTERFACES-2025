const texto = document.getElementById("texto");
const corTexto = document.getElementById("corTexto");
const corFundo = document.getElementById("corFundo");
const tamanho = document.getElementById("tamanho");
const imagem = document.getElementById("imagem");

const mensagem = document.getElementById("mensagem");
const cartao = document.getElementById("cartao");
const imgCartao = document.getElementById("imgCartao");
const extras = document.getElementById("extras");


texto.addEventListener("input", () => {
  mensagem.textContent = texto.value || "Seu cartão aqui";
});


corTexto.addEventListener("input", () => {
  mensagem.style.color = corTexto.value;
});


corFundo.addEventListener("input", () => {
  cartao.style.backgroundColor = corFundo.value;
});


tamanho.addEventListener("input", () => {
  mensagem.style.fontSize = tamanho.value + "px";
});


imagem.addEventListener("change", () => {
  const file = imagem.files[0];

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgCartao.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});


document.getElementById("adicionarElemento").addEventListener("click", () => {
  if (extras.children.length >= 3) return;

  const div = document.createElement("div");
  div.classList.add("extra-box");
  div.textContent = "Novo elemento";

  extras.appendChild(div);
});