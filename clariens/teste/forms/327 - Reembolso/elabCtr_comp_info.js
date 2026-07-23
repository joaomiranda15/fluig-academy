/**
 * 
 *
 * @param {WorkflowProcess} process Processo
 * @param {Colleague} colleague Colleague
 * @returns {java.util.ArrayList<string>}
 */
function resolve(process, colleague) {

    var numeroSolicitacao = getValue("WKNumProces");
    var userList = new java.util.ArrayList();

    if (hAPI.getCardValue("background") == "2") {

        var c5 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST)
        var dsProcess = DatasetFactory.getDataset("workflowProcess", null, [c5], null)
        var userId = dsProcess.getValue(0, "requesterId")
        userList.add(userId);

    } else {
        userList.add("Pool:Role:compras")
    }

    return userList;
}
