const example2 = require("./example2_after.js");

test("Deve validar o cpf", () => {
	const cpf = '123.456.789-10';
	const price = example2.validate(cpf);
	expect(price).toBe(2100);
});

test("Deve calcular o valor de uma corrida de taxi nos domingos", () => {
	
});

