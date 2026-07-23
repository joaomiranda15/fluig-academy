///////////////////////////////////////////////////////
//VALIDACAO CAMPOS FORMULARIO
//numState:	número da atividade atual	int
//nextState: número da atividade destino	int
/////////////////////////////////////////////////////
var beforeSendValidate = function(numState, nextState) {
	
	
	//ajusto o painel do form
	parent.$("#informationsTab").removeClass("active")
	parent.$("#informations-tab").removeClass("active in")
	parent.$("#historicTab").removeClass("active")
	parent.$("#historic-tab").removeClass("active in")
	parent.$("#tab-attachments").removeClass("active")
	parent.$("#attachments-tab").removeClass("active in")

	parent.$("#formTab").addClass("active")
	parent.$("#form-tab").addClass("active in")

	arrError = []; // global
	campoObrig = []; // global
	var obrigatorios = $('.obrigatorio:visible');
	var mostraAnexo = $('.mostra:visible');

	verificaCampos(obrigatorios)

	if (numState == 0 || numState == 4) {

		let valorReembolso = currencyToNumber($("#valorReembolso").val());

		if (valorReembolso == 0) {
			arrError.push(`Informe ao menos uma despesa para reembolso.`)
		}

		if ($("#idFlgGest").val() == "") {
			arrError.push('Gestor do solicitante não localizado.')
		}

		if ($("#emailGest").val() == "") {
			arrError.push('Gestor não localizado no Conecta.')
		}

		if ($("#idFlgGestCC").val() == "") {
			arrError.push('Gestor do centro de custo não localizado.')
		}

		let fornecCad = false
		if ($('#terceirosim').is(':checked')) {
			fornecCad = validaFornedorc($("#cpfBeneficiario").val())
		} else if ($('#terceironao').is(':checked')){
			fornecCad = validaFornedorc($("#cpfSolicitante").val())
		}

		if (!fornecCad) {
			arrError.push('Solicitante não cadastrado como Fornecedor no sistema. Por favor abrir solicitação para cadastro no Conecta antes de iniciar a solicitação de reembolso.')
		}

		// Modalidade de pagamento: exige ao menos uma completa (conta bancária OU PIX)
		// Campos que compõem cada modalidade (usados para destacar em vermelho os vazios)
		var camposConta = ["#tipoContaFavorecido", "#zoomBanco", "#agenciaFavorecido", "#contaFavorecido", "#dvCta"];
		var camposPix = ["#tipChavePix", "#chavePixFavorecido"];

		var contaPreenchida = $("#tipoContaFavorecido").val() != "" || $("#codBanco").val() != "" || $("#agenciaFavorecido").val() != "" || $("#contaFavorecido").val() != "" || $("#dvCta").val() != "";
		var contaCompleta = $("#tipoContaFavorecido").val() != "" && $("#codBanco").val() != "" && $("#agenciaFavorecido").val() != "" && $("#contaFavorecido").val() != "" && $("#dvCta").val() != "";

		var pixPreenchido = $("#tipChavePix").val() != "" || $("#chavePixFavorecido").val() != "";
		var pixCompleto = $("#tipChavePix").val() != "" && $("#chavePixFavorecido").val() != "";

		// Marca os campos vazios de uma modalidade para destaque em vermelho (padrão campoObrig)
		function destacaModalidade(campos) {
			for (var c = 0; c < campos.length; c++) {
				var campoDest = $(campos[c]);
				if (campoDest.val() == "" || campoDest.val() == null) {
					campoObrig.push(campoDest);
				}
			}
		}

		if (!contaCompleta && !pixCompleto) {
			arrError.push('Informe os dados bancários (Tipo da conta, Banco, Agência, Conta e DV) ou a chave PIX (Tipo da chave e Chave PIX) para pagamento.')
			destacaModalidade(camposConta)
			destacaModalidade(camposPix)
		} else {
			if (contaPreenchida && !contaCompleta) {
				arrError.push('Preencha todos os dados bancários: Tipo da conta, Banco, Agência, Conta e DV.')
				destacaModalidade(camposConta)
			}
			if (pixPreenchido && !pixCompleto) {
				arrError.push('Preencha os dados do PIX: Tipo da chave e Chave PIX.')
				destacaModalidade(camposPix)
			}
		}

		// Reaplica o destaque em vermelho incluindo os campos de pagamento adicionados acima
		destacaCampObrigatorio()

	}

	// mostra os erros
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
	}
}
