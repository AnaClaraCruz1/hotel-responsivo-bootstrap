// Consulta as solicitações armazenadas pelo JSON Server.
document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/reservas";
  const tbody = document.getElementById("reservationsBody");
  const message = document.getElementById("tableMessage");
  const refreshButton = document.getElementById("refreshButton");
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  function formatDate(value) {
    if (!value) return "—";
    const parts = value.split("-");
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : value;
  }

  function addCell(row, value) {
    const cell = document.createElement("td");
    cell.textContent = value === null || value === undefined || value === "" ? "—" : String(value);
    row.appendChild(cell);
  }

  async function loadReservations() {
    refreshButton.disabled = true;
    message.className = "alert alert-info";
    message.textContent = "Carregando solicitações...";
    tbody.replaceChildren();

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Falha na consulta do serviço.");

      const reservations = await response.json();
      if (!Array.isArray(reservations)) throw new Error("O serviço retornou um formato inesperado.");

      if (reservations.length === 0) {
        message.className = "alert alert-secondary";
        message.textContent = "Ainda não há solicitações registradas. Envie o formulário da página inicial para testar.";
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 9;
        cell.className = "text-center py-4";
        cell.textContent = "Nenhuma solicitação encontrada.";
        row.appendChild(cell);
        tbody.appendChild(row);
        return;
      }

      reservations.sort((a, b) => new Date(b.criadaEm || 0) - new Date(a.criadaEm || 0));
      reservations.forEach((item) => {
        const row = document.createElement("tr");
        addCell(row, item.id);
        addCell(row, item.nome);
        addCell(row, item.email);
        addCell(row, formatDate(item.entrada));
        addCell(row, formatDate(item.saida));
        addCell(row, item.adultos);
        addCell(row, item.criancas);
        addCell(row, item.observacoes);
        addCell(row, item.criadaEm ? new Date(item.criadaEm).toLocaleString("pt-BR") : "—");
        tbody.appendChild(row);
      });

      message.className = "alert alert-success";
      message.textContent = `${reservations.length} solicitação(ões) carregada(s).`;
    } catch (error) {
      message.className = "alert alert-danger";
      message.textContent = "Não foi possível carregar as solicitações. Inicie o JSON Server na porta 3000 e atualize a página.";
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 9;
      cell.className = "text-center py-4";
      cell.textContent = "Erro ao consultar o serviço.";
      row.appendChild(cell);
      tbody.appendChild(row);
    } finally {
      refreshButton.disabled = false;
    }
  }

  refreshButton.addEventListener("click", loadReservations);
  loadReservations();
});
