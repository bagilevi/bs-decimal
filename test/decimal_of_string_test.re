open BsMocha.Mocha;
open BsChai.Expect.Expect;
open BsChai.Expect.Combos.End;
open Decimal;

describe("Decimal - parsing a string", () => {
  describe("decimal_of_string", () => {
    it("can parse", () => {
      expect(decimal_of_string("-1.3")) |> to_be(Decimal(-13, -1))
    })
  });

  describe("dec", () => {
    it("can parse integer", () => {
      expect(dec("134")) |> to_be(Decimal(134, 0))
    })

    it("can parse number with fraction", () => {
      expect(dec("13.4")) |> to_be(Decimal(134, -1))
    })

    it("can parse fraction", () => {
      expect(dec("0.4")) |> to_be(Decimal(4, -1))
    })

    it("can parse small fraction", () => {
      expect(dec("0.0004")) |> to_be(Decimal(4, -4))
    })

    it("can parse fraction without leading zero ", () => {
      expect(dec(".4")) |> to_be(Decimal(4, -1))
    })

    it("can parse negative fraction", () => {
      expect(dec("-0.4")) |> to_be(Decimal(-4, -1))
    })

    it("can parse negative fraction without leading zero ", () => {
      expect(dec("-.4")) |> to_be(Decimal(-4, -1))
    })

    it("raises error for invalid input", () => {
      let thrown =
        switch (dec("--4")) {
          | _ => false
          | exception StringNotDecimal => true
        };
      expect(thrown) |> to_be(true)
    })
  });
})
