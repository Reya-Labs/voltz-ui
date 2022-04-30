
import { Price } from '../entities/fractions/price'
import { priceToClosestTick, tickToPrice, fixedRateToPrice, tickToFixedRate, fixedRateToClosestTick, priceToFixedRate } from './priceTickConversions'

describe('priceTickConversions', () => {

  describe('#tickToPrice', () => {
    it('price is 1', () => {
        expect(tickToPrice(0).toSignificant(5)).toEqual('1')
    })

    it('price is 2.7181', () => {
        expect(tickToPrice(10000).toSignificant(5)).toEqual('2.7181')
    })

    it('price is 0.36789', () => {
      expect(tickToPrice(-10000).toSignificant(5)).toEqual('0.3679')
    })

  })

  describe('#priceToClosestTick', () => {
    

    // NOTE: the first argument to the Price constructor is the denominator and the second one is the numerator
    it('tick 10000', () => {
        expect(priceToClosestTick(new Price(3679, 10000))).toEqual(9999) // investigate if this can be an issue
    })

    it('tick -10000', () => {
        expect(priceToClosestTick(new Price(10000, 3679))).toEqual(-10000)
    })

    describe('reciprocal with tickToPrice', () => {
      it('tick -10000', () => {
        expect(priceToClosestTick(tickToPrice(-10000))).toEqual(-10000)
      })

      it('tick 10000', () => {
        expect(priceToClosestTick(tickToPrice(10000))).toEqual(10000)
      })

      it('tick 0', () => {
        expect(priceToClosestTick(tickToPrice(0))).toEqual(0)
      })

      it('tick 30000', () => {
        expect(priceToClosestTick(tickToPrice(30000))).toEqual(30000)
      })

      it('tick -30000', () => {
        expect(priceToClosestTick(tickToPrice(-30000))).toEqual(-30000)
      })

    })
  })


  describe('#fixedRateToPrice', () => {

    it("10000/3679", () => {
      expect(fixedRateToPrice(new Price(10000, 3679))).toEqual(new Price(3679, 10000))
    })

    it("3679/10000", () => {
      expect(fixedRateToPrice(new Price(3679, 10000))).toEqual(new Price(10000, 3679))
    })

  })

  
  describe("#tickToFixedRate", () => {

    it('fixed rate is 1, price is also 1', () => {
      expect(tickToFixedRate(0).toSignificant(5)).toEqual('1')
    })

    it('price is 2.7181, fixed rate is 0.3679 %', () => {
        expect(tickToFixedRate(10000).toSignificant(5)).toEqual('0.3679')
    })

    it('price is 0.36789, fixed rate is 2.7181 %', () => {
      expect(tickToFixedRate(-10000).toSignificant(5)).toEqual('2.7181')
    })

  })


  describe("#fixedRateToTheClosestTick", () => {

    it('tick 10000', () => {
      expect(fixedRateToClosestTick(new Price(10000, 3679))).toEqual(9999) // investigate if this can be an issue
    })

    it('tick -10000', () => {
        expect(fixedRateToClosestTick(new Price(3679, 10000))).toEqual(-10000)
    })    

    describe('reciprocal with tickToFixedRate', () => {
      it('tick -10000', () => {
        expect(fixedRateToClosestTick(tickToFixedRate(-10000))).toEqual(-10000)
      })

      it('tick 10000', () => {
        expect(fixedRateToClosestTick(tickToFixedRate(10000))).toEqual(10000)
      })

      it('tick 0', () => {
        expect(fixedRateToClosestTick(tickToFixedRate(0))).toEqual(0)
      })

      it('tick 30000', () => {
        expect(fixedRateToClosestTick(tickToFixedRate(30000))).toEqual(30000)
      })

      it('tick -30000', () => {
        expect(fixedRateToClosestTick(tickToFixedRate(-30000))).toEqual(-30000)
      })

    })

  })

  describe("#priceToFixedRate", () => {
    
    it('10000/3679', () => {
      expect(priceToFixedRate(new Price(10000, 3679))).toEqual((new Price(3679, 10000)))
    })

  })

})  