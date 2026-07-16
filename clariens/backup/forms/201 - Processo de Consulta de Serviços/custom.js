$(document).ready(function () {
  // MASCARAS DOS CAMPOS

  var behavior = function (val) {
      return val.replace(/\D/g, "").length === 11
        ? "(00) 00000-0000"
        : "(00) 0000-00009";
    },
    options = {
      onKeyPress: function (val, e, field, options) {
        field.mask(behavior.apply({}, arguments), options);
      },
    };

  $('input[name="telefone"]').mask(behavior, options);

  displayBtnFiles();
  visaoDadosSolicitacao();
  visaoAnalisarSolicitacao();
  visaoComplementar();
  visaoResponderDepois();
  visaoFimProcesso();
  visaoAvalDiploma();
  visaoAprovacoes();
  setTimeout(visaoAprovacoes, 300);

  // Sincroniza o campo oculto TIPO_SERVICO com o valor do zoom tipoServico
  function syncTipoServicoField() {
    var v = ($("#tipoServico").val() || "") + "";
    $("#TIPO_SERVICO").val(v.toUpperCase());
  }

  $("#tipoServico").on("change blur input", syncTipoServicoField);

  // garante valor inicial
  syncTipoServicoField();

  $(document).on("change", "#zoomDepartamento", function () {
    var idDepto = $("#idDepartamento").val();
    $("#DEPARTAMENTOLyceum").val(idDepto);
  });

  var idDeptoSalvo = $("#idDepartamento").val();
  if (idDeptoSalvo && idDeptoSalvo !== "") {
    $("#DEPARTAMENTOLyceum").val(idDeptoSalvo);
  }

  /** Validação para os campos de observação dos paineis para quando for "Sim" a observação não ser obrigatória */

  function validateForm(form) {
    // Validação Coordenadoria de Admissão
    if (currentTask == 13 || currentTask == 0 || currentTask == 4) {
      validarCampoAprovacao(
        form,
        "coordAprovado",
        "obsGestor",
        "Coordenação de Admissão",
      );
    }

    // Validação Coordenação Financeira
    if (currentTask == 20) {
      validarCampoAprovacao(
        form,
        "aprovCoordFinAprovado",
        "observacaoContrato",
        "Coordenação Financeira",
      );
    }

    // Validação Financeiro CR
    if (currentTask == 26) {
      validarCampoAprovacao(
        form,
        "coordFinanceiraAprovadoCR",
        "obsCoordenacaoFinanceira",
        "Financeiro CR",
      );
    }
  }
});

function visaoDadosSolicitacao() {
  if (currentTask == 4 || currentTask == 0) {
    let divs =
      "#formAnalise,#formResposta,#formAnaliseSolicitante,#formComplementar,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    disablefield(divs);
    hidediv(divs);

    const mail = parent.WCMAPI.userEmail;
    const DadosFuncRM = getDadosFunc(mail);
    const coligada = getDadosColigada(DadosFuncRM.CODCOLIGADA);

    document.getElementById("empresa").value = coligada.NOMECOLIGADA;
    document.getElementById("departamento").value = DadosFuncRM.DEPARTAMENTO;
    document.getElementById("nomeCompleto").value = DadosFuncRM.NOME;
    document.getElementById("email").value = DadosFuncRM.EMAIL;
    document.getElementById("cargo").value = DadosFuncRM.DESCFUNCAO;
    document.getElementById("matricula1").value = DadosFuncRM.CHAPA;
    document.getElementById("telefone").value = DadosFuncRM.TELEFONE1;
  }
}

function visaoAnalisarSolicitacao() {
  if (currentTask == 7) {
    let divs =
      "#formResposta,#formSolicitacao,#dadosColaborador,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    let divhide =
      "#formResposta,#formAnaliseSolicitante,#formComplementar,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    disablefield(divs);
    hidediv(divhide);

    if ($("#SOLIC").val() != "") {
      hidediv("#formSwitchLy");
    }

    $("input[name=avalsolicitacao]").change(function () {
      if ($("#informacoes").is(":checked")) {
        $("#containerDescricao").show();
      } else if ($("#validado").is(":checked")) {
        $("#containerDescricao").show();
      } else {
        $("#containerDescricao").hide();
      }
    });
    if (!$("input[name=avalsolicitacao]").is(":checked")) {
      $("#containerDescricao").hide();
    }
  }

  $("input[name=avalsolicitacao]").change(function () {
    if ($("#informacoes").is(":checked")) {
      $("#containerDescricao").show();
    } else if (
      $("#validado").is(":checked") ||
      $("#cancelado").is(":checked")
    ) {
      $("#containerDescricao").show();
    } else {
      $("#containerDescricao").hide();
    }
  });
  if (!$("input[name=avalsolicitacao]").is(":checked")) {
    $("#containerDescricao").hide();
  }

  if (!($("#tipoServico").val().toUpperCase() == "14 - ENVIO DE DIPLOMA")) {
    $("#formSwitchCancelado").hide();
  } else {
    $("#formSwitchDepois").hide();
  }
}

function visaoComplementar() {
  if (currentTask == 5) {
    let divs =
      "#formAnalise,#formResposta,#dadosColaborador,#formSolicitacao,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    let hidedivs =
      "#formResposta,#formAnaliseSolicitante,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    disablefield(divs);
    hidediv(hidedivs);
  }
}

function visaoResponderDepois() {
  if (currentTask == 11) {
    let divs =
      "#formAnalise,#formSolicitacao,#dadosColaborador,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    let hidedivs =
      "#formComplementar,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";

    disablefield(divs);
    hidediv(hidedivs);
    if ($("#informacoes1").is(":checked") === false) {
      let hidedivs = "#formAnaliseSolicitante";
      hidediv(hidedivs);
    }
  }
}

function visaoFimProcesso() {
  if (currentTask == 14) {
    let divs =
      "#formAnalise,#formResposta,#formSolicitacao,#dadosColaborador,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    disablefield(divs);
    hidediv("#formAprovCoordAluno,#formAprovDiretoria,#formExecucao");

    if ($("#complementoSolicitacao").val() === "") {
      $("#formResposta").hide();
    } else {
      $("#formResposta").show();
    }

    if ($("#descricaoComplemento").val() === "") {
      $("#formComplementar").hide();
    } else {
      $("#formComplementar").show();
    }
  }
}

function visaoAvalDiploma() {
  if (currentTask == 28) {
    let divs =
      "#formResposta,#formSolicitacao,#dadosColaborador,#formAnalise,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    let divhide =
      "#formResposta,#formAnaliseSolicitante,#formComplementar,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";
    disablefield(divs);
    hidediv(divhide);

    FLUIGC.switcher.init("#informacoes1");

    verificaPaiFilhoH(".id-itemH");

    if (currentTask == 4 || currentTask == 0) {
      parent.$("button[data-send]").text("Iniciar Processo");
    } else {
      parent.$("button[data-send]").text("Concluir tarefa");
    }
  }

  $("input[name=avalPlanAcademico]").change(function () {
    if ($("#avalPlanAcedValidado").is(":checked")) {
      $("#containerAnexoPlanAcademico").show();
    } else if ($("#avalPlanAcedCancelado").is(":checked")) {
      $("#containerAnexoPlanAcademico").hide();
    } else {
      $("#containerAnexoPlanAcademico").hide();
    }
  });
  if (!$("input[name=avalPlanAcademico]").is(":checked")) {
    $("#containerAnexoPlanAcademico").hide();
  }
}

// ─────────────────────────────────────────────────────────────
// Mapeamento de tipo de serviço → papel (Role) do Fluig
// Centralizado aqui para ser reutilizado em visaoAprovacoes e
// em setSelectedZoomItem (quando o usuário interage com o zoom).
// ─────────────────────────────────────────────────────────────
var mapeamentoPapeis = {
  "Comunicação Institucional": "comunicacaoAluno_comunicacaoInstitucional",
  "Financeiro": "comunicacaoAluno_Financeiro",
  "TI para eventuais instabilidades de sistemas": "comunicacaoAluno_TI",
  "Acadêmico": "comunicacaoAluno_Academico",
}

/**
 * Lê o valor atual de #tipoServico e preenche #aprovadorProximaAprovacao
 * com o papel (Role) correspondente.
 * Chamada tanto no carregamento da task 40 quanto na seleção do zoom.
 */
function preencheAprovadorPorServico() {
	var servicoAtual = ($("#tipoServico").val() || "").trim();
	console.log("[preencheAprovadorPorServico] Mapeando aprovador para o serviço: '" + servicoAtual + "'");

	var codigoPapel = mapeamentoPapeis[servicoAtual];

	if (codigoPapel) {
		var proximoAprovador = "Pool:Role:" + codigoPapel;
		$("#aprovadorProximaAprovacao").val(proximoAprovador);
		// Salva o código do papel em um campo de backup para a validação no beforeSendValidate
		$("#codigoPapelSalvo").val(codigoPapel);
		console.log("[preencheAprovadorPorServico] Próximo aprovador definido como: '" + proximoAprovador + "'");
	} else {
		$("#aprovadorProximaAprovacao").val("");
		$("#codigoPapelSalvo").val("");
		console.warn("[preencheAprovadorPorServico] Nenhum papel encontrado no mapeamento para o serviço: '" + servicoAtual + "'");
	}
}

function visaoAprovacoes() {
  const task = Number(currentTask);
  const paineisAprovacao =
    "#formResposta,#formComplementar,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao";

  switch (task) {
    case 34:
      disablefield(
        "#dadosColaborador,#formSolicitacao,#formAnalise,#formResposta,#formComplementar,#formAnalisePlanAcademico,#formAprovDiretoria,#formExecucao",
      );
      $(paineisAprovacao).hide();
      $(
        "#dadosColaborador,#formSolicitacao,#formAnalise,#formAprovCoordAluno",
      ).show();

      if ($("#complementoSolicitacao").val() !== "") {
        $("#formResposta").show();
      }
      if ($("#descricaoComplemento").val() !== "") {
        $("#formComplementar").show();
      }
      break;

    case 40:
      disablefield(
        "#dadosColaborador,#formSolicitacao,#formAnalise,#formResposta,#formComplementar,#formAnalisePlanAcademico,#formAprovCoordAluno,#formExecucao",
      );
      $(paineisAprovacao).hide();
      $(
        "#dadosColaborador,#formSolicitacao,#formAnalise,#formAprovDiretoria",
      ).show();

      preencheAprovadorPorServico();

      break;

    case 46:
      disablefield(
        "#dadosColaborador,#formSolicitacao,#formAnalise,#formResposta,#formComplementar,#formAnalisePlanAcademico,#formAprovCoordAluno,#formAprovDiretoria",
      );
      $(paineisAprovacao).hide();
      $(
        "#dadosColaborador,#formSolicitacao,#formAnalise,#formAprovCoordAluno,#formAprovDiretoria,#formExecucao",
      ).show();

      if ($("#complementoSolicitacao").val() !== "") {
        $("#formResposta").show();
      }
      if ($("#descricaoComplemento").val() !== "") {
        $("#formComplementar").show();
      }
      break;
  }
}

// Função principal para gravar histórico
function gravaHistorico(currentTask) {
  const now = getCurrentDateTime();
  const user = parent.WCMAPI.user;
  const Depto = $("#zoomDepartamento").val();

  const campo = {
    5: `#descricaoComplemento`,
    7: `#descricao`,
    11: `#complementoSolicitacao`,
    14: `#observacaoAnalise`,
    28: `#descricaoPlaneAcad`,
    34: `#descricaoCoordAluno`,
    40: `#descricaoDiretoria`,
    46: `#descricaoExecucao`,
  };
  const campoID = campo[currentTask] || "";

  if (campoID === "" || $(campoID).length === 0) {
    return;
  }

  const historico = $.trim($(campoID).val() || "");

  if (historico === "") {
    return;
  }

  const descAtividade = {
    5: "Complementar informações",
    7: "Analisar Solicitação",
    11: "Responder Solicitação",
    14: "Analisar Reposta",
    20: "Complementar a demanda",
    28: "Avaliação Diploma/Certificado",
    34: "Aprovação Coordenação de Admissão",
    40: "Aprovação Diretoria",
    46: "Execução",
  };

  const sDescricao = descAtividade[currentTask] || "";

  const indice = wdkAddChild("itenshistorico");

  $("#itemH___" + indice).val(indice);
  $("#resp___" + indice).val(user);
  $("#departamentoResp___" + indice).val(Depto);
  $("#atividade___" + indice).val(sDescricao);
  $("#datahist___" + indice).val(now);
  $("#observacao___" + indice).val(historico);

  verificaPaiFilhoH(".id-itemH");
}

function verificaPaiFilhoH(nomeclass) {
  let qtdlinhas = 0;
  $(nomeclass).each(function (novo_index) {
    let idcampo = this.id;

    if (idcampo.indexOf("___") != -1) {
      qtdlinhas++;
    }
  });

  $("#div_historico").css("display", qtdlinhas > 0 ? "" : "none");

  return qtdlinhas;
}

function diasParaHorasUteis(dias) {
  const horasTotais = dias * 8;
  const horasFormatadas = horasTotais.toString().padStart(3, "0");
  const horas = Math.floor(horasTotais);
  const minutos = Math.round((horasTotais - horas) * 60);

  return `${horasFormatadas}:${minutos.toString().padStart(2, "0")}`;
}

function getCurrentDateTime() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Funções de anexo PAI/FILHO
function customAddChild(oElement) {
  if (currentTask == 28 && getMode() != "VIEW") {
    var id = oElement.id;
    var indice = wdkAddChild("tableAnexosServicos");
  }
}

function customRemoveChild(idInput) {
  if (currentTask == 28 && modForm != "VIEW") {
    var exclinha = idInput;
    var indice = exclinha.split("___")[1];
    var index = parseInt(indice);
    var oElement = $("#" + idInput)[0];

    fnWdkRemoveChild(oElement);
  }
}
