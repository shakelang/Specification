parser grammar ShakeParser;

options {
	tokenVocab = ShakeLexer;
	superClass = ShakeParserBase;
}

@header {
	package io.github.shakelang.shake.antlr.parser;
}

// Parser Rules

type:
	(KEYWORD_UNSIGNED)? (
		KEYWORD_BYTE
		| KEYWORD_SHORT
		| KEYWORD_INT
		| KEYWORD_LONG
	)
	| (
		KEYWORD_FLOAT
		| KEYWORD_DOUBLE
		| KEYWORD_CHAR
		| IDENTIFIER
	);

typeOrVoid: type | KEYWORD_VOID;

// statement: ( declaration | assignment | ifStatement | whileStatement | forStatement |
// returnStatement | breakStatement | continueStatement | expression | block );

// block: LCURL (statement)* RCURL;

string: STRING;
identifier: IDENTIFIER;
group: LPAREN expression RPAREN;
number: INTEGER | DOUBLE | BIN_LITERAL | HEX_LITERAL;
addition: expr2 ADD expr2;
subtraction: expr2 SUB expr2;
multiplication: expr3 MUL expr3;
division: expr3 DIV expr3;
modulo: expr3 MOD expr3;
power: expr4 POW expr4;

expr1: (addition | subtraction);
expr2: (multiplication | division | modulo);
expr3: (power);
expr4: ( group | identifier | string | number | expr1);

expression: expr1;