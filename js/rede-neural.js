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

/*
Popula as matrizes de V e W, com numeros randomicos entre 0 e 1
Executao o passo 0
*/
function passo0() {
	//	console.log(entradas);

	var arr = new Matrix(63, 63);
	pesosV = arr.data;

	var arr = new Matrix(63, 7);
	pesosW = arr.data;

	var saidaA = new Array(1, 0, 0, 0, 0, 0, 0);
	saidasP = saidaA;
}


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

/*
Executao o processo durante a epocas definidas
Executao o passo 1
*/
function passo01() {
	for (var i = 0; i < epocas; i++) {
		console.log("%cEPOCA: " + i, 'color:orange; font-weight: bold; text-decoration: underline');

		passo02();
	}

	//	console.log("%cPESO W:", "color:red");
	//	console.log(pesosW);
	//	console.log("%cPESO V:", "color:red");
	//	console.log(pesosV);
}

function passo02() {
	//	var tam_dados = entradas.length;
	var tam_dados = 1;

	for (var j = 0; j < tam_dados; j++) {
		entradasX = entradas[j];

		passo03_04();

	}
}
/*
Executa os calculos das pesos entre X e Z
Executao os passos 2,3 e 4
*/
function passo03_04() {

	console.log("%cValores dos neuronios de Z", "color: brown ; font-weight: bold");

	var z_inj = 0;
	var tam_z = entradasX.length;
	var tam_pesosV = pesosW.length;

	//passo 04
	for (var j = 0; j < tam_z; j++) {
		for (var i = 0; i < tam_pesosV; i++) {
			z_inj += entradasX[i] * pesosV[i][j];
			//			console.log("entradasX[" + i + "]* pesosV[" + i + "][" + j + "]");
		}

		z_inj = z_inj.toFixed(cd);

		console.log("==>Z" + (j + 1) + ": " + "Ativando:(" + z_inj + ") = " + FuncaoAtivacao(z_inj));

		entradasZ.push(FuncaoAtivacao(z_inj));
		zInj.push(z_inj);

		z_inj = 0;
	}
	//	console.log(pesosV);

	//	console.log(entradasZ);
	console.log("--------------------------------------------------------");

	passo05();
}

/*
Soma dos valores do neuronio Z, com os pesos entre Z e Y
Execucao do passo 5
*/
function passo05() {
	console.log("%cValores dos neuronios de Y", "color: brown ; font-weight: bold");

	var y_ink = 0;
	var tam_j = pesosW.length;
	var tam_k = ps; //total de saida
	var y_ink_ativado;

	for (var k = 0; k < tam_k; k++) {
		for (var j = 0; j < tam_j; j++) {
			y_ink += entradasZ[j] * pesosW[j][k];
			//						console.log("entradasZ[" + j + "] (" + entradasZ[j] + ")* pesosW[" + j + "][" + k + "] (" + pesosW[j][k] + ")");
		}

		y_ink = y_ink.toFixed(cd);
		y_ink_ativado = FuncaoAtivacao(y_ink);
		saidasZ.push(y_ink);
		entradasY.push(y_ink_ativado);

		console.log("==>Y" + (k + 1) + ": Ativando:" + "(" + y_ink + ") = " + y_ink_ativado);
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
	console.log("%cCalculo erro", "color:red; font-weight: bold");
	console.log("%cValores de Dk", "color:red");

	var tam_saida = saidasP.length;
	var dK = 0;

	for (var k = 0; k < tam_saida; k++) {
		dK = (saidasP[k] - entradasY[k]) * Derivada(saidasZ[k]);

		deltaK.push(parseFloat(dK.toFixed(cd)));
		dK = 0;
	}

	console.log(deltaK);
	console.log("%cDeltaW:", "color:red");

	var dW = 0;
	var tam_j = pesosW.length; //qtd linhas
	var tam_dk = deltaK.length; //tamaho do deltaK
	var arrT = new Array();

	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_dk; k++) {
			dW = ta * deltaK[k] * entradasZ[j];
			//				console.log("deltaW: " + dW.toFixed(cd));
			//				console.log(ta + " * " + deltaK[k] + " * " + entradasZ[j]);
			arrT.push(parseFloat(dW.toFixed(cd)));
		}

		deltaW.push(arrT);

		arrT = new Array();
	}

			console.log(deltaW);
	console.log("--------------------------------------------------------");
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

	console.log("%cValores de DeltaInJ", "color:red");

	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_y; k++) {
			delta_inj += deltaK[k] * pesosW[j][k];
			//			console.log("deltaK[" + k + "] * pesosW[" + j + "][" + k + "]");
			//			console.log(deltaK[k] + "*" + pesosW[j][k]);
		}

		deltaInJ.push(parseFloat(delta_inj.toFixed(cd)));
		delta_inj = 0;
	}

	console.log(deltaInJ);

	var dJ = 0;

	for (var j = 0; j < tam_j; j++) {
		dJ = deltaInJ[j] * (Derivada(zInj[j]));

		console.log(deltaInJ[j] + " * f(" + zInj[j] + ") = " + (Derivada(zInj[j])));

		dJ = parseFloat(dJ.toFixed(cd));
		deltaJ.push(parseFloat(dJ.toFixed(cd)));
	}

	console.log("%cValores de Dj", "color: red");
	console.log(deltaJ);

	console.log("%cValores de DeltaV", "color: red");

	var dV = 0;
	var tam_i = pesosV.length;
	var arrT = new Array();

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_i; j++) {
			dV = ta * dJ * entradasX[i];
			//			console.log(ta + "*" + deltaJ[i] + "*" + entradasX[i] + " = " + dV);

			arrT.push(parseFloat(dV.toFixed(cd)));
		}

		deltaV.push(arrT);
		arrT = new Array();

		dV = 0;
	}

	//	console.log(deltaV);
	//	console.log("----------------------------");
	//	console.log("%cNOVOS PESOS V", "color:orange");
	//	console.log("pesos antigos");
	//		console.log(pesosV);

	var tam_i = pesosV.length;
	var tam_j = pesosW.length;

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_j; j++) {
			pesosV[i][j] = deltaV[i][j];
		}
	}

	deltaV = new Array();

	//	console.log(pesosV);

	//	console.log("%cNOVOS PESOS W", "color:orange");
	//	console.log("pesos antigos");
	//	console.log(pesosW);

	var tam_k = ps;
	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_k; k++) {
			pesosW[j][k] = deltaW[j][k];
		}
	}

	deltaW = new Array();

	//	console.log(pesosW);

	console.log("%cPADRAO DE SAIDA", 'color: green');
	console.log("%c" + entradasY, "color:blue");
	return;

	garbageColector();
}

/*
Limpar as os arrays
*/
function garbageColector() {
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
	var r = FuncaoAtivacao(x) * (1 - FuncaoAtivacao(x));
	return parseFloat(r.toFixed(cd));
}

/*
Utiliza a funcao de sgmoide bipolar para ativacao
*/
function FuncaoAtivacao(x) {
	//	var sig = (2 / (1 + e * (-x))) - 1;
	var sig = (2 / (1 + (Math.pow(e, -x)))) - 1;
	return parseFloat(sig.toFixed(cd));
}

//Executa o passo 01
function analizar() {
	passo0();

	passo01();
}

analizar();

//console.log(Derivada(-9.70));

//Parte01();
