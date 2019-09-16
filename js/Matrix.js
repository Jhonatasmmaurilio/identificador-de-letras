class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;

		this.data = new Array();

		for (var i = 0; i < rows; i++) {
			var arr = [];
			for (var j = 0; j < cols; j++) {
				arr.push(parseFloat(Math.random().toFixed(1)));
			}

			this.data.push(arr);
		}

		function geraPesos() {
			if (peso != undefined) {
				return parseFloat(Math.random().toFixed(1));
			} else {
				return peso;
			}
		}
	}
}
