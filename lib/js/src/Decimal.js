'use strict';

var Block = require("bs-platform/lib/js/block.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var StringNotDecimal = Caml_exceptions.create("Decimal.StringNotDecimal");

function decimal_of_int(x) {
  return /* Decimal */[
          x,
          0
        ];
}

function pow10(exp) {
  var tmp = 1;
  for(var _i = 1; _i <= exp; ++_i){
    tmp = Caml_int32.imul(tmp, 10);
  }
  return tmp;
}

function decimal_of_string(s) {
  var sign = /* record */[/* contents */1];
  var state = /* record */[/* contents : Start */0];
  var mantissa = /* record */[/* contents */0];
  var exponent = /* record */[/* contents */0];
  var process_digit = function (digit) {
    mantissa[0] = Caml_int32.imul(mantissa[0], 10) + digit | 0;
    if (state[0] === /* Fractional */2) {
      exponent[0] = exponent[0] - 1 | 0;
    }
    if (state[0] === /* Start */0) {
      state[0] = /* Integral */1;
      return /* () */0;
    } else {
      return 0;
    }
  };
  var process_negation = function () {
    if (state[0] === /* Start */0) {
      sign[0] = -1;
      state[0] = /* Integral */1;
      return /* () */0;
    } else {
      throw StringNotDecimal;
    }
  };
  var process_point = function () {
    if (state[0] === /* Fractional */2) {
      throw StringNotDecimal;
    } else {
      state[0] = /* Fractional */2;
      return /* () */0;
    }
  };
  for(var i = 0 ,i_finish = s.length - 1 | 0; i <= i_finish; ++i){
    var c = Caml_string.get(s, i);
    var switcher = c - 45 | 0;
    if (switcher > 12 || switcher < 0) {
      throw StringNotDecimal;
    } else {
      switch (switcher) {
        case 0 : 
            process_negation(/* () */0);
            break;
        case 1 : 
            process_point(/* () */0);
            break;
        case 2 : 
            throw StringNotDecimal;
        case 3 : 
            process_digit(0);
            break;
        case 4 : 
            process_digit(1);
            break;
        case 5 : 
            process_digit(2);
            break;
        case 6 : 
            process_digit(3);
            break;
        case 7 : 
            process_digit(4);
            break;
        case 8 : 
            process_digit(5);
            break;
        case 9 : 
            process_digit(6);
            break;
        case 10 : 
            process_digit(7);
            break;
        case 11 : 
            process_digit(8);
            break;
        case 12 : 
            process_digit(9);
            break;
        
      }
    }
  }
  return /* Decimal */[
          Caml_int32.imul(sign[0], mantissa[0]),
          exponent[0]
        ];
}

function string_of_decimal(d) {
  var exponent = d[1];
  var mantissa = d[0];
  if (exponent > 0) {
    if (mantissa === 0) {
      return "0";
    } else {
      return String(mantissa) + $$String.make(exponent, /* "0" */48);
    }
  } else {
    var match = mantissa < 0;
    var sign_part = match ? "-" : "";
    var s = String(Pervasives.abs(mantissa));
    var pad_len = ((-exponent | 0) + 1 | 0) - s.length | 0;
    var match$1 = pad_len > 0;
    var s$1 = match$1 ? $$String.make(pad_len, /* "0" */48) + s : s;
    var len = s$1.length;
    var frac_len = -exponent | 0;
    var int_len = len - frac_len | 0;
    var match$2 = int_len === 0;
    var int_part = match$2 ? "0" : $$String.sub(s$1, 0, int_len);
    var match$3 = exponent === 0;
    var frac_part = match$3 ? "" : "." + $$String.sub(s$1, int_len, frac_len);
    return sign_part + (int_part + frac_part);
  }
}

function commonize(param, param$1) {
  var b_exp = param$1[1];
  var a_exp = param[1];
  var min_exponent = a_exp < b_exp ? a_exp : b_exp;
  return /* tuple */[
          Caml_int32.imul(param[0], pow10(a_exp - min_exponent | 0)),
          Caml_int32.imul(param$1[0], pow10(b_exp - min_exponent | 0)),
          min_exponent
        ];
}

function add(a, b) {
  var match = commonize(a, b);
  return /* Decimal */[
          match[0] + match[1] | 0,
          match[2]
        ];
}

function subtract(a, b) {
  var match = commonize(a, b);
  return /* Decimal */[
          match[0] - match[1] | 0,
          match[2]
        ];
}

function multiply(param, param$1) {
  var b_exp = param$1[1];
  var a_exp = param[1];
  var min_exp = a_exp < b_exp ? a_exp : b_exp;
  var c_man = Caml_int32.imul(param[0], param$1[0]);
  var c_exp = a_exp + b_exp | 0;
  while(c_man % 10 === 0 && c_exp < min_exp) {
    c_man = c_man / 10 | 0;
    c_exp = c_exp + 1 | 0;
  };
  return /* Decimal */[
          c_man,
          c_exp
        ];
}

function multiply_by_int(param, multiplier) {
  return /* Decimal */[
          Caml_int32.imul(param[0], multiplier),
          param[1]
        ];
}

function divide_rounded(a, b) {
  var rem = Caml_int32.mod_(a, b);
  if (rem === 0) {
    return Caml_int32.div(a, b);
  } else {
    var r = rem / b;
    var match = r <= -0.5;
    if (match) {
      return Caml_int32.div(a, b) - 1 | 0;
    } else {
      var match$1 = r < 0.5;
      if (match$1) {
        return Caml_int32.div(a, b);
      } else {
        return Caml_int32.div(a, b) + 1 | 0;
      }
    }
  }
}

function divide_by_int_with_options(a, d, prec_pref) {
  if (typeof prec_pref === "number") {
    var param = a;
    var divisor = d;
    return /* Decimal */[
            Caml_int32.div(param[0], divisor),
            param[1]
          ];
  } else if (prec_pref.tag) {
    var param$1 = a;
    var divisor$1 = d;
    var precision = prec_pref[0];
    var exp = param$1[1];
    var man = param$1[0];
    var target_exp = -precision | 0;
    if (target_exp <= exp) {
      return /* Decimal */[
              Caml_int32.div(Caml_int32.imul(man, pow10(exp - target_exp | 0)), divisor$1),
              target_exp
            ];
    } else {
      return /* Decimal */[
              Caml_int32.div(Caml_int32.div(man, divisor$1), pow10(target_exp - exp | 0)),
              target_exp
            ];
    }
  } else {
    var param$2 = a;
    var divisor$2 = d;
    var precision$1 = prec_pref[0];
    var exp$1 = param$2[1];
    var man$1 = param$2[0];
    var target_exp$1 = -precision$1 | 0;
    if (target_exp$1 <= exp$1) {
      return /* Decimal */[
              divide_rounded(Caml_int32.imul(man$1, pow10(exp$1 - target_exp$1 | 0)), divisor$2),
              target_exp$1
            ];
    } else {
      return /* Decimal */[
              divide_rounded(man$1, Caml_int32.imul(divisor$2, pow10(target_exp$1 - exp$1 | 0))),
              target_exp$1
            ];
    }
  }
}

function precision_preference_from_optional_args(precision, round) {
  if (precision !== undefined) {
    return /* Truncate */Block.__(1, [precision]);
  } else if (round !== undefined) {
    return /* Round */Block.__(0, [round]);
  } else {
    return /* Unspecified */0;
  }
}

function to_int_with_multiplier(param) {
  var exp = param[1];
  var man = param[0];
  if (exp < 0) {
    return /* tuple */[
            man,
            pow10(-exp | 0)
          ];
  } else {
    return /* tuple */[
            man,
            1
          ];
  }
}

function divide_by_int(precision, round, a, d) {
  var prec_pref = precision_preference_from_optional_args(precision, round);
  return divide_by_int_with_options(a, d, prec_pref);
}

function divide(precision, round, a, divisor) {
  var match = to_int_with_multiplier(divisor);
  var prec_pref = precision_preference_from_optional_args(precision, round);
  return divide_by_int_with_options(multiply_by_int(a, match[1]), match[0], prec_pref);
}

var dec = decimal_of_string;

var to_s = string_of_decimal;

exports.StringNotDecimal = StringNotDecimal;
exports.decimal_of_int = decimal_of_int;
exports.decimal_of_string = decimal_of_string;
exports.string_of_decimal = string_of_decimal;
exports.dec = dec;
exports.to_s = to_s;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.multiply_by_int = multiply_by_int;
exports.divide = divide;
exports.divide_by_int = divide_by_int;
/* No side effect */
