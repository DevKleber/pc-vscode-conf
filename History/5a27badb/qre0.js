// calculate ride
exports.calculateRide = function (distance, date) {
	// overnight
	if (date.getHours() >= 22) {
		return distance * 3.9;
	} else {
		//sanday
		if (date.getDay() === 0) {
			return distance * 2.9;
		} else {
			return distance * 2.1;
		}
	}
};
