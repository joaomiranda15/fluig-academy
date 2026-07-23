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
	var area = hAPI.getCardValue("corporativa");

	userList.add("Pool:Role:"+area);

	return userList;

}

