var entradas = new Array();
var area_cod;
var carac;
var bin = new Array();

area_cod = $('#area-codigo');
carac = area_cod.val().replace(/(\r\n|\n|\r)/gm, "");

var tam_cod = carac.length;

for (var i = 0; i < tam_cod; i++) {
	var tipo;

	if (carac[i] == "#") {
		entradas.push(1);
	} else if (carac[i] == ".") {
		entradas.push(-1);
	} else {
		entradas.push(0);
	}
};

//console.log(entradas);

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
e = 1;//1
//taxa de aprendizagem
ta = 0.2;//2.71
//casas deciamais
cd = 1;
//epocas de treinamento
epocas = 5;

//Guarda as entradas dos neuronios inicial
//entradasX = new Array(1,1,0);
entradasX = entradas;

//Guarda os valores das arestas de X
//var arr = new Matrix(3,3);
var arr = new Matrix(63,63);
pesosV = arr.data;

//console.log(pesosV);

//Guarda os valores das aresta de Z
//var arr = new Matrix(3,2);
var arr = new Matrix(63,7);
pesosW = arr.data;

//console.log(pesosV);
//console.log(pesosW);
//console.log(entradasX);

//Guarda as saidas padrao
var saidaA = new Array(1,0,0,0,0,0,0);
saidasP = saidaA;
//saidasP = new Array();

//console.log(saidasP);

//testando a soma das entradas com os pesos
var t= "";
var sum = 0;

for(var j =0;j<1;j++){
	for(var i = 0;i < pesosW.length;i++){
		t += "(" + entradasX[i] + "*" + pesosV[i][j] + ") + ";
		sum = sum + (entradasX[i] * pesosV[i][j]);
	}
	console.log("n" + j + ": " + t);
	console.log(sum.toFixed(cd));
	sum = 0;

	t = "";
}

