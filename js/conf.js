var entradas = new Array();
var area_cod;
var carac;

var a1 = new Array(-1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1);

var a2 = new Array(-1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1);

var a3 = new Array(-1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, 1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, 1, 1);

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
ps = 7;//2
//limiar
e = 0.5;//1
//taxa de aprendizagem
ta = 0.2;//2.71
//casas deciamais
cd = 3;
//epocas de treinamento
epocas = 1;