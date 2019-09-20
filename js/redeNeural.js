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

/*
Popula as matrizes de V e W, com numeros randomicos entre 0 e 1
Executao o passo 0
*/
function passo0() {
	var arr;

	if (!modo_teste) {
		//gera os pesos de V dinamicamente
		arr = new Matrix(t_neuronios, t_camada_h, limiteP);
		pesoGv = arr.data;
		arr = new Matrix(t_camada_h, ps, limiteP);
		pesoGw = arr.data;
	} else {
		pesoGv = peso_final_V;
		pesoGw = peso_final_W;
	}

	pesosV = pesoGv;
	pesosW = pesoGw;

	return;
}

/*
Executao o processo durante a epocas definidas
Executao o passo 1
*/
function passo01() {
	for (var i = 0; i < epocas; i++) {
		console.log("%cEpoca:" , "color: orange");
		passo02();
	}

	io(pesosV, pesosW);
}

/*
Para o total de dados na entrada executa os passo03 e 04
Executao os passos 2
*/
function passo02() {
	var tam_carga = entradas.length;

	for (var i = 0; i < tam_carga; i++) {
		var tam_grupo = entradas[1][1].length;
		for (var j = 0; j < tam_grupo; j++) {
			entradasX = JSON.parse(JSON.stringify(entradas[i][1][j]));
			saidasP = JSON.parse(JSON.stringify(entradas[i][2]));
			passo03_04();
		}
	}
}

/*
Executa os calculos das pesos entre X e Z
Executao os passos 2,3 e 4
*/
function passo03_04() {
	var z_inj, tam_z, tam_pesosV;

	z_inj = 0;
	tam_z = entradasX.length;
	tam_pesosV = pesosW.length;

	//passo 04
	for (var j = 0; j < tam_z; j++) {
		for (var i = 0; i < tam_pesosV; i++) {
			z_inj += (entradasX[i] * pesosV[i][j]);
		}
		z_inj = z_inj.toFixed(cd);

		entradasZ.push(FuncaoAtivacao(z_inj));
		zInj.push(z_inj);

		z_inj = 0;
	}

	passo05();
}

/*
Soma dos valores do neuronio Z, com os pesos entre Z e Y
Execucao do passo 5
*/
function passo05() {
	var y_ink, tam_j, tam_k, y_ink_ativado;

	y_ink = 0;
	tam_j = pesosW.length;
	tam_k = ps;
	y_ink_ativado;

	for (var k = 0; k < tam_k; k++) {
		for (var j = 0; j < tam_j; j++) {
			y_ink += entradasZ[j] * pesosW[j][k];
		}

		y_ink = y_ink.toFixed(cd);
		y_ink_ativado = FuncaoAtivacao(y_ink);
		saidasZ.push(y_ink);
		entradasY.push(y_ink_ativado);

		y_ink = 0;
	}

	if (!modo_teste) {
		passo06();
	}
}

/*
Verifica os erros e popula deltaK e deltaW
Execucao do passo 6
*/
function passo06() {
	var tam_saida, dK, dW, tam_j, tam_dk, arrT;

	tam_saida = saidasP.length;
	dK = 0;

	for (var k = 0; k < tam_saida; k++) {
		dK = (saidasP[k] - entradasY[k]) * Derivada(saidasZ[k]);
		deltaK.push(parseFloat(dK.toFixed(cd)));
		dK = 0;
	}

	dW = 0;
	tam_j = pesosW.length;
	tam_dk = deltaK.length;
	arrT = new Array();

	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_dk; k++) {
			dW = ta * deltaK[k] * entradasZ[j];
			dW = parseFloat(dW.toFixed(cd));
			arrT.push(dW);
		}

		deltaW.push(arrT);

		arrT = new Array();
	}

	passo07();
}

/*
Calcula deltaInj, calcula deltaJ e deltaV
Executa o passo 07
*/
function passo07() {
	var tam_j, delta_inj, tam_y, dJ, dV, tam_i, arrT;

	tam_j = entradasZ.length;
	delta_inj = 0;
	tam_y = entradasY.length;

	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_y; k++) {
			delta_inj += deltaK[k] * pesosW[j][k];
		}

		deltaInJ.push(parseFloat(delta_inj.toFixed(cd)));
		delta_inj = 0;
	}

	dJ = 0;

	for (var j = 0; j < tam_j; j++) {
		dJ = deltaInJ[j] * (Derivada(zInj[j]));
		dJ = parseFloat(dJ.toFixed(cd));
		deltaJ.push(parseFloat(dJ.toFixed(cd)));
	}

	dV = 0;
	tam_i = pesosV.length;
	arrT = new Array();

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_i; j++) {
			dV = ta * deltaJ[j] * entradasX[i];
			arrT.push(parseFloat(dV.toFixed(cd)));
		}

		deltaV.push(arrT);
		arrT = new Array();

		dV = 0;
	}

	passo08();
}

/*
Ajustas os pesos
Executa o passo 08
*/
function passo08() {
	var tam_k, tam_i, tam_j;

	tam_k = ps;

	for (var j = 0; j < tam_j; j++) {
		for (var k = 0; k < tam_k; k++) {
			var novo = pesosW[j][k] + deltaW[j][k];
			novo = novo;
			pesosW[j][k] = pesosW[j][k] + deltaW[j][k];
		}
	}

	tam_i = pesosV.length;
	tam_j = pesosW.length;

	for (var i = 0; i < tam_i; i++) {
		for (var j = 0; j < tam_j; j++) {
			var novo = pesosV[i][j] + deltaV[i][j];
			novo = parseFloat(novo.toFixed(cd));
			pesosV[i][j] = novo;
		}
	}

	padrao_final = JSON.parse(JSON.stringify(entradasY));

	garbageColector();
}

/*
Limpa os arrays
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
	var r = (1 / 2) * (1 + FuncaoAtivacao(x)) * (1 - FuncaoAtivacao(x));
	r = parseFloat(r.toFixed(cd));
	return r;
}

/*
Utiliza a funcao de sgmoide bipolar para ativacao
*/
function FuncaoAtivacao(x) {
	var sig = (2 / (1 + (Math.exp(-x)))) - 1;
	return sig = parseFloat(sig.toFixed(cd));
}