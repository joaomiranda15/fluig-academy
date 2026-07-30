function afterProcessCreate(processId) {
    var indexes = hAPI.getChildrenIndexes("tb_exemplo");
    
    log.info("####### indexes");
    log.dir(indexes);

    for (var i = 0; i < indexes.length; i++) {
        var fieldValue = hAPI.getCardValue("txt_produto___" + indexes[i]);
        log.info("##### fieldValue: txt_produto___: " + fieldValue);
    }
}