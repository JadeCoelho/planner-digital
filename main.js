let menuLi = document.querySelectorAll(".menu ul li");
let menuA = document.querySelectorAll(".menu ul a");
let section = document.querySelectorAll(".tela section");

function ativaSection(section) {
  menuLi.forEach((li) => {
    li.addEventListener("click", () => {
      document.querySelector(".menu ul li.ativo").classList.remove("ativo");
      section.forEach((s) => {
        li.classList.add("ativo");
        li.classList.contains(s.getAttribute("id"))
          ? s.classList.add("tela-ativa")
          : s.classList.remove("tela-ativa");
      });
    });
  });
}
ativaSection(section);
