function servicetask17(attempt, message) {

	var attachments = hAPI.listAttachments();
	var solicitação = hAPI.getCardValue("SOLIC");
	var itemSolicitacao = "1"//hAPI.getCardValue("ITEM_SOLICITACAO");
	var servico = hAPI.getCardValue("SERVICO");
	var documentBase64 = ""
	var DescDocto = ""
	var extensao = ""
	var tamanho = ""
	var tipo = ""
	var comentario = hAPI.getCardValue("descricao") + " " + hAPI.getCardValue("complementoSolicitacao")

	if (hAPI.getCardValue("avalsolicitacao") == "validado" &&
		(hAPI.getCardValue("TIPO_SERVICO").toUpperCase() == "14 - ENVIO DE DIPLOMA" ||
			hAPI.getCardValue("TIPO_SERVICO").toUpperCase() == "14  ENVIO DE DIPLOMA")) {

		comentario = hAPI.getCardValue("descricaoPlaneAcad");
	}

	//se solicitação for do lyceum
	if (solicitação != "" && solicitação != null) {

		// Percorre os anexos do processo
		for (var i = 0; i < attachments.size(); i++) {

			var attachment = attachments.get(i);
			var idDocumento = attachment.getDocumentId()
			var descDocumento = attachment.getDocumentDescription()

			// Verifica se o documento é um anexo do Lyceum
			if (descDocumento.indexOf("Anexo_Lyceum_") !== -1) {
				continue;
			}

			// Busca o anexo no formato base64
			var constraints = new Array();
			constraints.push(DatasetFactory.createConstraint("idDocument", idDocumento, idDocumento, ConstraintType.MUST));
			var dsBase64 = DatasetFactory.getDataset("ds_parseDocumentToBase64", null, constraints, null)

			if (dsBase64 != null && dsBase64.rowsCount > 0) {

				documentBase64 = String(dsBase64.getValue(0, "documentBase64"))
				DescDocto = String(dsBase64.getValue(0, "descricao"))
				extensao = String(dsBase64.getValue(0, "extensao"))
				tamanho = String(dsBase64.getValue(0, "tamanho"))
				tipo = String(dsBase64.getValue(0, "tipo"))

				var message = String(dsBase64.getValue(0, "message"))
				if (message != "SUCESSO") {
					throw "Erro ao gerar anexo: " + message;
				}
			}
		}

		// Atualiza o Lyceum
		atualizaLiceum(solicitação, documentBase64, DescDocto, extensao, tamanho, tipo, itemSolicitacao, servico, comentario)
	}
}

function atualizaLiceum(solicitação, documentBase64, DescDocto, extensao, tamanho, tipo, itemSolicitacao, servico, comentario) {

	var clientService = fluigAPI.getAuthorizeClientService();
	var data = {
		companyId: getValue('WKCompany') + '',
		serviceCode: 'rest_lyceum',
		endpoint: '/comum/tipo/custom/titulo/PR_CLARIENS_POST_LY_ANDAMENTO_SERVICOS_DOCENTE/consultaDinamica',
		method: 'post',// 'delete', 'patch', 'put', 'get'
		timeoutService: '100', // segundos
		params: {

			SERVICO: String(servico)
			, PASSO: "1"
			, SOLICITACAO: String(solicitação)
			, ITEM_SOLICITACAO: String(itemSolicitacao)
			, COMENTARIO: String(comentario) //"Solciitação de Serviço numero " + String(getValue("WKNumProces")) + " finalizada."
			, NOME_ARQ: String(DescDocto)
			, TAMANHO: String(tamanho)
			, EXTENSAO: String(extensao)
			, TIPO: String(tipo)
			, ARQUIVO: String(documentBase64)
		},
	}



	var vo = clientService.invoke(JSON.stringify(data));
	//var objret = JSON.parse(vo.getResult());

	if (vo.getHttpStatusResult() != 200) {
		throw 'Erro ao integrar com o Lyceum: ' + vo.getResult();
	}


}
