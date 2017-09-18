## Convert currency using [this api](https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json)

```
npm i bank-gov-ua-currency-convert
```

## Usage

```javascript
const convert = require('bank-gov-ua-currency-convert')
const amount = await convert(100, 'USD', 'UAH')
```

**NOTE** currency rates are memoized (cached) for 4 hours

## License

MIT
