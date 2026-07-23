function servicetask39(attempt, message) {

	var tipo = String(hAPI.getCardValue("tipo"))

	var params = {

		"chave" : "c8ZKRwZz8HyPMPQIlziD",
		"grupoProduto" : String(hAPI.getCardValue("grupoProduto")),
		"tipo" : tipo.trim(),
		"descricaoProduto" : String(hAPI.getCardValue("descricaoProduto")),
		"descDetalhada" : String(hAPI.getCardValue("descDetalhada")),
		"unidade" : String(hAPI.getCardValue("unidade")),
		"armazem" : "01",
		"tePadrao" : String(hAPI.getCardValue("tePadrao")),
		"posicaoIPI" : String(hAPI.getCardValue("posicaoIPI")),
		"origem" : String(hAPI.getCardValue("origem")),
		"codISS" : String(hAPI.getCardValue("codISS")),
		"calculaINSS" : String(hAPI.getCardValue("calculaINSS")),
		"impostoRenda" : String(hAPI.getCardValue("impostoRenda")),
		"retemPIS" : String(hAPI.getCardValue("retemPIS")),
		"retemCOF" : String(hAPI.getCardValue("retemCOF")),
		"retemCSLL" : String(hAPI.getCardValue("retemCSLL")),
		"aliquotaICMS" : String(hAPI.getCardValue("aliquotaICMS")),
		"classificacaoFiscal" : String(hAPI.getCardValue("classificacaoFiscal")),
		"contaContabil" : String(hAPI.getCardValue("contaContabil")),
		// NÃO EXISTE NO SERVICO
		"contaCustoIndireto" : String(hAPI.getCardValue("contaCustoIndireto")),
		"contaCustoDireto" : String(hAPI.getCardValue("contaCustoDireto")),
		"contaDesconto" : String(hAPI.getCardValue("contaDesconto")),
		"contaDespComercial" : String(hAPI.getCardValue("contaDespComercial")),
		"contaDespAdm" : String(hAPI.getCardValue("contaDespAdm")),
		"contaInvestimento" : String(hAPI.getCardValue("contaInvestimento")),
		// EXISTE NO SERVICO E NAO EXISTE NO FORM
		"contaCustoIndiretoPF" : "",
		"contaCustoIndiretoPJ" : "",
		"contaCustoDiretoPF" : "",
		"contaCustoDiretoPJ" : "",
		"contaDespComercialPF" : "",
		"contaDespComercialPJ" : "",
		"despPjMant" : "",
		"despPfMant" : ""
	}
	
	log.dir(params)

	var service = fluigAPI.getAuthorizeClientService();

	var options = { 
		companyId : getValue('WKCompany') + '',
		serviceCode : 'REST_PROTHEUS',
		endpoint : '/clariens/produto/inclusao',
		method : 'POST',
		params : params,
		timeoutService : '100',
		headers : {
			Connection : 'close'
		}
	}
	
	log.dir(options)

	var response = service.invoke(JSON.stringify(options));
	var data = JSON.parse(response.getResult());

	if ((data.Code == 400)) {
		reterro = data.Message;
		throw ("Erro retorno: " + reterro);
	} else if (data.Code != 200) {
		throw ("Erro retorno: Verificar erro integração.");
	}

	hAPI.setCardValue("newcadprod", data.Message)

}