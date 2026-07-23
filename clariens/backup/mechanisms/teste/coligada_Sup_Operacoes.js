/**
 *
 * @desc        Script usado para aplicar o papel responsavel pela tarefa
 * @copyright   03/2024 IMPLANTA
 * @author      Antonio
 *
 */

function resolve(process,colleague){

	var userList = new java.util.ArrayList();
	var papel = "Supervisao_Operacoes";
	var codColigada = hAPI.getCardValue("codColigada");
	var papelColigada = papel+"_COLIGADA_"+codColigada

	userList.add("Pool:Role:"+papelColigada);

	return userList;

}

