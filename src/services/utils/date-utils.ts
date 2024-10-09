function isFirstDateGreaterThanSecond(date1, date2) {
	const firstDate = new Date(date1);
	const secondDate = new Date(date2);

	return firstDate > secondDate;
}

export { isFirstDateGreaterThanSecond };