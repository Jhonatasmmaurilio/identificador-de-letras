var pesos_finais, js_btn_pesos, btn_treinar, btn_analisar, area_cod, btn_letra, resultado_teste;

$(document).ready(function () {
	btn_pesos = $('.js-btn-pesos');
	pesos_finais_v = $('.js-pesos-finais-v');
	pesos_finais_w = $('.js-pesos-finais-w');
	btn_treinar = $('.js-treinar');
	btn_analisar = $('.js-analisar');
	area_cod = $('#area-codigo');
	btn_letra = $(".js-btn-letra");

	btn_treinar.on('click', function () {
		btn_pesos.hide();

		modo_teste = false;
		analisar();
	});

	btn_analisar.on('click', function () {
		if (area_cod.val() != "") {
			testarCaracter();
		} else {
			M.toast({
				html: 'Por favor escolha um caracter para ser analisado, ou escreva seu caracter no campo de texto!'
			});
		}
	});

	btn_letra.on('click', function () {
		var el = $(this),
			tipo,
			modal;

		tipo = el.data("letra");
		modal = $("#modal-caracteres");

		var letra = retornaCaracter(tipo);
		area_cod.val(letra);
		modal.modal('close');
	});
});

//identifica o caracter inserido pelo usuario, e retorna para a area de codigo
function retornaCaracter(tipo) {
	switch (tipo) {
		case 'a1':
			return carac_a1;
		case 'a2':
			return carac_a2;
		case 'a3':
			return carac_a3;
		case 'b1':
			return carac_b1;
		case 'b2':
			return carac_b2;
		case 'b3':
			return carac_b3;
		case 'c1':
			return carac_c1;
		case 'c2':
			return carac_c2;
		case 'c3':
			return carac_c3;
		case 'd1':
			return carac_d1;
		case 'd2':
			return carac_d2;
		case 'd3':
			return carac_d3;
		case 'e1':
			return carac_e1;
		case 'e2':
			return carac_e2;
		case 'e3':
			return carac_e3;
		case 'j1':
			return carac_j1;
		case 'j2':
			return carac_j2;
		case 'j3':
			return carac_j3;
		case 'k1':
			return carac_k1;
		case 'k2':
			return carac_k2;
		case 'k3':
			return carac_k3;
	}
}

/*
Analisa os caractere inseridos no area de codigo para deciframento
chama a funcao par analisar o codigo
*/
function testarCaracter() {
	var tam_cod, cod;
	carac = area_cod.val().replace(/(\r\n|\n|\r)/gm, "");

	tam_cod = carac.length;
	cod = new Array();

	for (var i = 0; i < tam_cod; i++) {
		var tipo;

		if (carac[i] == "#") {
			cod.push(1);
		} else if (carac[i] == ".") {
			cod.push(-1);
		} else {
			cod.push(0);
		}
	};

	console.log(cod);

	if (cod.length != 63) {
		M.toast({
			html: 'Seu caracter deve ter dimensão 9x7!'
		});
	} else {
		testarRede(cod);
	}
}

/*
Testa a tede com uma entrada enviada
*/
function testarRede(entrada_teste) {
	modo_teste = true;
	entradasX = entrada_teste;

	passo0();
	passo03_04();

	console.log("%cPADRAO DE SAIDA", 'color: green');
	console.log(entradasY);

	resultado_teste = entradasY;

	analiseResultado(resultado_teste);
}

/*
Analisa os resultados vindo do teste da rede e arredonda os numeros
*/
function analiseResultado(resultado) {
	var arr, porcent_bar;
	porcent_bar = $('js-porcent-bar');

	arr = new Array();

	for (var i = 0; i < resultado.length; i++) {
		arr.push(Math.round(resultado[i]));
	}

	console.log(arr);
}

/*
Executa o passo 01
*/
function analisar() {
	passo0();
	passo01();
}

/*
encarregado de se comunicar com o front
*/
function io(pesosV, pesosW) {
	var str_pesoV, str_pesoW;

	str_pesoV = organizaPesos(pesosV);
	str_pesoW = organizaPesos(pesosW);

	pesos_finais_v.html(str_pesoV);
	pesos_finais_w.html(str_pesoW);
	btn_pesos.show();
}

/*
encarregado de se comunicar com o front
*/
function organizaPesos(peso) {
	var tam_i, tam_j, str_arr;

	tam_i = peso.length;
	tam_j = peso[0].length;
	str_arr = "[";

	for (var i = 0; i < tam_i; i++) {
		str_arr += "[";
		for (var j = 0; j < tam_j; j++) {
			str_arr += peso[i][j];

			if (j != (tam_j - 1)) {
				str_arr += ",";
			}
		}

		str_arr += "],<br>"
	}

	str_arr += "]";

	return str_arr;
}
