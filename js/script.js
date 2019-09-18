$(document).ready(function () {
	var pesos_finais, js_btn_pesos, btn_treinar, btn_analisar, area_cod;

	btn_pesos = $('.js-btn-pesos');
	pesos_finais_v = $('.js-pesos-finais-v');
	pesos_finais_w = $('.js-pesos-finais-w');
	btn_treinar = $('.js-treinar');
	btn_analisar = $('.js-analisar');
	area_cod = $('#area-codigo');

	btn_treinar.on('click', function () {
		btn_pesos.hide();
		analizar();
	});
	
	btn_analisar.on('click', function () {
		analisarCaracter();
	});

	function analisarCaracter() {
		carac = area_cod.val().replace(/(\r\n|\n|\r)/gm, "");

		var tam_cod = carac.length;
		var cod = new Array();

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
	}
});
