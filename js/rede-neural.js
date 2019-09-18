var entradasX, pesosV, pesosW, saidasP, entradasZ, entradasY, zInj, saidasZ, deltaK, deltaW, deltaInJ, deltaJ, deltaV, padrao_final;

//Guarda as entradas dos neuronios inicial
entradasX;
//Guarda os valores das arestas de X
pesosV;
//Guarda os valores das aresta de Z
pesosW;
//Guarda as saidas padrao
saidasP;
//Guarda as entradas que chegam nos neuronios das camada intermediaria
entradasZ = new Array();
//Guarda as entradas que chegam nos neuronios das camada final
entradasY = new Array();
//Guard os valores nao ativados que chegam em Z
zInj = new Array();
//Guarda as saida de Z sem a funcao de ativacao
saidasZ = new Array();
//guarda os cauculos de erro das saidas deY
deltaK = new Array();
//guarda os cauculos de erro das saidas de Z
deltaW = new Array();
//Valores que serão utilizados no calculo da derivada
deltaInJ = new Array();
//Valores que serao utilizados para o calcula de deltaV
deltaJ = new Array();
//valores com os caulos de ajustes
deltaV = new Array();

function testarRede() {
	entradasX = b3;

	passo0();
	passo03_04();

	console.log("%cPADRAO DE SAIDA", 'color: green');
	console.log(entradasY);
}
/*
Popula as matrizes de V e W, com numeros randomicos entre 0 e 1
Executao o passo 0
*/
function passo0() {
	pesosV = pesoGv;
	pesosW = pesoGw;
}

/*
Executao o processo durante a epocas definidas
Executao o passo 1
*/
function passo01() {
	for (var i = 0; i < epocas; i++) {
		console.log("%cEPOCA: " + i + "=============================================================================================", 'color:orange; font-weight: bold');

		passo02();
	}

	console.log("%cPADRAO DE SAIDA", 'color: green');
	console.log(padrao_final);

	io(pesosV, pesosW);

	//	console.log("%cPESO W:", "color:pink");
	//	console.log(pesosW);
	//	console.log("%cPESO V:", "color:pink");
	//	console.log(pesosV);
}

/*
Para o total de dados na entrada executa os passo03 e 04
Executao os passos 2
*/
function passo02() {
	var tam_carga = entradas.length;

	for (var i = 0; i < tam_carga; i++) { //para cada grupo
		//		console.log("%cCarga: " + i, "color: blue");
		var tam_grupo = entradas[1][1].length;
		//		console.log(entradas[i][1]);
		for (var j = 0; j < tam_grupo; j++) {
			//			console.log(entradas[i][0]); //arquivo
			//			console.log(entradas[i][1][j]); //arquivo

			entradasX = JSON.parse(JSON.stringify(entradas[i][1][j]));
			saidasP = JSON.parse(JSON.stringify(entradas[i][2]));

			//		console.log("%cLENDO ARQUIVO:" + j + "-----------------------------------", "color: blue; font-weight:bold");
			//			entradasX = JSON.parse(JSON.stringify(entradas[j]));

			passo03_04();
		}
		console.log("%cCarga: " + i, "color: blue");
		console.log(padrao_final);
	}
}

/*
Executa os calculos das pesos entre X e Z
Executao os passos 2,3 e 4
*/
function passo03_04() {
	//	console.log("%cValores dos neuronios de Z", "color: brown ; font-weight: bold");

	var z_inj = 0;
	var tam_z = entradasX.length;
	var tam_pesosV = pesosW.length;
	var strPesoXZ = "";

	//passo 04
	for (var j = 0; j < tam_z; j++) {
		for (var i = 0; i < tam_pesosV; i++) {
			z_inj += (entradasX[i] * pesosV[i][j]);
			//			console.log("entradasX[" + i + "]* pesosV[" + i + "][" + j + "]");
			strPesoXZ += "(" + entradasX[i] + " * " + pesosV[i][j] + ") +";
		}

		//		console.log(strPesoXZ + " = " + z_inj);
		strPesoXZ = "";

		z_inj = z_inj.toFixed(cd);

		//		console.log("==>Z" + (j + 1) + ": " + "Ativando:(" + z_inj + ") = " + FuncaoAtivacao(z_inj));

		entradasZ.push(FuncaoAtivacao(z_inj));
		zInj.push(z_inj);

		z_inj = 0;
	}

	//	console.log(pesosV);

	//		console.log(entradasZ);
	//	console.log("--------------------------------------------------------");
	passo05();
}

/*
Soma dos valores do neuronio Z, com os pesos entre Z e Y
Execucao do passo 5
*/
function passo05() {
	//	console.log("%cValores dos neuronios de Y", "color: brown ; font-weight: bold");

	var y_ink = 0;
	var tam_j = pesosW.length;
	var tam_k = ps; //total de saida
	var y_ink_ativado;
	var strPesoZY = "";

	for (var k = 0; k < tam_k; k++) {
		for (var j = 0; j < tam_j; j++) {
			y_ink += entradasZ[j] * pesosW[j][k];
			//			console.log("entradasZ[" + j + "](" + entradasZ[j] + ") * pesosW[" + j + "][" + k + "](" + pesosW[j][k] + ")");

			strPesoZY += "(" + entradasZ[j] + " * " + pesosW[j][k] + ") +";
		}

		//		console.log(strPesoZY + " = " + y_ink);
		strPesoZY = "";

		y_ink = y_ink.toFixed(cd);
		y_ink_ativado = FuncaoAtivacao(y_ink);
		saidasZ.push(y_ink);
		entradasY.push(y_ink_ativado);

		//		console.log("==>Y" + (k + 1) + ": Ativando:" + "(" + y_ink + ") = " + y_ink_ativado);
		y_ink = 0;
	}

	//	console.log(entradasY);
	//	console.log("--------------------------------------------------------");

	if (!modo_teste) {
		passo06();
	}
}

/*
Verifica os erros e popula deltaK e deltaW
Execucao do passo 6
*/
function passo06() {
	//	console.log("%cCalculo erro", "color:red; font-weight: bold");
	//	console.log("%cValores de Dk", "color:red");

	var tam_saida = saidasP.length;
	var dK = 0;

	for (var k = 0; k < tam_saida; k++) {
		dK = (saidasP[k] - entradasY[k]) * Derivada(saidasZ[k]);

		//		console.log("(saidasP[" + k + "](" + saidasP[k] + ") - entradasY[" + k + "](" + entradasY[k] + ")) * Derivada(saidasZ[" + k + "](" + saidasZ[k] + "))(" + Derivada(saidasZ[k]) + ") = " + dK.toFixed(cd));

		deltaK.push(parseFloat(dK.toFixed(cd)));
		dK = 0;
	}

	//	console.log(deltaK);
	//	console.log("%cDeltaW:", "color:red");

	var dW = 0;
	var tam_j = pesosW.length; //qtd linhas
	var tam_dk = deltaK.length; //tamaho do deltaK
	var arrT = new Array();

	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_dk; k++) {
			dW = ta * deltaK[k] * entradasZ[j];
			dW = parseFloat(dW.toFixed(cd));
			//			console.log("deltaW: " + dW);
			//			console.log("dK:" + ta + " * " + deltaK[k] + " * " + entradasZ[j] + " = " + dW);
			arrT.push(dW);
		}

		deltaW.push(arrT);

		arrT = new Array();
	}

	//	console.log("--------------------------------------------------------");
	passo07();
}

/*
Calcula deltaInj, calcula deltaJ e deltaV
Executa o passo 07
*/
function passo07() {
	var tam_j = entradasZ.length;
	var delta_inj = 0;
	var tam_y = entradasY.length;
	var strDeltaInj = "";

	//	console.log("%cValores de DeltaInJ", "color:red");
	//	console.log(JSON.parse(JSON.stringify(pesosW)));

	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_y; k++) {
			delta_inj += deltaK[k] * pesosW[j][k];
			strDeltaInj += "(" + deltaK[k] + " * " + pesosW[j][k] + ") + ";
		}

		//		console.log(strDeltaInj + " = " + delta_inj);
		strDeltaInj = "";

		deltaInJ.push(parseFloat(delta_inj.toFixed(cd)));
		delta_inj = 0;
	}

	//	console.log(deltaInJ);

	var dJ = 0;

	for (var j = 0; j < tam_j; j++) {
		dJ = deltaInJ[j] * (Derivada(zInj[j]));
		//		console.log(deltaInJ[j] + " * f(" + zInj[j] + ") = " + (Derivada(zInj[j])));
		dJ = parseFloat(dJ.toFixed(cd));
		deltaJ.push(parseFloat(dJ.toFixed(cd)));
	}

	//	console.log("%cValores de Dj", "color: red");
	//	console.log(JSON.parse(JSON.stringify(deltaJ)));

	//	console.log("%cValores de DeltaV", "color: red");

	var dV = 0;
	var tam_i = pesosV.length;
	var arrT = new Array();

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_i; j++) {
			dV = ta * deltaJ[j] * entradasX[i];
			//			console.log(ta + "*" + deltaJ[i] + "*" + entradasX[i] + " = " + dV);

			arrT.push(parseFloat(dV.toFixed(cd)));
		}

		deltaV.push(arrT);
		arrT = new Array();

		dV = 0;
	}

	//	console.log(JSON.parse(JSON.stringify(deltaV)));

	//	console.log("----------------------------");

	passo08();
}

/*
Ajustas os pesos
Executa o passo 08
*/
function passo08() {
	//	console.log("%cNOVOS PESOS W", "color:orange");
	//	console.log("%cpesos antigos", "color:orange");
	//	console.log(JSON.parse(JSON.stringify(pesosW)));

	var tam_k = ps;
	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_k; k++) {
			var novo = pesosW[j][k] + deltaW[j][k];
			novo = novo;
			pesosW[j][k] = pesosW[j][k] + deltaW[j][k];
		}
	}

	//	console.log("%cpesos novos", "color:orange");
	//	console.log(JSON.parse(JSON.stringify(pesosW)));

	//	console.log("----------------------------");

	//	console.log("%cNOVOS PESOS V", "color:orange");
	//	console.log("%cpesos antigos", "color:orange");
	//	console.log(JSON.parse(JSON.stringify(pesosV)));

	var tam_i = pesosV.length;
	var tam_j = pesosW.length;

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_j; j++) {
			var novo = pesosV[i][j] + deltaV[i][j];
			novo = parseFloat(novo.toFixed(cd));
			pesosV[i][j] = novo;
		}
	}

	//	console.log("%cpesos novos", "color:orange");
	//	console.log(JSON.parse(JSON.stringify(pesosV)));

	//	console.log("----------------------------");

	//	console.log("%cPADRAO DE SAIDA", 'color: green');
	//	console.log("%c" + entradasY, "color:blue");
	padrao_final = JSON.parse(JSON.stringify(entradasY));

	garbageColector();
}
/*
Limpa os arrays
*/
function garbageColector() {
	//	console.log("%cLimpando variaveis", "color: pink");

	entradasZ = new Array();
	entradasY = new Array();
	saidasZ = new Array();
	deltaK = new Array();
	deltaW = new Array();
	deltaInJ = new Array();
	deltaJ = new Array();
	deltaV = new Array();
	zInj = new Array();
}

/*
Calculo de derivada
*/
function Derivada(x) {
	var r = (1 / 2) * (1 + FuncaoAtivacao(x)) * (1 - FuncaoAtivacao(x));
	r = parseFloat(r.toFixed(cd));
	return r;
}

/*
Utiliza a funcao de sgmoide bipolar para ativacao
*/
function FuncaoAtivacao(x) {
	//		var sig = (1 / (1 + (Math.pow(e, -x))));
	//	var sig = (2 / (1 + (Math.pow(e, -(x))))) - 1;
	var sig = (2 / (1 + (Math.exp(-x)))) - 1;
	return sig = parseFloat(sig.toFixed(cd));
}

/*
Executa o passo 01
*/
function analizar() {
	passo0();

	passo01();
}

/*
encarregado de se comunicar com o front
*/
function io(pesosV, pesosW) {
	var str_pesoV, str_pesoW;

	str_pesoV = organizaPesos(pesosV);
	str_pesoW = organizaPesos(pesosW);

	pesos_finais_v.html(str_pesoV);
	pesos_finais_w.html(str_pesoW);
	btn_pesos.show();
}

/*
encarregado de se comunicar com o front
*/
function organizaPesos(peso) {
	var tam_i, tam_j, str_arr;

	tam_i = peso.length;
	tam_j = peso[0].length;
	str_arr = "[";

	for (var i = 0; i < tam_i; i++) {
		str_arr += "[";
		for (var j = 0; j < tam_j; j++) {
			str_arr += peso[i][j];

			if (j != (tam_j - 1)) {
				str_arr += ",";
			}
		}

		str_arr += "],<br>"
	}

	str_arr += "]";

	return str_arr;
}
