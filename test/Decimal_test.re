open BsMocha.Mocha;
open BsChai.Expect.Expect;
open BsChai.Expect.Combos.End;
open Decimal;

describe("Decimal", () => {

  it("works as described in the readme", () => {
    let a = dec("1.50");
    let b = dec("2");

    expect(add(a, b)->to_s)                   |> to_be("3.50")
    expect(subtract(a, b)->to_s)              |> to_be("-0.50")
    expect(multiply(a, b)->to_s)              |> to_be("3.00")
    expect(divide(a, b)->to_s)                |> to_be("0.75")
    expect(divide(a, b, ~precision=1)->to_s)  |> to_be("0.7")
    expect(divide(a, b, ~round=1)->to_s)      |> to_be("0.8")
  })

  describe("add", () => {

    it("adds decimals while preserving the precision", () => {
      let a = dec("1.50")
      let b = dec("2")
      expect(add(a, b)->to_s) |> to_be("3.50")
    })

  })

  describe("subtract", () => {

    it("subtracts decimals while preserving the precision", () => {
      let a = dec("1.50")
      let b = dec("2")
      expect(subtract(a, b)->to_s) |> to_be("-0.50")
    })

  })

  describe("multiply", () => {

    it("preserves the precision", () => {
      let a = dec("-1.50")
      let b = dec("2")
      expect(multiply(a, b)->to_s) |> to_be("-3.00")
    })

  })

  describe("multiply_by_int", () => {

    it("multiplies while preserving the precision", () => {
      let a = dec("-1.50")
      expect(multiply_by_int(a, 4)->to_s) |> to_be("-6.00")
    })

  })

  describe("divide", () => {

    it("makes integer division while preserving the precision", () => {
      let a = dec("-2.00")
      let d = dec("3")
      expect(divide(a, d)->to_s) |> to_be("-0.66")
      expect(divide(a, d, ~precision=4)->to_s) |> to_be("-0.6666")
      expect(divide(a, d, ~round=4)->to_s) |> to_be("-0.6667")

      let d = dec("0.3")
      expect(divide(a, d)->to_s) |> to_be("-6.66")
      expect(divide(a, d, ~precision=4)->to_s) |> to_be("-6.6666")
      expect(divide(a, d, ~round=4)->to_s) |> to_be("-6.6667")
    })

  })

  describe("divide_by_int", () => {

    it("makes integer division while preserving the precision", () => {
      let a = dec("-2.00")
      expect(divide_by_int(a, 3)->to_s) |> to_be("-0.66")
    })

  })

  describe("divide_by_int with precision", () => {

    it("makes integer division - higher precision", () => {
      let a = dec("-2.00")
      expect(divide_by_int(a, 3, ~precision=4)->to_s) |> to_be("-0.6666")
    })

    it("makes integer division - lower precision", () => {
      let a = dec("-1.7999")
      expect(divide_by_int(a, 3, ~precision=3)->to_s) |> to_be("-0.599")
      expect(divide_by_int(a, 3, ~precision=2)->to_s) |> to_be("-0.59")
      expect(divide_by_int(a, 3, ~precision=1)->to_s) |> to_be("-0.5")
      expect(divide_by_int(a, 3, ~precision=0)->to_s) |> to_be("0")
    })

  })

  describe("divide_by_int with rounding", () => {

    it("makes integer division - higher precision", () => {
      expect(divide_by_int(dec("1"), 3, ~round=4)->to_s) |> to_be("0.3333")
      expect(divide_by_int(dec("2"), 3, ~round=4)->to_s) |> to_be("0.6667")
      expect(divide_by_int(dec("-1"), 3, ~round=4)->to_s) |> to_be("-0.3333")
      expect(divide_by_int(dec("-2"), 3, ~round=4)->to_s) |> to_be("-0.6667")
      expect(divide_by_int(dec("-2"), 3, ~round=4)->to_s) |> to_be("-0.6667")
    })

    it("makes integer division - lower precision", () => {
      let a = dec("-1.7999")
      expect(divide_by_int(a, 3, ~round=3)->to_s) |> to_be("-0.600")
      expect(divide_by_int(a, 3, ~round=2)->to_s) |> to_be("-0.60")
      expect(divide_by_int(a, 3, ~round=1)->to_s) |> to_be("-0.6")
      expect(divide_by_int(a, 3, ~round=0)->to_s) |> to_be("-1")
      expect(divide_by_int(dec("-17.999"), 3, ~round=-1)->to_s) |> to_be("-10")
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
