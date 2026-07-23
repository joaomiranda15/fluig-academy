function validateForm(form) {

    var msg = "";

    /* Dados do usuário */

    if (form.getValue("nome") == "") {
        msg += "Campo nome não foi preenchido corretamente.<br>";
    }
    if (form.getValue("email") == "") {
        msg += "Campo e-mail não foi preenchido corretamente.<br>";
    }
    if (form.getValue("telefone") == "") {
        msg += "Campo telefone não foi preenchido corretamente.<br>";
    }
    if (form.getValue("documentoIdentidade") == "") {
        msg += "Campo Documento de Identidade não foi preenchido corretamente.<br>";
    }
    if (form.getValue("dataNascimento") == "") {
        msg += "Campo Data de Nascimento não foi preenchido corretamente.<br>";
    }


    /* Ponto comercial */

    if (form.getValue("segunda") != "on" && form.getValue("terca") != "on" && form.getValue("quarta") != "on" &&
        form.getValue("quinta") != "on" && form.getValue("sexta") != "on" &&
        form.getValue("sabado") != "on" && form.getValue("domingo") != "on") {
        msg += "Campo Dias de Funcionamento não foi informado.<br>";
    }

    if (form.getValue("tipoPonto") == "") {
        msg += "Campo Tipo de Ponto não foi preenchido corretamente.<br>";
    }
    if (form.getValue("cep") == "") {
        msg += "Campo CEP não foi preenchido corretamente.<br>";
    }
    if (form.getValue("logradouro") == "") {
        msg += "Campo logradouro não foi preenchido corretamente.<br>";
    }
    if (form.getValue("bairro") == "") {
        msg += "Campo bairro não foi preenchido corretamente.<br>";
    }
    if (form.getValue("cidade") == "") {
        msg += "Campo cidade não foi preenchido corretamente.<br>";
    }
    if (form.getValue("estado") == "") {
        msg += "Campo estado não foi preenchido corretamente.<br>";
    }
    if (form.getValue("valor") == "") {
        msg += "Campo valor não foi preeenchido corretamente.<br>";
    }

    if (msg != "") {
        throw msg;
    }

}