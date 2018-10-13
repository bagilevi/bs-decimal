'use strict';

var Chai = require("chai");
var Curry = require("bs-platform/lib/js/curry.js");
var Decimal = require("../src/Decimal.js");
var Expect$BsChai = require("bs-chai/lib/js/src/Expect.bs.js");
var Mocha$BsMocha = require("bs-mocha/lib/js/src/Mocha.bs.js");

Mocha$BsMocha.describe("Decimal - parsing a string")(undefined, undefined, undefined, (function () {
        Mocha$BsMocha.describe("decimal_of_string")(undefined, undefined, undefined, (function () {
                return Mocha$BsMocha.it("can parse")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          -13,
                                          -1
                                        ], Chai.expect(Decimal.decimal_of_string("-1.3")));
                            }));
              }));
        return Mocha$BsMocha.describe("dec")(undefined, undefined, undefined, (function () {
                      Mocha$BsMocha.it("can parse integer")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          134,
                                          0
                                        ], Chai.expect(Decimal.dec("134")));
                            }));
                      Mocha$BsMocha.it("can parse number with fraction")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          134,
                                          -1
                                        ], Chai.expect(Decimal.dec("13.4")));
                            }));
                      Mocha$BsMocha.it("can parse fraction")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          4,
                                          -1
                                        ], Chai.expect(Decimal.dec("0.4")));
                            }));
                      Mocha$BsMocha.it("can parse small fraction")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          4,
                                          -4
                                        ], Chai.expect(Decimal.dec("0.0004")));
                            }));
                      Mocha$BsMocha.it("can parse fraction without leading zero ")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          4,
                                          -1
                                        ], Chai.expect(Decimal.dec(".4")));
                            }));
                      Mocha$BsMocha.it("can parse negative fraction")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          -4,
                                          -1
                                        ], Chai.expect(Decimal.dec("-0.4")));
                            }));
                      Mocha$BsMocha.it("can parse negative fraction without leading zero ")(undefined, undefined, undefined, (function () {
                              return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, /* Decimal */[
                                          -4,
                                          -1
                                        ], Chai.expect(Decimal.dec("-.4")));
                            }));
                      return Mocha$BsMocha.it("raises error for invalid input")(undefined, undefined, undefined, (function () {
                                    var thrown;
                                    try {
                                      Decimal.dec("--4");
                                      thrown = false;
                                    }
                                    catch (exn){
                                      if (exn === Decimal.StringNotDecimal) {
                                        thrown = true;
                                      } else {
                                        throw exn;
                                      }
                                    }
                                    return Curry._3(Expect$BsChai.Combos[/* End */34][/* to_be */1], undefined, true, Chai.expect(thrown));
                                  }));
                    }));
      }));

/*  Not a pure module */
