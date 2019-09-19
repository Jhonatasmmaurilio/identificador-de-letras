var ta, limiar, ps, cd, pesosV, pesosW, saidasP, entradasZ, entradasX, entradasY, epocas, entradas, area_cod, carac, t_neuronios, t_camada_h, saidaP, pesoGv, pesoGw, modo_teste;

/*
VARIAVEIS DE CONFIGURACAO
*/
//Se true, utiliza os pesos da rede já treinada
modo_teste = false;
//Padroes de saida
ps = 7;
//taxa de aprendizagem
ta = 0.2;
//casas deciamais
cd = 3;
//epocas de treinamento
epocas = 1;
//altera o limite de numeros randomigos para os pesos na primeira vez
limiteP = new Array(-1, 1);
//total de entradas X
t_neuronios = 63;
//total de entradas na camada intermediaria
t_camada_h = 63;
//guarda as entradas dos tipos de daos
entradas = new Array();
//define o padrao de saida
saidaP = new Array();