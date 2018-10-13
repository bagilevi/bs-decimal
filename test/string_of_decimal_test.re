open BsMocha.Mocha;
open BsChai.Expect.Expect;
open BsChai.Expect.Combos.End;
open Decimal;

describe("Decimal - conversion to string", () => {
  describe("string_of_decimal", () => {
    it("renders numbers with fractions", () => {
      expect(dec("1.5")->string_of_decimal) |> to_be("1.5")
    })
  })

  describe("to_s", () => {
    it("renders numbers with fractions", () => {
      expect(dec("1.5")->to_s) |> to_be("1.5")
    })

    it("renders negative numbers with fractions", () => {
      expect(dec("-1.5")->to_s) |> to_be("-1.5")
    })

    it("renders integers", () => {
      expect(dec("40")->to_s) |> to_be("40")
    })

    it("renders negative integers", () => {
      expect(dec("-40")->to_s) |> to_be("-40")
    })

    it("renders fractions", () => {
      expect(dec("0.5")->to_s) |> to_be("0.5")
    })

    it("renders negative fractions", () => {
      expect(dec("-0.5")->to_s) |> to_be("-0.5")
    })

    it("renders small fractions", () => {
      expect(dec("0.005")->to_s) |> to_be("0.005")
    })

    it("renders small negative fractions", () => {
      expect(dec("-0.005")->to_s) |> to_be("-0.005")
    })

    it("uses the same precision as the string given to the parser", () => {
      expect(dec("40.00")->to_s) |> to_be("40.00")
    })

    it("renders decimal with positive exponent", () => {
      expect(Decimal(4, 2)->to_s) |> to_be("400")
    })

    it("renders zero with positive exponent", () => {
      expect(Decimal(0, 2)->to_s) |> to_be("0")
    })

    it("renders zero with negative exponent", () => {
      expect(Decimal(0, -2)->to_s) |> to_be("0.00")
    })
  })

})
