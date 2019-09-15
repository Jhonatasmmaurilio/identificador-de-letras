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

/*
A funcao le apenas um arquivo por vez
Executa os calculos das pesos entre X e Z
Conjunto dos passos 3 e 4
*/
function Parte01() {
//	console.log("%cValores dos neuronios de Z", "color: brown ; font-weight: bold");

	var z_inj = 0;
	var tam_z = entradasX.length;
	var tam_pesosV = pesosV.length;

	for (var j = 0; j < tam_z; j++) {
		for (var i = 0; i < tam_pesosV; i++) {
			z_inj += entradasX[i] * pesosV[i][j];
			//			console.log("entradasX[" + i + "]* pesosV[" + i + "][" + j + "]");
		}

		z_inj = z_inj.toFixed(cd);

//		console.log("==>Z" + (j + 1) + ": " + "Ativando:(" + z_inj + ") = " + FuncaoAtivacao(z_inj));
		//		console.log("Z" + (j + 1) + ": " + FuncaoAtivacao(z_inj));

		entradasZ.push(FuncaoAtivacao(z_inj));
		zInj.push(z_inj);

		z_inj = 0;
	}

	//		console.log(entradasZ);
//	console.log("--------------------------------------------------------");

	Parte02();
}

/*
Execucao do passo 5
*/
function Parte02() {
//	console.log("%cValores dos neuronios de Y", "color: brown ; font-weight: bold");

	var y_ink = 0;
	var tam_j = pesosW.length;
	var tam_k = ps; //total de saida
	var y_ink_ativado;

	for (var k = 0; k < tam_k; k++) {
		for (var j = 0; j < tam_j; j++) {
			y_ink += entradasZ[j] * pesosW[j][k];
			//						console.log("entradasZ[" + j + "]* pesosW[" + j + "][" + k + "]");
		}

		y_ink = y_ink.toFixed(cd);

		y_ink_ativado = FuncaoAtivacao(y_ink);

//		console.log("==>Y" + (k + 1) + ": Ativando:" + "(" + y_ink + ") = " + y_ink_ativado);
		//				console.log("Y" + (k + 1) + ": " + y_ink_ativado);

		saidasZ.push(y_ink);
		entradasY.push(y_ink_ativado);
		y_ink = 0;
	}

	//	console.log(entradasY);
//	console.log("--------------------------------------------------------");

	Parte03();
}

/*
Execucao do passo 6
Verifica os erros e popula deltaK
*/
function Parte03() {
//	console.log("%cCalculo erro", "color:red; font-weight: bold");
//	console.log("Valores de Dk");

	var tam_saida = saidasP.length;
	var dK = 0;

	for (var k = 0; k < tam_saida; k++) {
		dK = (saidasP[k] - entradasY[k]) * Derivada(saidasZ[k]);

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
			//				console.log("deltaW: " + dW.toFixed(cd));
			//				console.log(ta + " * " + deltaK[k] + " * " + entradasZ[j]);
			arrT.push(parseFloat(dW.toFixed(cd)));
		}

		deltaW.push(arrT);

		arrT = new Array();
	}

//	console.log(deltaW);
//	console.log("--------------------------------------------------------");

	Parte04();
}

/*
Executa o passo 07
soma os pesos de W com os valore de deltaK
*/
function Parte04() {
	var tam_j = entradasZ.length;
	var delta_inj = 0;
	var tam_y = entradasY.length;

//	console.log("%cValores de DeltaInJ", "color:red");

	//	console.log(deltaK);
	//	console.log(pesosW);
	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_y; k++) {
			delta_inj += deltaK[k] * pesosW[j][k];
			//			console.log("deltaK[" + k + "] * pesosW[" + j + "][" + k + "]");
			//			console.log(deltaK[k] + "*" + pesosW[j][k]);
		}

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
//	console.log(deltaJ);
//	console.table(entradasY);

//		console.log("Valores de DeltaV");

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
	//	console.log(pesosV);
	//	console.log("----------------------------");

	Parte05();
}

/*
	Atualiza os pesos
*/
function Parte05() {
	//	console.log("%cNOVOS PESOS V", "color:orange");
	//	console.log("pesos antigos");
	//	console.log(pesosV);

	var tam_i = pesosV.length;
	var tam_j = pesosW.length;

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_j; j++) {
			pesosV[i][j] = deltaV[i][j];
		}
	}

	deltaV = new Array();

	//	console.table(pesosV);

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

	//	console.table(pesosW);

	console.log("%cPADRAO DE SAIDA", 'color: green');
	console.log("%c" + entradasY, "color:blue");

	garbageColector();
}

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

function Derivada(x) {
	var r = FuncaoAtivacao(x) * (1 - FuncaoAtivacao(x));
	return parseFloat(r.toFixed(cd));
}

function FuncaoAtivacao(x) {
	var sig = (1 / (1 + (Math.pow(e, -x))));

	return parseFloat(sig.toFixed(cd));
}

function iniciar() {
	for (var i = 0; i < epocas; i++) {
		console.log("%cEPOCA: " + i, 'color:orange; font-weight: bold; text-decoration: underline');
		Parte01();
	}
}

//iniciar();

//Parte01();
