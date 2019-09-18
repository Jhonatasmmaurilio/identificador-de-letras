class Matrix {
	constructor(rows, cols, limite) {
		this.rows = rows;
		this.cols = cols;

		this.data = new Array();

		for (var i = 0; i < rows; i++) {
			var arr = [];
			for (var j = 0; j < cols; j++) {
				arr.push(geraNumeros(limite[0],limite[1]));
			}

			this.data.push(arr);
		}

		function geraNumeros(inferior, superior) {
			var numPossibilidades = superior - inferior
			var aleat = Math.random() * numPossibilidades

			return parseFloat((parseInt(inferior) + aleat).toFixed(1));
		}
		
		function retornaPeso() {
			var arr = new Array();
			
//			arr = 
		}
	}
}
