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
	var iControl = 0;

	verificaCampos(obrigatorios)
	

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
	}else{
		
		//controle background
		if(numState == 5 ){
			console.log("Valor de #controlBack:", $("#controlBack").val());
			
			
			var currentValue = parseInt($("#controlBack").val(), 10);
			
			if (isNaN(currentValue)) {
			    currentValue = 0;
			}
			
			iControl = currentValue + 1;
			$("#controlBack").val(iControl);
			
		}
		
		if (numState == 5) {
			gravaHistorico(numState);
		}

	}
}
