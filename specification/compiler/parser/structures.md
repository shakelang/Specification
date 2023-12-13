---
position: 2
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

### § 2.0 Help Structures

#### § Access Modifier

An access modifier is a sequence of tokens that define the access modifier of a structure. It can be either `public` or `private`, `protected`.

_Sample code:_

```shake
public
```

_Token Definition:_

```tokens
<KEYWORD_PUBLIC> | <KEYWORD_PRIVATE> | <KEYWORD_PROTECTED>
```

#### § Type

A type is a sequence of tokens that define the type of a structure. It can be either `byte`, `short`, `int`, `long`, `float`, `double`, `boolean` or `char`. Additionally it can be unsigned (if it is a `byte`, `short`, `int` or `long`).
It can also be an `identifier` to reference object oriented types.

_Sample code:_

```shake
int
```

_Token Definition:_

```tokens
(<KEYWORD_UNSIGNED>) <KEYWORD_BYTE> | (<KEYWORD_UNSIGNED>) <KEYWORD_SHORT> | (<KEYWORD_UNSIGNED>) <KEYWORD_INT> | (<KEYWORD_UNSIGNED>) <KEYWORD_LONG> | <KEYWORD_FLOAT> | <KEYWORD_DOUBLE> | <KEYWORD_BOOLEAN> | <KEYWORD_CHAR> | <IDENTIFIER>
```

In this section we will define all the different structures that we refer to in the parser.
When we describe structures, we wil wrap token types in square brackets (`<>`) to indicate that they are tokens.
We will refer to other structures by their name and paragraph number and wrap them in curly brackets (`{}`).

### § 2.1 Statements

A statement refers to a structure that can be executed.

### § 2.2 Values

A value refers to a structure that can be used as a value.

### § 2.3 Expressions

_Lets talk about all the different structures that we refer to as expressions_

#### § Number

A number is a sequence of digits that form a number. It can be either an integer or a floating point number. It is represented by either an `INTEGER` or a `FLOAT` token.

_Sample code:_

```shake
1
```

```shake
1.0
```

_Token Definition:_

```tokens
<INTEGER> | <FLOAT>
```

#### § String

A string is a sequence of characters that form a string. It is represented by a `STRING` token.

_Sample code:_

```shake
"Hello World"
```

_Token Definition:_

```tokens
<STRInG>
```

#### § Identifier

An identifier is a sequence of characters that form a name. It is represented by an `IDENTIFIER` token.

_Sample code:_

```shake
hello
```

_Token Definition:_

```tokens
<IDENTIFIER>
```

#### § Identifier 2

If your identifier contains special characters, you can use the following syntax:

```shake
`hello world`
```

_Token Definition:_

```tokens
`<IDENTIFIER>`
```

#### § Group

A group is a sequence of tokens that are surrounded by parentheses.

_Sample code:_

```shake
(...)
```

_Token Definition:_

```tokens
<LPAREN> {§2.2 Values} <RPAREN>
```

#### § Operators

##### § Addition

An addition is a sequence of two values that are separated by a `+` token.

_Sample code:_

```shake
1 + 2
```

_Token Definition:_

```tokens
{§2.2 Values} <ADD> {§2.2 Values}
```

##### § Subtraction

A subtraction is a sequence of two values that are separated by a `-` token.

_Sample code:_

```shake
1 - 2
```

_Token Definition:_

```tokens
{§2.2 Values} <SUB> {§2.2 Values}
```

##### § Multiplication

A multiplication is a sequence of two values that are separated by a `*` token.

_Sample code:_

```shake
1 * 2
```

_Token Definition:_

```tokens
{§2.2 Values} <MUL> {§2.2 Values}
```

##### § Division

A division is a sequence of two values that are separated by a `/` token.

_Sample code:_

```shake
1 / 2
```

_Token Definition:_

```tokens
{§2.2 Values} <DIV> {§2.2 Values}
```

##### § Modulo

A modulo is a sequence of two values that are separated by a `%` token.

_Sample code:_

```shake
1 % 2
```

_Token Definition:_

```tokens
{§2.2 Values} <MOD> {§2.2 Values}
```

##### § Power

A power is a sequence of two values that are separated by a `**` token.

_Sample code:_

```shake
1 ** 2
```

_Token Definition:_

```tokens
{§2.2 Values} <POW> {§2.2 Values}
```

##### § Bitwise And

A bitwise and is a sequence of two values that are separated by a `&` token.

_Sample code:_

```shake
1 & 2
```

_Token Definition:_

```tokens
{§2.2 Values} <BIT_AND> {§2.2 Values}
```

##### § Bitwise Or

A bitwise or is a sequence of two values that are separated by a `|` token.

_Sample code:_

```shake
1 | 2
```

_Token Definition:_

```tokens
{§2.2 Values} <BIT_OR> {§2.2 Values}
```

##### § Bitwise Xor

A bitwise xor is a sequence of two values that are separated by a `^` token.

_Sample code:_

```shake
1 ^ 2
```

_Token Definition:_

```tokens
{§2.2 Values} <BIT_XOR> {§2.2 Values}
```

##### § Bitwise NAND

A bitwise nand is a sequence of two values that are separated by a `~&` token.

_Sample code:_

```shake
1 ~& 2
```

_Token Definition:_

```tokens
{§2.2 Values} <BIT_NAND> {§2.2 Values}
```

##### § Bitwise NOR

A bitwise nor is a sequence of two values that are separated by a `~|` token.

_Sample code:_

```shake
1 ~| 2
```

_Token Definition:_

```tokens
{§2.2 Values} <BIT_NOR> {§2.2 Values}
```

##### § Bitwise XNOR

A bitwise xnor is a sequence of two values that are separated by a `~^` token.

_Sample code:_

```shake
1 ~^ 2
```

##### § Bitwise Not

A bitwise not is a sequence of two values that are separated by a `~` token.

_Sample code:_

```shake
~1
```

_Token Definition:_

```tokens
<BIT_NOT> {§2.2 Values}
```

##### § Bitwise Shift Left (shl)

A bitwise shift left is a sequence of two values that are separated by a `<<` token.

_Sample code:_

```shake
1 << 2
```

_Token Definition:_

```tokens
{§2.2 Values} <BIT_SHIFT_LEFT> {§2.2 Values}
```

##### § Bitwise Shift Right (shr)

A bitwise shift right is a sequence of two values that are separated by a `>>` token.

_Sample code:_

```shake
1 >> 2
```

_Token Definition:_

```tokens
{§2.2 Values} <BIT_SHIFT_RIGHT> {§2.2 Values}
```

##### § Unary Plus

A unary minus is a sequence of two values that are separated by a `+` token.

_Sample code:_

```shake
+1
```

_Token Definition:_

```tokens
<ADD> {§2.2 Values}
```

##### § Unary Minus

A unary minus is a sequence of two values that are separated by a `-` token.

_Sample code:_

```shake
-1
```

_Token Definition:_

```tokens
<SUB> {§2.2 Values}
```

##### § Logical And

A logical and is a sequence of two values that are separated by a `&&` token.

_Sample code:_

```shake
1 && 2
```

_Token Definition:_

```tokens
{§2.2 Values} <LOGICAL_AND> {§2.2 Values}
```

##### § Logical Or

A logical or is a sequence of two values that are separated by a `||` token.

_Sample code:_

```shake
1 || 2
```

_Token Definition:_

```tokens
{§2.2 Values} <LOGICAL_OR> {§2.2 Values}
```

##### § Logical Xor

A logical xor is a sequence of two values that are separated by a `^^` token.

_Sample code:_

```shake
1 ^^ 2
```

_Token Definition:_

```tokens
{§2.2 Values} <LOGICAL_XOR> {§2.2 Values}
```

##### § Logical Not

A logical not is a sequence of two values that are separated by a `!` token.

_Sample code:_

```shake
!1
```

_Token Definition:_

```tokens
<LOGICAL_NOT> {§2.2 Values}
```

##### § Equals

An equals is a sequence of two values that are separated by a `==` token.

_Sample code:_

```shake
1 == 2
```

_Token Definition:_

```tokens
{§2.2 Values} <EQUALS> {§2.2 Values}
```

##### § Not Equals

A not equals is a sequence of two values that are separated by a `!=` token.

_Sample code:_

```shake
1 != 2
```

_Token Definition:_

```tokens
{§2.2 Values} <NOT_EQUALS> {§2.2 Values}
```

##### § Greater Than

A greater than is a sequence of two values that are separated by a `>` token.

_Sample code:_

```shake
1 > 2
```

_Token Definition:_

```tokens
{§2.2 Values} <GREATER_THAN> {§2.2 Values}
```

##### § Greater Than Or Equals

A greater than or equals is a sequence of two values that are separated by a `>=` token.

_Sample code:_

```shake
1 >= 2
```

_Token Definition:_

```tokens
{§2.2 Values} <GREATER_THAN_OR_EQUALS> {§2.2 Values}
```

##### § Less Than

A less than is a sequence of two values that are separated by a `<` token.

_Sample code:_

```shake
1 < 2
```

_Token Definition:_

```tokens
{§2.2 Values} <LESS_THAN> {§2.2 Values}
```

##### § Less Than Or Equals

A less than or equals is a sequence of two values that are separated by a `<=` token.

_Sample code:_

```shake
1 <= 2
```

_Token Definition:_

```tokens
{§2.2 Values} <LESS_THAN_OR_EQUALS> {§2.2 Values}
```

### § 2.4 Variable Declaration [Local]

A variable declaration is a sequence of tokens that declare a variable. It consists of a type, a name and an optional value.

_Sample code:_

```shake
int a
int b = 1
```

_Token Definition:_

```tokens
{Type} <IDENTIFIER> (<ASSIGN> {§2.2 Values})?
```

### § 2.5 Field Declaration [Global]

A field declaration is a sequence of tokens that declare a field. It consists of a type, a name and an optional value.

_Sample code:_

```shake
int a
int b = 1
```

_Token Definition_

```tokens
{Access} {Type} <IDENTIFIER> (<ASSIGN> {§2.2 Values})?
```

### § 2.6 Function Declaration

A function declaration is a sequence of tokens that declare a function. It consists of an optional access modifier, a type, a name, a list of parameters and a body.

_Sample code:_

```shake
public int add(int a, int b) {
  return a + b
}
```

_Token Definition:_

```tokens
{Access}
{Type}
<IDENTIFIER>
<LPAREN>
  (
    {§2.4 Variable Declaration [Local]}
    (
      <COMMA>
      {§2.4 Variable Declaration [Local]}
    )*
  )?
<RPAREN> {Block}
```

### § 2.7 Class Declaration

A class declaration is a sequence of tokens that declare a class. It consists of an optional access modifier, a name, a list of fields and a list of functions.

_Sample code:_

```shake
public class Test {
  int a
  int b = 1

  public int add(int a, int b) {
    return a + b
  }
}
```

_Token Definition:_

```tokens
{Access}
<KEYWORD_CLASS>
<IDENTIFIER>
<LCURLY>
  ({§2.5 Field Declaration [Global]} | {§2.6 Function Declaration})*
<RCURLY>
```

### § 2.8 Block

A block is a sequence of tokens that form a block. It consists of a list of statements. It can either start with a `{` token and contain a list of statements and end with a `}` token or it can be a single statement.

_Sample code:_

```shake
{
  int a = 1
  int b = 2
}
```

_Token Definition:_

```tokens
<LCURLY>
  ({§2.1 Statements})*
<RCURLY>
```

### § 2.9 If Statement

An if statement is a sequence of tokens that form an if statement. It consists of a condition and a body. It can also have an else branch.

_Sample code:_

```shake
if (a == 1) {
  return 1
} else {
  return 2
}
```

_Token Definition:_

```tokens
<KEYWORD_IF> <LPAREN> {§2.2 Values} <RPAREN> {Block} (<KEYWORD_ELSE> {Block})?
```

### § 2.10 While Statement

A while statement is a sequence of tokens that form a while statement. It consists of a condition and a body.

_Sample code:_

```shake
while (a == 1) {
  return 1
}
```

_Token Definition:_

```tokens
<KEYWORD_WHILE> <LPAREN> {§2.2 Values} <RPAREN> {Block}
```

### § 2.11 For Statement

A for statement is a sequence of tokens that form a for statement. It consists of a variable declaration, a condition, an increment and a body.

_Sample code:_

```shake
for (int i = 0; i < 10; i = i + 1) {
  return i
}
```

_Token Definition:_

```tokens
<KEYWORD_FOR> <LPAREN> {§2.1 Statements} <SEMICOLON> {§2.2 Values} <SEMICOLON> {§2.1 Statements} <RPAREN> {Block}
```

### § 2.12 Return Statement

A return statement is a sequence of tokens that form a return statement. It consists of a value.

_Sample code:_

```shake
return 1
```

_Token Definition:_

```tokens
<KEYWORD_RETURN> {§2.2 Values}
```

### § 2.13 Break Statement

A break statement is a sequence of tokens that form a break statement.

_Sample code:_

```shake
break
```

_Token Definition:_

```tokens
<KEYWORD_BREAK>
```

### § 2.14 Continue Statement

A continue statement is a sequence of tokens that form a continue statement.

_Sample code:_

```shake
continue
```

_Token Definition:_

```tokens
<KEYWORD_CONTINUE>
```
