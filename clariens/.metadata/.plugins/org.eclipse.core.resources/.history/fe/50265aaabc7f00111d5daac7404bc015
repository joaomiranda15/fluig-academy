var beforeSendValidate = function (_numState, _nextState) {

  arrError = []; // global
  campoObrig = []; // global
  var obrigatorios = $('.obrigatorio:visible');
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
  }

};
