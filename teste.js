function busca_binaria(v, comp, elem) {
	let variavel;

	//Início

	minimo = 1

	maximo = comp

	meio = 0

	vezes = 0

	achou = false

	resultado = -1


	loopStart = Date.now();
	while (minimo <= maximo && !achou) {
		if (Date.now() - loopStart > 30000) {
			console.log('Erro no código - Loop demorou demais. Verifique se existe um loop infinito.')
			break;
		}



		vezes = vezes + 1

		meio = ((maximo + minimo) / 2 >> 0)

		if (v[meio - 1] < elem) {

			minimo = meio + 1

		} else {

			if (v[meio - 1] > elem) {

				maximo = meio - 1

			} else {

				console.log("vezes:" + vezes);

				achou = true

				resultado = meio

			}

		}

	}

	console.log("vezes:" + vezes);

	variavel = typeof resultado != "undefined" ? resultado : variavel;
	return variavel;
}

//Início

if (typeof dados === 'undefined' || !dados) {
	dados = Array("null")
}
dados[1 - 1] = 3; dados[2 - 1] < -9; dados[3 - 1] < -11; dados[4 - 1] < -21


dados[5 - 1] = 34; dados[6 - 1] < -54; dados[7 - 1] < -67; dados[8 - 1] < -90

comp = 8

elem_a_procurar = 54

posicao = busca_binaria(dados, comp, elem_a_procurar);



if (posicao != -1) {


} else {


}