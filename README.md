# SYNOPSIS

🕯 Normalize candle data to a single, consistent format irrespective of exchange.

## USAGE

```sh
npm i -S joemccann/candle-normalizer
```

In your node.js app:

```js
const normalizer = require('candle-normalizer')

const { err, data }  = normalizer({
  exchange: 'binance',
  candles: [...]
})

if (err) console.error(err.message)
else console.dir(data)

//
// data is an array of candle objects.
// each candle object is of the form:
//

/*
{
  open: Float
  high: Float
  low: Float
  close: Float
  volume: Float
  timestamp: Integer (in milliseconds)
}
*/

```

## TESTS

```sh
npm i -D
npm test
```

## LICENSE

MIT