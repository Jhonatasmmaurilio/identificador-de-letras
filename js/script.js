var entradaX = new Array();

$(document).ready(function () {
	$('.tabs').tabs();

	$('.tooltipped').tooltip();
	
	var area_cod;
	var carac;
	var bin = new Array();
	
	area_cod = $('#area-codigo');
	carac = area_cod.val().replace(/(\r\n|\n|\r)/gm, "");
	
	var tam_cod = carac.length;
	
	for(var i =0; i < tam_cod;i++){
		var tipo;
		
		if(carac[i] == "#") {
			bin.push(1);
		}else if(carac[i] == "."){
			bin.push(-1);
		}else{
			bin.push(0);
		}
	};
	
	entradas = bin;
});