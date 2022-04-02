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

function validate(cpf = null) {
	cpf = removeMask(cpf);

	if (!sizeOfCPFHas11Digits(cpf)) {
		return false;
	}

	if (!cpf.split("").every((c) => c === cpf[0])) {
		return false;
	}

	try {
		let d1, d2;
		let dg1, dg2, rest;
		let digito;
		let nDigResult;
		d1 = d2 = 0;
		dg1 = dg2 = rest = 0;

		for (let nCount = 1; nCount < cpf.length - 1; nCount++) {
			digito = parseInt(cpf.substring(nCount - 1, nCount));
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
		nDigResult = "" + dg1 + "" + dg2;
		return nDigVerific == nDigResult;
	} catch (e) {
		console.error("Erro !" + e);

		return false;
	}
}

module.exports = { validate, sizeOfCPFHas11Digits };
