---
position: 1
title: Lexer
tags: [lexer, token, specification, spec, compiler]
---

# Shake Lexer Spec

## § 1 Definition

### § 1.1 Lexer

The lexer is the first step in the compilation process. It takes the source code as input and outputs a list of tokens. The lexer is also called a tokenizer. The lexer is also responsible for removing comments and whitespace.

### § 1.2 Tokens

A token is a sequence of characters that form a meaningful unit in a program. It holds the following information:
[Learn more about tokens](./tokens)

### § 2 Lexer Implementation

The lexer is implemented in the [`lexer` package](https://github.com/shakelang/shake/tree/master/shake/compiler/lexer). The main lexing logic ist implemented in [ShakeLexingBase](https://github.com/shakelang/shake/blob/master/shake/compiler/lexer/src/commonMain/kotlin/io/github/shakelang/shake/lexer/ShakeLexingBase.kt)

#### § 2.1 Token Ranking

_Ranking will make some difference in the lexer implementation, e.g. `*=` must be checked before `*`. This is a sample ranking. Note that this is not the only possible ranking, but it is the one used in the lexer implementation._

| Step | Description                                            | Value                            |
| ---- | ------------------------------------------------------ | -------------------------------- |
| 1.   | Skip whitespace (if existing)                          | eg. ` `, `\\t`                   |
| 2.   | Line Separator                                         | `\\n`                            |
| 3.   | Semicolon                                              | `;`                              |
| 4.   | Comma                                                  | `,`                              |
| 5.   | Dot                                                    | `.`                              |
| 6.   | Numbers (floating point, integer, binary, hexadecimal) | eg. `1`, `1.0`                   |
| 7.   | Identifier                                             | eg. `a`, `b`                     |
| 8.   | String                                                 | eg. `"abc"`                      |
| 9.   | Identifier 2                                           | eg. `&#96;a&#96;`, `&#96;b&#96;` |
| 10.  | Character                                              | eg. `'a'`                        |
| 11.  | Skip single line comment                               | eg. `// abc`                     |
| 12.  | Skip multi line comment                                | eg. `/* abc */`                  |
| 13.  | Pow Assignment                                         | `**=`                            |
| 14.  | Mod Assignment                                         | `%=`                             |
| 15.  | Div Assignment                                         | `/=`                             |
| 16.  | Mul Assignment                                         | `*=`                             |
| 17.  | Sub Assignment                                         | `-=`                             |
| 18.  | Add Assignment                                         | `+=`                             |
| 19.  | Increment                                              | `++`                             |
| 20.  | Decrement                                              | `--`                             |
| 21.  | Power                                                  | `**`                             |
| 22.  | Modulo                                                 | `%`                              |
| 23.  | Division                                               | `/`                              |
| 24.  | Multiplication                                         | `*`                              |
| 25.  | Subtraction                                            | `-`                              |
| 26.  | Addition                                               | `+`                              |
| 27.  | Logical XOR                                            | `^^`                             |
| 28.  | Logical OR                                             | `&#124;&#124;`                   |
| 29.  | Logical AND                                            | `&&`                             |
| 30.  | Equals                                                 | `==`                             |
| 31.  | Greater Than Or Equal                                  | `>=`                             |
| 32.  | Less Than Or Equal                                     | `<=`                             |
| 33.  | Greater Than                                           | `>`                              |
| 34.  | Less Than                                              | `<`                              |
| 35.  | Assignment                                             | `=`                              |
| 36.  | LParen                                                 | `(`                              |
| 37.  | RParen                                                 | `)`                              |
| 38.  | LCurl                                                  | `{`                              |
| 39.  | RCurl                                                  | `}`                              |
| 40.  | LBracket                                               | `[`                              |
| 41.  | RBracket                                               | `]`                              |
