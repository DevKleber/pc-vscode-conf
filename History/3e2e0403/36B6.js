const {validate, sizeOfCPFHas11Digits} = require("./index.js");

test("CPF deve ser valido", () => {
	const cpfValid = "531.876.690-00";
	const isValid = validate(cpfValid);
	expect(isValid).toBe(true);
});

test("CPF deve ser inválido", () => {
	const cpfValid = "123.456.789-00";
	const isInvalid = validate(cpfValid);
	expect(isInvalid).toBe(false);
});

test("Deve dar erro se o CPF tiver menos ou mais do que 11 caracteres", () => {
	const cpfValid = "123.456.7812-00";
	const isInvalid = sizeOfCPFHas11Digits(cpfValid);
	expect(isInvalid).toBe(false);
});
