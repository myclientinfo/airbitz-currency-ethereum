/* global describe it */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const { expect } = chai

const ABCTxLibAccess = {
  accountDataStore: {},
  walletDataStore: {}
}
const options = {
  masterPrivateKey: 'PRIVATEgjXJSvjNRSLic2xvcep9AP9n1UKwC2CwmXb3Y5sSNspyr',
  masterPublicKey: 'PUBLICDgjXJSvjNRSLic2xvcep9AP9n1UKwC2CwmXb3Y5sSNspyr'
}
const callbacks = {
  abcWalletTxAddressesChecked: (ABCWalletTx, progressRatio) => {
      // console.log(progressRatio)
  },
  abcWalletTxTransactionsChanged: (abcTransactions) => {
      // console.log(abcTransactions)
  },
  abcWalletTxBlockHeightChanged: (ABCWalletTx, height) => {
      // console.log(height)
  }
}

const lib = require('../lib/index.js')

console.log(lib)

const currency = lib.makeEngine(ABCTxLibAccess, options, callbacks)

process.stdout.write('BLAHBLAH BLAH')

process.stdout.write('\x1Bc')

describe('Ethereum Library', () => {
  it('returns info about the library', () => {
    const expected = currency.accountDataStore.getInfo.toString()
    const actual = lib.getInfo().toString()

    expect(actual).to.equal(expected)
  })
})

describe('Ethereum Engine', () => {
  describe('Token Stuff', () => {
    it('should return token status', () => {
      const expected = false
      const actual = currency.getTokenStatus()

      expect(actual).to.equal(expected)
    })

    it('should enable token status', () => {
      const expected = ['TATIANACOIN']
      currency.enableTokens({
        tokens: expected
      })
      .then(
        (actual) => { return expect(actual).to.eql(expected) },
        (error) => { console.log(error) })
      .catch((error) => {
        console.log(error)
      })
    })
  })

  it('should return current balance', () => {
    const expected = 58
    const actual = currency.getBalance()

    expect(actual).to.equal(expected)
  })

  it('should return number of transactions', () => {
    // const expected = dataStore.transactions.length
    const expected = false
    const actual = currency.getNumTransactions()

    expect(actual).to.equal(expected)
  })

  it('should return list of transactions', () => {
    // const expected = dataStore.transactions.toString()
    const expected = false
    currency.getTransactions()
    .then(
      (actual) => { return expect(actual.toString()).to.eql(expected) },
      (error) => { console.log(error) })
    .catch((error) => {
      console.log(error)
    })
  })

  it('should return an unused/non-reserved addressed', () => {
    const expected = '1this_is_a_fresh_address1111111111'
    const actual = currency.getFreshAddress()

    expect(actual).to.equal(expected)
  })

  it('should return true', () => {
    const expected = true
    const actual = currency.addGapLimitAddresses()

    expect(actual).to.equal(expected)
  })

  describe('isAddressUsed', () => {
    const usedAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    const freshAddress = '1this_is_a_fresh_address1111111111'

    it('should return true for a used address', () => {
      const expected = true
      const actual = currency.isAddressUsed(usedAddress)

      expect(actual).to.equal(expected)
    })
    it('should return false for a fresh address', () => {
      const expected = false
      const actual = currency.isAddressUsed(freshAddress)

      expect(actual).to.equal(expected)
    })
  })

  it('should set an unsigned transaction to signed', () => {
    // const unsignedTx = dataStore.getNewTransaction()
    const unsignedTx = false
    expect(currency.signTx(unsignedTx)).to.eventually.have.property(
      'signedTx', '1234567890123456789012345678901234567890123456789012345678901234')
  })

  it('should return a transaction with correct amountSatoshi', () => {
    const abcSpendInfo = {
      currencyCode: 'ETH',
      noUnconfirmed: false,
      spendTargets: [
        {
          address: '1CsaBND4GNA5eeGGvU5PhKUZWxyKYxrFqs',
          amountSatoshi: 10000000 // 0.1 BTC
        },
        {
          address: '1CsaBND4GNA5eeGGvU5PhKUZWxyKYxrFqs',
          amountSatoshi: 110000000 // 1.1 BTC
        }
      ],
      networkFeeOption: 'high'
    }

    const expectedAmountSatoshi = 10000000 + 110000000
    return currency.makeSpend(abcSpendInfo).then(newTransaction =>
      expect(newTransaction.amountSatoshi).to.equal(expectedAmountSatoshi))
  })
  describe('async testing', () => {
    it('should increase the numTransactions when a new transaction is detected', () => {
      const before = currency.getNumTransactions()
      // dataStore.addNewTransaction()
      const after = currency.getNumTransactions()

      expect(after).to.equal(before + 1)
    })

    it('should update the balance when a new transaction is detected', () => {
      // const newTransaction = dataStore.getTransactions()[0]
      const newTransaction = false
      const newAmount = newTransaction.amountSatoshi

      const before = currency.getBalance()
      // dataStore.addNewTransactions([newTransaction])
      const after = currency.getBalance()

      expect(after).to.equal(before + newAmount)
    })

    it('should update the blockHeight when a new transaction is detected', () => {
      const before = currency.getBlockHeight()
      // dataStore.addNewBlock()
      const after = currency.getBlockHeight()

      expect(after).to.equal(before + 1)
    })
  })
})
