---
position: 1
title: Introduction
tags: [processor, specification, spec, compiler]
---

## Definition

## Phases

The processor is the brain of the compiler. After lexing and parsing, we put all our ASTs into the processor. The
processing starts **after** the parsing phase. The processor works in different phases.

### Phase 0 (before the first phase)

Before the first phase, we put all the ASTs (File Nodes) into the packages they belong to. We also create a global
scope.

### Phase 1

The first phase is to register all classes of the program. The reason for this is that a class can be a type of a
field or method. So we need to know all classes before we can process the fields and methods. Also we need to know all classes before we can resolve the superclasses / interfaces.

### Phase 2

The second phase is to link all superclasses and interfaces. As we now know all classes, we can be sure that if a
class cannot be found, it does not exist and we can throw an error.

### Phase 3

We can now process all fields and methods. We don't visit their initializers / bodies yet. But we now have
everything we need to resolve the types of the fields and methods.

### Phase 4

The fourth phase is to visit all initializers / bodies of the fields and methods. We can now resolve all symbols
and check if the types of the expressions are correct.

## Scope

The processor works with scopes. A scope is a collection of symbols. A symbol is a class, field, method, parameter,
local variable, etc. A scope can have **one** parent scope. The parent scope is the scope in which the current scope
is defined. For example, a package scope has the global scope as parent scope. A class scope has the package scope as
parent scope. A method scope has the class scope as parent scope. A block scope has the method scope as parent scope.

To resolve a symbol, we first look in the current scope. If the symbol is not found, we look in the parent scope. We
repeat this until we find the symbol or until we reach the global scope. If the symbol is not found in the global
scope, we throw an error.
