---
position: 1
title: Introduction
tags: [processor, specification, spec, compiler]
---

The interpreter is the part of the compiler that processes the ASTs. It resolves all symbols and checks if the types
are correct. It also checks if the program is valid. For example, it checks if a method is not abstract and final at
the same time.

This Article talks about a abstract view of the processor. When we are talking about a specific implementation, we
will mention it. If so, we'll talk about the [Shake Processor Implementation](https://github.com/shakelang/shake/tree/master/shake/compiler/processor)
(which is the default implementation).

## Definition

## Phases

The processor is the brain of the compiler. After lexing and parsing, we put all our ASTs into the processor. The
processing starts **after** the parsing phase. The processor works in different phases.

### Phase 0 (before the first phase)

Before the first phase, we put all the ASTs (File Nodes) into the packages they belong to. We also create a global
scope.

It is not allowed, to add any new AST, etc. after this phase. The reason
for this is that we need to know all classes before we can process the fields and methods. Also we need to know all
classes before we can resolve the superclasses / interfaces.

At this point we have a map of all packages all packages contain a list of File ASTs.

In the following phases, we will process the contents of these File ASTs.

This defines an secure order of processing. There are no circular dependencies, and we can be sure that all
dependencies are already processed.

### Phase 1

The first phase is to register all classes of the program.

The reason for this is that a class can be a type of a
field or method. So we need to know all classes before we can process the fields and methods. Also we need to know all
classes before we can resolve the superclasses / interfaces.

So we create the class objects and put them into their packages. We don't link the superclasses and interfaces yet.
No methods or fields are processed yet.

### Phase 2

The second phase is to link all superclasses and interfaces.

As we now know all classes, we can be sure that if a class cannot be found, it does not exist and we can throw an
error, as every class in classpath should be registered by phase 1.

### Phase 3

We can now process all fields and methods. **We don't visit their initializers / bodies yet.**
But we now have everything we need to resolve the types of the fields and methods and their parameters.

We need to wait for phase 1 as the return type of a method can be a class.

We need to wait for phase 2 as overridden methods can return a subclass of the superclass / interface.

### Phase 4

The fourth phase is to visit all initializers / bodies of the fields and methods.
We can now resolve all symbols and check if the types of the expressions are correct.

### Finalization

The processor is done when all 4 phases are completed. We now have a fully processed program. From this point, we
should not change the program anymore. We also should not throw any errors anymore.

## Scope

A scope is a container for symbols. It is used to resolve symbols.

A symbol in this context refers to either a variable (/field/parameter), an invokable (/method/function/constructor)
or a class (/interface/enum).

A scope can contain a parent. If we cannot resolve a symbol in the current scope, we can try to resolve it in the
parent scope.

There are different types of scopes:

### Project Scope (Global Scope)

The project scope is the root scope. It contains all packages. Default imports are also added to this scope.

_This is the default scope of the processor._

### Package Scope

A package scope contains all classes / functions / variables of a package.

_There will be one instance of this scope for each package._

(parent: project scope)

### Class Scope (static)

The class static scope contains all static fields / methods / subclasses of a class.

_There will be one instance of this scope for each class._

(parent: package scope or class scope if nested)

### Class Scope (instance)

The class instance scope contains all fields / methods / subclasses of a class. (in addition to the static scope)

_There will be one instance of this scope for each class._

(parent: package scope or class scope if nested)

### Method Scope

The method scope contains all parameters / variables of a method.

_There will be one instance of this scope for each method._

(parent: package scope if top level method, class scope if nested method)

### Block Scope

The block scope contains all local variables of a block.

_This scope is generated for blocks. It is generated for every method body. Some expressions (like `if`-blocks) can
also generate a block scope._

(parent: method scope or block scope if nested)

## Selection

### Classes / Fields / Variables

For classes and fields/variables, its quite straight forward. We just need to find the class/field in the current
scope. If we cannot find it, we can try to find it in the parent scope.

### Methods

For methods, its a bit more complicated. As there can be multiple overloads of a method, we need to find the correct
one. It is even possible that there are multiple methods that could work.

First of all we create a list of all methods with that name. They are sorted by scope. (so the first methods will be
the ones in the current scope, then the ones in the parent scope, etc.)

Then we filter out all methods that have the wrong amount of parameters. (This is the easiest check and is quite cheap,
so we do it first)

Then we filter out all methods that have incompatible types for the parameters.

Now we have a list of all methods that could work. If there is only one method left, we found the correct one.

To find a criteria for the correct method, we created a concept called "compatibility distance". The compatibility
distance is a number that describes how compatible two types are. The lower the number, the more compatible they are.

for example the distance between `byte` and `byte` is 0 (they are the same type), the distance between `byte` and
`short` is 1 (they are both numeric types, but `short` is bigger than `byte`), the distance between `byte` and `int` is 2

We take the sum of all distances of all parameters. The method with the lowest sum will be chosen.

If there are multiple methods with the same sum, we take the one that is the first in the list (as the list is sorted
by scope, this will be the one in the current scope).

## Implementation

In the following sections, we will talk about the default implementation of the processor, it can be found
[here](https://github.com/shakelang/shake/tree/master/shake/compiler/processor).

### Structuring

The processor needs a lot of types. We created all types as interfaces in the `com.shakelang.shake.compiler.processor.
program.types` package. As we cannot directly create instances, we created all implementations in the `com.shakelang.
shake.compiler.processor.program.creation` package.

The types have methods for the different phases. (Only for the phases they need to implement, a method does not need to
implement phase 1 or 2, so it does not need to implement the methods for these phases)

The processor is implemented in class `com.shakelang.shake.processor.ShakePackageBasedProcessor`. Additionally there is `com.shakelang.shake.processor.ShakeASTProcessor` (which is used to process code blocks inside of methods).
