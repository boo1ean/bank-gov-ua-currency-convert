## Convert currency using https://bank.gov.ua api

```
npm i bank-gov-ua-currency-convert
```

## Usage

```
const convert = require('bank-gov-ua-currency-convert')
const amount = await convert(100, 'USD', 'UAH')
```

**NOTE** currency rates are memoized (cached) for 4 hours

## License

MIT
