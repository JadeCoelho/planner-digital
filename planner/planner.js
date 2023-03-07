const inputsTabela = document.querySelectorAll("#planner .dia .linha input");
const btnLimpar = document.querySelector("#planner .limpar");
const inputsNotas = document.querySelectorAll("#planner .notas .linha input");

function criar(dia) {
  let diaSem = document.querySelector(`.${dia}`);
  let linha = document.createElement("div");
  linha.classList.add("linha");

  for (let i = 0; i < 9; i++) {
    let inp = document.createElement("input");
    inp.type = "text";
    inp.setAttribute("class", "input-planner");
    linha.appendChild(inp);
  }
  diaSem.appendChild(linha);
}
criar("seg");
criar("ter");
criar("qua");
criar("qui");
criar("sex");
criar("sab");
criar("dom");
criar("notas");

function criaIds() {
  let meuInput = document.querySelectorAll(".input-planner");
  
  for (let i = 0; i < 72; i++) {
    meuInput[i].setAttribute("id", `${i}`);
  }
  return meuInput;
}


criaIds();

btnLimpar.addEventListener("click", () => {
  let allInputs = document.querySelectorAll(".input-planner");
  allInputs.forEach((ip) => {
    ip.value = "";
    setLocalStorage(ip.id, ip.value);
  });
});

const getLocalStorage = (id) => localStorage.getItem(id) ?? [];
const setLocalStorage = (id, valor) => localStorage.setItem(id, valor);

function armazenaTarefa() {
  let allInputs = document.querySelectorAll(".input-planner");
  allInputs.forEach((ip) => {
    ip.onblur = () => {
      getLocalStorage(ip.id);
      setLocalStorage(ip.id, ip.value);
    };
    ip.value = localStorage.getItem(ip.id);
  });
}

armazenaTarefa();
