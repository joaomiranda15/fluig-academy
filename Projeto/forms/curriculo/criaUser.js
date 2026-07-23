$("#criaUser").click(function(){
    var c1 = DatasetFactory.createConstraint("colleagueName", $("#nome").val(), $("#nome").val(), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("colleagueId", $("#login").val(), $("#login").val(), ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("passwd", $("#senha").val(), $("#senha").val(), ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("mail", $("#email").val(), $("#email").val(), ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("login", $("#login").val(), $("#login").val(), ConstraintType.MUST);

    var contraints = new Array (c1,c2,c3,c4,c5);

    // Criando a lista (Array) com os valores das variáveis que são filtros de valores do usuário.

    DatasetFactory.getDataset("criaUsuario", null, contraints, null);

    FLUIGC.toast({
        message: 'Login para ' + $("#nome").val()+' criado!' ,
        type: 'info'
        /* .val() chama o id */
    });
});

$("#adicionarComunidade").click(function(){
    var dados = { "communityAlias" : "fluig-jpm", userAliases : [$("#login").val()]}; /* declarando qual o Alias da comunidade no server fluig */

    $.ajax({
        /* Chamando a API para adicionar o usuário na comunidade. */
        data: JSON.stringify(dados),
        dataType: 'json',
        url: 'https://lab.fluig.com/api/public/2.0/communities/addUsers',
        type: 'POST',
        contentType: 'application/json',
        success: function(result){
            FLUIGC.toast({
            message: 'Usuário adicionado na comunidade.',
            type: 'warning'
            });
        }

    });
})

