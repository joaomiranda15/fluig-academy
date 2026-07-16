var beforeSendValidate = function (numState, nextState) {
  arrError = [];
  campoObrig = [];
  var obrigatorios = $(".obrigatorio:visible");

  verificaCampos(obrigatorios);

  function normalizarTextoValidacao(valor) {
    return (valor || "")
      .toString()
      .replace(/[ÁÀÃÂÄ]/g, "A")
      .replace(/[áàãâä]/g, "a")
      .replace(/[ÉÈÊË]/g, "E")
      .replace(/[éèêë]/g, "e")
      .replace(/[ÍÌÎÏ]/g, "I")
      .replace(/[íìîï]/g, "i")
      .replace(/[ÓÒÕÔÖ]/g, "O")
      .replace(/[óòõôö]/g, "o")
      .replace(/[ÚÙÛÜ]/g, "U")
      .replace(/[úùûü]/g, "u")
      .replace(/[Ç]/g, "C")
      .replace(/[ç]/g, "c")
      .trim()
      .toUpperCase();
  }

  function exigeAprovacaoGestorAluno() {
    var departamento = normalizarTextoValidacao($("#zoomDepartamento").val());
    var tipoServico = normalizarTextoValidacao($("#tipoServico").val());

    return (
      departamento.indexOf("COMUNICACAO COM O ALUNO") !== -1 &&
      tipoServico.indexOf("EXPERIENCIA AO ALUNO") !== -1
    );
  }

  if (numState == 7) {
    if ($("#informacoes").is(":checked") == false) {
      var obrigSete = $(".obrigatorio7:visible");
      verificaCampos(obrigSete);
    }
  } else if (numState == 14) {
    if ($("#informacoes1").is(":checked") === false) {
      var obrig14 = $(".obrigatorio14:visible");
      verificaCampos(obrig14);
    }
    validaTabelaAnexos();
  }

  if (numState == 34 && !$('input[name="avalCoordAluno"]').is(':checked')) {
    arrError.push("Selecione a aprovação da coordenação do aluno.");
  }

  if (numState == 34 && $("#avalCoordAluno").is(":checked")) {
    if (typeof preencheAprovadorPorServico === "function") {
      preencheAprovadorPorServico();
    }

    if (!$("#aprovadorProximaAprovacao").val()) {
      arrError.push("Nao foi possivel identificar o aprovador da diretoria para o servico selecionado.");
    }
  }

  if (numState == 7 && $("#validado").is(':checked') && exigeAprovacaoGestorAluno() && !$("#idGestor").val()) {
    arrError.push("NÃ£o foi possÃ­vel identificar o id do gestor para enviar a aprovaÃ§Ã£o do aluno no workflow.");
  }

  if (numState == 40 && !$('input[name="avalDiretoria"]').is(':checked')) {
    arrError.push("Selecione a aprovação da diretoria.");
  }

  if (arrError.length > 0) {
    var error = "Por favor, verifique os alertas abaixo.\r\t";
    for (var i = 0; i < arrError.length; i++) {
      var count = i + 1;
      if (parseInt(i) > 0) {
        arrError[i] = "\r\t" + count + " - " + arrError[i];
      } else {
        arrError[i] = count + " - " + arrError[i];
      }
      error += arrError[i];
    }
    throw error;
  } else {
    if ($("#informacoes").is(":checked") === true && numState == 7) {
      gravaHistorico(numState);
    }
    if ($("#descricaoComplemento").val() != "" && numState == 5) {
      gravaHistorico(numState);
    }
    if (
      $("#observacaoAnalise").length > 0 &&
      $("#observacaoAnalise").val() != "" &&
      numState == 14
    ) {
      gravaHistorico(numState);
    }
    if ($("#descricaoPlaneAcad").val() != "" && numState == 28) {
      gravaHistorico(numState);
    }
    if ($("#descricaoCoordAluno").val() != "" && numState == 34) {
      gravaHistorico(numState);
    }
    if ($("#descricaoDiretoria").val() != "" && numState == 40) {
      gravaHistorico(numState);
    }
    if ($("#descricaoExecucao").val() != "" && numState == 46) {
      gravaHistorico(numState);
    }

    return true;
  }
};

// Função para validar tabela de anexos de assinatura
function validaTabelaAnexos() {

  // Busca todas as linhas da tabela pai-filho com o campo checkAnexo que estão visíveis
  var linhasTabela = $('input[name^="fnAnexoServico___"]');

  if (linhasTabela.length === 0) {
    arrError.push("É necessário adicionar pelo menos um anexo.");
    return;
  }

  linhasTabela.each(function (index) {
    var campo = $(this);
    var campoName = campo.attr('name');
    var valorCampo = campo.val();
    var numeroLinha = index + 1;

    // Verifica se o campo está preenchido (selecionado)
    if (!valorCampo || valorCampo === "") {

      // Destaca o campo
      $(`input[name="${campoName}"]`).closest('div[class^="card"]').css({ "background-color": "#f2c8cb" });

      // Remove destaque quando o campo é alterado
      $(`input[name="${campoName}"]`).change(function () {
        $(this).closest('div[class^="card"]').css({ "background-color": "" });
      });

      arrError.push(`Anexo é obrigatório.`);
    } else {
      // Remove o destaque se o campo estiver preenchido
      $(`input[name="${campoName}"]`).closest('div[class^="card"]').css({ "background-color": "" });
    }
  });
}
