// Validação e envio das solicitações de reserva para o JSON Server.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const entrada = document.getElementById("entrada");
  const saida = document.getElementById("saida");
  const message = document.getElementById("formMessage");
  const currentYear = document.getElementById("currentYear");
  const submitButton = form.querySelector('button[type="submit"]');
  const API_URL = "http://localhost:3000/reservas";

  currentYear.textContent = new Date().getFullYear();

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
    saida.setCustomValidity(
      entrada.value && saida.value && saida.value <= entrada.value
        ? "A data de saída deve ser posterior à data de entrada."
        : ""
    );
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    saida.setCustomValidity(
      entrada.value && saida.value && saida.value <= entrada.value
        ? "A data de saída deve ser posterior à data de entrada."
        : ""
    );
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      message.className = "alert alert-warning mb-0";
      message.textContent = "Revise os campos destacados antes de enviar.";
      return;
    }

    const formData = new FormData(form);
    const reserva = {
      nome: String(formData.get("nome")).trim(),
      email: String(formData.get("email")).trim(),
      entrada: formData.get("entrada"),
      saida: formData.get("saida"),
      observacoes: String(formData.get("observacoes") || "").trim(),
      adultos: Number(formData.get("adultos")),
      criancas: Number(formData.get("criancas") || 0),
      criadaEm: new Date().toISOString()
    };

    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Enviando...';
    message.className = "alert alert-info mb-0";
    message.textContent = "Enviando sua solicitação...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reserva)
      });

      if (!response.ok) {
        throw new Error("O serviço respondeu com erro.");
      }

      await response.json();
      message.className = "alert alert-success mb-0";
      message.textContent = "Solicitação registrada com sucesso! Os dados foram salvos no serviço simulado.";
      form.reset();
      form.classList.remove("was-validated");
      entrada.min = localToday;
      saida.min = localToday;
    } catch (error) {
      message.className = "alert alert-danger mb-0";
      message.textContent = "Não foi possível registrar a solicitação. Confira se o JSON Server está em execução na porta 3000 e tente novamente.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Enviar solicitação <i class="bi bi-send ms-2" aria-hidden="true"></i>';
    }
  });
});
