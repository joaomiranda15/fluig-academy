function addLinha() {
    wdkAddChild("tb_exemplo");

    console.log("Linha " + newId + " adicionada.")
}

function excluirLinha(elemento) {
    alert ("Eliminando Filho.");

    fnWdkRemoveChild(elemento);

    alert ("Filho eliminado!");
}