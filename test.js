'use strict'

const tape = require('tape')
const util = require('./index')
const isFunction = require('lodash/isfunction')

const urlSafe = 'asd123'
const nonUrlSafe = 'asd|w«]}≠»d'
const nonString = 12345
const shortString = 'a'

tape('fptf-util.validateArgument', (t) => {
	// station, origin, destination
	const validateStationRight = [
		urlSafe,
		{type: 'station', id: urlSafe, name: urlSafe}
	]
	const validateStationWrong = [
		nonUrlSafe,
		nonString,
		{type: 'station', id: nonUrlSafe, name: urlSafe},
		{type: 'station', id: nonString, name: urlSafe},
		'',
		null,
		undefined,
		{type: 'station', id: '', name: urlSafe},
		{type: 'station', name: urlSafe},
		{type: 'station', id: null, name: urlSafe},
		{type: 'region', id: urlSafe, name: urlSafe},
		{type: 'stop', id: urlSafe, name: urlSafe},
		{id: urlSafe, name: urlSafe},
		{type: 'station', id: urlSafe}
	]
	for (let validateStation of [util.validateArgument.station, util.validateArgument.origin, util.validateArgument.destination]) {
		for (let correct of validateStationRight) t.ok(validateStation(correct), 'station')
		for (let wrong of validateStationWrong) t.throws(() => validateStation(wrong), 'station')
	}


	// query
	const validateQuery = util.validateArgument.query
	const validateQueryRight = [
		urlSafe,
		nonUrlSafe,
		shortString
	]
	const validateQueryWrong = [
		nonString,
		null,
		undefined
	]
	for (let correct of validateQueryRight) t.ok(validateQuery(correct), 'query')
	for (let wrong of validateQueryWrong) t.throws(() => validateQuery(wrong), 'query')


	// location
	const validateLocation = util.validateArgument.location
	const longitude = 13.6
	const latitude = 50.25
	const validateLocationRight = [
		{type: 'location', longitude, latitude},
		{type: 'location', longitude, latitude, otherAttribute: 'key'}
	]
	const validateLocationWrong = [
		undefined,
		null,
		{},
		urlSafe,
		nonString,
		{type: 'location'},
		{longitude, latitude},
		{type: 'location', latitude},
		{type: 'station', longitude, latitude},
		{type: 'asddsa', longitude, latitude},
	]
	for (let correct of validateLocationRight) t.ok(validateLocation(correct), 'location')
	for (let wrong of validateLocationWrong) t.throws(() => validateLocation(wrong), 'location')


	// opt
	const validateOpt = util.validateArgument.opt
	const validateOptRight = [
		{},
		{attribute: 'key'},
		undefined
	]
	const validateOptWrong = [
		null,
		urlSafe,
		nonString
	]
	for (let correct of validateOptRight) t.ok(validateOpt(correct), 'opt')
	for (let wrong of validateOptWrong) t.throws(() => validateOpt(wrong), 'opt')


	// optDistance
	const validateOptDistance = util.validateArgument.optDistance
	const validateOptDistanceRight = [
		undefined,
		null,
		0,
		10,
		10014.16
	]
	const validateOptDistanceWrong = [
		'',
		{},
		-100,
		urlSafe,
		{urlSafe}
	]
	for (let correct of validateOptDistanceRight) t.ok(validateOptDistance(correct), 'optDistance')
	for (let wrong of validateOptDistanceWrong) t.throws(() => validateOptDistance(wrong), 'optDistance')


	// optWhen, optDepartureAfter, optArrivalBefore
	const validateOptWhenRight = [
		undefined,
		null,
		new Date(),
		new Date(100)
	]
	const validateOptWhenWrong = [
		'',
		{},
		0,
		+new Date(),
		new Date()+'',
		nonString,
		urlSafe,
		{urlSafe}
	]
	for (let validateOptWhen of [util.validateArgument.optWhen, util.validateArgument.optDepartureAfter, util.validateArgument.optArrivalBefore]) {
		for (let correct of validateOptWhenRight) t.ok(validateOptWhen(correct), 'optWhen')
		for (let wrong of validateOptWhenWrong) t.throws(() => validateOptWhen(wrong), 'optWhen')
	}


	// optResults
	const validateOptResults = util.validateArgument.optResults
	const validateOptResultsRight = [
		undefined,
		null,
		1,
		192
	]
	const validateOptResultsWrong = [
		'',
		{},
		0,
		new Date(),
		-20,
		1.26,
		urlSafe,
		{urlSafe}
	]
	for (let correct of validateOptResultsRight) t.ok(validateOptResults(correct), 'optResults')
	for (let wrong of validateOptResultsWrong) t.throws(() => validateOptResults(wrong), 'optResults')


	// optInterval
	const validateOptInterval = util.validateArgument.optInterval
	const validateOptIntervalRight = [
		undefined,
		null,
		0,
		10,
		10014.16
	]
	const validateOptIntervalWrong = [
		'',
		{},
		-100,
		urlSafe,
		{urlSafe}
	]
	for (let correct of validateOptIntervalRight) t.ok(validateOptInterval(correct), 'optInterval')
	for (let wrong of validateOptIntervalWrong) t.throws(() => validateOptInterval(wrong), 'optInterval')


	// optTransfers
	const validateOptTransfers = util.validateArgument.optTransfers
	const validateOptTransfersRight = [
		undefined,
		null,
		0,
		1,
		192
	]
	const validateOptTransfersWrong = [
		'',
		{},
		new Date(),
		-20,
		1.26,
		urlSafe,
		{urlSafe}
	]
	for (let correct of validateOptTransfersRight) t.ok(validateOptTransfers(correct), 'optTransfers')
	for (let wrong of validateOptTransfersWrong) t.throws(() => validateOptTransfers(wrong), 'optTransfers')


	// optVia, optDirection
	const validateOptStationRight = [
		undefined,
		null,
		urlSafe,
		{type: 'station', id: urlSafe, name: urlSafe}
	]
	const validateOptStationWrong = [
		'',
		0,
		nonUrlSafe,
		nonString,
		{type: 'station', id: nonUrlSafe, name: urlSafe},
		{type: 'station', id: nonString, name: urlSafe},
		{type: 'station', id: '', name: urlSafe},
		{type: 'station', name: urlSafe},
		{type: 'station', id: null, name: urlSafe},
		{type: 'region', id: urlSafe, name: urlSafe},
		{type: 'stop', id: urlSafe, name: urlSafe},
		{id: urlSafe, name: urlSafe},
		{type: 'station', id: urlSafe}
	]
	for (let validateOptStation of [util.validateArgument.optVia, util.validateArgument.optDirection]) {
		for (let correct of validateOptStationRight) t.ok(validateOptStation(correct), 'optStation')
		for (let wrong of validateOptStationWrong) t.throws(() => validateOptStation(wrong), 'optStation')
	}


	// optCurrency
	const validateOptCurrency = util.validateArgument.optCurrency
	const validateOptCurrencyRight = [
		undefined,
		null,
		'EUR',
		'pln',
		'GbP'
	]
	const validateOptCurrencyWrong = [
		'ZZZ',
		'ABC',
		'cde',
		'DeY',
		'',
		{},
		new Date(),
		-20,
		1.26,
		urlSafe,
		nonUrlSafe,
		nonString,
		{urlSafe}
	]
	for (let correct of validateOptCurrencyRight) t.ok(validateOptCurrency(correct), 'optCurrency')
	for (let wrong of validateOptCurrencyWrong) t.throws(() => validateOptCurrency(wrong), 'optCurrency')


	// stationsOpt, stopsOpt, regionsOpt
	for (let validateStationsOpt of [util.validateArgument.stationsOpt, util.validateArgument.stopsOpt, util.validateArgument.regionsOpt]) {
		for (let correct of validateOptRight) t.ok(validateStationsOpt(correct), 'stationsOpt')
		for (let wrong of validateOptWrong) t.throws(() => validateStationsOpt(wrong), 'stationsOpt')
	}


	// stationsSearchOpt, stopsSearchOpt, regionsSearchOpt
	for (let validateStationsSearchOpt of [util.validateArgument.stationsSearchOpt, util.validateArgument.stopsSearchOpt, util.validateArgument.regionsSearchOpt]) {
		for (let correct of validateOptRight) t.ok(validateStationsSearchOpt(correct), 'stationsSearchOpt')
		for (let wrong of validateOptWrong) t.throws(() => validateStationsSearchOpt(wrong), 'stationsSearchOpt')
	}


	// stationsNearbyOpt, stopsNearbyOpt, regionsNearbyOpt
	for (let validateStationsNearbyOpt of [util.validateArgument.stationsNearbyOpt, util.validateArgument.stopsNearbyOpt, util.validateArgument.regionsNearbyOpt]) {
		for (let correct of validateOptRight) t.ok(validateStationsNearbyOpt(correct), 'stationsNearbyOpt')
		for (let wrong of validateOptWrong) t.throws(() => validateStationsNearbyOpt(wrong), 'stationsNearbyOpt')

		for (let correct of validateOptDistanceRight) t.ok(validateStationsNearbyOpt({distance: correct}, 'stationsNearbyOpt'))
		for (let wrong of validateOptDistanceWrong) t.throws(() => validateStationsNearbyOpt({distance: wrong}, 'stationsNearbyOpt'))
	}


	// journeysOpt
	const validateJourneysOpt = util.validateArgument.journeysOpt
	const [date1, date2] = validateOptWhenRight.filter(x => !!x)
	const validateJourneysOptRight = [
		{when: date1, departureAfter: date1},
		{when: date1, departureAfter: null},
		{when: null, departureAfter: date1},
		{when: null, departureAfter: null},
		{when: null, arrivalBefore: date1},
		{departureAfter: null, arrivalBefore: date1},
		{when: date1, arrivalBefore: null},
		{departureAfter: date1, arrivalBefore: null}
	]
	const validateJourneysOptWrong = [
		{when: date1, departureAfter: date2},
		{arrivalBefore: date1, departureAfter: date2},
		{arrivalBefore: date1, departureAfter: date1},
		{arrivalBefore: date1, when: date1},
		{arrivalBefore: date1, when: date1}
	]
	for (let correct of validateOptRight) t.ok(validateJourneysOpt(correct), 'journeysOpt')
	for (let wrong of validateOptWrong) t.throws(() => validateJourneysOpt(wrong), 'journeysOpt')
	for (let correct of validateOptWhenRight) {
		t.ok(validateJourneysOpt({when: correct}, 'journeysOpt'))
		t.ok(validateJourneysOpt({departureAfter: correct}, 'journeysOpt'))
		t.ok(validateJourneysOpt({arrivalBefore: correct}, 'journeysOpt'))
	}
	for (let wrong of validateOptWhenWrong) {
		t.throws(() => validateJourneysOpt({when: wrong}, 'journeysOpt'))
		t.throws(() => validateJourneysOpt({departureAfter: wrong}, 'journeysOpt'))
		t.throws(() => validateJourneysOpt({arrivalBefore: wrong}, 'journeysOpt'))
	}
	for (let correct of validateOptResultsRight) t.ok(validateJourneysOpt({results: correct}, 'journeysOpt'))
	for (let wrong of validateOptResultsWrong) t.throws(() => validateJourneysOpt({results: wrong}, 'journeysOpt'))
	for (let correct of validateOptIntervalRight) t.ok(validateJourneysOpt({interval: correct}, 'journeysOpt'))
	for (let wrong of validateOptIntervalWrong) t.throws(() => validateJourneysOpt({interval: wrong}, 'journeysOpt'))
	for (let correct of validateOptTransfersRight) t.ok(validateJourneysOpt({transfers: correct}, 'journeysOpt'))
	for (let wrong of validateOptTransfersWrong) t.throws(() => validateJourneysOpt({transfers: wrong}, 'journeysOpt'))
	for (let correct of validateOptCurrencyRight) t.ok(validateJourneysOpt({currency: correct}, 'journeysOpt'))
	for (let wrong of validateOptCurrencyWrong) t.throws(() => validateJourneysOpt({currency: wrong}, 'journeysOpt'))
	for (let correct of validateOptStationRight) t.ok(validateJourneysOpt({via: correct}, 'journeysOpt'))
	for (let wrong of validateOptStationWrong) t.throws(() => validateJourneysOpt({via: wrong}, 'journeysOpt'))
	for (let correct of validateJourneysOptRight) t.ok(validateJourneysOpt(correct, 'journeysOpt'))
	for (let wrong of validateJourneysOptWrong) t.throws(() => validateJourneysOpt(wrong, 'journeysOpt'))


	t.end()
})
