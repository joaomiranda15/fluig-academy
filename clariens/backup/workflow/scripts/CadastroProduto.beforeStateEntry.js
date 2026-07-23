function beforeStateEntry(sequenceId) {

    if (sequenceId == 20 || sequenceId == 26) {

        var mailSolicitante = hAPI.getCardValue("email");
        var numProcesso = getValue("WKNumProces");
        var statusProc = 'Produto cadastrado no Protheus.'
        var infoProduto = hAPI.getCardValue("newcadprod");

        if (sequenceId == 20) {
            statusProc = 'Produto já possui cadastrado no Protheus.'
            infoProduto = hAPI.getCardValue("codProdCadastrado");
        }

        if (mailSolicitante != '' && mailSolicitante != null && mailSolicitante != 'undefined') {

            var dadosMail = {
                numProc: numProcesso
                , mailSol: mailSolicitante
                , status: statusProc
                , infoProd: infoProduto
            }

            enviaEmail(dadosMail)

        }
    }
}

function enviaEmail(dadosMail) {

    var emailService = new com.fluig.foundation.mail.service.EMailServiceBean()
    var urlBase = fluigAPI.getPageService().getServerURL();
    var subject = 'Conecta Clariens Informa'
    var mail = 'conecta@clariens.com.br'
    var emails = []
    var email = ''
    emails.push(String(dadosMail.mailSol))
    email = emails
    var to = email
    var message = ' <html> '
        + ' <head> '
        + '     <meta charset="utf-8"> '
        + '     <title>Fluig</title> '
        + '     <link href="' + urlBase + '/globalmailsender/resources/global.css" type="text/css" rel="stylesheet" /> '
        + ' </head> '
        + ' <body leftmargin="0" topmargin="0" marginheight="0" marginwidth="0"> '
        + '     <div align="left"> '
        + '         <table cellspacing="0" cellpadding="0" border="0"> '
        + '             <tbody> '
        + '                 <tr> '
        + '                     <td> '
        + '                         <img src="' + urlBase + '/globalmailsender/mailSenderHeader?tenantId=1"> '
        + '                     </td> '
        + '                 </tr> '
        + '					<tr> '
        + '						<td> '
        + '							<p>Olá!</p> '
        + '						</td> '
        + '					</tr> '
        + '					<tr> '
        + '						<td> '
        + '							<p>A solicitação Cadastro de Produto que você requisitou foi concluída.'
        + '						</td> '
        + '					</tr> '
        + '			        <tr> '
        + '			            <td> '
        + '			            	<img src="' + urlBase + '/webdesk/assets/icons/tarefa_delegada.png" align="absmiddle" border="0" class="CToWUd" data-bit="iit"> '
        + '			            	<a href="' + urlBase + '/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + dadosMail.numProc + '" target="_blank"> '
        + '			            		<b>Solicitação</b>: ' + dadosMail.numProc + ' - Cadastro de Produto - ' + dadosMail.status
        + '			            	</a> '
        + '			            </td> '
        + '			        </tr> '
        + '					<tr> '
        + '						<td> '
        + '							<p>Dados do Produto: ' + dadosMail.infoProd
        + '						</td> '
        + '					</tr> '
        + '             </tbody> '
        + '			</table> '
        + '		</div> '
        + '     <br /> '
        + ' </body> '
        + ' </html> '

    emailService.simpleEmail(1, subject, mail, to, message, "text/html")

}

