// calculate ride
exports.calculateRide = function (distance, date) {
	const isOvernight = date.getHours() >= 22;
	if (isOvernight) {
		return distance * 3.9;
	}
	const isSunday = date.getDay() === 0;
	if (isSunday) {
		return distance * 2.9;
	} else {
		return distance * 2.1;
	}
};
