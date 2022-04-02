function removeMask(cpf) {
	return cpf.replace(/\D/g, "");
}
const sizeOfCPFHas11Digits = (cpf) => {
	return cpf.length === 11;
};

function allNumbersAreEqual(cpf) {
	const [firstDigit] = cpf;
	return [...cpf].every((digit) => digit === firstDigit);
}

function calculateDigit(cpf, factor) {
	let total = 0;
	for (const digit of cpf) {
		if (factor > 1) {
			total += parseInt(digit) * factor--;
		}
	}
	const rest = total % 11;
	return (rest < 2) ? 0 : 11 - rest;
}

function validate(rawCpf = null) {
	cpf = removeMask(rawCpf);

	if (!sizeOfCPFHas11Digits(cpf)) {
		return false;
	}

	if (allNumbersAreEqual(cpf)) {
		return false;
	}

	const digit1 = calculateDigit(cpf, 10);
	const digit2 = calculateDigit(cpf, 11);

	const actualDigit = cpf.slice(9);
	const calculatedDigit = `${digit1}${digit2}`;

	return actualDigit == calculatedDigit;
}

module.exports = { validate, sizeOfCPFHas11Digits, allNumbersAreEqual };