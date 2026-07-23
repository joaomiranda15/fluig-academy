/**
 * Id dos botoes de zoom sem prefixo.
 * Funcao de retorno dos dados selecionados no zoom.
 *
 * @param selectedItem: Dados retornados pelo zoom.
 * @return void.
 */
function setSelectedZoomItem(selectedItem) {

	if (selectedItem.inputId == 'zoomGrupo') {

		$('#grupoProduto').val(selectedItem.CODGRUPO);

	} else if (selectedItem.inputId == 'zoomTipo') {

		$('#tipo').val(selectedItem.CODTIPO);

	} else if (selectedItem.inputId == 'zoomUnidade') {

		$('#unidade').val(selectedItem.CODMEDIDA);

	} else if (selectedItem.inputId == 'zoomTePad') {

		$('#tePadrao').val(selectedItem.CODTES);

	} else if (selectedItem.inputId == 'zoomOrigem') {

		$('#origem').val(selectedItem.CODIGO);

	} else if (selectedItem.inputId == 'zoomCodISS') {

		$('#codISS').val(selectedItem.CODIGO);

	} else if (selectedItem.inputId == 'zoomContaContabil') {

		$('#contaContabil').val(selectedItem.CODCONTA);

	} else if (selectedItem.inputId == 'zoomcontaCustoIndireto') {

		$('#contaCustoIndireto').val(selectedItem.CODCONTA);

	} else if (selectedItem.inputId == 'zoomcontaCustoDireto') {

		$('#contaCustoDireto').val(selectedItem.CODCONTA);

	} else if (selectedItem.inputId == 'zoomcontaDesconto') {

		$('#contaDesconto').val(selectedItem.CODCONTA);

	} else if (selectedItem.inputId == 'zoomcontaDespComercial') {

		$('#contaDespComercial').val(selectedItem.CODCONTA);

	} else if (selectedItem.inputId == 'zoomcontaDespAdm') {

		$('#contaDespAdm').val(selectedItem.CODCONTA);

	} else if (selectedItem.inputId == 'zoomcontaInvestimento') {

		$('#contaInvestimento').val(selectedItem.CODCONTA);

	} 
}

/**
	Esta função será disparada ao eliminar uma tag (valor) do zoom. 
	A partir deste evento, o valor eliminado poderá ser manipulado, por exemplo, 
	para controlar outros campos que dependem deste valor eliminado. 
*/
function removedZoomItem(removedItem) {

	if (removedItem.inputId == "zoomGrupo") {

		$('#grupoProduto').val('');

	} else if (removedItem.inputId == "zoomTipo") {

		$('#tipo').val('');

	} else if (removedItem.inputId == "zoomUnidade") {

		$('#unidade').val('');

	} else if (removedItem.inputId == "zoomTePad") {

		$('#tePadrao').val('');

	} else if (removedItem.inputId == "zoomOrigem") {

		$('#origem').val('');

	} else if (removedItem.inputId == "zoomCodISS") {

		$('#codISS').val('');

	} else if (removedItem.inputId == "zoomContaContabil") {

		$('#contaContabil').val('');

	} else if (removedItem.inputId == "zoomcontaCustoIndireto") {

		$('#contaCustoIndireto').val('');

	} else if (removedItem.inputId == "zoomcontaCustoDireto") {

		$('#contaCustoDireto').val('');

	} else if (removedItem.inputId == "zoomcontaDesconto") {

		$('#contaDesconto').val('');

	} else if (removedItem.inputId == "zoomcontaDespComercial") {

		$('#contaDespComercial').val('');

	} else if (removedItem.inputId == "zoomcontaDespAdm") {

		$('#contaDespAdm').val('');

	} else if (removedItem.inputId == "zoomcontaInvestimento") {

		$('#contaInvestimento').val('');

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
            url: '/api/public/ecm/dataset/search?datasetId=ds_produtos&searchField=cnscodnome&',
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
        displayKey: 'CODNOMPROD',
        tagClass: 'label label-default',
        type: 'tagAutocomplete',
        minLength: 3,
        tagMaxWidth: 400,
        maxTags: 1
    });

    if (!window['controleItemadd']) {

        window['AC_' + idcampo].on("fluig.autocomplete.itemAdded", function (event) {

            let itemSelecionado = event.item;

        });

        window['AC_' + idcampo].on("fluig.autocomplete.itemRemoved", function (event) {

            let itemSelecionado = event.item;

        });

        window['controleItemadd'] = 'carregado';

    }
}