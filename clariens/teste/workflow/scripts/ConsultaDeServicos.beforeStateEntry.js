function beforeStateEntry(sequenceId){
	if (sequenceId == 9) {
        throw "Erro aqui." + hAPI.getCardValue("avalsolicitacao") + " " + hAPI.getCardValue("#tipoServico")
    }

}