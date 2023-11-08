lexer grammar ShakeLexer;

channels {
	ERROR
}

options {
	superClass = ShakeLexerBase;
}

@header {
	package io.github.shakelang.shake.antlr.lexer;
}

MultiLineComment: '/*' .*? '*/' -> channel(HIDDEN);
SingleLineComment:
	'//' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);

ADD: '+';
ADD_ASSIGN: '+=';
ASSIGN: '=';
BIGGER: '>';
BIGGER_EQUALS: '>=';
COMMA: ',';
DECR: '--';
DIV: '/';
DIV_ASSIGN: '/=';
DOT: '.';
EQ_EQUALS: '==';
INCR: '++';
KEYWORD_ABSTRACT: 'abstract';
KEYWORD_AS: 'as';
KEYWORD_BOOLEAN: 'boolean';
KEYWORD_BYTE: 'byte';
KEYWORD_CHAR: 'char';
KEYWORD_CLASS: 'class';
KEYWORD_CONST: 'const';
KEYWORD_CONSTRUCTOR: 'constructor';
KEYWORD_DO: 'do';
KEYWORD_DOUBLE: 'double';
KEYWORD_DYNAMIC: 'dynamic';
KEYWORD_ELSE: 'else';
KEYWORD_ENUM: 'enum';
KEYWORD_EXTENDS: 'extends';
KEYWORD_FALSE: 'false';
KEYWORD_FINAL: 'final';
KEYWORD_FLOAT: 'float';
KEYWORD_FOR: 'for';
KEYWORD_FUNCTION: 'function';
KEYWORD_IF: 'if';
KEYWORD_IMPLEMENTS: 'implements';
KEYWORD_IMPORT: 'import';
KEYWORD_IN: 'in';
KEYWORD_INLINE: 'inline';
KEYWORD_INSTANCEOF: 'instanceof';
KEYWORD_INT: 'int';
KEYWORD_INTERFACE: 'interface';
KEYWORD_LONG: 'long';
KEYWORD_NATIVE: 'native';
KEYWORD_NEW: 'new';
KEYWORD_NULL: 'null';
KEYWORD_OBJECT: 'object';
KEYWORD_OPERATOR: 'operator';
KEYWORD_OVERRIDE: 'override';
KEYWORD_PACKAGE: 'package';
KEYWORD_PRIVATE: 'private';
KEYWORD_PROTECTED: 'protected';
KEYWORD_PUBLIC: 'public';
KEYWORD_RETURN: 'return';
KEYWORD_SHORT: 'short';
KEYWORD_STATIC: 'static';
KEYWORD_SUPER: 'super';
KEYWORD_SYNCHRONIZED: 'synchronized';
KEYWORD_THIS: 'this';
KEYWORD_TRUE: 'true';
KEYWORD_UNSIGNED: 'unsigned';
KEYWORD_VOID: 'void';
KEYWORD_WHILE: 'while';
LCURL: '{';
LINE_SEPARATOR: '\n';
LOGICAL_AND: '&&';
LOGICAL_OR: '||';
LOGICAL_XOR: '^^';
LPAREN: '(';
LSQBR: '[';
MOD: '%';
MOD_ASSIGN: '%=';
MUL: '*';
MUL_ASSIGN: '*=';
// NONE: '';
POW: '**';
POW_ASSIGN: '**=';
RCURL: '}';
RPAREN: ')';
RSQBR: ']';
SEMICOLON: ';';
SMALLER: '<';
SMALLER_EQUALS: '<=';
SUB: '-';
SUB_ASSIGN: '-=';

// Literals

CHARACTER: '\'' (ESCAPE_SEQUENCE | ~[\\'\r\n\u2028\u2029]) '\'';
DOUBLE: DECIMAL_DIGIT+ '.' DECIMAL_DIGIT* EXPONENT?;
HEX_LITERAL: '0' [xX] HEX_DIGIT+;
INTEGER: DECIMAL_DIGIT+;
LONG: DECIMAL_DIGIT+ [lL];
STRING: '"' (ESCAPE_SEQUENCE | ~["\r\n\u2028\u2029])* '"';
BIN_LITERAL: '0' [bB] BIN_DIGIT+;
IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]*;

fragment EXPONENT: [eE] [+-]? DECIMAL_DIGIT+;
fragment DECIMAL_DIGIT: [0-9];
fragment HEX_DIGIT: [0-9a-fA-F];
fragment BIN_DIGIT: [01];
fragment ESCAPE_SEQUENCE: '\\' [btnfr"'\\] | UNICODE_ESCAPE;
fragment UNICODE_ESCAPE:
	'\\u' HEX_DIGIT HEX_DIGIT HEX_DIGIT HEX_DIGIT;