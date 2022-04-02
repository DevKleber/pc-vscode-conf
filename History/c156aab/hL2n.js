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
	return cpf.split("").every((number) => number === cpf[0]);
}

function validate(cpf = null) {
	cpf = removeMask(cpf);

	if (!sizeOfCPFHas11Digits(cpf)) {
		return false;
	}

	if (allNumbersAreEqual(cpf)) {
		return false;
	}

	let d1 = 0;
	let d2 = 0;
	let dg1 = 0;

	for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
		const digito = parseInt(cpf.substring(nCount - 1, nCount));
		d1 = d1 + (11 - nCount) * digito;
		d2 = d2 + (12 - nCount) * digito;
	}

	rest = d1 % 11;

	dg1 = rest < 2 ? (dg1 = 0) : 11 - rest;
	d2 += 2 * dg1;
	rest = d2 % 11;
	if (rest < 2) dg2 = 0;
	else dg2 = 11 - rest;

	let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
	const nDigResult = "" + dg1 + "" + dg2;
	return nDigVerific == nDigResult;
}

module.exports = { validate, sizeOfCPFHas11Digits };
