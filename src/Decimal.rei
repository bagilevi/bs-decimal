type decimal = | Decimal(int, int);


let decimal_of_int: int => decimal;
let decimal_of_string: string => decimal;

let string_of_decimal: decimal => string;

let dec: string => decimal;
let to_s: decimal => string;


let add: (decimal, decimal) => decimal;

let subtract: (decimal, decimal) => decimal;

let multiply: (decimal, decimal) => decimal;
let multiply_by_int: (decimal, int) => decimal;

let divide: (~precision: int=?, ~round: int=?, decimal, decimal) => decimal;
let divide_by_int: (~precision: int=?, ~round: int=?, decimal, int) => decimal;
