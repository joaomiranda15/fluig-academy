function createDataset(fields, constraints, sorts) {
    var ds = DatasetBuilder.newDataset();

    ds.addColumn("simbolo")
    ds.addColumn("nomeMoeda")
    ds.addRow(new Array("R$", "Real"));
    ds.addRow(new Array("US$", "Dólar Americano"));
    ds.addRow(new Array("A$", "Peso Argentino"));
    
    return ds;
}


function defineStructure() {

}


function onSync(lastSyncDate) {

}

function onMobileSync(user) {

}
