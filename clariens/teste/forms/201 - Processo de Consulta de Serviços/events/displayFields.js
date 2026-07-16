function displayFields(form, customHTML) {
	var activity = getValue('WKNumState');
	var numProc = getValue('WKNumProces');
	var cardId = getValue("WKCardId");
	form.setShowDisabledFields(true); //ajustar campos antes de assumir tarefa
	form.setHidePrintLink(true); //tirar botao imprimir

	customHTML.append("<script>");
	customHTML.append("var currentTask='" + activity + "';");
	customHTML.append("var cardId='" + cardId + "';");
	customHTML.append("var currentProc='" + numProc + "';");
	customHTML.append("var modForm = '" + form.getFormMode() + "';");
	customHTML.append("</script>")

	if (activity == 4 || activity == 0) {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
		var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
		form.setValue('dataSolicitacao', day + '/' + month + '/' + year);
	}

	

	var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : 4;
	var MOBILE = form.getMobile();
	var MODE = form.getFormMode()
	
	//var usuarioCorrente = fluigAPI.getUserService().getCurrent();
	var customJS = "<script>";
	customJS += "function getAtividade(){ return '" + ATIVIDADE + "'};";
	customJS += "function getMode(){ return '" + MODE + "'};";
	customJS += "function getMobile(){ return " + MOBILE + "};";
	//customJS += "displayBtnFiles();";
	//customJS += "tableLineCount();";
	customJS += "</script>"
	customHTML.append(customJS)
	
	
}
