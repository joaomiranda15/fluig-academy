function displayFields(form,customHTML){

    var usuario = getValue("WKuser");

    var nome = form.getValue("nome");
    var perfilLinkedin = form.getValue("linkedin");
    var email = form.getValue("email");
    var telefone = form.getValue("telefone");
    
    
    
    var interacao = '<h1>Olá, '+usuario+'. O '+nome+' deseja trabalhar com você.</h1>'+
    ' <h3>O seu perfil no linkedin é: <b>'+perfilLinkedin+'.</b>'+
    ' O seu e-mail é: <b>'+email+'.</b>'+
    ' O seu telefone é: <b>'+telefone+'.</b><br>'+
    ' Obrigado!</h3>'

    customHTML.append('<script>$("#mensagemInteracao").append("' + interacao + '")</script');
    customHTML.append('<script>$("#mensagemInteracao").show;$("#formPrincipal").hide();</script');

}