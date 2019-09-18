var ta, limiar, ps, cd, pesosV, pesosW, saidasP, entradasZ, entradasX, entradasY, epocas, entradas, area_cod, carac, t_neuronios, t_camada_h, saidaP, pesoGv, pesoGw, modo_teste;

/*
VARIAVEIS DE CONFIGURACAO
*/
//Padroes de saida
ps = 7; //2
//taxa de aprendizagem
ta = 0.2; //2.71
//casas deciamais
cd = 3;
//epocas de treinamento
epocas = 2000;
//altera o limite de numeros randomigos para os pesos na primeira vez
limiteP = new Array(-1, 1);
//total de entradas X
t_neuronios = 63;
//total de entradas na camada intermediaria
t_camada_h = 63;
//guarda as entradas dos tipos de daos
entradas = new Array();
//define o padrao de saida
//var saidaA = new Array(0, 1, 0, 0, 0, 0, 0);
//saidasP = saidaA;
saidaP = new Array();
//gera os pesos de V dinamicamente
//pesoGv = new Matrix(t_neuronios, t_camada_h, limiteP);
//pesoGw = new Matrix(t_camada_h, ps, limiteP);
//Pesos ja testados, comentar a linha a cima e descomentar esta para alterar
pesoGv = peso_final_V;
pesoGw = peso_final_W;
//Se true, utiliza os pesos da rede já treinada
modo_teste = false;

var a1 = new Array(-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1);

var a2 = new Array(-1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1);

var a3 = new Array(-1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1);

var b1 = new Array(1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1);

var b2 = new Array(1, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1);

var b3 = new Array(1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1);

//entradas01 = new Array(["1"], [a1, a2, a3], [1, 0, 0, 0, 0, 0, 0]);
//entradas02 = new Array(["2"], [b1, b2, b3], [0, 1, 0, 0, 0, 0, 0]);

entradas01 = new Array(["1"], [a1, a2, a3], [1, -1, -1, -1, -1, -1, -1]);
entradas02 = new Array(["2"], [b1, b2, b3], [-1, 1, -1, -1, -1, -1, -1]);
//entradas = new Array(c1, c2, c3);

entradas = [entradas01, entradas02];
