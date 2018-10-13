type mantissa = int;
type exponent = int;
type decimal =
  | Decimal(mantissa, exponent)

type precision_preference =
  | Round(int)
  | Truncate(int)
  | Unspecified

exception StringNotDecimal

let decimal_of_int = (x: int) =>
  Decimal(x, 0)

let pow10 = (exp: int) => {
  let tmp = ref(1)
  for (_i in 1 to exp) {
    tmp := tmp^ * 10
  }
  tmp^
}
type parse_state =
  | Start
  | Integral
  | Fractional

let decimal_of_string = (s: string) => {
  let sign = ref(1);
  let state = ref(Start);
  let mantissa = ref(0);
  let exponent = ref(0);

  let process_digit = (digit) => {
    mantissa := mantissa^ * 10 + digit;
    if (state^ == Fractional) {
      exponent := exponent^ - 1;
    }
    if (state^ == Start) {
      state := Integral;
    }
  }

  let process_negation = () => {
    if (state^ == Start) {
      sign := -1
      state := Integral;
    }
    else {
      raise(StringNotDecimal);
    }
  }

  let process_point = () => {
    if (state^ == Fractional) {
      raise(StringNotDecimal);
    } else {
      state := Fractional;
    }
  }

  for (i in 0 to String.length(s) - 1) {
    let c = s.[i];

    switch (c) {
      | '0' => process_digit(0)
      | '1' => process_digit(1)
      | '2' => process_digit(2)
      | '3' => process_digit(3)
      | '4' => process_digit(4)
      | '5' => process_digit(5)
      | '6' => process_digit(6)
      | '7' => process_digit(7)
      | '8' => process_digit(8)
      | '9' => process_digit(9)
      | '-' => process_negation()
      | '.' => process_point()
      | _ => raise(StringNotDecimal)
    }
  }

  Decimal(sign^ * mantissa^, exponent^)
}

let dec = decimal_of_string;

let string_of_decimal = (d: decimal) =>
  switch d {
    | Decimal(mantissa, exponent) => {
      open String;
      if (exponent > 0) {
        if (mantissa == 0) {
          "0"
        }
        else {
          string_of_int(mantissa) ++ make(exponent, '0')
        }
      }
      else {
        let sign_part = mantissa < 0 ? "-" : ""
        let s = string_of_int(abs(mantissa))
        let pad_len = - exponent + 1 - s->length
        let s = (pad_len > 0) ? make(pad_len, '0') ++ s : s
        let len = s->length
        let frac_len = - exponent
        let int_len = len - frac_len
        let int_part = (int_len == 0) ? "0" : s->sub(0, int_len)
        let frac_part = (exponent == 0) ? "" : "." ++ s->sub(int_len, frac_len)
        sign_part ++ int_part ++ frac_part
      }
    }
  }

let to_s = string_of_decimal;

let commonize = (Decimal(a_man, a_exp): decimal, Decimal(b_man, b_exp): decimal) => {
  let min_exponent = min(a_exp, b_exp);
  (
    a_man * pow10(a_exp - min_exponent),
    b_man * pow10(b_exp - min_exponent),
    min_exponent
  )
};

let add = (a: decimal, b: decimal) => {
  let (a_man, b_man, exp) = commonize(a, b)
  Decimal(a_man + b_man, exp)
};

let subtract = (a: decimal, b: decimal) => {
  let (a_man, b_man, exp) = commonize(a, b)
  Decimal(a_man - b_man, exp)
};

let multiply = (Decimal(a_man, a_exp), Decimal(b_man, b_exp)) => {
  let min_exp = min(a_exp, b_exp);
  let c_man = ref(a_man * b_man);
  let c_exp = ref(a_exp + b_exp);

  while ((c_man^ mod 10) == 0 && c_exp^ < min_exp) {
    c_man := c_man^ / 10;
    c_exp := c_exp^ + 1
  }
  Decimal(c_man^, c_exp^)
};

let multiply_by_int = (Decimal(man, exp): decimal, multiplier: int) => {
  Decimal(man * multiplier, exp)
};

let divide_by_int = (Decimal(man, exp): decimal, divisor: int) => {
  Decimal(man / divisor, exp)
};

let divide_by_int_with_precision = (Decimal(man, exp): decimal, divisor: int, precision: int) => {
  let target_exp = - precision;
  if (target_exp <= exp) {
    Decimal(man * pow10(exp - target_exp) / divisor, target_exp)
  }
  else {
    Decimal((man / divisor) / pow10(target_exp - exp), target_exp)
  }
};

let divide_rounded = (a: int, b: int): int => {
  let rem = a mod b;
  if (rem == 0) {
    a / b;
  }
  else {
    let r = float_of_int(rem) /. float_of_int(b);
    (r <= - 0.5) ? a / b - 1 : (r < 0.5) ? a / b : a / b + 1;
  }
}

let divide_by_int_with_rounding = (Decimal(man, exp): decimal, divisor: int, precision: int) => {
  let target_exp = - precision;
  if (target_exp <= exp) {
    Decimal(divide_rounded(man * pow10(exp - target_exp), divisor), target_exp)
  }
  else {
    Decimal(divide_rounded(man, divisor * pow10(target_exp - exp)), target_exp)
  }
};

let divide_by_int_with_options = (a: decimal, d: int, prec_pref: precision_preference) => {
  switch (prec_pref) {
    | Truncate(p)    => divide_by_int_with_precision(a, d, p)
    | Round(r)       => divide_by_int_with_rounding(a, d, r)
    | Unspecified    => divide_by_int(a, d)
  }
}

let precision_preference_from_optional_args = (precision, round) => {
  switch (precision, round) {
    | (Some(p), _)    => Truncate(p)
    | (None, Some(p)) => Round(p)
    | (None, None)    => Unspecified
  }
}

let to_int_with_multiplier = (Decimal(man, exp): decimal) => {
  if (exp < 0) {
    (man, pow10(- exp))
  }
  else {
    (man, 1)
  }
}

let divide_by_int = (~precision=?, ~round=?, a: decimal, d: int) => {
  let prec_pref = precision_preference_from_optional_args(precision, round)
  divide_by_int_with_options(a, d, prec_pref)
}

let divide = (~precision=?, ~round=?, a: decimal, divisor: decimal) => {
  let (int_divisor, multiplier) = to_int_with_multiplier(divisor);
  let prec_pref = precision_preference_from_optional_args(precision, round)
  divide_by_int_with_options(multiply_by_int(a, multiplier), int_divisor, prec_pref)
}
