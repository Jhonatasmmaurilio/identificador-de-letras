//Guarda as entradas dos neuronios inicial
var entradasX;

//Guarda os valores das arestas de X
var pesosV;

//Guarda os valores das aresta de Z
var pesosW;

//Guarda as saidas padrao
var saidasP;

//Guarda as entradas que chegam nos neuronios das camada intermediaria
var entradasZ = new Array();

//Guarda as entradas que chegam nos neuronios das camada final
var entradasY = new Array();

//Guard os valores nao ativados que chegam em Z
var zInj = new Array();

//Guarda as saida de Z sem a funcao de ativacao
var saidasZ = new Array();

//guarda os cauculos de erro das saidas deY
var deltaK = new Array();

//guarda os cauculos de erro das saidas de Z
var deltaW = new Array();

//Valores que serão utilizados no calculo da derivada
var deltaInJ = new Array();

//Valores que serao utilizados para o calcula de deltaV
var deltaJ = new Array();

//valores com os caulos de ajustes
var deltaV = new Array();

//testando a soma das entradas com os pesos
//var t= "";
//var sum = 0;
//passo0();
//entradasX = entradas[0];
//
//for(var j =0;j<1;j++){
//	for(var i = 0;i < pesosW.length;i++){
//		t += "(" + entradasX[i] + "*" + pesosV[i][j] + ") + ";
//		sum = sum + (entradasX[i] * pesosV[i][j]);
//	}
//	console.log("n" + j + ": " + t);
//	console.log(sum.toFixed(cd));
//	sum = 0;
//
//	t = "";
//}

//FuncaoAtivacao(0.4);

//Parte01();

//function d(x) {
//	//	var sig = (1 / (1 + (Math.pow(2.71, -(x)))));
//	var r = (1 / 2) * (1 + fexp(x)) * (1 - fexp(x));
//	return parseFloat(r.toFixed(cd));
//}
//
//function fexp(x) {
//	//	var sig = 1 / (1 + (Math.exp(-x)));
//	var r = (2 / (1 + (Math.exp(x)))) - 1;
//	return parseFloat(r.toFixed(cd));
//}
//
//console.log(fexp(13.000));
//console.log(Derivada(13.000));

/*
Executao o processo durante a epocas definidas
Executao o passo 1
*/
function passo01() {
	for (var i = 0; i < epocas; i++) {
		console.log("%cEPOCA: " + i + "=============================================================================================", 'color:orange; font-weight: bold; text-decoration: underline');

		passo02();
	}

	//	console.log("%cPESO W:", "color:pink");
	//	console.log(pesosW);
	//	console.log("%cPESO V:", "color:pink");
	//	console.log(pesosV);
}

function passo02() {
	var tam_dados = entradas.length;

	for (var j = 0; j < tam_dados; j++) {
		//		console.log("%cLENDO ARQUIVO:" + j + "-----------------------------------", "color: blue; font-weight:bold");
		entradasX = JSON.parse(JSON.stringify(entradas[j]));
		passo03_04();
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

	passo06();
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

	console.log("%cNOVOS PESOS W", "color:orange");
	//	console.log("%cpesos antigos", "color:orange");
	console.log(JSON.parse(JSON.stringify(pesosW)));

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

	console.log("%cNOVOS PESOS V", "color:orange");
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
	console.log(JSON.parse(JSON.stringify(pesosV)));

	//	console.log("----------------------------");

	console.log("%cPADRAO DE SAIDA", 'color: green');
	console.log("%c" + entradasY, "color:blue");

	garbageColector();
}

/*
Limpar as os arrays
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

//Executa o passo 01
function analizar() {
	passo0();

	passo01();
}

analizar();
