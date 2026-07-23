/**
 * Dataset: ds_fornecedor
 * Projeto: Clariens
 * Versão: 2.1
 *
 * Descrição:
 * Consulta fornecedores (SA2) do Protheus via API Query Store
 * (endpoint POST /clariens/query/exec). A query SQL fica cadastrada
 * na tabela ZQ1 sob o ID 000001 (ver docs/query_000001_ds_fornecedor.sql);
 * o dataset envia apenas o ID e os parâmetros de filtro.
 * A API limita valores de parâmetro a 60 caracteres e bloqueia
 * as sequências ; -- e comentários de bloco; o escape de apóstrofo
 * é feito no servidor.
 * Para cada fornecedor retornado, consulta a chave PIX ativa via
 * dataset ds_pixFornecedor (por CODFOR + LOJAFOR); quando não há
 * chave ativa cadastrada, as colunas de PIX voltam vazias.
 *
 * Constraints esperadas:
 * - cnscodnome: Filtro por código, nome ou CNPJ (busca parcial). Opcional.
 * - cnpjcpf: CNPJ/CPF exato do fornecedor. Opcional.
 *
 * Estrutura de retorno (colunas):
 * - CODFOR: Código do fornecedor (A2_COD)
 * - NOMEFOR: Nome do fornecedor (A2_NOME)
 * - CODNOMFOR: Código, loja, nome e CNPJ concatenados
 * - LOJAFOR: Loja (A2_LOJA)
 * - FILIALFOR: Filial (A2_FILIAL)
 * - FORNEC: Nome + CNPJ concatenados
 * - CGC: CNPJ/CPF (A2_CGC)
 * - CEP: CEP (A2_CEP)
 * - ENDERECO: Endereço (A2_END)
 * - COMPLEMENTO: Complemento (A2_COMPLEM)
 * - NUMERO: Número (A2_NR_END)
 * - BAIRRO: Bairro (A2_BAIRRO)
 * - MUNICIPIO: Município (A2_MUN)
 * - ESTADO: UF (A2_EST)
 * - BANCO: Banco (A2_BANCO)
 * - AGENCIA: Agência (A2_AGENCIA)
 * - CONTA: Conta (A2_NUMCON)
 * - CONTATO: Contato (A2_CONTATO)
 * - TIPO: Tipo do fornecedor (J/F/X com descrição)
 * - TIPOCHV: Tipo da chave PIX ativa (F72_TPCHV); vazio se não houver
 * - CHAVEPIX: Chave PIX ativa (F72_CHVPIX); vazio se não houver
 */

var init = {
	datasetName: 'ds_fornecedor',
	fluigService: 'REST_PROTHEUS',
	endpoint: '/clariens/query/exec',
	method: 'post',
	primaryKey: [
		'CODFOR'
	],
	columns: [
		'CODFOR',
		'NOMEFOR',
		'CODNOMFOR',
		'LOJAFOR',
		'FILIALFOR',
		'FORNEC',
		'CGC',
		'CEP',
		'ENDERECO',
		'COMPLEMENTO',
		'NUMERO',
		'BAIRRO',
		'MUNICIPIO',
		'ESTADO',
		'BANCO',
		'AGENCIA',
		'CONTA',
		'CONTATO',
		'TIPO'
	],
	columnsPix: [
		'TIPOCHV',
		'CHAVEPIX'
	],
	params: {
		chave: "c8ZKRwZz8HyPMPQIlziDc8ZKRwZz8HyPMPQIlziD",
		id: "000001",
		params: {
			FILTRO: "",
			CNPJCPF: ""
		}
	}
};

function createStructure() {

	var dataset = DatasetBuilder.newDataset();

	for (var index = 0; index < init.columns.length; index++) {
		dataset.addColumn(init.columns[index]);
	}

	for (var indexPix = 0; indexPix < init.columnsPix.length; indexPix++) {
		dataset.addColumn(init.columnsPix[indexPix]);
	}

	return dataset;

}

function buscaPixFornecedor(codfor, lojafor) {

	var pixVazio = { tipo: '', chave: '' };

	try {

		if (!codfor || !lojafor) {
			return pixVazio;
		}

		var constraints = [
			DatasetFactory.createConstraint('codfor', codfor, codfor, ConstraintType.MUST),
			DatasetFactory.createConstraint('lojafor', lojafor, lojafor, ConstraintType.MUST)
		];

		var dsPix = DatasetFactory.getDataset('ds_pixFornecedor', null, constraints, null);

		if (!dsPix || dsPix.rowsCount == 0) {
			return pixVazio;
		}

		var colunas = dsPix.getColumnsName();
		for (var c = 0; c < colunas.length; c++) {
			if (colunas[c] == 'error') {
				return pixVazio;
			}
		}

		return {
			tipo: dsPix.getValue(0, 'TIPOCHV') || '',
			chave: dsPix.getValue(0, 'CHAVEPIX') || ''
		};

	}
	catch (exception) {

		log.error('ds_fornecedor - erro ao buscar PIX (cod ' + codfor + '/loja ' + lojafor + '): ' + exception.message);
		return pixVazio;

	}

}

function createErrorStructure() {

	var dataset = DatasetBuilder.newDataset()
	dataset.addColumn('error')
	return dataset

}

function createDataset(fields, constraints, sortFields) {

	var dataset = createStructure()

	try {

		var cnscodnome = ""
		var cnpjcpf = ""

		if (constraints) {
			for (var index in constraints) {
				if (constraints[index].getFieldName().toLowerCase() == 'cnscodnome'.toLowerCase()) {
					cnscodnome = constraints[index].getInitialValue();
				} else if (constraints[index].getFieldName().toLowerCase() == 'cnpjcpf'.toLowerCase()) {
					cnpjcpf = constraints[index].getInitialValue();
				}
			}
		}


		init.params.params.FILTRO = cnscodnome.toUpperCase();
		init.params.params.CNPJCPF = cnpjcpf;

		var service = fluigAPI.getAuthorizeClientService()
		var options = {
			companyId: getValue('WKCompany') + '',
			serviceCode: init.fluigService,
			endpoint: init.endpoint,
			method: init.method,
			params: init.params,
			timeoutService: '100',
			headers: {
				Connection: 'close'
			}
		}

		var response = service.invoke(new org.json.JSONObject(options).toString())
		var data = JSON.parse(response.getResult())

		if (data && data.result) {
			if( data.result.length >0){
				for (var currentRow = 0; currentRow < data.result.length; currentRow++) {

					var row = new Array();

					for (var currentColumn = 0; currentColumn < init.columns.length; currentColumn++) {

						var value = data.result[currentRow][init.columns[currentColumn]]
						row.push((value) ? value : '')

					}

					var pix = buscaPixFornecedor(data.result[currentRow]['CODFOR'], data.result[currentRow]['LOJAFOR'])
					row.push(pix.tipo)
					row.push(pix.chave)

					dataset.addRow(row)

				}
			}else{
				 dataset.addRow(["","","Nenhum fornecedor encontrado para os critérios fornecidos. Por favor efetuar o cadastro de fornecedor","","","","","","","","","","","","","","","","","",""])

			}


		} else {

			var row = new Array()
			row.push('Error to execute dataset 1 "' + init.datasetName + '": ' + new org.json.JSONObject(response.getResult()).toString())

			dataset = createErrorStructure()
			dataset.addRow(row)

		}

	}
	catch (exception) {

		var row = new Array()
		row.push('Error to execute dataset 2 "' + init.datasetName + '": ' + exception.message)

		dataset = createErrorStructure()
		dataset.addRow(row)

		log.info('Error to execute dataset 3 "' + init.datasetName + '": ' + exception.message)

	}

	return dataset

}