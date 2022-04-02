const example2 = require("./example2_after.js");

test("Deve validar o cpf", () => {
	const cpfValid = "531.876.690-00"
	const isValid = example2.validate(cpfValid);
	expect(isValid).toBe(true);
});
