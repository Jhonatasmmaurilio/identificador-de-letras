var ta,
		limiar,
	ps,
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
ta  = 1;

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
deltaY = new Array();

//guarda os cauculos de erro das saidas de Z
deltaZ = new Array();

/*
A funcao le apenas um arquivo por vez
Executa os calculos das pesos entre X e Z
Conjunto dos passos 3 e 4
*/
function Parte01() {
	var z_inx = 0;
	var tam_z = entradasX.length;
	var tam_pesosX = pesosX.length;

	for (var c = 0; c < tam_z; c++) {
		for (var l = 0; l < tam_pesosX; l++) {
			z_inx += entradasX[l] * pesosX[l][c];
			//			console.log("entradasX[" + l + "]* pesosX[" + l + "][" + c + "]");
		}

		z_inx = z_inx.toFixed(3);

		//		console.log("==>Enviando para Z" + (c + 1) + ": " + z_inx);
		console.log("Ativando: (" + z_inx + ") = " + FuncaoAtivacao(z_inx));
		console.log("Z" + (c + 1) + ": " + FuncaoAtivacao(z_inx));

		entradasZ.push(FuncaoAtivacao(z_inx));
		z_inx = 0;
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
	var y_inx = 0;
	var tam_pesosZ = pesosZ.length;
	var tam_saidas = ps;
	var y_inx_ativado;

	for (var c = 0; c < tam_saidas; c++) {
		for (var l = 0; l < tam_pesosZ; l++) {
			y_inx += entradasZ[l] * pesosZ[l][c];
			//			console.log("entradasZ[" + l + "]* pesosZ[" + l + "][" + c + "]");
		}

		y_inx = y_inx.toFixed(3);

		y_inx_ativado = FuncaoAtivacao(y_inx);
		
		console.log("Ativando:(" + y_inx + ") = " + y_inx_ativado);
		console.log("Y" + (c + 1) + ": " + y_inx_ativado);

		saidasZ.push(y_inx);
		entradasY.push(y_inx_ativado);
		y_inx = 0;
	}

	console.log("Valores dos neuronios de Y")
	console.log(entradasY);
	console.log("----------------------------");
	
	Parte03();
}

/*
Execucao do passo 6
*/
function Parte03(){
	console.log("Varificacao de erros de Y (DeltaK)");
	
	var tam_saida = saidasP.length;
	
	for(var c = 0; c < tam_saida; c++){
		dY = (saidasP[c] - entradasY[c]) * Derivada(saidasZ[c]);
			
		deltaY.push(parseFloat(dY.toFixed(3)));
		dY = 0;
	}
	
	console.log(deltaY);
	
	var dZ= 0;
	
	var tam_z = pesosZ.length;//qtd linhas
	var tam_dy = deltaY.length;
	
	for(var c = 0; c < tam_z; c++){
			for(var l =0; l < tam_dy; l++){
				dZ = ta * deltaY[l] * entradasZ[c];
//				console.log("DeltaZ: " + dZ.toFixed(2));
//				console.log(ta + " * " + deltaY[l] + " * " + entradasZ[c]);
			}
		
			deltaZ.push(dZ);
	}	
	
	console.log("DeltaW")
	console.log(deltaZ);
}

function Derivada(x) {
	return FuncaoAtivacao(x) * (1 - FuncaoAtivacao(x));
}

function FuncaoAtivacao(x) {
	var sig = (1 / (1 + (Math.pow(e, -x))));

	return parseFloat(sig.toFixed(3));
}

Parte01();
