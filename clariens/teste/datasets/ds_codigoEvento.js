function defineStructure() {
    addColumn("CODCOLIGADA");
    addColumn("CODIGO");
    addColumn("DESCRICAO")
}
function onSync(lastSyncDate) {
    var dataset = DatasetBuilder.newDataset();
    var datasetRet = DatasetFactory.getDataset("ds_codigoEvento", null, null, null);

    if (datasetRet != null && datasetRet.rowsCount > 0) {
        var values = datasetRet.getValues();
    }
}
function createDataset(fields, constraints, sortFields) {

}function onMobileSync(user) {

}