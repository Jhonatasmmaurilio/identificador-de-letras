var ta,
	limiar,
	ps,
	cd,
	pesosV,
	pesosW,
	saidasP,
	entradasZ,
	entradasX,
	entradasY,
	epocas;

//VARIAVEIS DE CONFIGURACAO
//Padroes de saida
ps = 2;
//limiar
e = 2.71;
//taxa de aprendizagem
ta = 1;
//casas deciamais
cd = 3;
//epocas de treinamento
epocas = 2000;

//Guarda os valores das arestas de X
pesosV = new Array(
				[0.1, 0, 0.1], [0.3, 0.1, 0.9], [0.5, 0.4, 1]
);

//Guarda os valores das aresta de Z
pesosW = new Array(
	[0.6, 0.3], [0.5, 0.8], [0.1, 0.3]
);

//Guarda as entradas dos neuronios inicial
entradasX = new Array(1, 1, 0);

//Guarda as saidas padrao
saidasP = new Array(1, 1);