---
position: 1
title: Bytecode Instructions
tags: [specification, spec, interpreter, bytecode, instructions]
---

# The shake bytecode code instructions

## Stack and variable manipulation

The stack hereby refers to a stack of 8-bit-values. We can only put an 8-bit-value (further referred to as a `byte`, not to
be with the data type `byte`) on top of the stack and we can remove the topmost bit from the stack. We will refer to the
topmost byte as the `top/head` of the stack. The stack is a LIFO (last in, first out) data structure. The stack is our main
tool to manipulate data. We can use an instruction to push a constant onto the stack, then we push another constant onto
the stack. Now we can use an add instruction to add the two constants together. Our stack will no longer contain the two constants, but the result of the addition. This would look like this:

```bash
# Stack []
bpush 1
# Stack [1]
bpush 2
# Stack [1, 2]
badd
# Stack [3]
```

Be aware that the stack is a stack of 8-bit-values. When we push a short on the stack, the short consists of 16 bits, so we
will have 2 bytes on our stack now. Here the above example with a short:

```bash
# Stack []
spush 1
# Stack [0, 1]
spush 2
# Stack [0, 1, 0, 2]
sadd
# Stack [0, 3]
```

In this way we could also combine two bytes to a short, or we could use only won spush to push two bytes onto the stack.
This example performs the same operation with bytes, but using spush instead of bpush:

```bash
# Stack []
spush 0x0102
# Stack [1, 2]
badd
# Stack [3]
```

Now we will look at the local variable table. The local variable table is a table of 8-bit-values. We can store a byte in
the local variable table and we can load a byte from the local variable table. The local variable table is a table of
bytes, so we can only store a byte in the local variable table. When we want to store a short in the local variable table,

### § 1.1 Pushing constants onto the stack

In the above example we already used some push instructions. Now lets declare them formally.

#### § 1.1.1 `bpush`

A `bpush` instruction pushes a single byte (or any 8-bit-value) onto the stack. It can also be used for a boolean or ubyte.
Syntax: `bpush <u1 value>`, so we have the byte signing a bpush instruction and then directly after that the byte we want to
push onto the stack. Overall instruction length: `2 bytes`.

#### § 1.1.2 `spush`

A `spush` instruction pushes a short (or any 16-bit-value) onto the stack. It can also be used for a ushort.
Syntax: `spush <u2 value>`, so we have the byte signing a spush instruction and then directly after that the short we want to
push onto the stack. Overall instruction length: `3 bytes`.

#### § 1.1.3 `ipush`

An `ipush` instruction pushes an integer (or any 32-bit-value) onto the stack. It can also be used for a float or uint.
Syntax: `ipush <u4 value>`, so we have the byte signing a ipush instruction and then directly after that the integer we want to push onto the stack. Overall instruction length: `5 bytes`.

#### § 1.1.4 `lpush`

An `lpush` instruction pushes a long (or any 64-bit-value) onto the stack. It can also be used for a double or ulong.
Syntax: `lpush <u8 value>`, so we have the byte signing a lpush instruction and then directly after that the long we want to push onto the stack. Overall instruction length: `9 bytes`.

### § 1.2 Loading data from the local variable table

#### § 1.2.1 `bload`

Syntax: `bload <u2 index>` - Load a byte from the local variable table onto the stack.

#### § 1.2.2 `sload`

Syntax: `sload <u2 index>` - Load a short from the local variable table onto the stack. The index points to the bottom byte of the short. The short occupies two bytes (2 indices) in the local variable table.

#### § 1.2.3 `iload`

Syntax: `iload <u2 index>` - Load an integer from the local variable table onto the stack. The index points to the bottom byte of the integer. The integer occupies four bytes (4 indices) in the local variable table.

#### § 1.2.4 `lload`

Syntax: `lload <u2 index>` - Load a long from the local variable table onto the stack. The index points to the bottom byte of the long. The long occupies eight bytes (8 indices) in the local variable table.

### § 1.3 Storing data in the local variable table

#### § 1.3.1 `bstore`

Syntax: `bstore <u2 index>` - Store a byte from the stack in the local variable table.

#### § 1.3.2 `sstore`

Syntax: `sstore <u2 index>` - Store a short from the stack in the local variable table. The index points to the bottom byte of the short. The short occupies two bytes (2 indices) in the local variable table.

#### § 1.3.3 `istore`

Syntax: `istore <u2 index>` - Store an integer from the stack in the local variable table. The index points to the bottom byte of the integer. The integer occupies four bytes (4 indices) in the local variable table.

#### § 1.3.4 `lstore`

Syntax: `lstore <u2 index>` - Store a long from the stack in the local variable table. The index points to the bottom byte of the long. The long occupies eight bytes (8 indices) in the local variable table.

## § 2 Arithmetic operations

### § 2.1 Addition

#### § 2.1.1 `badd`

Syntax: `badd` - Add two bytes from the stack and push the result onto the stack.

#### § 2.1.2 `sadd`

Syntax: `sadd` - Add two shorts from the stack and push the result onto the stack.

#### § 2.1.3 `iadd`

Syntax: `iadd` - Add two integers from the stack and push the result onto the stack.

#### § 2.1.4 `ladd`

Syntax: `ladd` - Add two longs from the stack and push the result onto the stack.

#### § 2.1.5 `fadd`

Syntax: `fadd` - Add two floats from the stack and push the result onto the stack.

#### § 2.1.6 `dadd`

Syntax: `dadd` - Add two doubles from the stack and push the result onto the stack.

### § 2.2 Subtraction

#### § 2.2.1 `bsub`

Syntax: `bsub` - Subtract two bytes from the stack and push the result onto the stack.

#### § 2.2.2 `ssub`

Syntax: `ssub` - Subtract two shorts from the stack and push the result onto the stack.

#### § 2.2.3 `isub`

Syntax: `isub` - Subtract two integers from the stack and push the result onto the stack.

#### § 2.2.4 `lsub`

Syntax: `lsub` - Subtract two longs from the stack and push the result onto the stack.

#### § 2.2.5 `fsub`

Syntax: `fsub` - Subtract two floats from the stack and push the result onto the stack.

#### § 2.2.6 `dsub`

Syntax: `dsub` - Subtract two doubles from the stack and push the result onto the stack.

#### §2.2.7 `ubsub`

Syntax: `ubsub` - Subtract two unsigned bytes from the stack and push the result onto the stack.

#### § 2.2.8 `ussub`

Syntax: `ussub` - Subtract two unsigned shorts from the stack and push the result onto the stack.

#### § 2.2.9 `uisub`

Syntax: `uisub` - Subtract two unsigned integers from the stack and push the result onto the stack.

#### § 2.2.10 `ulsub`

Syntax: `ulsub` - Subtract two unsigned longs from the stack and push the result onto the stack.

### § 2.3 Multiplication

#### § 2.3.1 `bmul`

Syntax: `bmul` - Multiply two bytes from the stack and push the result onto the stack.

#### § 2.3.2 `smul`

Syntax: `smul` - Multiply two shorts from the stack and push the result onto the stack.

#### § 2.3.3 `imul`

Syntax: `imul` - Multiply two integers from the stack and push the result onto the stack.

#### § 2.3.4 `lmul`

Syntax: `lmul` - Multiply two longs from the stack and push the result onto the stack.

#### § 2.3.5 `fmul`

Syntax: `fmul` - Multiply two floats from the stack and push the result onto the stack.

#### § 2.3.6 `dmul`

Syntax: `dmul` - Multiply two doubles from the stack and push the result onto the stack.

#### § 2.3.7 `ubmul`

Syntax: `ubmul` - Multiply two unsigned bytes from the stack and push the result onto the stack.

#### § 2.3.8 `usmul`

Syntax: `usmul` - Multiply two unsigned shorts from the stack and push the result onto the stack.

#### § 2.3.9 `uimul`

Syntax: `uimul` - Multiply two unsigned integers from the stack and push the result onto the stack.

#### § 2.3.10 `ulmul`

Syntax: `ulmul` - Multiply two unsigned longs from the stack and push the result onto the stack.

### § 2.4 Division

#### § 2.4.1 `bdiv`

Syntax: `bdiv` - Divide two bytes from the stack and push the result onto the stack.

#### § 2.4.2 `sdiv`

Syntax: `sdiv` - Divide two shorts from the stack and push the result onto the stack.

#### § 2.4.3 `idiv`

Syntax: `idiv` - Divide two integers from the stack and push the result onto the stack.

#### § 2.4.4 `ldiv`

Syntax: `ldiv` - Divide two longs from the stack and push the result onto the stack.

#### § 2.4.5 `fdiv`

Syntax: `fdiv` - Divide two floats from the stack and push the result onto the stack.

#### § 2.4.6 `ddiv`

Syntax: `ddiv` - Divide two doubles from the stack and push the result onto the stack.

#### § 2.4.7 `ubdiv`

Syntax: `ubdiv` - Divide two unsigned bytes from the stack and push the result onto the stack.

#### § 2.4.8 `usdiv`

Syntax: `usdiv` - Divide two unsigned shorts from the stack and push the result onto the stack.

#### § 2.4.9 `uidiv`

Syntax: `uidiv` - Divide two unsigned integers from the stack and push the result onto the stack.

#### § 2.4.10 `uldiv`

Syntax: `uldiv` - Divide two unsigned longs from the stack and push the result onto the stack.

### § 2.5 Modulo

#### § 2.5.1 `bmod`

Syntax: `bmod` - Modulo two bytes from the stack and push the result onto the stack.

#### § 2.5.2 `smod`

Syntax: `smod` - Modulo two shorts from the stack and push the result onto the stack.

#### § 2.5.3 `imod`

Syntax: `imod` - Modulo two integers from the stack and push the result onto the stack.

#### § 2.5.4 `lmod`

Syntax: `lmod` - Modulo two longs from the stack and push the result onto the stack.

#### § 2.5.5 `fmod`

Syntax: `fmod` - Modulo two floats from the stack and push the result onto the stack.

#### § 2.5.6 `dmod`

Syntax: `dmod` - Modulo two doubles from the stack and push the result onto the stack.

#### § 2.5.7 `ubmod`

Syntax: `ubmod` - Modulo two unsigned bytes from the stack and push the result onto the stack.

#### § 2.5.8 `usmod`

Syntax: `usmod` - Modulo two unsigned shorts from the stack and push the result onto the stack.

#### § 2.5.9 `uimod`

Syntax: `uimod` - Modulo two unsigned integers from the stack and push the result onto the stack.

#### § 2.5.10 `ulmod`

Syntax: `ulmod` - Modulo two unsigned longs from the stack and push the result onto the stack.

### § 2.6 Negation

#### § 2.6.1 `bneg`

Syntax: `bneg` - Negate a byte from the stack and push the result onto the stack.

#### § 2.6.2 `sneg`

Syntax: `sneg` - Negate a short from the stack and push the result onto the stack.

#### § 2.6.3 `ineg`

Syntax: `ineg` - Negate an integer from the stack and push the result onto the stack.

#### § 2.6.4 `lneg`

Syntax: `lneg` - Negate a long from the stack and push the result onto the stack.

## § 3 Bitwise Expressions

### § 3.1 Bitwise and

#### § 3.1.1 `band`

Syntax: `band` - Bitwise and two bytes from the stack and push the result onto the stack.

#### § 3.1.2 `sand`

Syntax: `sand` - Bitwise and two shorts from the stack and push the result onto the stack.

#### § 3.1.3 `iand`

Syntax: `iand` - Bitwise and two integers from the stack and push the result onto the stack.

#### § 3.1.4 `land`

Syntax: `land` - Bitwise and two longs from the stack and push the result onto the stack.

### § 3.2 Bitwise or

#### § 3.2.1 `bor`

Syntax: `bor` - Bitwise or two bytes from the stack and push the result onto the stack.

#### § 3.2.2 `sor`

Syntax: `sor` - Bitwise or two shorts from the stack and push the result onto the stack.

#### § 3.2.3 `ior`

Syntax: `ior` - Bitwise or two integers from the stack and push the result onto the stack.

#### § 3.2.4 `lor`

Syntax: `lor` - Bitwise or two longs from the stack and push the result onto the stack.

### § 3.3 Bitwise xor

#### § 3.3.1 `bxor`

Syntax: `bxor` - Bitwise xor two bytes from the stack and push the result onto the stack.

#### § 3.3.2 `sxor`

Syntax: `sxor` - Bitwise xor two shorts from the stack and push the result onto the stack.

#### § 3.3.3 `ixor`

Syntax: `ixor` - Bitwise xor two integers from the stack and push the result onto the stack.

#### § 3.3.4 `lxor`

Syntax: `lxor` - Bitwise xor two longs from the stack and push the result onto the stack.

### § 3.4 Bitwise not

#### § 3.4.1 `bnot`

Syntax: `bnot` - Bitwise not a byte from the stack and push the result onto the stack.

#### § 3.4.2 `snot`

Syntax: `snot` - Bitwise not a short from the stack and push the result onto the stack.

#### § 3.4.3 `inot`

Syntax: `inot` - Bitwise not an integer from the stack and push the result onto the stack.

#### § 3.4.4 `lnot`

Syntax: `lnot` - Bitwise not a long from the stack and push the result onto the stack.

#### § 3.5 Bitwise shift left

#### § 3.5.1 `bshl`

Syntax: `bshl` - Bitwise shift left a byte from the stack and push the result onto the stack.

#### § 3.5.2 `sshl`

Syntax: `sshl` - Bitwise shift left a short from the stack and push the result onto the stack.

#### § 3.5.3 `ishl`

Syntax: `ishl` - Bitwise shift left an integer from the stack and push the result onto the stack.

#### § 3.5.4 `lshl`

Syntax: `lshl` - Bitwise shift left a long from the stack and push the result onto the stack.

#### § 3.6 Bitwise shift right

#### § 3.6.1 `bshr`

Syntax: `bshr` - Bitwise shift right a byte from the stack and push the result onto the stack.

#### § 3.6.2 `sshr`

Syntax: `sshr` - Bitwise shift right a short from the stack and push the result onto the stack.

#### § 3.6.3 `ishr`

Syntax: `ishr` - Bitwise shift right an integer from the stack and push the result onto the stack.

#### § 3.6.4 `lshr`

Syntax: `lshr` - Bitwise shift right a long from the stack and push the result onto the stack.

#### § 3.7 Bitwise shift right unsigned

#### § 3.7.1 `bshru`

Syntax: `bshru` - Bitwise shift right unsigned a byte from the stack and push the result onto the stack.

#### § 3.7.2 `sshr`

Syntax: `sshr` - Bitwise shift right unsigned a short from the stack and push the result onto the stack.

#### § 3.7.3 `ishru`

Syntax: `ishru` - Bitwise shift right unsigned an integer from the stack and push the result onto the stack.

#### § 3.7.4 `lshru`

Syntax: `lshru` - Bitwise shift right unsigned a long from the stack and push the result onto the stack.

## § 4 CMP Expressions

### § 4.1 CMP

#### § 4.1.1 `bcmp`

Syntax: `bcmp` - Compare two bytes from the stack and push the result onto the stack.

#### § 4.1.2 `scmp`

Syntax: `scmp` - Compare two shorts from the stack and push the result onto the stack.

#### § 4.1.3 `icmp`

Syntax: `icmp` - Compare two integers from the stack and push the result onto the stack.

#### § 4.1.4 `lcmp`

Syntax: `lcmp` - Compare two longs from the stack and push the result onto the stack.

#### § 4.1.5 `fcmp`

Syntax: `fcmp` - Compare two floats from the stack and push the result onto the stack.

#### § 4.1.6 `dcmp`

Syntax: `dcmp` - Compare two doubles from the stack and push the result onto the stack.

```

```
