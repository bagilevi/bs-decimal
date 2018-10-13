# bs-decimal

Decimal number functions for ReasonML - experimental stage

Decimals are represented as a tuple of mantissa and exponent, both `int`.
It supports basic mathematical operations and conversion to and from string.

## Installation

    yarn add bs-decimal

Add it to `bs-dependencies` in `bsconfig.json`, e.g:

    {
      "name": "myapp",
      "sources": "src",
      "bs-dependencies": ["bs-decimal"]
    }

## Usage

    open Decimal;

    let a = dec("1.50");
    let b = dec("2");

    add(a, b)->to_s;                 # => 3.50
    subtract(a, b)->to_s;            # => -0.50
    multiply(a, b)->to_s;            # => 3.00
    divide(a, b)->to_s;              # => 0.75

    divide(a, b, ~precision=1)->to_s;   # => 0.7
    divide(a, b, ~round=1)->to_s;       # => 0.8


## Running tests

    yarn test

During development:

    # console 1 - watch & build .re -> .js
    yarn start

    # console 2 - watch & run tests
    yart test:watch

## Licence

MIT - See LICENCE file.
