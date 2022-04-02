const example2 = require("./example2_after.js");

test("CPF deve ser valido", () => {
	const cpfValid = "531.876.690-00";
	const isValid = example2.validate(cpfValid);
	expect(isValid).toBe(true);
});

test("CPF deve ser inválido", () => {
	const cpfValid = "123.456.789-00";
	const isInvalid = example2.validate(cpfValid);
	expect(isInvalid).toBe(false);
});

test("Deve dar erro se o CPF tiver menos do que 11 caracteres", () => {
	const cpfValid = "123.456.78-00";
	const isInvalid = example2.validate(cpfValid);
	expect(isInvalid).toBe(false);
});