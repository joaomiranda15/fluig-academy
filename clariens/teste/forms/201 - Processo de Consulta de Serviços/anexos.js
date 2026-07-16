/**
 * Toda a lógica para o correto funcionamento desse componente foi feito em cima das classes abaixo:
 * .componentAnexo, .descAnexo, .inputAnexo, .btnUpFile, .btnViewerFile, .btnDownloadFile e o atributo data-acao
 * Sem elas o código não irá funcionar, então se por acaso você quiser alterar os nomes dessas classes
 * lembre-se de alterar nas funções desse arquivo e também no css
 */

/**
 * Direciona para cada função correspondente ao valor que esta no atributo data-acao do botão
 * @param {object} event Parâmetro obrigatório, o própio elemento que sofreu o evento click
 * @return {void} 

 */

function anexo(event) {
    try {
        const acao = event.currentTarget.getAttribute("data-acao");
        const inputFile = $(event.currentTarget).closest('.componentAnexo').find(".inputAnexo")[0];
        const fileDescription = inputFile.value//$(event.currentTarget).parent().parent().find(".descAnexo").val()
        window["inputIDAnexo"] = inputFile.id;

        if (acao === "upload") {
            if (isFileAlreadyIncluded(fileDescription)) {
                return;
            }
        }

        const actions = {
            upload: () => uploadFile(fileDescription, inputFile.id),
            viewer: () => viewerFile(fileDescription),
            download: () => downloadFile(fileDescription, inputFile.id),
            delete: () => removeFileConfirm(fileDescription, inputFile.id)
        };

        if (actions[acao]) {
            actions[acao]();
        }


    } catch (e) {
        console.error("Houve um erro inesperado na função anexo");
        console.error(e);
    }


}

/**
 * Envia arquivos para a aba Anexos do Fluig
 * Função adaptada por Sérgio Machado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que ficará na aba anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @return {void} 
 */

function uploadFile(fileDescription, idInput) {
    try {
        if (!getMobile()) {
            const tabAttachments = parent.document.getElementById("tab-attachments");
            if (tabAttachments) {
                //const isIe9 = parent.WCMAPI.isIe9();
                //const element = parent.document.getElementById(isIe9 ? "ecm-navigation-silverlight" : "ecm-navigation-inputFile-clone");

                document.getElementById('upload_arquivos_anexo').click();

                $("#upload_arquivos_anexo").off('change').on('change', function (e) {
                    //document.getElementById('upload_arquivos_anexo').addEventListener('change', function (e) {

                    const filePhisical = e.target.files[0].name;

                    if (verificarValorEmCamposAnexo(filePhisical)) {

                        FLUIGC.toast({
                            title: "Atenção",
                            message: "O arquivo " + filePhisical + " já foi anexado.",
                            type: "danger"
                        });

                        //oculta o modal de erro de anexo padrão do fluig
                        parent.document.getElementById("filemonitor").style.display = "none";

                        setFilePhisicalName(idInput, "");

                        //console.log("O valor específico já foi preenchido em algum campo de anexo.");
                    } else {

                        const element = parent.document.getElementById('ecm-navigation-inputFile-clone');

                        // Copia o(s) arquivo(s) selecionado(s) para o campo do Fluig
                        element.files = e.target.files;

                        // Dispara o evento de change no campo do Fluig
                        if (element) {
                            element.setAttribute("data-on-camera", "true");
                            element.setAttribute("data-file-name-camera", fileDescription);
                            element.setAttribute("data-inputNameFile", idInput);

                            const event = new Event('change', { bubbles: true });
                            element.dispatchEvent(event);
                        }
                    }

                });
            }
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função uploadFile", e);
    }
}

/**
 * Função executada após a escolha do arquivo a ser enviado para o Fluig.
 * Verifica se o anexo já existe, seta o valor do arquivo fisico no campo e altera o estado dos botões
 * @return {void} 
 */
$(function () {
    try {
        window.parent.$("#ecm-navigation-inputFile-clone").on('change', function (e) {
            const inputNameFile = this.getAttribute("data-inputNameFile");
            const fileDescription = this.getAttribute("data-file-name-camera");
            const filePhisical = this.files[0].name;

            if (filePhisical) {

                setFilePhisicalName(inputNameFile, filePhisical);
                updateButtonState(inputNameFile);

            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado ao selecionar o arquivo");
        console.error(e);
    }
});

/**
 * Verifica se algum campo com a classe inputAnexo já possui um valor específico.
 * @param {String} valor Valor específico a ser verificado nos campos.
 * @return {Boolean} Retorna verdadeiro se algum campo possui o valor específico, caso contrário, falso.
 */
function verificarValorEmCamposAnexo(valor) {
    let valorEncontrado = false;
    $('.inputAnexo').each(function () {
        if ($(this).val() === valor) {
            valorEncontrado = true;
            return false; // Interrompe o loop
        }
        
    });
    return valorEncontrado;
}

/**
 * Remove anexos existentes com a mesma descrição e limpa o campo de nome físico do arquivo.
 * @param {String} fileDescription Descrição do arquivo
 * @param {String} inputNameFile Nome do campo de entrada do arquivo
 */
function removeExistingAttachment(fileDescription, inputNameFile) {
    $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
        if (fileDescription === attachment.description) {
            parent.WKFViewAttachment.removeAttach([i]);
            setFilePhisicalName(inputNameFile, "");
        }
    });
}

/**
 * Atualiza o estado dos botões com base no modo atual.
 * @param {String} inputNameFile Nome do campo de entrada do arquivo
 */
function updateButtonState(inputNameFile) {
    const mode = getMode();
    if (mode === "ADD") {
        btnState(inputNameFile, 'delete', 'download');
    } else if (mode === "MOD") {
        btnState(inputNameFile, 'delete', 'viewer');
    }
}


/**
 * Visualizar arquivos que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do anexo
 * @return {void} 
 */
function viewerFile(fileDescription) {
    try {
        if (hasFileFluig(fileDescription)) {
            const anexos = parent.ECM.attachmentTable.getData();
            for (let i = 0; i < anexos.length; i++) {
                var descricao = anexos[i].description;
                if (fileDescription == descricao) {
                    parent.WKFViewAttachment.openAttachmentView('adm', anexos[i].documentId);
                    return
                }
            }
        } else {
            FLUIGC.toast({
                title: "Atenção",
                message: "Anexo não encontrado",
                type: "warning"
            });
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função viewerFile")
        console.error(e)
    }
}


/**
 * Realiza o download do arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 
 */
function downloadFile(fileDescription, idInput) {
    try {
        const filename = getMode() == "VIEW" ? $(`#${idInput}`).text() : $(`#${idInput}`).val()
        FLUIGC.message.confirm({
            message: `Deseja baixar o anexo <b>${filename}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero baixar',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
                    var descricao = attachment.description;
                    if (fileDescription == descricao) {
                        parent.WKFViewAttachment.downloadAttach([i]);
                    }
                });
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função downloadFile")
        console.error(e)
    }
}

/**
 * Verifica se um arquivo com a descrição fornecida já foi incluído na aba de anexos do Fluig.
 * @param {String} fileDescription Descrição do arquivo
 * @return {Boolean} Retorna verdadeiro se o arquivo já foi incluído, caso contrário, falso.
 */
function isFileAlreadyIncluded(fileDescription) {
    try {
        const anexos = parent.ECM.attachmentTable.getData();
        for (let i = 0; i < anexos.length; i++) {
            if (anexos[i].description === fileDescription) {
                FLUIGC.toast({
                    title: 'Atenção!',
                    message: 'Um anexo com essa descrição já foi incluído.',
                    type: 'danger'
                });
                return true;
            }
        }
        return false;
    } catch (e) {
        console.error('Houve um erro inesperado na função isFileAlreadyIncluded');
        console.error(e);
        return false;
    }
}

/**
 * Confirmação para Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 

 */
function removeFileConfirm(fileDescription, idInput) {
    try {
        const filename = $(`#${idInput}`).val()
        FLUIGC.message.confirm({
            message: `Deseja remover o anexo <b>${filename}</b>?`,
            title: 'Confirmação',
            labelYes: 'Sim, quero remover',
            labelNo: 'Não, quero cancelar',
        }, function (result) {
            if (result) {
                removeFile(fileDescription)
                setFilePhisicalName(idInput, "")
                btnState(idInput, "upload", "download")
                customRemoveChild(idInput);
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeFileConfirm")
        console.error(e)
    }
}

/**
 * Remove arquivo que esta na aba Anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo que esta na aba anexos do Fluig
 * @return {void} 

 */
function removeFile(fileDescription) {
    try {
        $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
            if (attachment.description == fileDescription) {
                parent.WKFViewAttachment.removeAttach([i]);
            }
        });
    } catch (e) {
        console.error("Houve um erro inesperado na função removeFile")
        console.error(e)
    }
}

/**
 * Seta o nome do arquivo fisico no campo e realiza tratativa caso o campo esteja bloqueado pelo enableFields
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} filePhisical Parâmetro obrigatório, nome do arquivo fisico
 * @return {void} 
 */
function setFilePhisicalName(idInput, filePhisical) {

    const inputElement = $("#" + (idInput.startsWith("_") ? idInput.substring(1) : idInput));
    inputElement.val(filePhisical);

}

/**
 * Altera o estado e visibilidade dos botões de anexos
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @param {String} acao Parâmetro obrigatório, ação para ser executada no momento do click, se é delete ou upload
 * @param {String} btn Parâmetro obrigatório, botão secundário que deve sofrer ação de ficar visível ou não. Botão de Download ou Viewer
 * @return {void} 

 */

function btnState(idInput, acao, btn) {
    try {
        let btnUpFile = $(`#${idInput}`).parent().parent().find(".btnUpFile");
        let btnDownloadFile = $(`#${idInput}`).parent().parent().find(".btnDownloadFile");
        let btnViewerFile = $(`#${idInput}`).parent().parent().find(".btnViewerFile");
        let btnDeleteFile = $(`#${idInput}`).parent().parent().find(".btnDeleteFile");

        // Adiciona lógica para secundário também no upload
        const actions = {
            delete: {
                btnClass: "btn-danger",
                iconClass: "fluigicon-trash",
                title: "Excluir",
                secondaryBtn: btn === "download" ? btnDownloadFile
                              : btn === "viewer" ? btnViewerFile
                              : btn === "delete" ? btnDeleteFile
                              : null
            },
            upload: {
                btnClass: "btn-success",
                iconClass: "fluigicon-file-upload",
                title: "Selecionar",
                secondaryBtn: btn === "delete" ? btnDeleteFile
                              : btn === "download" ? btnDownloadFile
                              : btn === "viewer" ? btnViewerFile
                              : null
            }
        };

        const action = actions[acao];
        if (action) {
            btnUpFile.removeClass("btn-success btn-danger").addClass(action.btnClass);
            btnUpFile.attr({ 'data-acao': acao, 'title': action.title });
            btnUpFile.find("i").removeClass("fluigicon-file-upload fluigicon-trash").addClass(action.iconClass);

            if (action.secondaryBtn) {
                action.secondaryBtn.prop("disabled", false).show();
            }

            // Esconde os outros botões secundários
            if (btn !== "download") btnDownloadFile.prop("disabled", true).hide();
            if (btn !== "viewer") btnViewerFile.prop("disabled", true).hide();
            if (btn !== "delete") btnDeleteFile.prop("disabled", true).hide();
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função btnState");
        console.error(e);
    }
}

// function btnState(idInput, acao, btn) {

//     //idInput = window["inputIDAnexo"] || idInput;

//     try {
//         let btnUpFile = $(`#${idInput}`).parent().parent().find(".btnUpFile");
//         let btnDownloadFile = $(`#${idInput}`).parent().parent().find(".btnDownloadFile");
//         let btnViewerFile = $(`#${idInput}`).parent().parent().find(".btnViewerFile");

//         const actions = {
//             delete: {
//                 btnClass: "btn-danger",
//                 iconClass: "fluigicon-trash",
//                 title: "Excluir",
//                 secondaryBtn: btn === "download" ? btnDownloadFile : btnViewerFile
//             },
//             upload: {
//                 btnClass: "btn-success",
//                 iconClass: "fluigicon-file-upload",
//                 title: "Selecionar",
//                 secondaryBtn: null
//             }
//         };

//         const action = actions[acao];
//         if (action) {
//             btnUpFile.removeClass("btn-success btn-danger").addClass(action.btnClass);
//             btnUpFile.attr({ 'data-acao': acao, 'title': action.title });
//             btnUpFile.find("i").removeClass("fluigicon-file-upload fluigicon-trash").addClass(action.iconClass);

//             if (acao === "delete") {
//                 action.secondaryBtn.prop("disabled", false).show();
//             } else {
//                 btnDownloadFile.prop("disabled", true).hide();
//                 btnViewerFile.prop("disabled", true).hide();
//             }
//         }
//     } catch (e) {
//         console.error("Houve um erro inesperado na função btnState");
//         console.error(e);
//     }
// }


/**
 * Ajusta os botões de upload e visualização de anexos com base no estado atual do formulário.
 * 
 * - Remove o botão de upload em determinadas condições.
 * - Habilita o botão de visualização caso haja um anexo.
 * - Altera o botão de upload para deletar anexos em modo de edição.
 */
function displayBtnFiles() {
    try {
        // Itera sobre cada elemento com a classe .componentAnexo
        $('.componentAnexo').each(function (i, element) {

            // Obtém os elementos de input e botões dentro do componente
            let inputFile = $(element).find(".inputAnexo");
            let btnUpFile = $(element).find(".btnUpFile");
            let btnViewerFile = $(element).find(".btnViewerFile");

            if (inputFile.length > 0) {

                // Ajusta os anexos para visualização
                if (getMode() == "VIEW") {

                    // Se o campo de input tiver um valor, habilita o botão de visualização
                    if (inputFile.val() != "") {
                        btnViewerFile.prop("disabled", false); // Remove a propriedade "disabled"
                        btnViewerFile.removeAttr("disabled"); // Remove o atributo "disabled"
                        btnViewerFile.show(); // Exibe o botão

                        btnUpFile.remove(); // Remove o botão de upload
                    }

                } else if (getMode() == "MOD") {


                    // Se o campo tiver um valor, altera o botão de upload para deletar
                    if (inputFile.val() != "") {
                        btnState(inputFile[0].id, "delete", "viewer");
                    }else{
                        btnState(inputFile[0].id, "upload", "delete");
                    }
                }

            }

        });
    } catch (e) {
        // Loga um erro no console caso ocorra uma exceção
        console.error("Houve um erro inesperado na função displayBtnFiles");
        console.error(e);
    }
}


/**
 * Remove o botão de upload/delete
 * @param {String} inputFile Parâmetro obrigatório, Id do campo
 * @return {void} 

 */
function invisibleBtnUpload(inputFile) {
    try {
        if (getMode() == "MOD" || getMode() == "ADD") {
            if ($(`#_${inputFile}`).length) {
                let btnUpFile = $(`#_${inputFile}`).parent().parent().find(".btnUpFile");
                btnUpFile.remove();
            } else {
                let btnUpFile = $(`#${inputFile}`).parent().parent().find(".btnUpFile");
                btnUpFile.remove();
            }
        }
        if ($(`#_${inputFile}`).length) {
            if ($(`#_${inputFile}`).val() == "") {
                $(`#_${inputFile}`).attr({ placeholder: "Nenhum anexo selecionado" });
            }
        } else {
            if ($(`#${inputFile}`).val() == "") {
                $(`#${inputFile}`).attr({ placeholder: "Nenhum anexo selecionado" });
            }
        }
    } catch (e) {
        console.error("Houve um erro inesperado na função invisibleBtnUpload")
        console.error(e)
    }
}

/**
 * Verifica se o campo do anexo de uma tabela pai e filho esta preenchido, 
 * caso esteja, ele verifica se o anexo esta presente na aba de anexos do Fluig
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * @param {String} idInput Parâmetro obrigatório, Id do campo de anexo que deseja verificar
 * @return {String} - Retorna string de erros caso apresente erros

 */
function invalidFilesTable(tablename, idInput) {
    try {
        let errors = "";
        const countRows = $(`[tablename='${tablename}']`).find('tbody tr').not(':first');
        for (let i = 0; i < countRows.length; i++) {
            let indice = getIndice(countRows.eq(i).find("input")[0].id);
            let inputNameFile = $(`#_${idInput}___${indice}`).length ? $(`#_${idInput}___${indice}`) : $(`#${idInput}___${indice}`)
            let fileDescription = inputNameFile.parent().find(".descAnexo").val()
            if (inputNameFile.val() && !hasFileFluig(fileDescription)) {
                errors += `<li style='margin-bottom: 5px;'>O anexo <b>${inputNameFile.val()}</b> da linha <b>${i + 1}</b> não foi encontrado</li>`
            }
        }
        return errors
    } catch (e) {
        console.error('Houve um erro inesperado na função invalidFileTable')
        console.error(e)
    }
}


/**
 * Verifica se o campo do anexo esta preenchido, caso esteja, ele verifica se o anexo esta válido
 * @param {String} idInput Parâmetro obrigatório, Id do campo em que o nome do arquivo fisico é gravado
 * @return {Boolean}

 */
function invalidFile(idInput) {
    try {
        const inputNameFile = $(`#${idInput}`).val()
        if (inputNameFile) {
            if ($(`#_${idInput}`).length) {
                let fileDescription = $(`#_${idInput}`).parent().find(".descAnexo").val()
                return !hasFileFluig(fileDescription)
            } else {
                let fileDescription = $(`#${idInput}`).parent().find(".descAnexo").val()
                return !hasFileFluig(fileDescription)
            }
        } else {
            return false
        }
    } catch (e) {
        console.error('Houve um erro inesperado na função invalidFile')
        console.error(e)
    }
}


/**
 * Verifica se o anexo existe na aba de anexos do Fluig
 * @param {String} fileDescription Parâmetro obrigatório, Descrição do arquivo
 * @return {Boolean} - Retorna verdadeiro caso o arquivo exista

 */
function hasFileFluig(fileDescription) {
    try {
        const anexos = parent.ECM.attachmentTable.getData();
        for (let i = 0; i < anexos.length; i++) {
            var descricao = anexos[i].description;
            if (fileDescription == descricao) {
                return true
            }
        }
        return false
    } catch (e) {
        console.error('Houve um erro inesperado na função hasFileFluig')
        console.error(e)
    }
}
