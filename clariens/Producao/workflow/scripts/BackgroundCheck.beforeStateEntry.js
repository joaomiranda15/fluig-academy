function beforeStateEntry(sequenceId) {
    var numproc = getValue("WKNumProces"); // Número do processo atual
    var documentid = getValue("WKCardId"); // ID do documento atual
    var background =  hAPI.getCardValue("background") 

    if (sequenceId == 9 && background == "SIM") {
        try {

            var numproc = getValue("WKNumProces");
            var logProcesao = '';
            var corComent = ''

            // Configurações iniciais do novo processo
            var startProc = "ElaboracaoDeContratos";
            var ativDest = 0;
            var usuarios = new java.util.ArrayList();
            var valoresForm = new java.util.HashMap();

            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
            var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
            var dataSolicitacao = day + '/' + month + '/' + year;

            // Mensagem de observação formatada
            var obsProc = '<span style="color:#FF8000">' +
                '<span class="fluigicon fluigicon-cog"></span> ' +
                'Aberto automaticamente pelo processo BackGroundCheck (' + numproc + ').</span>';

            // Adiciona usuário automático
            usuarios.add("integracaosistemasclariens");
            var colleagueId = "integracaosistemasclariens";
            var arquivoBase64 = "";
            var nomeArquivo = "";
            var fields = [
                { "fieldName": "dataSolicitacao", "fieldValue": dataSolicitacao },
                { "fieldName": "nomeCompleto", "fieldValue": "" },
                { "fieldName": "empresa", "fieldValue": "" },
                { "fieldName": "departamento", "fieldValue": "" },
                { "fieldName": "cargo", "fieldValue": "" },
                { "fieldName": "email", "fieldValue": "" },
                { "fieldName": "matricula1", "fieldValue": "" },
                { "fieldName": "telefone", "fieldValue": "" },
                { "fieldName": "numeroSC", "fieldValue": String(numproc || "") },
                { "fieldName": "BackFornecedor", "fieldValue": String(hAPI.getCardValue("nomeFornecedor") || "") },
                { "fieldName": "numContrato", "fieldValue": String(hAPI.getCardValue("numContrato") || "") },
                { "fieldName": "numCotacao", "fieldValue": String(hAPI.getCardValue("numCotacao") || "") },
                { "fieldName": "cpfFornecedorCad", "fieldValue": String(hAPI.getCardValue("cnpj") || "") },
                { "fieldName": "codFornece", "fieldValue": String(hAPI.getCardValue("codFornece") || "") },
                { "fieldName": "lojFornece", "fieldValue": String(hAPI.getCardValue("lojaFornecedor") || "") },
                { "fieldName": "background", "fieldValue": String(documentid || "") },
                { "fieldName": "filialProtheus", "fieldValue": String(hAPI.getCardValue("Filial") || "") },

            ];

            //inicia o processo elaboração de contratos
            var result = startProcess(fields, colleagueId, arquivoBase64, nomeArquivo, obsProc)
            var numsol = String(result)
            var logProcesao = '<span style="color:#FF8000">' +
                '<span class="fluigicon fluigicon-cog"></span> ' +
                'Número da solicitação de Elaboração de contratos (' + numsol + ').</span>';



            hAPI.setTaskComments(usuarios, numproc, 0, logProcesao);

        } catch (error) {
            log.error("Erro ao iniciar processo ElaboracaoDeContratos: " + error.toString());
            throw "Falha ao iniciar ElaboracaoDeContratos: " + error.message;
        }
    }
}


function startProcess(fields, idfluigsolicitante, arquivoBase64, nomeArquivo, comentario) {

    var INTEGRADOR = {
        login: "implanta.totvs@clariens.com.br",
        senha: "Ascendra1108@",
        empresa: 1,
        id: "integracaosistemasclariens"
    }

    var retornoProc = "";
    var base64Content = arquivoBase64; // Substituir com seu conteúdo Base64
    //var fileExtension = getFileExtensionFromBase64(base64Content);
    var fileName = nomeArquivo;

    var serviceHelper = getECMWorkflowEngineServiceHelper()
    var service = getECMWorkflowEngineService(serviceHelper)
    var processId = "ElaboracaoDeContratos"
    var choosedState = 0
    var colleagueIds = createStringArray(serviceHelper)
    colleagueIds.getItem().add(idfluigsolicitante)
    var comments = comentario//"Inclusão automática de processo"
    var completeTask = true
    var attachments = createProcessAttachmentDtoArray(serviceHelper, base64Content, fileName, fileName)
    var cardData = createStringArrayArray(serviceHelper, fields)
    var appointments = createProcessTaskAppointmentDtoArray(serviceHelper)
    var managerMode = false

    var retornoStartProcess = service.startProcess(
        INTEGRADOR.login,
        INTEGRADOR.senha,
        INTEGRADOR.empresa,
        processId,
        choosedState,
        colleagueIds,
        comments,
        INTEGRADOR.id,
        completeTask,
        attachments,
        cardData,
        appointments,
        managerMode
    )

    var retorno = stringArrayArrayToSimpleObject(retornoStartProcess)

    if (retorno.ERROR) {
        retornoProc = retorno.ERROR
    } else {
        retornoProc = retorno.iProcess
    }

    return retornoProc //new org.json.JSONObject(retorno).toString()//retorno.iProcess
}

function getECMWorkflowEngineServiceHelper() {
    return ServiceManager.getService("ECMWorkflowEngineService").getBean()
}

function getECMWorkflowEngineService(serviceHelper) {
    var serviceLocator = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService")
    return serviceLocator.getWorkflowEngineServicePort()
}

function createStringArray(serviceHelper) {
    return serviceHelper.instantiate('net.java.dev.jaxb.array.StringArray')
}

function createStringArrayArray(serviceHelper, fields) {

    var serviceObj = serviceHelper.instantiate('net.java.dev.jaxb.array.ObjectFactory')
    var cardData = serviceObj.createStringArrayArray()

    for (var c = 0; c < fields.length; c++) {
        var campos = serviceObj.createStringArray()
        campos.getItem().add(fields[c].fieldName)
        campos.getItem().add(fields[c].fieldValue)
        cardData.getItem().add(campos)
    }
    return cardData
}

function createProcessTaskAppointmentDtoArray(serviceHelper) {
    return serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray')
}

function stringArrayArrayToSimpleObject(stringArrayArray) {
    var objeto = {}
    for (var i = 0; i < stringArrayArray.getItem().size(); i++) {
        var item = stringArrayArray.getItem().get(i).getItem()
        objeto[item.get(0)] = item.get(1)
    }
    return objeto
}

// Cria um array de anexos para ser utilizado na chamada de startProcess
function createProcessAttachmentDtoArray(serviceHelper, base64Content, fileName, fileDescription) {

    // Instancia o array de anexos
    var ProcessAttachmentDtoArray = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray');

    if (base64Content == null || base64Content == "") {
        return ProcessAttachmentDtoArray;
    }

    // Instancia o objeto de anexo
    var ProcessAttachmentDto = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDto');
    var attachment = serviceHelper.instantiate('com.totvs.technology.ecm.workflow.ws.Attachment');

    // Decodifica o conteúdo Base64
    var decodedContent = java.util.Base64.getDecoder().decode(new java.lang.String(base64Content).getBytes('UTF-8'));

    // Configura os dados do anexo
    ProcessAttachmentDto.setAttachmentSequence(1) // Sequência do anexo
    ProcessAttachmentDto.setFileName(fileName); // Nome do arquivo
    ProcessAttachmentDto.setDescription(fileDescription); // Descrição do arquivo
    ProcessAttachmentDto.setNewAttach(true); // Indica se é um novo anexo
    ProcessAttachmentDto.setVersion(1000); // Versão do anexo

    // Configura o anexo
    attachment.setAttach(true);
    attachment.setFileName(fileName);
    attachment.setFilecontent(decodedContent);

    // Adiciona o anexo ao array de anexos
    ProcessAttachmentDto.getAttachments().add(attachment);
    ProcessAttachmentDtoArray.getItem().add(ProcessAttachmentDto);

    return ProcessAttachmentDtoArray;
}

//retorna a extensão do arquivo base64
function getFileExtensionFromBase64(base64Content) {
    // Decodificar o Base64 usando Java no Rhino
    var decodedBytes = java.util.Base64.getDecoder().decode(base64Content);

    // Convertemos os bytes decodificados para hexadecimal para inspecionar os primeiros bytes
    var hexString = '';
    for (var i = 0; i < decodedBytes.length && i < 4; i++) { // Pegamos os primeiros 4 bytes
        hexString += ('0' + (decodedBytes[i] & 0xFF).toString(16)).slice(-2).toUpperCase();
    }

    // Função para simular o startsWith
    function startsWith(str, prefix) {
        return str.indexOf(prefix) === 0;
    }

    // Verificamos o tipo de arquivo com base nos primeiros bytes
    if (startsWith(hexString, "D0CF11E0")) {
        return "doc"; // Arquivo Word (.doc)
    } else if (startsWith(hexString, "504B0304")) {
        return "docx"; // Arquivo Word (.docx) ou ZIP
    } else if (startsWith(hexString, "25504446")) {
        return "pdf"; // Arquivo PDF (.pdf)
    } else if (startsWith(hexString, "FFD8FF")) {
        return "jpg"; // Arquivo JPEG (.jpg ou .jpeg)
    } else if (startsWith(hexString, "89504E47")) {
        return "png"; // Arquivo PNG (.png)
    } else if (startsWith(hexString, "47494638")) {
        return "gif"; // Arquivo GIF (.gif)
    } else {
        // Verificar se o arquivo é um arquivo de texto (sem assinatura específica)
        var isTextFile = true;
        for (var i = 0; i < decodedBytes.length && i < 4; i++) {
            var byteValue = decodedBytes[i] & 0xFF;
            if (byteValue < 32 && byteValue !== 9 && byteValue !== 10 && byteValue !== 13) { // ASCII printable range, tab, newline, carriage return
                isTextFile = false;
                break;
            }
        }

        if (isTextFile) {
            return "txt"; // Arquivo de texto simples (.txt)
        } else {
            return "desconhecido"; // Tipo de arquivo não identificado
        }
    }
}



