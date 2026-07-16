function setSelectedZoomItem(selectedItem) {
  if (selectedItem.inputId == "tipoServico") {
    // Bloco para o zoom 'tipoServico'
    if ($("#idDepartamento").val() == "") {
      window["tipoServico"].clear();
      $("#inputSLA").val("");
      $("#inputSLADia").val("");
      FLUIGC.toast({
        title: "Tipo de Serviço",
        message: "Favor selecionar o Departamento!",
        type: "danger",
      });
    } else {
      const dias = selectedItem.SLA1;
      const resultado = diasParaHorasUteis(dias);
      $("#inputSLA").val(resultado);
      $("#inputSLADia").val(dias);
      $("#TIPO_SERVICO").val(selectedItem.id);
    }

    // Lógica da atividade 40 para definir o próximo aprovador
    if (currentTask == 40) {
      preencheAprovadorPorServico();
    }
  } else if (selectedItem.inputId == "zoomDepartamento") {
    window["tipoServico"].clear();

    $("#idDepartamento").val(selectedItem.idDepartamento);

    reloadZoomFilterValues(
      "tipoServico",
      "idDepartamento," + selectedItem.idDepartamento,
    );
  }
}

function removedZoomItem(removedItem) {
  if (removedItem.inputId == "tipoServico") {
    // Bloco para o zoom 'tipoServico'
    $("#inputSLA").val("");
    $("#inputSLADia").val("");

    // Lógica da atividade 40 para limpar o aprovador
    if (currentTask == 40) {
      $("#aprovadorProximaAprovacao").val("");
    }
  } else if (removedItem.inputId == "zoomDepartamento") {
    window["tipoServico"].clear();
    $("#inputSLA").val("");
    $("#inputSLADia").val("");
    $("#idDepartamento").val("");
    reloadZoomFilterValues("tipoServico");
  }
}
