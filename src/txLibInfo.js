/* global */

export const txLibInfo = {
  supportedTokens: ['ERC20'],

  getInfo: {
    // Details of supported currency
    currencyCode: 'ETH', // The 3 character code for the currency
    denominations: [
      // An array of Objects of the possible denominations for this currency
      {
        name: 'Wei', // The human readable string to describe the denomination
        multiplier: 1, // The value to multiply the smallest unit of currency to get to the denomination
        symbol: 'aΞ' // atto-Ether
      },
      {
        name: 'Szabo',
        multiplier: 1000000000000,
        symbol: 'μΞ'
      },
      {
        name: 'Finney',
        multiplier: 1000000000000000,
        symbol: 'mΞ'
      },
      {
        name: 'Ether',
        multiplier: 1000000000000000000,
        symbol: 'Ξ'
      }
    ],
    symbolImage: '' // Base64 encoded png or jpg image of the currency symbol (optional)
  }
}
