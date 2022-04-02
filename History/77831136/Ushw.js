const example1 = require("./example1_after.js");

test("Deve calcular o valor de uma corrida de taxi em dias normais", () => {
	// given (dado quem, cenário) arrange
	const distance = 1000;
	const date = new Date("2021-07-10T10:00:00");

	// when (quando lago acontecer) act
	const price = example1.calc(distance, date);
	// then (então algo deve ser verificado) assert
	expect(price).toBe(2100);
});
