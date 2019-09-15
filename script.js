var ta,
	limiar,
	ps,
	cd,
	pesosX,
	pesosZ,
	saidasP,
	entradasZ,
	entradasX,
	entradasY;


//VARIAVEIS DE CONFIGURACAO
//Padroes de saida
ps = 2;
//limiar
e = 2.71;
//taxa de aprendizagem
ta = 1;
//casas deciamais
cd = 3;

//Guarda os valores das arestas de X
pesosX = new Array(
				[0.1, 0, 0.1], [0.3, 0.1, 0.9], [0.5, 0.4, 1]
);

//Guarda os valores das aresta de Z
pesosZ = new Array(
	[0.6, 0.3], [0.5, 0.8], [0.1, 0.3]
);

//Guarda as entradas dos neuronios inicial
entradasX = new Array(1, 1, 0);

//Guarda as saidas padrao
saidasP = new Array(1, 1);

//Guarda as entradas que chegam nos neuronios das camada intermediaria
entradasZ = new Array();

//Guarda as entradas que chegam nos neuronios das camada final
entradasY = new Array();

//Guarda as saida de Z sem a funcao de ativacao
saidasZ = new Array();

//guarda os cauculos de erro das saidas deY
deltaK = new Array();

//guarda os cauculos de erro das saidas de Z
deltaW = new Array();

//Valores que serão utilizados no calculo da derivada
deltaJ = new Array();

/*
A funcao le apenas um arquivo por vez
Executa os calculos das pesos entre X e Z
Conjunto dos passos 3 e 4
*/
function Parte01() {
	var z_inj = 0;
	var tam_z = entradasX.length;
	var tam_pesosX = pesosX.length;

	for (var c = 0; c < tam_z; c++) {
		for (var l = 0; l < tam_pesosX; l++) {
			z_inj += entradasX[l] * pesosX[l][c];
			//			console.log("entradasX[" + l + "]* pesosX[" + l + "][" + c + "]");
		}

		z_inj = z_inj.toFixed(cd);

		//		console.log("==>Enviando para Z" + (c + 1) + ": " + z_inj);
		//		console.log("Ativando: (" + z_inj + ") = " + FuncaoAtivacao(z_inj));
		//		console.log("Z" + (c + 1) + ": " + FuncaoAtivacao(z_inj));

		entradasZ.push(FuncaoAtivacao(z_inj));
		z_inj = 0;
	}

	console.log("Valores dos neuronios de Z")
	console.log(entradasZ);
	console.log("----------------------------");

	Parte02();
}

/*
Execucao do passo 5
*/
function Parte02() {
	var y_ink = 0;
	var tam_pesosZ = pesosZ.length;
	var tam_saidas = ps;
	var y_ink_ativado;

	for (var c = 0; c < tam_saidas; c++) {
		for (var l = 0; l < tam_pesosZ; l++) {
			y_ink += entradasZ[l] * pesosZ[l][c];
			//			console.log("entradasZ[" + l + "]* pesosZ[" + l + "][" + c + "]");
		}

		y_ink = y_ink.toFixed(cd);

		y_ink_ativado = FuncaoAtivacao(y_ink);

		//		console.log("Ativando:(" + y_ink + ") = " + y_ink_ativado);
		//		console.log("Y" + (c + 1) + ": " + y_ink_ativado);

		saidasZ.push(y_ink);
		entradasY.push(y_ink_ativado);
		y_ink = 0;
	}

	console.log("Valores dos neuronios de Y");
	console.log(entradasY);
	console.log("----------------------------");

	Parte03();
}

/*
Execucao do passo 6
Verifica os erros e popula deltaK
*/
function Parte03() {
	console.log("Varificacao de erros de Y (DeltaK)");

	var tam_saida = saidasP.length;
	var dK = 0;

	for (var c = 0; c < tam_saida; c++) {
		dK = (saidasP[c] - entradasY[c]) * Derivada(saidasZ[c]);

		deltaK.push(parseFloat(dK.toFixed(cd)));
		dK = 0;
	}

	console.log(deltaK);

	var dW = 0;

	var tam_z = pesosZ.length; //qtd linhas
	var tam_dy = deltaK.length;

	for (var c = 0; c < tam_z; c++) {
		for (var l = 0; l < tam_dy; l++) {
			dW = ta * deltaK[l] * entradasZ[c];
			//				console.log("deltaW: " + dW.toFixed(cd));
			//				console.log(ta + " * " + deltaK[l] + " * " + entradasZ[c]);
		}

		deltaW.push(parseFloat(dW.toFixed(cd)));
	}

	console.log("DeltaW (valores dos pesos entre Z e Y)")
	console.log(deltaW);
	console.log("----------------------------");

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
	var dJ = 0;

	for (var l = 0; l < tam_j; l++) {
		for (var c = 0; c < tam_y; c++) {
			delta_inj += deltaK[c] * pesosZ[l][c];
			//			console.log("deltaK[" + c + "] * pesosZ[" + l + "][" + c + "]");
			//			console.log(deltaK[c] + "*" + pesosZ[l][c]);
		}

		deltaJ.push(parseFloat(delta_inj.toFixed(cd)));
		delta_inj = 0;
	}

	console.log("Valores de DeltaJ");
	console.log(deltaJ);

	for (var j = 0; j < tam_j; j++) {
		dJ = deltaJ[j] * (Derivada(entradasZ[j]));
		dJ = parseFloat(dJ.toFixed(cd));
		console.log(dJ);
	}

	var dV = 0;
	var tam_i = pesosX.length;

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_i; i++) {
			dV = ta * dJ * entradasX[i];
			console.log(dV);
		}
	}
}

function Derivada(x) {
	return FuncaoAtivacao(x) * (1 - FuncaoAtivacao(x));
}

function FuncaoAtivacao(x) {
	var sig = (1 / (1 + (Math.pow(e, -x))));

	return parseFloat(sig.toFixed(cd));
}

Parte01();
