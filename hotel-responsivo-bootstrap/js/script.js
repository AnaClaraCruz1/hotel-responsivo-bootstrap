// Interações do formulário de solicitação de reserva.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const entrada = document.getElementById("entrada");
  const saida = document.getElementById("saida");
  const message = document.getElementById("formMessage");
  const currentYear = document.getElementById("currentYear");

  currentYear.textContent = new Date().getFullYear();

  // Impede selecionar uma data de entrada anterior à data atual.
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString().split("T")[0];
  entrada.min = localToday;
  saida.min = localToday;

  entrada.addEventListener("change", () => {
    saida.min = entrada.value || localToday;
    if (saida.value && entrada.value && saida.value <= entrada.value) {
      saida.value = "";
    }
    saida.setCustomValidity("");
  });

  saida.addEventListener("change", () => {
    if (entrada.value && saida.value && saida.value <= entrada.value) {
      saida.setCustomValidity("A data de saída deve ser posterior à data de entrada.");
    } else {
      saida.setCustomValidity("");
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (entrada.value && saida.value && saida.value <= entrada.value) {
      saida.setCustomValidity("A data de saída deve ser posterior à data de entrada.");
    } else {
      saida.setCustomValidity("");
    }

    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      message.className = "alert alert-warning mb-0";
      message.textContent = "Revise os campos destacados antes de enviar.";
      return;
    }

    // Demonstração acadêmica: nenhum dado é enviado a um servidor.
    message.className = "alert alert-success mb-0";
    message.textContent = "Solicitação validada! Esta é uma demonstração: os dados não foram enviados a um hotel.";
    form.reset();
    form.classList.remove("was-validated");
    entrada.min = localToday;
    saida.min = localToday;
  });
});
