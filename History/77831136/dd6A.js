const example1 = require("./example1_after.js");

test("Deve calcular o valor de uma corrida de taxi em dias normais", () => {
	const distance = 1000;
	const date = new Date("2021-07-10T10:00:00");
	const price = example1.calc(distance, date);
	expect(price).toBe(2100);
});

test("Deve calcular o valor de uma corrida de taxi nos domingos", () => {
	const distance = 1000;
	const date = new Date("2021-07-11T10:00:00");
	const price = example1.calc(distance, date);
	expect(price).toBe(2900);
});

test("Deve calcular o valor de uma corrida de taxi de noite", () => {
	const distance = 1000;
	const date = new Date("2021-07-10T23:00:00");
	const price = example1.calc(distance, date);
	expect(price).toBe(3900);
});
