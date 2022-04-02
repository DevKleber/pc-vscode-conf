function removeMask(cpf) {
	return cpf
		.replace(".", "")
		.replace(".", "")
		.replace("-", "")
		.replace(" ", "");
}
const sizeOfCPFHas11Digits = (cpf) => {
	return cpf.length == 11;
};

function allNumbersAreEqual(cpf) {
	const saoiguais = cpf.split("").every((number) => number === cpf[0]);
	return saoiguais;
}

function validate(cpf = null) {
	cpf = removeMask(cpf);

	if (!sizeOfCPFHas11Digits(cpf)) {
		return false;
	}

	if (allNumbersAreEqual(cpf)) {
		return false;
	}

	let [d1, d2] = [0, 0];
	let dg1 = 0;

	for (let i = 1; i < cpf.length - 1; i++) {
		const digito = parseInt(cpf.substring(i - 1, i));
		d1 = d1 + (11 - i) * digito;
		d2 = d2 + (12 - i) * digito;
	}

	rest = d1 % 11;

	dg1 = rest < 2 ? 0 : 11 - rest;
	d2 += 2 * dg1;
	rest = d2 % 11;

	const dg2 = (rest < 2) ? 0 : 11 - rest;

	let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
	const nDigResult = "" + dg1 + "" + dg2;
	return nDigVerific == nDigResult;
}

module.exports = { validate, sizeOfCPFHas11Digits,allNumbersAreEqual };
