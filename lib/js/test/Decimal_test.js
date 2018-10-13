'use strict';

var Chai = require("chai");
var Curry = require("bs-platform/lib/js/curry.js");
var Decimal = require("../src/Decimal.js");
var Expect$BsChai = require("bs-chai/lib/js/src/Expect.bs.js");
var Mocha$BsMocha = require("bs-mocha/lib/js/src/Mocha.bs.js");

Mocha$BsMocha.describe("Decimal")(undefined, undefined, undefined, (function () {
        Mocha$BsMocha.it("works as described in the readme")(undefined, undefined, undefined, (function () {
                var a = Decimal.dec("1.50");
                var b = Decimal.dec("2");
                Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "3.50", Chai.expect(Decimal.to_s(Decimal.add(a, b))));
                Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.50", Chai.expect(Decimal.to_s(Decimal.subtract(a, b))));
                Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "3.00", Chai.expect(Decimal.to_s(Decimal.multiply(a, b))));
                Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.75", Chai.expect(Decimal.to_s(Decimal.divide(undefined, undefined, a, b))));
                Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.7", Chai.expect(Decimal.to_s(Decimal.divide(1, undefined, a, b))));
                return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.8", Chai.expect(Decimal.to_s(Decimal.divide(undefined, 1, a, b))));
              }));
        Mocha$BsMocha.describe("add")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("adds decimals while preserving the precision")(undefined, undefined, undefined, (function () {
                              var a = Decimal.dec("1.50");
                              var b = Decimal.dec("2");
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "3.50", Chai.expect(Decimal.to_s(Decimal.add(a, b))));
                            }));
              }));
        Mocha$BsMocha.describe("subtract")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("subtracts decimals while preserving the precision")(undefined, undefined, undefined, (function () {
                              var a = Decimal.dec("1.50");
                              var b = Decimal.dec("2");
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.50", Chai.expect(Decimal.to_s(Decimal.subtract(a, b))));
                            }));
              }));
        Mocha$BsMocha.describe("multiply")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("preserves the precision")(undefined, undefined, undefined, (function () {
                              var a = Decimal.dec("-1.50");
                              var b = Decimal.dec("2");
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-3.00", Chai.expect(Decimal.to_s(Decimal.multiply(a, b))));
                            }));
              }));
        Mocha$BsMocha.describe("multiply_by_int")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("multiplies while preserving the precision")(undefined, undefined, undefined, (function () {
                              var a = Decimal.dec("-1.50");
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-6.00", Chai.expect(Decimal.to_s(Decimal.multiply_by_int(a, 4))));
                            }));
              }));
        Mocha$BsMocha.describe("divide")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("makes integer division while preserving the precision")(undefined, undefined, undefined, (function () {
                              var a = Decimal.dec("-2.00");
                              var d = Decimal.dec("3");
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.66", Chai.expect(Decimal.to_s(Decimal.divide(undefined, undefined, a, d))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.6666", Chai.expect(Decimal.to_s(Decimal.divide(4, undefined, a, d))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.6667", Chai.expect(Decimal.to_s(Decimal.divide(undefined, 4, a, d))));
                              var d$1 = Decimal.dec("0.3");
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-6.66", Chai.expect(Decimal.to_s(Decimal.divide(undefined, undefined, a, d$1))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-6.6666", Chai.expect(Decimal.to_s(Decimal.divide(4, undefined, a, d$1))));
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-6.6667", Chai.expect(Decimal.to_s(Decimal.divide(undefined, 4, a, d$1))));
                            }));
              }));
        Mocha$BsMocha.describe("divide_by_int")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("makes integer division while preserving the precision")(undefined, undefined, undefined, (function () {
                              var a = Decimal.dec("-2.00");
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.66", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, undefined, a, 3))));
                            }));
              }));
        Mocha$BsMocha.describe("divide_by_int with precision")(undefined, undefined, undefined, (function () {
                Mocha$BsMocha.it("makes integer division - higher precision")(undefined, undefined, undefined, (function () {
                        var a = Decimal.dec("-2.00");
                        return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.6666", Chai.expect(Decimal.to_s(Decimal.divide_by_int(4, undefined, a, 3))));
                      }));
                return Mocha$BsMocha.it("makes integer division - lower precision")(undefined, undefined, undefined, (function () {
                              var a = Decimal.dec("-1.7999");
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.599", Chai.expect(Decimal.to_s(Decimal.divide_by_int(3, undefined, a, 3))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.59", Chai.expect(Decimal.to_s(Decimal.divide_by_int(2, undefined, a, 3))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.5", Chai.expect(Decimal.to_s(Decimal.divide_by_int(1, undefined, a, 3))));
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0", Chai.expect(Decimal.to_s(Decimal.divide_by_int(0, undefined, a, 3))));
                            }));
              }));
        return Mocha$BsMocha.describe("divide_by_int with rounding")(undefined, undefined, undefined, (function () {
                      Mocha$BsMocha.it("makes integer division - higher precision")(undefined, undefined, undefined, (function () {
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.3333", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 4, Decimal.dec("1"), 3))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "0.6667", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 4, Decimal.dec("2"), 3))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.3333", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 4, Decimal.dec("-1"), 3))));
                              Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.6667", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 4, Decimal.dec("-2"), 3))));
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.6667", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 4, Decimal.dec("-2"), 3))));
                            }));
                      return Mocha$BsMocha.it("makes integer division - lower precision")(undefined, undefined, undefined, (function () {
                                    var a = Decimal.dec("-1.7999");
                                    Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.600", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 3, a, 3))));
                                    Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.60", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 2, a, 3))));
                                    Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-0.6", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 1, a, 3))));
                                    Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-1", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, 0, a, 3))));
                                    return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, "-10", Chai.expect(Decimal.to_s(Decimal.divide_by_int(undefined, -1, Decimal.dec("-17.999"), 3))));
                                  }));
                    }));
      }));

/*  Not a pure module */
