const OVERNIGHT_RATE = 3.9;
const SUNDAY_RATE = 2.9;
const NORMAL_RATE = 2.1;

const isOvernight = (date) => {
	return date.getHours() >= 22;
};

exports.calculateRide = function (distance, date) {
	if (isOvernight(date)) {
		return distance * OVERNIGHT_RATE;
	}
	const isSunday = date.getDay() === 0;
	if (isSunday) {
		return distance * SUNDAY_RATE;
	}

	return distance * NORMAL_RATE;
};
