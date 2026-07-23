/**
 *
 * @desc        Script usado para aplicar o papel responsavel pela tarefa
 * @copyright   09/2023 IMPLANTA
 * @version     1.0.0
 * @author      Fernando Alemar
 *
 */

function resolve(process,colleague){

	var userList = new java.util.ArrayList();
//	var papel = hAPI.getCardValue("idDepartamento");
	var papel = "Supervisao_Operacoes";
	var codColigada = hAPI.getCardValue("codColigada");
	var papelColigada = papel+"_COLIGADA_"+codColigada

	userList.add("Pool:Role:"+papelColigada);

	return userList;

}

