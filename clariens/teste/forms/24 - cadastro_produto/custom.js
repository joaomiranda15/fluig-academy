$(document).ready(function() {

	asteriscosObrigatorios('obrigatorio')

	// MASCARAS DOS CAMPOS
	var behavior = function(val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	}, options = {
		onKeyPress : function(val, e, field, options) {
			field.mask(behavior.apply({}, arguments), options);
		}
	};
	$('input[name="telefone"]').mask(behavior, options);

	if (currentTask == 4 || currentTask == 0) {

		// Recupera informações de usuário e empresa
		const mail = parent.WCMAPI.userEmail;
		const user = parent.WCMAPI.user;
		const DadosFuncRM = getDadosFunc(mail);
		// const DadosFuncFluig = getUserByMail(mail);
		const coligada = getDadosColigada(DadosFuncRM.CODCOLIGADA);

		// Preencher cabeçalho
		document.getElementById("empresa").value = coligada.NOMECOLIGADA
		document.getElementById("departamento").value = DadosFuncRM.DEPARTAMENTO
		document.getElementById("nomeCompleto").value = DadosFuncRM.NOME
		document.getElementById("email").value = mail
		document.getElementById("cargo").value = DadosFuncRM.DESCFUNCAO
		document.getElementById("matricula1").value = DadosFuncRM.CHAPA
		document.getElementById("telefone").value = DadosFuncRM.TELEFONE1

		let divs = "#formAvaliar,#formInformCadastrais,#formInformFiscais";

		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(divs);

		// pego papel coligada resp aval cad
		let papelVal = papelAvalCad(DadosFuncRM.CODCOLIGADA)
		$("#respAvalCad").val(`Pool:Role:${papelVal}`)

	} else if (currentTask == 10) {

		activeAutoComp('codProdCadastrado')
		let divs = "#dadosColaborador,#formSolicitacao,#formNecessarioAjuste";
		let hidedivs = "#formInformCadastrais,#containerFiscalContabil";

		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);
		
		if ($("#ajusteSIM").is(':checked')) {
			$("#formNecessarioAjuste").show()
		} else {
			$("#formInformFiscais").hide()	
		}
		
		$("#cadAprovado").prop("checked", false)
		$("#cadAprovado").removeAttr("checked");

	} else if (currentTask == 29) {

		let divs = "#dadosColaborador,#formAvaliar";
		let hidedivs = "#formInformCadastrais,#formInformFiscais";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

	} else if (currentTask == 16) {

		let divs = "#dadosColaborador,#formSolicitacao,#formAvaliar";
		let hidedivs = "#formInformCadastrais,#formInformFiscais";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

	} else if (currentTask == 18) {

		let divs = "#dadosColaborador,#formSolicitacao,#formAvaliar";
		let hidedivs = "#formInformFiscais";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

		$('#descricaoProduto').val($('#nomeProduto').val())
		$('#descDetalhada').val($('#nomeProduto').val())

	} else if (currentTask == 22) {

		let divs = "#dadosColaborador,#formSolicitacao,#formAvaliar,#formInformCadastrais";
		// let hidedivs = "#";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		// hidediv(hidedivs);

		// Obrigar preencher obs caso precise de ajuste
		$('input[name=necessarioAjuste]').change(function() {

			if ($("#ajusteSIM").is(':checked') === true) {
				$("#containerObsAjuste").show()
				$("#containerFiscalContabil").hide()
			} else if ($("#ajusteNAO").is(':checked') === true) {
				$("#containerObsAjuste").hide()
				$("#containerFiscalContabil").show()
			}

		});
		
		$("#ajusteSIM").prop("checked", false)
		$("#ajusteSIM").removeAttr("checked");
		$("#obsAjuste").val('')

	} else if (currentTask == 24) {

		let divs = "#dadosColaborador,#formSolicitacao,#formAvaliar,#formInformCadastrais,#formInformFiscais";
		// let hidedivs = "#";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		// hidediv(hidedivs);
	}

	// ajusta avaliação cadastro
	$('input[name=avalCadastro]').change(function() {
		// Verifique qual opção foi selecionada
		var valorSelecionado = $(this).val();
		ajustaContainerAvalicao(valorSelecionado)
		limpaCamposDiv('containerDescricao')
		limpaCamposDiv('containerProdCad')
		activeAutoComp('codProdCadastrado')
	});

	ajustaContainerAvalicao()

	// altero nome botao enviar fluig
	if (currentTask == 4 || currentTask == 0) {
		parent.$("button[data-send]").text("Iniciar Processo");
	} else {
		parent.$("button[data-send]").text("Concluir tarefa");
	}

});

// ajusto painel avaliação conforme escolha
function ajustaContainerAvalicao() {

	if ($('#maisInfo').is(':checked')) {

		$("#containerDescricao").show()
		$("#containerProdCad").hide()
	} else if ($('#possuiCad').is(':checked')) {

		$("#containerDescricao").hide()
		$("#containerProdCad").show()
	} else if ($('#cadAprovado').is(':checked')) {

		$("#containerDescricao").hide()
		$("#containerProdCad").hide()
	} else {

		$("#containerDescricao").hide()
		$("#containerProdCad").hide()
	}
}

// verifica se o papel existe
function papelAvalCad(idColigada) {

	let constraints = new Array();
	let dataset = null;
	let papel = "cadastros_coligada_" + idColigada
	let retPapel = "cadastros"

	constraints.push(DatasetFactory.createConstraint("workflowRolePK.roleId", papel, papel, ConstraintType.MUST));
	dataset = DatasetFactory.getDataset("workflowRole", null, constraints, null);

	if (dataset.values.length > 0) {
		retPapel = dataset.values[0]['workflowRolePK.roleId']
	}

	return retPapel;
};