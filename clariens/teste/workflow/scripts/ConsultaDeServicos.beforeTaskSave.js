function beforeTaskSave(colleagueId, nextSequenceId, userList) {
  if (parseInt(nextSequenceId, 10) !== 40) {
    return;
  }

  var servico = hAPI.getCardValue("tipoServico") || hAPI.getCardValue("TIPO_SERVICO") || "";
  var aprovador = getAprovadorDiretoriaPorServico(servico);

  if (aprovador) {
    hAPI.setCardValue("aprovadorProximaAprovacao", aprovador);
  }
}

function getAprovadorDiretoriaPorServico(servico) {
  var chave = normalizaTextoAprovador(servico);

  if (chave === "COMUNICACAO INSTITUCIONAL") {
    return "Pool:Role:comunicacaoAluno_comunicacaoInstitucional";
  }

  if (chave === "FINANCEIRO") {
    return "Pool:Role:comunicacaoAluno_Financeiro";
  }

  if (chave === "TI PARA EVENTUAIS INSTABILIDADES DE SISTEMAS") {
    return "Pool:Role:comunicacaoAluno_TI";
  }

  if (chave === "ACADEMICO") {
    return "Pool:Role:comunicacaoAluno_Academico";
  }

  return "";
}

function normalizaTextoAprovador(valor) {
  var texto = String(valor || "");

  return texto
    .replace(/[\u00C1\u00C0\u00C3\u00C2\u00C4]/g, "A")
    .replace(/[\u00E1\u00E0\u00E3\u00E2\u00E4]/g, "a")
    .replace(/[\u00C9\u00C8\u00CA\u00CB]/g, "E")
    .replace(/[\u00E9\u00E8\u00EA\u00EB]/g, "e")
    .replace(/[\u00CD\u00CC\u00CE\u00CF]/g, "I")
    .replace(/[\u00ED\u00EC\u00EE\u00EF]/g, "i")
    .replace(/[\u00D3\u00D2\u00D5\u00D4\u00D6]/g, "O")
    .replace(/[\u00F3\u00F2\u00F5\u00F4\u00F6]/g, "o")
    .replace(/[\u00DA\u00D9\u00DB\u00DC]/g, "U")
    .replace(/[\u00FA\u00F9\u00FB\u00FC]/g, "u")
    .replace(/[\u00C7]/g, "C")
    .replace(/[\u00E7]/g, "c")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}
