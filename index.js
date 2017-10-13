const Promise = require('bluebird')
const request = Promise.promisify(require('request'))
const memoizee = require('memoizee')
const debug = require('debug')('bank-gov-ua-currency-convert')

const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
const BASE_CURRENCY = 'UAH'
const EXCHANGE_RATES_CACHE_TIMEOUT = 1000 * 60 * 60 * 4 // 4 hours

function fetchCurrencies () {
	return request({
		url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
		method: 'get',
		json: true,
	}).then(res => {
		return res.body.reduce((mem, value) => {
			mem[value.cc] = value
			return mem
		}, {})
	})
}

const memoizedFetchCurrencies = memoizee(fetchCurrencies, { promise: true, maxAge: EXCHANGE_RATES_CACHE_TIMEOUT  })

function convert (amount, fromCurrency, toCurrency) {
	debug('params', amount, fromCurrency, toCurrency)
	return memoizedFetchCurrencies().then(rates => {
		debug('rates', rates)
		if (fromCurrency !== BASE_CURRENCY) {
			amount = amount * rates[fromCurrency].rate
		}
		if (toCurrency === BASE_CURRENCY) {
			return amount
		}
		return amount / rates[toCurrency].rate
	})
}

module.exports = convert
