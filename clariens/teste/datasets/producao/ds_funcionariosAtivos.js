function defineStructure() {
	addColumn("CODCOLIGADA");
	addColumn("CHAPA");
	addColumn("NOME");
	addColumn("DATAADMISSAO");
	addColumn("DTNASCIMENTO");
	addColumn("DEPARTAMENTO");
	addColumn("EMAIL");
	addColumn("CPF");
	addColumn("TELEFONE1");
	addColumn("ANONASC");
	addColumn("MESNASC");
	addColumn("DIANASC");
	addColumn("ANOADMIS");
	addColumn("MESADMIS");
	addColumn("DIAADMIS");
	addColumn("MESDIANASC");
	addColumn("MESDIAADMIS");
	addColumn("LOGINFLG");
	addColumn("CODSECAO");
	addColumn("CODFUNCAO");
	addColumn("DESCFUNCAO");
	addColumn("CODESFUNCAO");
	addColumn("CODDESCFUNC");
	addColumn("CIDADE");
	addColumn("DESC_CODCOLIGADA");


	setKey(["CODCOLIGADA", "CHAPA"]);
	addIndex(["NOME"]);
	addIndex(["MESDIANASC"]);
	addIndex(["MESDIAADMIS"]);
	addIndex(["LOGINFLG"]);
	addIndex(["CODESFUNCAO"]);
	addIndex(["CODDESCFUNC"]);
}

function onSync(lastSyncDate) {

	var dataset = DatasetBuilder.newDataset();
	var datasetRet = DatasetFactory.getDataset("ds_funcionariosAtivos", null, null, null); // busca o dataset completo

	if (datasetRet != null && datasetRet.rowsCount > 0) { //se o dataset tem registros 
		var values = datasetRet.getValues();
		for (var row in values) { // para cada linha retornada no seu dataset 
			dataset.deleteRow([values[row][0], values[row][1]]); // apaga a linha (ajustar colunas de acordo com seu dataset)
		}
	}

	var clientService = fluigAPI.getAuthorizeClientService();
	//cosnsumo serviço rest
	var data = {
		companyId: getValue('WKCompany') + '',
		serviceCode: 'REST_RM',
		endpoint: '/CLA.INT.001/1/P',
		method: 'get',// 'delete', 'patch', 'put', 'get'
		timeoutService: '100', // segundos
	};
	var vo = clientService.invoke(JSON.stringify(data));
	var objdata = JSON.parse(vo.getResult());

	//alimento as linhas    
	for (var j = 0; j < objdata.length; j++) {

		//trato os dados de data 
		var anoAniver = objdata[j].DTNASCIMENTO.substring(0, 4);
		var mesAniver = objdata[j].DTNASCIMENTO.substring(5, 7);
		var diaAniver = objdata[j].DTNASCIMENTO.substring(8, 10);
		var anoAdmis = objdata[j].DATAADMISSAO.substring(0, 4);
		var mesAdmis = objdata[j].DATAADMISSAO.substring(5, 7);
		var diaAdmis = objdata[j].DATAADMISSAO.substring(8, 10);
		var email = objdata[j].EMAIL == "NULL" ? "" : objdata[j].EMAIL

		var loginFlg = getUserByMail(email)

		dataset.addOrUpdateRow([
			String(objdata[j].CODCOLIGADA),
			objdata[j].CHAPA,
			objdata[j].NOME,
			objdata[j].DATAADMISSAO,
			objdata[j].DTNASCIMENTO,
			objdata[j].SECAO,
			email,
			objdata[j].CPF,
			objdata[j].TELEFONE1,
			anoAniver,
			mesAniver,
			diaAniver,
			anoAdmis,
			mesAdmis,
			diaAdmis,
			mesAniver + diaAniver,
			mesAdmis + diaAdmis,
			loginFlg,
			objdata[j].COD_SECAO,
			objdata[j].CODFUNCAO,
			objdata[j].DESCFUNCAO,
			String(objdata[j].CODFUNCAO) + " - " + objdata[j].DESCFUNCAO,
			"Coligada: " + String(objdata[j].CODCOLIGADA) + " - Chapa: " + String(objdata[j].CHAPA) + " - Nome: " + objdata[j].NOME,
			objdata[j].CIDADE,
			objdata[j].DESC_CODCOLIGADA
		]);

	}

	return dataset;

}



//consulta user pelo mail
function getUserByMail(mail) {
	var constraints = new Array();
	var dataset = null;
	var user = ""

	constraints.push(DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST));
	constraints.push(DatasetFactory.createConstraint("mail", mail, mail, ConstraintType.MUST));
	dataset = DatasetFactory.getDataset("colleague", null, constraints, null);

	if (dataset.values.length > 0) {
		user = dataset.getValue(0, "login")
	}

	return user;
}