/**
 * Id dos botoes de zoom sem prefixo. Funcao de retorno dos dados selecionados
 * no zoom.
 * 
 * @param selectedItem:Dados retornados pelo zoom.
 * @return void.
 */
function setSelectedZoomItem(selectedItem) {

	if (selectedItem.inputId == 'zoomEmpresaFilial') {

		$('#codColigada').val(selectedItem.CODCOLIGADA);

		var filialProtheus = selectedItem.FILIALPROTHEUS

		if (filialProtheus == '080101') {

			FLUIGC.message.alert({
				message: 'Atenção! Atenção! A filial selecionada está inativa no Protheus. Qualquer dúvida acionar o departamento de compras!',
				title: 'Atenção',
				label: 'OK'
			}, function (el, ev) {
				// do something after closing
			});

			window['zoomEmpresaFilial'].clear();
		} else {

			$('#filialProtheus').val(filialProtheus);
			reloadZoomFilterValues('zoomCentroCusto', "CODFILIAL," + filialProtheus);
			window['zoomCentroCusto'].clear();
		}

	} else if (selectedItem.inputId == 'zoomCentroCusto') {

		$('#codCusto').val(selectedItem.CODCUSTO);
		$('#codFilial').val(selectedItem.CODFILIAL);
		$('#codAprov').val(selectedItem.CODAPROV);
		$('#emailAprov').val(selectedItem.EMAILAPROV);
		$('#nomeAprov').val(selectedItem.NOMEAPROV);

		const IdFlgGestorCC = getUserByMail(selectedItem.EMAILAPROV);

		if (IdFlgGestorCC.colleagueId != "") {

			$('#idFlgGestCC').val(IdFlgGestorCC.colleagueId);

		} else {

			FLUIGC.toast({
				title: 'Atenção: ',
				message: 'Gestor do centro de custo não cadastrado no Fluig.',
				type: 'danger'
			});
		}

	} else if (selectedItem.inputId.indexOf("tipoDespesa___") != -1) {

		var indice = selectedItem.inputId.split("___")[1]
		$('#limiteReembolso___' + indice).val(selectedItem.limiteDiario);

		atualizarTabela()

	} else if (selectedItem.inputId == 'zoomBeneficiario') {

		// Gestor do solicitante neficiario
		let coligadaFunc = selectedItem.CODCOLIGADA
		let codsecaoFunc = selectedItem.CODSECAO
		let dadosGestor = getDadosGestor(coligadaFunc, codsecaoFunc)
		$("#gestorBeneficiario").val(dadosGestor.nome)
		$("#idFlgGest").val(dadosGestor.idfluig)
		$("#emailGest").val(dadosGestor.email)
		$("#cpfBeneficiario").val(selectedItem.CPF)
		$("#coligBeneficiario").val(coligadaFunc)
		$("#matBeneficiario").val(selectedItem.CHAPA)
		$("#emailBeneficiario").val(selectedItem.EMAIL)

		validaFornedorc(selectedItem.CPF)

	
	  }


}

/**
 * Esta função será disparada ao eliminar uma tag (valor) do zoom. A partir
 * deste evento, o valor eliminado poderá ser manipulado, por exemplo, para
 * controlar outros campos que dependem deste valor eliminado.
 */
function removedZoomItem(removedItem) {

	if (removedItem.inputId == 'zoomEmpresaFilial') {

		$('#codColigada').val("");
		//reloadZoomFilterValues('zoomFavorecido', "CODCOLIGADA,''");
		//window['zoomFavorecido'].clear();

	} else if (removedItem.inputId == 'zoomCentroCusto') {

		$('#codCusto').val("");
		$('#codFilial').val("");
		$('#codAprov').val("");

	} else if (removedItem.inputId == "zoomFavorecido") {

		$('#emailFavorecido').val("");
		$('#cargoFavorecido').val("");
		$('#cpfFavorecido').val("");

	} else if (removedItem.inputId.indexOf("tipoDespesa___") != -1) {

		var indice = removedItem.inputId.split("___")[1];
		$('#limiteReembolso___' + indice).val('');
		

	} else if (removedItem.inputId == "zoomBeneficiario") {

		$("#gestorBeneficiario").val('')
		$("#idFlgGest").val('')
		$("#emailGest").val('')
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
	}

}


function activeAutoComp(idcampo) {

	var filcamp = ""

	if (window['AC_' + idcampo]) {

		window['AC_' + idcampo].removeAll();
		window['AC_' + idcampo].destroy();
	}

	window['AC_' + idcampo] = FLUIGC.autocomplete('#' + idcampo, {
		source: {
			url: '/api/public/ecm/dataset/search?datasetId=ds_naturezas&searchField=cnscodnome&',
			/*
			 * Também poderia ser informada a URL completa:
			 * 'http://{host}:{port}/api/public/ecm/dataset/search?datasetId=colleague&searchField=colleagueName&'
			 * É importante manter o "&" no final da URL, pois os outros parâmetros são montados sem
			 * levar em consideração que já possa haver algo parametrizado no próprio link
			 */
			contentType: 'application/json',
			root: 'content',
			pattern: '',
			limit: 10,
			offset: 0,
			patternKey: 'searchValue',
			/*
			 * Para que a consulta funcione, é importante que o valor do 'patternKey' seja sempre
			 * 'searchValue' para o caso de zoom de dataset
			 */
			limitkey: 'limit',
			offsetKey: 'offset'

		}, // substringMatcher(states),
		displayKey: 'CODDESC',
		tagClass: 'label label-default',
		type: 'tagAutocomplete',
		minLength: 3,
		tagMaxWidth: 400,
		maxTags: 1
	});

	if (!window['controleItemadd']) {

		window['AC_' + idcampo].on("fluig.autocomplete.itemAdded", function (event) {

			let itemSelecionado = event.item;
			$('#codNatureza').val(itemSelecionado.CODIGO);

		});

		window['AC_' + idcampo].on("fluig.autocomplete.itemRemoved", function (event) {

			let itemSelecionado = event.item;
			$('#codNatureza').val('');

		});

		window['controleItemadd'] = 'carregado';

	}
}
