const OVERNIGHT_RATE = 3.9;
const SUNDAY_RATE = 2.9;
const NORMAL_RATE = 2.1;

const isOvernight = (date) => {
	return date.getHours() >= 22;
};
const isSunday = (date) => {
	return date.getDay() === 0;
};

const calculateRide = function (distance, date) {
	if (isOvernight(date)) {
		return distance * OVERNIGHT_RATE;
	}

	if (isSunday(date)) {
		return distance * SUNDAY_RATE;
	}

	return distance * NORMAL_RATE;
};

module.exports = {
	calculateRide
}