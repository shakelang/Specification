---
position: 1
title: Structures
tags: [parser, structures, token, specification, spec, compiler]
---

# Shake Parser Structures Specification

## § 1 Definitions

### § 1.1 Tokens

A token is a sequence of characters that form a meaningful unit in a program. It holds the following information:

- The type of the token
- The position of the token in the source code (Start and End index in the source code)
- The value of the token (if applicable)

### § 1.1.1 Token Types

There are two variants of token types, there are types that always have the same value and therefore do not need to store the value in the token (e.g. `SEMICOLON` or any keyword) and there are types that can have different values (e.g. `INTEGER` or `IDENTIFIER`). The latter ones store the value in the token. [They are implemented as an enum in the `lexer` package](https://github.com/shakelang/shake/blob/master/shake/compiler/lexer/src/commonMain/kotlin/io/github/shakelang/shake/lexer/token/ShakeTokenType.kt)

### § 1.1.2 Token Values

Not every token needs to hold a value. Only those, that can have different values (e.g. `INTEGER` or `IDENTIFIER`) need to hold a value. The value is stored as a string in the token.

## § 1.2 Structure

A structure is a sequence of tokens that form a meaningful unit in a program.

## § 2 Structures

In this section we will define all the different structures that we refer to in the parser.
When we describe structures, we wil wrap token types in square brackets (`<>`) to indicate that they are tokens.
We will refer to other structures by their name and paragraph number and wrap them in curly brackets (`{}`).

### § 2.1 Statements

A statement refers to a structure that can be executed.

### § 2.2 Values

A value refers to a structure that can be used as a value.

### § 2.3 Expressions

_Lets talk about all the different structures that we refer to as expressions_

#### § 2.3.1 Number

A number is a sequence of digits that form a number. It can be either an integer or a floating point number. It is represented by either an `INTEGER` or a `FLOAT` token.

_Sample code:_

```shake
1
```

```shake
1.0
```

_Token Definition:_

```txt
<INTEGER> | <FLOAT>
```

#### § 2.3.2 String

A string is a sequence of characters that form a string. It is represented by a `STRING` token.

_Sample code:_

```shake
"Hello World"
```

_Token Definition:_

```txt
<STRInG>
```

#### § 2.3.3 Identifier

An identifier is a sequence of characters that form a name. It is represented by an `IDENTIFIER` token.

_Sample code:_

```shake
hello
```

_Token Definition:_

```txt
<IDENTIFIER>
```

#### § 2.3.3.2 Identifier 2

If your identifier contains special characters, you can use the following syntax:

```shake
`hello world`
```

_Token Definition:_

```txt
`<IDENTIFIER>`
```

#### § 2.3.4 Group

A group is a sequence of tokens that are surrounded by parentheses.

_Sample code:_

```shake
(...)
```

_Token Definition:_

```txt
<LPAREN> {§2.2 Values} <RPAREN>
```

#### § 2.3.5 Operators

##### § Addition

An addition is a sequence of two values that are separated by a `+` token.

_Sample code:_

```shake
1 + 2
```

_Token Definition:_

```txt
{§2.2 Values} <ADD> {§2.2 Values}
```

##### § Subtraction

A subtraction is a sequence of two values that are separated by a `-` token.

_Sample code:_

```shake
1 - 2
```

_Token Definition:_

```txt
{§2.2 Values} <SUB> {§2.2 Values}
```

##### § Multiplication

A multiplication is a sequence of two values that are separated by a `*` token.

_Sample code:_

```shake
1 * 2
```

_Token Definition:_

```txt
{§2.2 Values} <MUL> {§2.2 Values}
```

##### § Division

A division is a sequence of two values that are separated by a `/` token.

_Sample code:_

```shake
1 / 2
```

_Token Definition:_

```txt
{§2.2 Values} <DIV> {§2.2 Values}
```

##### § Modulo

A modulo is a sequence of two values that are separated by a `%` token.

_Sample code:_

```shake
1 % 2
```

_Token Definition:_

```txt
{§2.2 Values} <MOD> {§2.2 Values}
```

##### § Power

A power is a sequence of two values that are separated by a `**` token.

_Sample code:_

```shake
1 ** 2
```

_Token Definition:_

```txt
{§2.2 Values} <POW> {§2.2 Values}
```

##### § Bitwise And

A bitwise and is a sequence of two values that are separated by a `&` token.

_Sample code:_

```shake
1 & 2
```

_Token Definition:_

```txt
{§2.2 Values} <BIT_AND> {§2.2 Values}
```

##### § Bitwise Or

A bitwise or is a sequence of two values that are separated by a `|` token.

_Sample code:_

```shake
1 | 2
```

_Token Definition:_

```txt
{§2.2 Values} <BIT_OR> {§2.2 Values}
```

##### § Bitwise Xor

A bitwise xor is a sequence of two values that are separated by a `^` token.

_Sample code:_

```shake
1 ^ 2
```

_Token Definition:_

```txt
{§2.2 Values} <BIT_XOR> {§2.2 Values}
```

##### § Bitwise Not

A bitwise not is a sequence of two values that are separated by a `~` token.

_Sample code:_

```shake
~1
```

_Token Definition:_

```txt
<BIT_NOT> {§2.2 Values}
```

##### § Bitwise Shift Left

A bitwise shift left is a sequence of two values that are separated by a `<<` token.

_Sample code:_

```shake
1 << 2
```

_Token Definition:_

```txt
{§2.2 Values} <BIT_SHIFT_LEFT> {§2.2 Values}
```

##### § Bitwise Shift Right

A bitwise shift right is a sequence of two values that are separated by a `>>` token.

_Sample code:_

```shake
1 >> 2
```

_Token Definition:_

```txt
{§2.2 Values} <BIT_SHIFT_RIGHT> {§2.2 Values}
```

##### § Unary Plus

A unary minus is a sequence of two values that are separated by a `+` token.

_Sample code:_

```shake
+1
```

_Token Definition:_

```txt
<ADD> {§2.2 Values}
```

##### § Unary Minus

A unary minus is a sequence of two values that are separated by a `-` token.

_Sample code:_

```shake
-1
```

_Token Definition:_

```txt
<SUB> {§2.2 Values}
```

##### § Logical And

A logical and is a sequence of two values that are separated by a `&&` token.

_Sample code:_

```shake
1 && 2
```

_Token Definition:_

```txt
{§2.2 Values} <LOGICAL_AND> {§2.2 Values}
```

##### § Logical Or

A logical or is a sequence of two values that are separated by a `||` token.

_Sample code:_

```shake
1 || 2
```

_Token Definition:_

```txt
{§2.2 Values} <LOGICAL_OR> {§2.2 Values}
```

##### § Logical Not

A logical not is a sequence of two values that are separated by a `!` token.

_Sample code:_

```shake
!1
```

_Token Definition:_

```txt
<LOGICAL_NOT> {§2.2 Values}
```

##### § Equals

An equals is a sequence of two values that are separated by a `==` token.

_Sample code:_

```shake
1 == 2
```

_Token Definition:_

```txt
{§2.2 Values} <EQUALS> {§2.2 Values}
```

##### § Not Equals

A not equals is a sequence of two values that are separated by a `!=` token.

_Sample code:_

```shake
1 != 2
```

_Token Definition:_

```txt
{§2.2 Values} <NOT_EQUALS> {§2.2 Values}
```

##### § Greater Than

A greater than is a sequence of two values that are separated by a `>` token.

_Sample code:_

```shake
1 > 2
```

_Token Definition:_

```txt
{§2.2 Values} <GREATER_THAN> {§2.2 Values}
```

##### § Greater Than Or Equals

A greater than or equals is a sequence of two values that are separated by a `>=` token.

_Sample code:_

```shake
1 >= 2
```

_Token Definition:_

```txt
{§2.2 Values} <GREATER_THAN_OR_EQUALS> {§2.2 Values}
```

##### § Less Than

A less than is a sequence of two values that are separated by a `<` token.

_Sample code:_

```shake
1 < 2
```

_Token Definition:_

```txt
{§2.2 Values} <LESS_THAN> {§2.2 Values}
```

##### § Less Than Or Equals

A less than or equals is a sequence of two values that are separated by a `<=` token.

_Sample code:_

```shake
1 <= 2
```

_Token Definition:_

```txt
{§2.2 Values} <LESS_THAN_OR_EQUALS> {§2.2 Values}
```

### § 2.4 Variable Declaration

A variable declaration is a sequence of tokens that declare a variable. It consists of a type, a name and an optional value.

_Sample code:_

```shake
int a
int b = 1
```

_Token Definition:_

```txt
([KEYWORD_UNSIGNED]) [KEYWORD_BYTE] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
([KEYWORD_UNSIGNED]) [KEYWORD_SHORT] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
([KEYWORD_UNSIGNED]) [KEYWORD_INT] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
([KEYWORD_UNSIGNED]) [KEYWORD_LONG] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
[KEYWORD_FLOAT] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
[KEYWORD_DOUBLE] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
[KEYWORD_BOOLEAN] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
[KEYWORD_CHAR] [IDENTIFIER] ([ASSIGN] {§2.2 Values})?
```
