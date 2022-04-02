import { validate, sizeOfCPFHas11Digits } from "example2.test.js";

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

test("Deve dar erro se o CPF tiver menos do que 11 caracteres", () => {
	const cpfValid = "123.456.78-00";
	const isInvalid = sizeCPF(sizeOfCPFHas11Digits);
	expect(isInvalid).toBe(false);
});
