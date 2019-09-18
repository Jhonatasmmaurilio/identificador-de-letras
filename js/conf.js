var entradas = new Array();
var area_cod;
var carac;

var a1 = new Array(-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1);

var a2 = new Array(-1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1);

var a3 = new Array(-1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1);

//Entradas de teste

//var t1 = new Array(1, 1, 0);
//var t2 = new Array(1, 0, 0);
//var t3 = new Array(0, 0, 1);

//area_cod = $('#area-codigo');
//carac = area_cod.val().replace(/(\r\n|\n|\r)/gm, "");
//
//var tam_cod = carac.length;
//
//for (var i = 0; i < tam_cod; i++) {
//	var tipo;
//
//	if (carac[i] == "#") {
//		entradas.push(1);
//	} else if (carac[i] == ".") {
//		entradas.push(-1);
//	} else {
//		entradas.push(0);
//	}
//};

entradas = new Array(a1, a2, a3);

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
ps = 7; //2
//limiar ou euler nao sei
//e = 2.71; //1
//taxa de aprendizagem
ta = 0.2; //2.71
//casas deciamais
cd = 3;
//epocas de treinamento
epocas = 1000;
//altera o limite de numeros randomigos para os pesos na primeira vez
limiteP = new Array(-1, 1);

/*
Popula as matrizes de V e W, com numeros randomicos entre 0 e 1
Executao o passo 0
*/
function passo0() {
	var arr = new Matrix(63, 63, limiteP);
	pesosV = arr.data;

	var arr = new Matrix(63, 7, limiteP);
	pesosW = arr.data;

	var saidaA = new Array(1, 0, 0, 0, 0, 0, 0);
	saidasP = saidaA;

	//Teste com poucas entradas
	//	var arr = new Matrix(3, 3,limiteP);
	//	pesosV = arr.data;
	//
	//	var arr = new Matrix(3, ps,limiteP);
	//	pesosW = arr.data;
	//
	//	var saidaA = new Array(1, 1);
	//	saidasP = saidaA;
}
