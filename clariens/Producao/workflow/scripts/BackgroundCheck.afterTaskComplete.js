function afterTaskComplete(colleagueId,nextSequenceId,userList){
	
	var numproc = getValue("WKNumProces");
	var users = new java.util.ArrayList();
	var logProcesao = '';
	var corComent = ''
	users.add("System:Auto");
	
if (nextSequenceId == 18) {
		
		var nSolicCompra = hAPI.getCardValue("nSolicCompra")
		logProcesao = '<b>Número da solicitação de compra :</b> '+nSolicCompra
		corComent = '#1ab83f' //verde aparovado
	} 

	if (logProcesao) {
		
		hAPI.setTaskComments(users, numproc, 0, '<span style="color:'+corComent+'"><span class="fluigicon fluigicon-info-sign"></span> '+logProcesao+'</span>');	
	}
}
