const test = require('tape')
const normalizer = require('.')

const Binance = require('binance-api-node').default
const client = Binance()

const CoinbasePro = require('coinbase-pro')
const coinbaseApi = new CoinbasePro.PublicClient()

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('pass - binance values', async t => {
  const candles = await client.candles({ symbol: 'ETHBTC' })
  const { data: normalized } = normalizer({ exchange: 'binance', candles })

  const candle = candles[0]
  const normal = normalized[0]

  t.equals(parseFloat(candle.open), normal.open)
  t.equals(parseFloat(candle.high), normal.high)
  t.equals(parseFloat(candle.low), normal.low)
  t.equals(parseFloat(candle.close), normal.close)
  t.equals(parseFloat(candle.volume), normal.volume)
  t.equals(parseInt(candle.closeTime), normal.timestamp)
  t.end()
})

test('pass - coinbase values', async t => {
  const candles = await coinbaseApi.getProductHistoricRates('BTC-USD',
    { granularity: 86400 })

  const { data: normalized } = normalizer({ exchange: 'coinbase', candles })

  const candle = candles[0]
  const normal = normalized[0]

  t.equals(parseFloat(candle[3]), normal.open)
  t.equals(parseFloat(candle[2]), normal.high)
  t.equals(parseFloat(candle[1]), normal.low)
  t.equals(parseFloat(candle[4]), normal.close)
  t.equals(parseFloat(candle[5]), normal.volume)
  t.equals(parseInt(candle[0]) * 1000, normal.timestamp)
  t.end()
})

test('fail - unsupported exchange', async t => {
  const { err } = normalizer({ exchange: 'gemini', candles: [] })
  t.ok(err)
  t.equals(err.message, `Exchange, gemini, not supported.`)
  t.end()
})
