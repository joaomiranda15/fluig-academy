$(document).ready(function() {

	// altero nome botao enviar fluig
	if (currentTask == 4 || currentTask == 0) {
		parent.$("button[data-send]").text("Iniciar Processo");

	} else {
		parent.$("button[data-send]").text("Concluir tarefa");
	}

	asteriscosObrigatorios('obrigatorio')
	
	ajsutaBotaoHistorico(); // Ajusta o botão de histórico com base nas condições

	// MASCARAS DOS CAMPOS
	var behavior = function(val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	}, options = {
		onKeyPress : function(val, e, field, options) {
			field.mask(behavior.apply({}, arguments), options);
		}
	};
	$('input[name="telefone"]').mask(behavior, options);
	if (currentTask == 4 || currentTask == 0){
		let hidedivs = "#formBackground,#formAprovCot,#formAvaliacao";;
		// Escondo campo
		hidediv(hidedivs);
	}

	disablefield("#formSolicitacao");

	if (currentTask == 4 || currentTask == 0 || currentTask == 18) {
		
		// Recupera informações de usuário e empresa
		const mail = parent.WCMAPI.userEmail;
		const user = parent.WCMAPI.user;
		const DadosFuncRM = getDadosFunc(mail);
		const DadosFuncFluig = getUserByMail(mail);
		const coligada = getDadosColigada(DadosFuncRM.CODCOLIGADA);

		// Preencher cabeçalho
		document.getElementById("empresa").value = coligada.NOMECOLIGADA
		document.getElementById("codColigadaSol").value = coligada.CODCOLIGADA
		document.getElementById("departamento").value = DadosFuncRM.DEPARTAMENTO
		document.getElementById("nomeCompleto").value = DadosFuncRM.NOME
		document.getElementById("email").value = mail// DadosFuncRM.EMAIL
		document.getElementById("cargo").value = DadosFuncRM.DESCFUNCAO
		document.getElementById("matricula").value = DadosFuncRM.CHAPA
		document.getElementById("telefone").value = DadosFuncRM.TELEFONE1


	} 
	if (currentTask == 5) {

		let divs = "#dadosColaborador,#formAprovCot,#formAvaliacao";
		//let hidedivs = "#formAvaliacao";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
		//hidediv(hidedivs);
		
		$('input[name="background"]').prop('checked', false);
		
		if (!$("#avaliacaoSIM").is(':checked') && !$("#avaliacaoNAO").is(':checked')) {
			$("#formAvaliacao").hide()
		}
	}else if (currentTask == 11) {

		let divs = "#formBackground,#formAprovCot";
	//	let hidedivs = "#formAvaliacao";
		// desabilita campo
		disablefield(divs);
		// Escondo campo
	//	hidediv(hidedivs);
	}else if (currentTask == 18) {

		//let divs = "#formBackground,#formAvaliacao";
		let hidedivs = "#formBackground,#formAvaliacao";
		// desabilita campo
		//disablefield(divs);
		// Escondo campo
		hidediv(hidedivs);
	}
	//VALIDAR SOLICITACAO DE COMPRA
	//Obrigar preencher obs caso reprovado
	$('input[name=solvalidada]').change(function() {

		if ($("#SIM").is(':checked') === true) {
			$("#containerObsValidada").hide()
		} else if ($("#NAO").is(':checked') === true) {
			$("#containerObsValidada").show()
		}

	});
	
	
	
	if ($('input[name="AprovCot"]:checked').val() == 'SIM') {

		alteraClasses('labelCotacao', 2)

	} else {
		alteraClasses('labelCotacao', 1)
	}

	$('#AprovCotNAO,#AprovCotSIM').on('change', function() {

		if (this.value == "SIM") {

			alteraClasses('labelCotacao', 2)
		} else {

			alteraClasses('labelCotacao', 1)

		}

	});
	
	
	if ($('input[name="background"]:checked').val() == 'SIM') {

		alteraClasses('labelCheck', 2)

	} else {
		alteraClasses('labelCheck', 1)
	}

	$('#backgroundSIM,#backgroundNAO').on('change', function() {

		if (this.value == "SIM") {

			alteraClasses('labelCheck', 2)
		} else {

			alteraClasses('labelCheck', 1)

		}

	});
	
	
	
	if ($('input[name="avaliacao"]:checked').val() == 'SIM') {

		alteraClasses('labelAvaliacao', 2)

	} else {
		alteraClasses('labelAvaliacao', 1)
	}

	$('#avaliacaoNAO,#avaliacaoSIM').on('change', function() {

		if (this.value == "SIM") {

			alteraClasses('labelAvaliacao', 2)
		} else {

			alteraClasses('labelAvaliacao', 1)

		}

	});

	// altero nome botao enviar fluig
	if (currentTask == 4 || currentTask == 0) {
		parent.$("button[data-send]").text("Iniciar Processo");
	} else {
		parent.$("button[data-send]").text("Concluir tarefa");
	}
	
	
	$('.rowStatusHist').each(function () {
	    var status = $(this).find('.statusHistorico').val();

	    if (status === 'Sim') {
	        $(this).css('background-color', '#d4edda'); // verde claro
	    } else if (status === 'Não') {
	        $(this).css('background-color', '#f8d7da'); // vermelho claro
	    } else if (status === 'Revisar') {
            $(this).css('background-color', '#fff3cd'); // amarelo claro
        }
	});

});


function  alteraClasses (idLabel, tipo)  {
    const labelElement = document.getElementById(idLabel); // Seleciona o elemento <label>

    if (tipo == 1) {
        // Adicionar a classe "obrigatorio"
        labelElement.classList.add('obrigatorio')
    } else if (tipo == 2) {
        // Remover a classe "obrigatorio"
        labelElement.classList.remove('obrigatorio');
    }
}


//GRAVAR HISTORICO
function gravaHistorico(currentTask) {

    // Grava um registro no histórico com base na tarefa atual
    const now = getCurrentDateTime();
    const user = parent.WCMAPI.user;

    // Mapeia os campos de observação por tarefa
    const campo = {
        "5": "#obsBackground",
        "11": "#obsValidada"
    };
    const campoID = campo[currentTask] || '';
    let historico = $(campoID).val();

    // Mapeia as descrições das atividades por tarefa
    const descAtividade = {
        "4": "Início",
        "18": "Validação de Cotação",
        "5": "Análise compliance",
        "11": "Avaliar Demanda"
    };
    const sDescricao = descAtividade[currentTask] || '';

    // Adiciona uma nova linha na tabela de histórico
    const indice = wdkAddChild('itenshistorico');
    $("#itemH___" + indice).val(indice);
    $("#resp___" + indice).val(user);
    $("#atividade___" + indice).val(sDescricao);
    $("#datahist___" + indice).val(now);
    $("#observacao___" + indice).val(historico);
    $("#statusHistorico___" + indice).val(getStatusHistorico(currentTask));


    verificaPaiFilhoH(".id-itemH");
}

function verificaPaiFilhoH(nomeclass) {
    // Verifica se há linhas na tabela de histórico e ajusta a visibilidade da div
    let qtdlinhas = 0;
    $(nomeclass).each(function (novo_index) {
        let idcampo = this.id;
        if (idcampo.indexOf("___") != -1) {
            qtdlinhas++;
        }
    });
    $("#div_historico").css('display', qtdlinhas > 0 ? '' : 'none');
    return qtdlinhas;
}

function ajsutaBotaoHistorico() {

    const campos = $("input[name*='resp___']");

    if (campos.length == 0) {
        $('.openbtn').hide();
    }

}

function toggleSidebar() {
    const sidebar = document.getElementById("myCustomSidebar");
    const button = document.querySelector(".btn.openbtn"); // Seleciona o botão pelo seletor
    const isOpen = sidebar.style.width === "1000px";

    sidebar.style.width = isOpen ? "0" : "1000px";
    button.textContent = isOpen ? "Visualizar Histórico" : "Fechar Histórico"; // Altera o texto do botão
}

function closeSidebar() {
    const button = document.querySelector(".btn.openbtn"); // Seleciona o botão pelo seletor
    document.getElementById("myCustomSidebar").style.width = "0";
    button.textContent = "Visualizar Histórico"; // Altera o texto do botão
}

function getCurrentDateTime() {
    // Retorna a data e hora atual formatada como DD/MM/AAAA HH:MM:SS
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

function getStatusHistorico(currentTask) {

    let status = "";

    // Mapeia os status do histórico por tarefa
    if (currentTask == 5) {
        const decisao = String($('input[name="background"]:checked').val()).toUpperCase()

        if (decisao == "SIM") {
            status = "Sim";
        } else if (decisao == "NAO") {
            status = "Revisar";
        } 
    } else if (currentTask == 11) {
        const decisao = String($('input[name="avaliacao"]:checked').val()).toUpperCase()

        if (decisao == "SIM") {
            status = "Sim";
        } else if (decisao == "NAO") {
            status = "Não";
        } 
    } 

    return status;
}
