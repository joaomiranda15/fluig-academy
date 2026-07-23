const idPastaPai = 326
let idPasta = 0

$(document).ready(function () {

	asteriscosObrigatorios('obrigatorio')

	// MASCARAS DOS CAMPOS
	var behavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	}, options = {
		onKeyPress: function (val, e, field, options) {
			field.mask(behavior.apply({}, arguments), options);
		}
	};
	$('input[name="telefone"]').mask(behavior, options);
	$('input[name="contatoFavorecido"]').mask(behavior, options);
	$('input[name="valorDespesa"]').mask("#0.000.000,00", { reverse: true });

	// BUSCO INFORMACAO DE UM CAMPO PARA INSERIR EM OUTRO
	$('#valorReembolso2').val($('#valorReembolso').val());
	$('#limiteReembolso3').val($('#limiteReembolso2').val());


	if (currentTask == 4 || currentTask == 0) {

		// Recupera informações de usuário e empresa
		const mail = parent.WCMAPI.userEmail;
		const user = parent.WCMAPI.user;
		const DadosFuncRM = getDadosFunc(mail);
		//const DadosFuncFluig = getUserByMail(mail);
		const coligada = getDadosColigada(DadosFuncRM.CODCOLIGADA);

		// Preencher cabeçalho
		document.getElementById("empresa").value = coligada.NOMECOLIGADA
		document.getElementById("codColigadaFunc").value = coligada.CODCOLIGADA
		document.getElementById("departamento").value = DadosFuncRM.DEPARTAMENTO
		document.getElementById("codSecao").value = DadosFuncRM.CODSECAO
		document.getElementById("nomeCompleto").value = DadosFuncRM.NOME
		document.getElementById("email").value = mail// DadosFuncRM.EMAIL
		document.getElementById("cargo").value = DadosFuncRM.DESCFUNCAO
		document.getElementById("matricula1").value = DadosFuncRM.CHAPA
		document.getElementById("cpfSolicitante").value = DadosFuncRM.CPF

		// // Gestor do solicitante
		// var dadosGestor = getDadosGestor(coligada.CODCOLIGADA, DadosFuncRM.CODSECAO)
		// document.getElementById("gestor").value = dadosGestor.nome
		// document.getElementById("idFlgGest").value = dadosGestor.idfluig
		// document.getElementById("emailGest").value = dadosGestor.email



		let divs = "#formGestorSol,#formGestorCCusto,#formAlcada,#formValidarReembolso,#formAlcadaEspecial";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(divs);

	} else if (currentTask == 5) {

		let divs = "#dadosColaborador,#formSolicitacao";
		let hidedivs = "#formGestorCCusto,#formAlcada,#formValidarReembolso,#formAlcadaEspecial";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

		mostraComprovante()

		$("#SIM").prop("checked", false)
		$("#ObsGestorSol").val('')
		$("#SIM").removeAttr("checked");

	} else if (currentTask == 14) {

		let divs = "#dadosColaborador,#formSolicitacao,#formGestorSol";
		let hidedivs = "#formAlcada,#formValidarReembolso,#formAlcadaEspecial";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

		$("#ccustoSIM").prop("checked", false)
		$("#ccustoNAO").prop("checked", false)
		$("#ObsGestorCCusto").val('')

		mostraComprovante()

	} else if (currentTask == 23) {

		let divs = "#dadosColaborador,#formSolicitacao,#formGestorSol,#formGestorCCusto";
		let hidedivs = "#formValidarReembolso,#formAlcadaEspecial";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

		if (!$("#ccustoSIM").is(':checked') && !$("#ccustoNAO").is(':checked')) {
			$("#formGestorCCusto").hide()
		}

		$("#alcadaSIM").prop("checked", false)
		$("#alcadaNAO").prop("checked", false)
		$("#ObsAlcada").val('')

		mostraComprovante()

	} else if (currentTask == 26) {

		activeAutoComp("naturezaFinanceira")
		let divs = "#dadosColaborador,#formSolicitacao,#formGestorSol,#formGestorCCusto,#formAlcada";
		// desabilita campo
		disablefield(divs);

		if (!$("#alcadaSIM").is(':checked') && !$("#alcadaNAO").is(':checked')) {
			$("#formAlcada").hide()
		}

		if (!$("#ccustoSIM").is(':checked') && !$("#ccustoNAO").is(':checked')) {
			$("#formGestorCCusto").hide()
		}

		if (!$("#especialSIM").is(':checked') && !$("#especialNAO").is(':checked')) {
			$("#formAlcadaEspecial").hide()
		}

		$("#validadoSIM").prop("checked", false)
		$("#validadoNAO").prop("checked", false)
		$("#obsValida").val('')

		mostraComprovante()

	} else if (currentTask == 39) {

		let divs = "#dadosColaborador,#formGestorSol,#formGestorCCusto,#formAlcada,#formValidarReembolso";
		// desabilita campo
		disablefield(divs);

		if (!$("#alcadaSIM").is(':checked') && !$("#alcadaNAO").is(':checked')) {
			$("#formAlcada").hide()
		}

		if (!$("#ccustoSIM").is(':checked') && !$("#ccustoNAO").is(':checked')) {
			$("#formGestorCCusto").hide()
		}
		if (!$("#especialSIM").is(':checked') && !$("#especialNAO").is(':checked')) {
			$("#formAlcadaEspecial").hide()
		}
		mostraComprovante()
		//$('button[name*="fileButton"]').attr('disabled', 'disabled');

		let linhas = $("[name*=dataDespesa___]")
		linhas.each(function () {

			let idcampo = this.id;
			let indice = idcampo.split("___")[1];
			let botSelComp = $('#' + idcampo).closest('div.panel-body').find('button[id=fileButton]');
			botSelComp.attr('disabled', 'disabled');
		})

	} else if (currentTask == 42) {

		let divs = "#dadosColaborador,#formSolicitacao,#formGestorSol,#formGestorCCusto,#formAlcada,#formValidarReembolso";
		// let hidedivs = "#;
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

	} else if (currentTask == 37) {

		mostraComprovante()

	} else if (currentTask == 52) {

		let divs = "#dadosColaborador,#formSolicitacao,#formGestorSol";
		let hidedivs = "#formAlcada,#formValidarReembolso";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);

		if (!$("#alcadaSIM").is(':checked') && !$("#alcadaNAO").is(':checked')) {
			$("#formAlcada").hide()
		}

		if (!$("#ccustoSIM").is(':checked') && !$("#ccustoNAO").is(':checked')) {
			$("#formGestorCCusto").hide()
		}

		mostraComprovante()

	}


	$('input[name=solTerceiro]').change(function () {

		// Verifique qual opção foi selecionada
		var objtCamp = this;
		ajustaContainerBeneficiario()
		limpaCamposDiv('div_beneficiario')
		window['zoomBeneficiario'].clear();
		$("#gestor").val('')
		$("#idFlgGest").val('')
		$("#emailGest").val('')
		$("#gestorBeneficiario").val('')
		$("#cpfBeneficiario").val('')
		$("#coligBeneficiario").val('')
		$("#matBeneficiario").val('')
		$("#emailBeneficiario").val('')

		window["zoomBanco"].clear()
		window["zoomBanco"].disable(false)
		$("#codBanco").val("")
		$("#agenciaFavorecido").val("")
		$("#agenciaFavorecido").prop("readonly", false)
		$("#contaFavorecido").val()
		$("#contaFavorecido").prop("readonly", false)

		if (objtCamp.id == 'terceironao') {

			// Gestor do solicitante
			let coligadaFunc = $('#codColigadaFunc').val()
			let codsecaoFunc = $('#codSecao').val()
			let dadosGestor = getDadosGestor(coligadaFunc, codsecaoFunc)
			$("#gestor").val(dadosGestor.nome)
			$("#idFlgGest").val(dadosGestor.idfluig)
			$("#emailGest").val(dadosGestor.email)

			validaFornedorc($("#cpfSolicitante").val())

		}

	});

	ajustaContainerBeneficiario()

	$('input[name=validado]').change(function () {
		// Verifique qual opção foi selecionada
		limpaCamposDiv('divValidado')

		if ($("#validadoNAO").is(':checked') === true) {
			$("#divValidado").hide()
		} else if ($("#validadoSIM").is(':checked') === true) {
			$("#divValidado").show()
		}

	});

	if ($("#validadoSIM").is(':checked') === true) {
		$("#divValidado").show()
	} else {
		$("#divValidado").hide()
	}

	// altero nome botao enviar fluig
	if (currentTask == 4 || currentTask == 0) {
		parent.$("button[data-send]").text("Iniciar Processo");
	} else {
		parent.$("button[data-send]").text("Concluir tarefa");
	}

})

function customAddChild(oElement) {

	$(document).on("change", '[name^="tipoDespesa___"]', function () {


      var indice = $(this).attr("name").split("___")[1];
      var valor = $(this).val();

      if (valor == "Combustível de automóvel - Combustível de automóvel") {
           $("#quilometragem___" + indice)
              .prop("disabled", false)
              .removeAttr("required")
              .removeClass("obrigatorio");
        } else {
           $("#quilometragem___" + indice)
             .prop("disabled", true)
             .val("")
             .removeAttr("required")
             .removeClass("obrigatorio");
       }
    });


	if ((currentTask == 0 || currentTask == 4 || currentTask == 39) && modForm != 'VIEW') {

		if (oElement.id == 'inserirDespesa') {
			var indice = wdkAddChild('despesasSol');

			$('input[name="valorDespesa___' + indice + '"]').mask("#.##0,00", {
				reverse: true
			});
			$('input[name="limiteReembolso___' + indice + '"]').mask("#.##0,00", {
				reverse: true
			});
			$('input[name="valorExcedente___' + indice + '"]').mask("#.##0,00", {
				reverse: true
			});
			$('input[name="saldoReembolso___' + indice + '"]').mask("#.##0,00", {
				reverse: true
			});
			$('input[name="limiteReembolso2___' + indice + '"]').mask("#.##0,00", {
				reverse: true
			});
			$('input[name="excedenteLimite___' + indice + '"]').mask("#.##0,00", {
				reverse: true
			});

			if (idPasta == 0) {
				let nomeCompleto = $("#nomeCompleto").val().split(" ")[0]
				let description = `000-${nomeCompleto}`
				criarPasta(idPastaPai, description, response => {
					idPasta = response
					$("#idPasta").val(idPasta)

				})
			}

			let fileName = $("#fileName___" + indice)
			let idDocumento = $("#idDocumento___" + indice)
			let comprovante = $("#comprovante___" + indice)
			comprovante.on("change", (ev) => {
				let file = ev.target.files[0]
				fileName.val(file.name)
				if (idDocumento.val() != "") excluirDocumento(idDocumento.val(), response => { criarDocumento(file, idPasta, response => { idDocumento.val(response) }) })
				else criarDocumento(file, idPasta, response => { idDocumento.val(response) })
			})

			document.getElementById('fileButton___' + indice).addEventListener('click', function () {
				// Simule um clique no campo de arquivo
				document.getElementById("comprovante___" + indice).click();
			});

			let verComprovante = $("#verComprovante___" + indice)
			verComprovante.on("click", () => { if (idDocumento.val() != "") verDocumento(idDocumento.val()) })
		}
	}
}



function customRemoveChild(oElement) {

	if ((currentTask == 0 || currentTask == 4 || currentTask == 39) && modForm != 'VIEW') {

		var exclinha = oElement.id;
		var indice = exclinha.split("___")[1];
		var index = parseInt(indice);

		fnWdkRemoveChild(oElement);

		atualizarTabela()
	}

}

window['bkpLimite'] = {};
function atualizarTabela() {

	let controleLimite = {}
	let valorTotal = 0
	let totalLimite = 0
	let totalExcedente = 0
	let i = -1;
	let tabelaContas = $("[tablename='despesasSol'] tbody tr")
	tabelaContas.each(function (index, element) {

		//ajuste limites
		const dataItem = tabelaContas.eq(index).find("[id*='dataDespesa___']").val()
		const valorItem = tabelaContas.eq(index).find("[id*='valorDespesa___']").val()
		const tipoItem = tabelaContas.eq(index).find("[id*='tipoDespesa___']").val()
		const limiteItem = tabelaContas.eq(index).find("[id*='limiteReembolso___']").val()

		if (dataItem && valorItem) {

			//restaura valor limite se vazio
			if (!window['bkpLimite'][tipoItem]) {

				window['bkpLimite'][tipoItem] = {};
				window['bkpLimite'][tipoItem]['limiteItem'] = limiteItem

			} else if (window['bkpLimite'][tipoItem] && !limiteItem) {

				let valRestore = window['bkpLimite'][tipoItem]['limiteItem'];
				tabelaContas.eq(index).find("[id*='limiteReembolso___']").val(valRestore)
			}

			//ajsuta valor limite
			if (!controleLimite[tipoItem]) {
				controleLimite[tipoItem] = {};
			}

			if (!controleLimite[tipoItem][dataItem]) {
				controleLimite[tipoItem][dataItem] = valorItem
			} else {
				tabelaContas.eq(index).find("[id*='limiteReembolso___']").val('')
			}

		}

		let valorDespesa = currencyToNumber(tabelaContas.eq(index).find("[id*='valorDespesa___']").val())
		let limiteReembolso = currencyToNumber(tabelaContas.eq(index).find("[id*='limiteReembolso___']").val())

		// CALCULO EXCEDENTE
		let valorExcedente = valorDespesa - limiteReembolso

		if (valorExcedente < 0) {
			valorExcedente = 0
		}
		tabelaContas.eq(index).find("[id*='valorExcedente___']").val(numberToCurrency(valorExcedente))

		// TOTALIZADOR DOS VALORES
		valorTotal = valorTotal + valorDespesa
		totalLimite = totalLimite + limiteReembolso
		totalExcedente = valorTotal - totalLimite
		//totalExcedente = totalExcedente + valorExcedente

		if (totalExcedente < 0) {
			totalExcedente = 0
		}

		i = i + 1

	})
	$('#valorReembolso').val(numberToCurrency(valorTotal))
	$('#limiteReembolso2').val(numberToCurrency(totalLimite))
	$('#excedenteLimite').val(numberToCurrency(totalExcedente))
	$('#qtdDespesas').val(i)


}

function mostraComprovante(objcamp) {

	// ativa botao comprovante
	$(".btncomprov").prop('disabled', false);
	$(".btncomprov").prop('readonly', false);

	$('.btncomprov').click(function () {

		// Encontra o ancestral .panel-body mais próximo do botão clicado
		var panelBody = $(this).closest('.panel-body');

		// Encontra o <input> com o name contendo "teste" dentro do .panel-body
		var inputId = panelBody.find('input[name*="idDocumento___"]');

		// Obtém o valor do input
		var idDocumento = inputId.val();

		// mostra o dcto
		verDocumento(idDocumento)

	});
}

// Recupera informações do gestor
function getDadosGestor(coligada, secao) {

	var constraints = new Array();
	var dataset = null;
	var user = { "coligada": "", "chapa": "", "nome": "", "idfluig": "", "email": "" };

	constraints.push(DatasetFactory.createConstraint("CODCOLIGADASECAO", coligada, coligada, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("CODSECAO", secao, secao, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("FUNCAO", 'CHEFE', 'CHEFE', ConstraintType.MUST));
	dataset = DatasetFactory.getDataset("ds_gestorSecao", null, constraints, null);


	if (dataset.values.length > 0) {
		user.coligada = dataset.values[0]["CODCOLIGADACHEFE"];
		user.chapa = dataset.values[0]["CHAPACHEFE"];
		user.nome = dataset.values[0]["NOMECHEFE"];
	}
	//alteração para +1 gestor
	//for (var i = 0; dataset.values.length; i++) {
	//user.coligada = dataset.values[i]["CODCOLIGADACHEFE"];
	//user.chapa = dataset.values[i]["CHAPACHEFE"];
	//user.nome = dataset.values[i]["NOMECHEFE"];


	constraints = new Array();
	dataset = null;

	constraints.push(DatasetFactory.createConstraint("CODCOLIGADA", user.coligada, user.coligada, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("CHAPA", user.chapa, user.chapa, ConstraintType.MUST));
	dataset = DatasetFactory.getDataset("ds_funcionariosAtivos", null, constraints, null);


	if (dataset.values.length > 0) {
		user.email = dataset.values[0]["EMAIL"];

		const IdFlgGestor = getUserByMail(dataset.values[0]["EMAIL"]);

		if (IdFlgGestor.colleagueId != "") {
			user.idfluig = IdFlgGestor.colleagueId;

		} else {

			FLUIGC.toast({
				title: 'Atenção: ',
				message: 'Gestor não cadastrado no Conecta.',
				type: 'danger'
			});
		}

	} else {

		FLUIGC.toast({
			title: 'Atenção: ',
			message: 'Gestor do solicitante não localizado.',
			type: 'danger'
		});
	}

	return user;
};

function ajustaContainerBeneficiario() {

	if ($('#terceirosim').is(':checked')) {
		$("#div_beneficiario").show()
		$("#div_gestorSol").hide()

	} else {
		$("#div_beneficiario").hide()
		$("#div_gestorSol").show()
	}
}


// Recupera informações do gestor
function validaFornedorc(cpfFunc) {

	var constraints = new Array();
	var dataset = null;
	var lRetorno = false

	if (cpfFunc != "undefined" && cpfFunc != "") {

		constraints.push(DatasetFactory.createConstraint("cnpjcpf", cpfFunc, cpfFunc, ConstraintType.MUST));
		dataset = DatasetFactory.getDataset("ds_fornecedor", null, constraints, null);

		if (dataset.values.length > 0) {
			lRetorno = true

			if (dataset.values[0].CODFOR == '') {

				FLUIGC.toast({
					title: 'Atenção: ',
					message: 'Solicitante não cadastrado como Fornecedor no sistema. Por favor abrir solicitação para cadastro no Conecta antes de iniciar a solicitação de reembolso.',
					type: 'danger'
				});

				return false;

			}

			let codfor = dataset.values[0].CODFOR
			let lojafor = dataset.values[0].LOJAFOR
			let constraintsBf = []
			let datasetBf
			let tipConta = ""

			let constraintsPf = []
			let datasetPf

			if (codfor) {
				//Recupera conta do Fornecedor
				constraintsBf.push(DatasetFactory.createConstraint("codfor", codfor, codfor, ConstraintType.MUST));
				constraintsBf.push(DatasetFactory.createConstraint("lojafor", lojafor, lojafor, ConstraintType.MUST));
				datasetBf = DatasetFactory.getDataset("ds_bancoFornecedor", null, constraintsBf, null);

				if (datasetBf.values.length > 0) {

					window["zoomBanco"].setValue(datasetBf.values[0].DESCCOD)
					window["zoomBanco"].disable(true)
					$("#codBanco").val(datasetBf.values[0].CODBANCO)
					$("#agenciaFavorecido").val(datasetBf.values[0].ANGENCIA)
					$("#agenciaFavorecido").prop("readonly", true)
					$("#contaFavorecido").val(datasetBf.values[0].CONTA)
					$("#contaFavorecido").prop("readonly", true)
					$("#dvCta").val(datasetBf.values[0].DIGTOCTA)
					$("#dvCta").prop("readonly", true)
					if (datasetBf.values[0].TIPO == '1') {
						tipConta = '01'
					} else {
						tipConta = '02'
					}
					$("#tipoContaFavorecido").val(tipConta)
					disablefield("#div_tipConta");




				}
				//Recupera PIX do Fornecedor
				constraintsPf.push(DatasetFactory.createConstraint("codfor", codfor, codfor, ConstraintType.MUST));
				constraintsPf.push(DatasetFactory.createConstraint("lojafor", lojafor, lojafor, ConstraintType.MUST));
				datasetPf = DatasetFactory.getDataset("ds_pixFornecedor", null, constraintsPf, null);

				if (datasetPf.values.length > 0) {


					//window["zoomBanco"].disable(true)
					$("#tipChavePix").val(datasetPf.values[0].TIPOCHV)
					disablefield("#div_tipChv");
					$("#chavePixFavorecido").val(datasetPf.values[0].CHAVEPIX)
					$("#chavePixFavorecido").prop("readonly", true)
					$("#chaveCad").val('1');




				}


			}
		}

	}

	if (!lRetorno) {

		FLUIGC.toast({
			title: 'Atenção: ',
			message: 'Solicitante não cadastrado como Fornecedor no sistema. Por favor abrir solicitação para cadastro no Conecta antes de iniciar a solicitação de reembolso.',
			type: 'danger'
		});

	}



	return lRetorno;
};




