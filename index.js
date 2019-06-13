module.exports = (data) => {
  let {
    candles,
    exchange
  } = data

  exchange = exchange.toLowerCase()

  //
  // https://docs.pro.coinbase.com/#get-historic-rates
  //
  if (exchange === 'coinbase') {
    //
    // [ [ 1560384000, 8145.66, 8198.38, 8176.03, 8166.22, 338.09846837 ]...]
    //

    const normalized = []

    candles.forEach(candle => {
      normalized.push({
        open: candle[3],
        high: candle[2],
        low: candle[1],
        close: candle[4],
        volume: candle[5],
        timestamp: parseInt(candle[0]) * 1000
      })
    })
    return { data: normalized }
  }

  if (exchange === 'binance') {
    //
    // [ { openTime: 1560238800000,
    //     open: '0.03095500',
    //     high: '0.03098600',
    //     low: '0.03095400',
    //     close: '0.03097400',
    //     volume: '210.93800000',
    //     closeTime: 1560239099999,
    //     quoteVolume: '6.53284563',
    //     trades: 335,
    //     baseAssetVolume: '115.95600000',
    //     quoteAssetVolume: '3.59153067' }...]
    //

    const normalized = []

    candles.forEach(candle => {
      normalized.push({
        open: parseFloat(candle.open),
        high: parseFloat(candle.high),
        low: parseFloat(candle.low),
        close: parseFloat(candle.close),
        volume: parseFloat(candle.volume),
        timestamp: parseInt(candle.closeTime)
      })
    })
    return { data: normalized }
  }

  return { err: new Error(`Exchange, ${exchange}, not supported.`) }
}
