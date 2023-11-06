---
position: 2
title: Tokens
tags: [lexer, token, specification, spec, compiler, tokens]
---

# Shake Lexer Token Specification

## Definition

### § 1 Tokens

A token is a sequence of characters that form a meaningful unit in a program. It holds the following information:

- The type of the token
- The position of the token in the source code (Start and End index in the source code)
- The value of the token (if applicable)

### §2 Token Types

There are two variants of token types, there are types that always have the same value and therefore do not need to store the value in the token (e.g. `SEMICOLON` or any keyword) and there are types that can have different values (e.g. `INTEGER` or `IDENTIFIER`). The latter ones store the value in the token. [They are implemented as an enum in the `lexer` package](https://github.com/shakelang/shake/blob/master/shake/compiler/lexer/src/commonMain/kotlin/io/github/shakelang/shake/lexer/token/ShakeTokenType.kt).

_"fixed"_ token types:

| Token Type           | Description               | Value          |
| -------------------- | ------------------------- | -------------- |
| ADD                  | Addition                  | `+`            |
| ADD_ASSIGN           | Addition Assignment       | `+=`           |
| ASSIGN               | Assignment                | `=`            |
| BIGGER               | Bigger                    | `>`            |
| BIGGER_EQUALS        | Bigger Equals             | `>=`           |
| COMMA                | Comma                     | `,`            |
| DECR                 | Decrement                 | `--`           |
| DIV                  | Division                  | `/`            |
| DIV_ASSIGN           | Division Assignment       | `/=`           |
| DOT                  | Dot                       | `.`            |
| EQ_EQUALS            | Equals                    | `==`           |
| INCR                 | Increment                 | `++`           |
| KEYWORD_ABSTRACT     | Abstract Keyword          | `abstract`     |
| KEYWORD_AS           | As Keyword                | `as`           |
| KEYWORD_BOOLEAN      | Boolean Keyword           | `boolean`      |
| KEYWORD_BYTE         | Byte Keyword              | `byte`         |
| KEYWORD_CHAR         | Char Keyword              | `char`         |
| KEYWORD_CLASS        | Class Keyword             | `class`        |
| KEYWORD_CONST        | Const Keyword             | `const`        |
| KEYWORD_CONSTRUCTOR  | Constructor Keyword       | `constructor`  |
| KEYWORD_DO           | Do Keyword                | `do`           |
| KEYWORD_DOUBLE       | Double Keyword            | `double`       |
| KEYWORD_DYNAMIC      | Dynamic Keyword           | `dynamic`      |
| KEYWORD_ELSE         | Else Keyword              | `else`         |
| KEYWORD_ENUM         | Enum Keyword              | `enum`         |
| KEYWORD_EXTENDS      | Extends Keyword           | `extends`      |
| KEYWORD_FALSE        | False Keyword             | `false`        |
| KEYWORD_FINAL        | Final Keyword             | `final`        |
| KEYWORD_FLOAT        | Float Keyword             | `float`        |
| KEYWORD_FOR          | For Keyword               | `for`          |
| KEYWORD_FUNCTION     | Function Keyword          | `function`     |
| KEYWORD_IF           | If Keyword                | `if`           |
| KEYWORD_IMPLEMENTS   | Implements Keyword        | `implements`   |
| KEYWORD_IMPORT       | Import Keyword            | `import`       |
| KEYWORD_IN           | In Keyword                | `in`           |
| KEYWORD_INLINE       | Inline Keyword            | `inline`       |
| KEYWORD_INSTANCEOF   | Instanceof Keyword        | `instanceof`   |
| KEYWORD_INT          | Int Keyword               | `int`          |
| KEYWORD_INTERFACE    | Interface Keyword         | `interface`    |
| KEYWORD_LONG         | Long Keyword              | `long`         |
| KEYWORD_NATIVE       | Native Keyword            | `native`       |
| KEYWORD_NEW          | New Keyword               | `new`          |
| KEYWORD_NULL         | Null Keyword              | `null`         |
| KEYWORD_OBJECT       | Object Keyword            | `object`       |
| KEYWORD_OPERATOR     | Operator Keyword          | `operator`     |
| KEYWORD_OVERRIDE     | Override Keyword          | `override`     |
| KEYWORD_PACKAGE      | Package Keyword           | `package`      |
| KEYWORD_PRIVATE      | Private Keyword           | `private`      |
| KEYWORD_PROTECTED    | Protected Keyword         | `protected`    |
| KEYWORD_PUBLIC       | Public Keyword            | `public`       |
| KEYWORD_RETURN       | Return Keyword            | `return`       |
| KEYWORD_SHORT        | Short Keyword             | `short`        |
| KEYWORD_STATIC       | Static Keyword            | `static`       |
| KEYWORD_SUPER        | Super Keyword             | `super`        |
| KEYWORD_SYNCHRONIZED | Synchronized Keyword      | `synchronized` |
| KEYWORD_THIS         | This Keyword              | `this`         |
| KEYWORD_TRUE         | True Keyword              | `true`         |
| KEYWORD_UNSIGNED     | Unsigned Keyword          | `unsigned`     |
| KEYWORD_VOID         | Void Keyword              | `void`         |
| KEYWORD_WHILE        | While Keyword             | `while`        |
| LCURL                | Left Curly Brace          | `{`            |
| LINE_SEPARATOR       | Line Separator            | `\n`           |
| LOGICAL_AND          | Logical And               | `&&`           |
| LOGICAL_OR           | Logical Or                | `\|\|`         |
| LOGICAL_XOR          | Logical Xor               | `^`            |
| LPAREN               | Left Parenthesis          | `(`            |
| LSQBR                | Left Square Bracket       | `[`            |
| MOD                  | Modulo                    | `%`            |
| MOD_ASSIGN           | Modulo Assignment         | `%=`           |
| MUL                  | Multiplication            | `*`            |
| MUL_ASSIGN           | Multiplication Assignment | `*=`           |
| NONE                 | None                      |                |
| POW                  | Power                     | `**`           |
| POW_ASSIGN           | Power Assignment          | `**=`          |
| RCURL                | Right Curly Brace         | `}`            |
| RPAREN               | Right Parenthesis         | `)`            |
| RSQBR                | Right Square Bracket      | `]`            |
| SEMICOLON            | Semicolon                 | `;`            |
| SMALLER              | Smaller                   | `<`            |
| SMALLER_EQUALS       | Smaller Equals            | `<=`           |
| SUB                  | Subtraction               | `-`            |
| SUB_ASSIGN           | Subtraction Assignment    | `-=`           |

_"variable"_ token types:

| Token Type | Description | Value    |
| ---------- | ----------- | -------- |
| CHARACTER  | Character   | e.g. 'a' |
| DOUBLE     | Double      | e.g. 1.0 |
| IDENTIFIER | Identifier  | e.g. a   |
| INTEGER    | Integer     | e.g. 1   |
| STRING     | String      | e.g. "a" |
