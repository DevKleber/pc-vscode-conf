const {validate, sizeOfCPFHas11Digits, allNumbersAreEqual} = require("./index.js");

test("CPF deve ser valido", () => {
	const cpfValid = "704.557.190-98";
	const isValid = validate(cpfValid);
	expect(isValid).toBe(true);
});

test("CPF deve ser inválido", () => {
	const cpfValid = "123.456.789-00";
	const isInvalid = validate(cpfValid);
	expect(isInvalid).toBe(false);
});

test("Todos os números são iguais", () => {
	const cpfValid = "111.111.111-11";
	const arEqual = allNumbersAreEqual(cpfValid);
	expect(arEqual).toBe(true);
});

test("Deve dar erro se o CPF tiver menos ou mais do que 11 caracteres", () => {
	const cpfValid = "123.456.7812-00";
	const isInvalid = sizeOfCPFHas11Digits(cpfValid);
	expect(isInvalid).toBe(false);
});