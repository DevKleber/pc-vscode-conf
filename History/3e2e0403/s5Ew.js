const example2 = require("./example2_after.js");

test("Deve validar o cpf", () => {
	const cpf = '123.456.789-10';
	const isValid = example2.validate(cpf);
	expect(isValid).toBe(true);
});
