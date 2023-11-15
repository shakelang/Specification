---
position: 2
title: Order of Operators
tags: [parser, operator, order, parsing token, specification, spec, compiler]
---

## Theoretical Order of Operators

### Literals

Literals are the highest precedence and are parsed first. They could be identifiers, numbers, strings, characters, true, false, null.

### Parentheses

`(` `)`: Parentheses are used to group expressions and have the highest precedence.

### Unary Operators

`+`, `-` (positive and negative), ! (logical NOT), ~ (bitwise NOT).

### Cast Operator

`as` (cast).

### Power Operator

`**` (power).

### Multiplicative Operators

`*` (multiplication), `/` (division), `%` (modulo).

### Additive Operators

`+` (addition), `-` (subtraction).

### Shift Operators

`<<` (left shift), `>>` (right shift).

### Relational Operators

`<`, `<=` (less than, less than or equal to), `>`, `>=` (greater than, greater than or equal to).

### Equality Operators

`==` (equal to), `!=` (not equal to).

### Bitwise AND

`&`

### Bitwise XOR

`^`

### Bitwise OR

`|`

### Logical AND

`&&`

### Logical XOR

`^^`

### Logical OR

`||`

### Conditional (Ternary) Operator

`? :`, `?:`

### Assignment Operators

`=`, `+=`, `-=`, `\*=`, `/=`, `%=`, `<<=`, `>>=`, `&=`, `^=`, `|=`
