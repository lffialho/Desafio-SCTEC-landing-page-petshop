document.addEventListener("DOMContentLoaded", () => {
  menuMobile();
  scrollSuave();
  validarFormularioContato();
  validarFormularioModal();
  animarNumeros();
  animarScroll();
  modalAgendamento();
});

/* ==================== MENU MOBILE ==================== */
function menuMobile() {
  const btn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu");

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });

  menu.querySelectorAll("a, button").forEach(item => {
    item.addEventListener("click", () => {
      menu.classList.remove("ativo");
    });
  });

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("ativo");
    }
  });
}

/* ==================== SCROLL SUAVE ==================== */
function scrollSuave() {
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      const alvo = document.querySelector(link.getAttribute("href"));

      if (!alvo) return;

      e.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ==================== FORMULARIOS ==================== */
function validarFormularioContato() {
  const form = document.getElementById("formContato");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = valorCampo("nome");
    const telefone = valorCampo("telefone");
    const pet = valorCampo("pet");
    const servico = valorCampo("servico");

    if (!nome) {
      alert("Por favor, preencha seu nome.");
      return;
    }

    if (!telefoneValido(telefone)) {
      alert("Informe um WhatsApp válido com DDD.");
      return;
    }

    if (!pet) {
      alert("Informe o nome do pet.");
      return;
    }

    if (!servico) {
      alert("Selecione o serviço desejado.");
      return;
    }

    alert("Pedido recebido! Vamos retornar em horário comercial para confirmar o agendamento.");
    form.reset();
  });
}

function validarFormularioModal() {
  const form = document.getElementById("formModal");
  const modal = document.querySelector(".modal");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const pet = valorCampo("modalPet");
    const servico = valorCampo("modalServico");
    const telefone = valorCampo("modalTelefone");

    if (!pet) {
      alert("Informe o nome do pet.");
      return;
    }

    if (!servico) {
      alert("Selecione o serviço desejado.");
      return;
    }

    if (!telefoneValido(telefone)) {
      alert("Informe um WhatsApp válido com DDD.");
      return;
    }

    alert("Pedido recebido! A equipe do Lava Patas vai confirmar a disponibilidade.");
    form.reset();

    if (modal) {
      fecharModal(modal);
    }
  });
}

function valorCampo(id) {
  const campo = document.getElementById(id);
  return campo ? campo.value.trim() : "";
}

function telefoneValido(telefone) {
  const somenteNumeros = telefone.replace(/\D/g, "");
  return somenteNumeros.length >= 10 && somenteNumeros.length <= 11;
}

/* ==================== MODAL ==================== */
function modalAgendamento() {
  const botoesAbrir = document.querySelectorAll(".abrir-modal");
  const modal = document.querySelector(".modal");
  const fechar = document.querySelector(".fechar");
  const modalServico = document.getElementById("modalServico");
  const modalPet = document.getElementById("modalPet");

  if (!modal || !fechar || !botoesAbrir.length) return;

  botoesAbrir.forEach(botao => {
    botao.addEventListener("click", () => {
      const servico = botao.dataset.servico;

      if (servico && modalServico) {
        modalServico.value = servico;
      } else if (modalServico) {
        modalServico.value = "";
      }

      modal.classList.add("ativo");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      if (modalPet) {
        modalPet.focus();
      }
    });
  });

  fechar.addEventListener("click", () => {
    fecharModal(modal);
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      fecharModal(modal);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("ativo")) {
      fecharModal(modal);
    }
  });
}

function fecharModal(modal) {
  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ==================== ANIMACAO DOS NUMEROS ==================== */
function animarNumeros() {
  const numeros = document.querySelectorAll(".numero");

  if (!numeros.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const num = entry.target;
      let contador = 0;
      const textoOriginal = num.innerText;
      const alvo = parseInt(textoOriginal.replace(/\D/g, ""), 10);

      if (!alvo) {
        observer.unobserve(num);
        return;
      }

      const intervalo = setInterval(() => {
        contador += Math.ceil(alvo / 40);
        num.innerText = contador;

        if (contador >= alvo) {
          num.innerText = textoOriginal;
          clearInterval(intervalo);
        }
      }, 35);

      observer.unobserve(num);
    });
  }, { threshold: 0.5 });

  numeros.forEach(num => observer.observe(num));
}

/* ==================== ANIMACAO AO SCROLL ==================== */
function animarScroll() {
  const elementos = document.querySelectorAll(".animar");

  if (!elementos.length) return;

  if (!("IntersectionObserver" in window)) {
    elementos.forEach(el => el.classList.add("ativo"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementos.forEach(el => observer.observe(el));
}
