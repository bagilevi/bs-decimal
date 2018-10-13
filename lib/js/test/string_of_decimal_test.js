'use strict';

var Chai = require("chai");
var Curry = require("bs-platform/lib/js/curry.js");
var Decimal = require("../src/Decimal.js");
var Expect$BsChai = require("bs-chai/lib/js/src/Expect.bs.js");
var Mocha$BsMocha = require("bs-mocha/lib/js/src/Mocha.bs.js");

Mocha$BsMocha.describe("Decimal - conversion to string")(undefined, undefined, undefined, (function () {
        Mocha$BsMocha.describe("string_of_decimal")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("renders numbers with fractions")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "1.5", Chai.expect(Decimal.string_of_decimal(Decimal.dec("1.5"))));
                            }));
              }));
        return Mocha$BsMocha.describe("to_s")(undefined, undefined, undefined, (function () {
                      Mocha$BsMocha.it("renders numbers with fractions")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "1.5", Chai.expect(Decimal.to_s(Decimal.dec("1.5"))));
                            }));
                      Mocha$BsMocha.it("renders negative numbers with fractions")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-1.5", Chai.expect(Decimal.to_s(Decimal.dec("-1.5"))));
                            }));
                      Mocha$BsMocha.it("renders integers")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "40", Chai.expect(Decimal.to_s(Decimal.dec("40"))));
                            }));
                      Mocha$BsMocha.it("renders negative integers")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-40", Chai.expect(Decimal.to_s(Decimal.dec("-40"))));
                            }));
                      Mocha$BsMocha.it("renders fractions")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.5", Chai.expect(Decimal.to_s(Decimal.dec("0.5"))));
                            }));
                      Mocha$BsMocha.it("renders negative fractions")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.5", Chai.expect(Decimal.to_s(Decimal.dec("-0.5"))));
                            }));
                      Mocha$BsMocha.it("renders small fractions")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.005", Chai.expect(Decimal.to_s(Decimal.dec("0.005"))));
                            }));
                      Mocha$BsMocha.it("renders small negative fractions")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.005", Chai.expect(Decimal.to_s(Decimal.dec("-0.005"))));
                            }));
                      Mocha$BsMocha.it("uses the same precision as the string given to the parser")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "40.00", Chai.expect(Decimal.to_s(Decimal.dec("40.00"))));
                            }));
                      Mocha$BsMocha.it("renders decimal with positive exponent")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "400", Chai.expect(Decimal.to_s(/* Decimal */[
                                                  4,
                                                  2
                                                ])));
                            }));
                      Mocha$BsMocha.it("renders zero with positive exponent")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0", Chai.expect(Decimal.to_s(/* Decimal */[
                                                  0,
                                                  2
                                                ])));
                            }));
                      return Mocha$BsMocha.it("renders zero with negative exponent")(undefined, undefined, undefined, (function () {
                                    return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.00", Chai.expect(Decimal.to_s(/* Decimal */[
                                                        0,
                                                        -2
                                                      ])));
                                  }));
                    }));
      }));

/*  Not a pure module */
