---
position: 2
title: Bytecode Instructions
tags: [specification, spec, interpreter, bytecode, instructions]
---

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
bytes, so we can only store a byte one position. If we wan't to store a 16-bit-value, we have to store it in two indices. So a `short` occupies two bytes, an `int` four and so on.

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

A `lpush` instruction pushes a long (or any 64-bit-value) onto the stack. It can also be used for a double or ulong.
Syntax: `lpush <u8 value>`, so we have the byte signing a lpush instruction and then directly after that the long we want to push onto the stack. Overall instruction length: `9 bytes`.

### § 1.2 Loading data from the local variable table

#### § 1.2.1 `bload`

A `bload` instruction loads a byte from the local variable table onto the stack. The index stores the index of the byte in
the local variable table.
Syntax: `bload <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.2.2 `sload`

A `sload` instruction loads a short from the local variable table onto the stack. The index stores the index of the bottom
byte of the short in the local variable table. The short will be loaded onto the stack. Overall instruction length: `3 bytes`.
Syntax: `sload <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.2.3 `iload`

A `iload` instruction loads an integer from the local variable table onto the stack. The index stores the index of the bottom
byte of the integer in the local variable table. The integer will be loaded onto the stack.
Syntax: `iload <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.2.4 `lload`

A `lload` instruction loads a long from the local variable table onto the stack. The index stores the index of the bottom
byte of the long in the local variable table. The long will be loaded onto the stack.
Syntax: `lload <u2 index>`
Overall instruction length: `3 bytes`.

### § 1.3 Storing data in the local variable table

#### § 1.3.1 `bstore`

Store a byte from the stack in the local variable table. The index points to the byte in the local variable table.
Syntax: `bstore <u2 index>` -
Overall instruction length: `3 bytes`.

#### § 1.3.2 `sstore`

Store a short from the stack in the local variable table. The index points to the bottom byte of the short. The short
occupies two bytes (2 indices) in the local variable table.
Syntax: `sstore <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.3.3 `istore`

Store an integer from the stack in the local variable table. The index points to the bottom byte of the integer. The integer
occupies four bytes (4 indices) in the local variable table.
Syntax: `istore <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.3.4 `lstore`

Syntax: `lstore <u2 index>` - Store a long from the stack in the local variable table. The index points to the bottom byte of the long. The long occupies eight bytes (8 indices) in the local variable table.

## § 2 Arithmetic operations

### § 2.1 Addition

#### § 2.1.1 `badd`

Add the two bytes from the stack and push the result (byte) onto the stack.
Syntax: `badd`
Overall instruction length: `1 byte`.

#### § 2.1.2 `sadd`

Add the two shorts from the stack and push the result (short) onto the stack.
Syntax: `sadd`
Overall instruction length: `1 byte`.

#### § 2.1.3 `iadd`

Add two integers from the stack and push the result (integer) onto the stack.
Syntax: `iadd`
Overall instruction length: `1 byte`.

#### § 2.1.4 `ladd`

Add two longs from the stack and push the result (long) onto the stack.
Syntax: `ladd`
Overall instruction length: `1 byte`.

#### § 2.1.5 `fadd`

Add two floats from the stack and push the result (float) onto the stack.
Syntax: `fadd`
Overall instruction length: `1 byte`.

#### § 2.1.6 `dadd`

Add two doubles from the stack and push the result (double) onto the stack.
Syntax: `dadd`
Overall instruction length: `1 byte`.

### § 2.2 Subtraction

#### § 2.2.1 `bsub`

Subtract two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bsub`
Overall instruction length: `1 byte`.

#### § 2.2.2 `ssub`

Subtract two shorts from the stack and push the result (short) onto the stack.
Syntax: `ssub`
Overall instruction length: `1 byte`.

#### § 2.2.3 `isub`

Subtract two integers from the stack and push the result (integer) onto the stack.
Syntax: `isub`
Overall instruction length: `1 byte`.

#### § 2.2.4 `lsub`

Subtract two longs from the stack and push the result (long) onto the stack.
Syntax: `lsub`
Overall instruction length: `1 byte`.

#### § 2.2.5 `fsub`

Subtract two floats from the stack and push the result (float) onto the stack.
Syntax: `fsub`
Overall instruction length: `1 byte`.

#### § 2.2.6 `dsub`

Subtract two doubles from the stack and push the result (double) onto the stack.
Syntax: `dsub`
Overall instruction length: `1 byte`.

#### §2.2.7 `ubsub`

Subtract two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubsub`
Overall instruction length: `1 byte`.

#### § 2.2.8 `ussub`

Subtract two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `ussub`
Overall instruction length: `1 byte`.

#### § 2.2.9 `uisub`

Subtract two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uisub`
Overall instruction length: `1 byte`.

#### § 2.2.10 `ulsub`

Subtract two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `ulsub`
Overall instruction length: `1 byte`.

### § 2.3 Multiplication

#### § 2.3.1 `bmul`

Multiply two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bmul`
Overall instruction length: `1 byte`.

#### § 2.3.2 `smul`

Multiply two shorts from the stack and push the result (short) onto the stack.
Syntax: `smul`
Overall instruction length: `1 byte`.

#### § 2.3.3 `imul`

Multiply two integers from the stack and push the result (integer) onto the stack.
Syntax: `imul`
Overall instruction length: `1 byte`.

#### § 2.3.4 `lmul`

Multiply two longs from the stack and push the result (long) onto the stack.
Syntax: `lmul`
Overall instruction length: `1 byte`.

#### § 2.3.5 `fmul`

Multiply two floats from the stack and push the result (float) onto the stack.
Syntax: `fmul`
Overall instruction length: `1 byte`.

#### § 2.3.6 `dmul`

Multiply two doubles from the stack and push the result (double) onto the stack.
Syntax: `dmul`
Overall instruction length: `1 byte`.

#### § 2.3.7 `ubmul`

Multiply two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubmul`
Overall instruction length: `1 byte`.

#### § 2.3.8 `usmul`

Multiply two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `usmul`
Overall instruction length: `1 byte`.

#### § 2.3.9 `uimul`

Multiply two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uimul`
Overall instruction length: `1 byte`.

#### § 2.3.10 `ulmul`

Multiply two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `ulmul`
Overall instruction length: `1 byte`.

### § 2.4 Division

#### § 2.4.1 `bdiv`

Divide two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bdiv`
Overall instruction length: `1 byte`.

#### § 2.4.2 `sdiv`

Divide two shorts from the stack and push the result (short) onto the stack.
Syntax: `sdiv`
Overall instruction length: `1 byte`.

#### § 2.4.3 `idiv`

Divide two integers from the stack and push the result (integer) onto the stack.
Syntax: `idiv`
Overall instruction length: `1 byte`.

#### § 2.4.4 `ldiv`

Divide two longs from the stack and push the result (long) onto the stack.
Syntax: `ldiv`
Overall instruction length: `1 byte`.

#### § 2.4.5 `fdiv`

Divide two floats from the stack and push the result (float) onto the stack.
Syntax: `fdiv`
Overall instruction length: `1 byte`.

#### § 2.4.6 `ddiv`

Divide two doubles from the stack and push the result (double) onto the stack.
Syntax: `ddiv`
Overall instruction length: `1 byte`.

#### § 2.4.7 `ubdiv`

Divide two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubdiv`
Overall instruction length: `1 byte`.

#### § 2.4.8 `usdiv`

Divide two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `usdiv`
Overall instruction length: `1 byte`.

#### § 2.4.9 `uidiv`

Divide two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uidiv`
Overall instruction length: `1 byte`.

#### § 2.4.10 `uldiv`

Divide two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `uldiv`
Overall instruction length: `1 byte`.

### § 2.5 Modulo

#### § 2.5.1 `bmod`

Modulo two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bmod`
Overall instruction length: `1 byte`.

#### § 2.5.2 `smod`

Modulo two shorts from the stack and push the result (short) onto the stack.
Syntax: `smod`
Overall instruction length: `1 byte`.

#### § 2.5.3 `imod`

Modulo two integers from the stack and push the result (integer) onto the stack.
Syntax: `imod`
Overall instruction length: `1 byte`.

#### § 2.5.4 `lmod`

Modulo two longs from the stack and push the result (long) onto the stack.
Syntax: `lmod`
Overall instruction length: `1 byte`.

#### § 2.5.5 `fmod`

Modulo two floats from the stack and push the result (float) onto the stack.
Syntax: `fmod`
Overall instruction length: `1 byte`.

#### § 2.5.6 `dmod`

Modulo two doubles from the stack and push the result (double) onto the stack.
Syntax: `dmod`
Overall instruction length: `1 byte`.

#### § 2.5.7 `ubmod`

Modulo two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubmod`
Overall instruction length: `1 byte`.

#### § 2.5.8 `usmod`

Modulo two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `usmod`
Overall instruction length: `1 byte`.

#### § 2.5.9 `uimod`

Modulo two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uimod`
Overall instruction length: `1 byte`.

#### § 2.5.10 `ulmod`

Modulo two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `ulmod`
Overall instruction length: `1 byte`.

### § 2.6 Negation

#### § 2.6.1 `bneg`

Negate a byte from the stack and push the result (byte) onto the stack.
Syntax: `bneg`
Overall instruction length: `1 byte`.

#### § 2.6.2 `sneg`

Syntax: `sneg` - Negate a short from the stack and push the result (short) onto the stack.
Syntax: `sneg`
Overall instruction length: `1 byte`.

#### § 2.6.3 `ineg`

Negate an integer from the stack and push the result (integer) onto the stack.
Syntax: `ineg`
Overall instruction length: `1 byte`.

#### § 2.6.4 `lneg`

Negate a long from the stack and push the result (long) onto the stack.
Syntax: `lneg`
Overall instruction length: `1 byte`.

#### § 2.6.5 `fneg`

Negate a float from the stack and push the result (float) onto the stack.
Syntax: `fneg`
Overall instruction length: `1 byte`.

#### § 2.6.6 `dneg`

Negate a double from the stack and push the result (double) onto the stack.
Syntax: `dneg`
Overall instruction length: `1 byte`.

### § 2.7 Increment

#### § 2.7.1 `binc`

Increment a byte from the stack and push the result (byte) onto the stack.
Syntax: `binc`
Overall instruction length: `1 byte`.

#### § 2.7.2 `sinc`

Increment a short from the stack and push the result (short) onto the stack.
Syntax: `sinc`
Overall instruction length: `1 byte`.

#### § 2.7.3 `iinc`

Increment an integer from the stack and push the result (integer) onto the stack.
Syntax: `iinc`
Overall instruction length: `1 byte`.

#### § 2.7.4 `linc`

Increment a long from the stack and push the result (long) onto the stack.
Syntax: `linc`
Overall instruction length: `1 byte`.

#### § 2.7.5 `finc`

Increment a float from the stack and push the result (float) onto the stack.
Syntax: `finc`
Overall instruction length: `1 byte`.

#### § 2.7.6 `dinc`

Increment a double from the stack and push the result (double) onto the stack.
Syntax: `dinc`
Overall instruction length: `1 byte`.

### § 2.8 Decrement

#### § 2.8.1 `bdec`

Decrement a byte from the stack and push the result (byte) onto the stack.
Syntax: `bdec`
Overall instruction length: `1 byte`.

#### § 2.8.2 `sdec`

Decrement a short from the stack and push the result (short) onto the stack.
Syntax: `sdec`
Overall instruction length: `1 byte`.

#### § 2.8.3 `idec`

Decrement an integer from the stack and push the result (integer) onto the stack.
Syntax: `idec`
Overall instruction length: `1 byte`.

#### § 2.8.4 `ldec`

Decrement a long from the stack and push the result (long) onto the stack.
Syntax: `ldec`
Overall instruction length: `1 byte`.

#### § 2.8.5 `fdec`

Decrement a float from the stack and push the result (float) onto the stack.
Syntax: `fdec`
Overall instruction length: `1 byte`.

#### § 2.8.6 `ddec`

Decrement a double from the stack and push the result (double) onto the stack.
Syntax: `ddec`
Overall instruction length: `1 byte`.

## § 3 Bitwise Expressions

### § 3.1 Bitwise and

#### § 3.1.1 `band`

Bitwise and two bytes from the stack and push the result (byte) onto the stack.
Can also be used for boolean and ubyte.
Syntax: `band`
Overall instruction length: `1 byte`.

#### § 3.1.2 `sand`

Bitwise and two shorts from the stack and push the result (short) onto the stack.
Can also be used for char and ushort.
Syntax: `sand`
Overall instruction length: `1 byte`.

#### § 3.1.3 `iand`

Bitwise and two integers from the stack and push the result (integer) onto the stack.
Can also be used for float and uint.
Syntax: `iand`
Overall instruction length: `1 byte`.

#### § 3.1.4 `land`

Bitwise and two longs from the stack and push the result (long) onto the stack.
Can also be used for double and ulong.
Syntax: `land`
Overall instruction length: `1 byte`.

### § 3.2 Bitwise or

#### § 3.2.1 `bor`

Bitwise or two bytes from the stack and push the result (byte) onto the stack.
Can also be used for boolean and ubyte.
Syntax: `bor`
Overall instruction length: `1 byte`.

#### § 3.2.2 `sor`

Bitwise or two shorts from the stack and push the result (short) onto the stack.
Can also be used for char and ushort.
Syntax: `sor`
Overall instruction length: `1 byte`.

#### § 3.2.3 `ior`

Bitwise or two integers from the stack and push the result (integer) onto the stack.
Can also be used for float and uint.
Syntax: `ior`
Overall instruction length: `1 byte`.

#### § 3.2.4 `lor`

Bitwise or two longs from the stack and push the result (long) onto the stack.
Can also be used for double and ulong.
Syntax: `lor`
Overall instruction length: `1 byte`.

### § 3.3 Bitwise xor

#### § 3.3.1 `bxor`

Bitwise xor two bytes from the stack and push the result (byte) onto the stack.
Can also be used for boolean and ubyte.
Syntax: `bxor`
Overall instruction length: `1 byte`.

#### § 3.3.2 `sxor`

Bitwise xor two shorts from the stack and push the result (short) onto the stack.
Can also be used for char and ushort.
Syntax: `sxor`
Overall instruction length: `1 byte`.

#### § 3.3.3 `ixor`

Bitwise xor two integers from the stack and push the result (integer) onto the stack.
Can also be used for float and uint.
Syntax: `ixor`
Overall instruction length: `1 byte`.

#### § 3.3.4 `lxor`

Bitwise xor two longs from the stack and push the result (long) onto the stack.
Can also be used for double and ulong.
Syntax: `lxor`
Overall instruction length: `1 byte`.

### § 3.4 Bitwise not

#### § 3.4.1 `bnot`

Invert the byte on top of the stack and push the result (byte) onto the stack.
Syntax: `bnot`
Overall instruction length: `1 byte`.

#### § 3.4.2 `snot`

Invert the short on top of the stack and push the result (short) onto the stack.
Syntax: `snot`
Overall instruction length: `1 byte`.

#### § 3.4.3 `inot`

Invert the integer on top of the stack and push the result (integer) onto the stack.
Syntax: `inot`
Overall instruction length: `1 byte`.

#### § 3.4.4 `lnot`

Invert the long on top of the stack and push the result (long) onto the stack.
Syntax: `lnot`
Overall instruction length: `1 byte`.

#### § 3.5 Bitwise shift left

#### § 3.5.1 `bshl`

Bitwise shift left a byte from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the byte below defines the byte to shift.
Can also be used for boolean and ubyte.
Syntax: `bshl`
Overall instruction length: `1 byte`.

#### § 3.5.2 `sshl`

Bitwise shift left a short from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the short below defines the short to shift.
Can also be used for char and ushort.
Syntax: `sshl`
Overall instruction length: `1 byte`.

#### § 3.5.3 `ishl`

Bitwise shift left an integer from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the integer below defines the integer to shift.
Can also be used for float and uint.
Syntax: `ishl`
Overall instruction length: `1 byte`.

#### § 3.5.4 `lshl`

Bitwise shift left a long from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the long below defines the long to shift.
Can also be used for double and ulong.
Syntax: `lshl`
Overall instruction length: `1 byte`.

#### § 3.6 Bitwise shift right

#### § 3.6.1 `bshr`

Bitwise shift right a byte from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the byte below defines the byte to shift.
Can also be used for boolean and ubyte.
Syntax: `bshr`
Overall instruction length: `1 byte`.

#### § 3.6.2 `sshr`

Bitwise shift right a short from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the short below defines the short to shift.
Can also be used for char and ushort.
Syntax: `sshr`
Overall instruction length: `1 byte`.

#### § 3.6.3 `ishr`

Bitwise shift right an integer from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the integer below defines the integer to shift.
Can also be used for float and uint.
Syntax: `ishr`
Overall instruction length: `1 byte`.

#### § 3.6.4 `lshr`

Bitwise shift right a long from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the long below defines the long to shift.
Can also be used for double and ulong.
Syntax: `lshr`
Overall instruction length: `1 byte`.

#### § 3.7 Bitwise shift right unsigned

#### § 3.7.1 `bshru`

Bitwise shift right unsigned a byte from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the byte below defines the byte to shift.
Can also be used for boolean and ubyte.
Syntax: `bshru`
Overall instruction length: `1 byte`.

#### § 3.7.2 `sshr`

Bitwise shift right unsigned a short from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the short below defines the short to shift.
Can also be used for char and ushort.
Syntax: `sshr`
Overall instruction length: `1 byte`.

#### § 3.7.3 `ishru`

Bitwise shift right unsigned an integer from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the integer below defines the integer to shift.
Can also be used for float and uint.
Syntax: `ishru`
Overall instruction length: `1 byte`.

#### § 3.7.4 `lshru`

Bitwise shift right unsigned a long from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the long below defines the long to shift.
Can also be used for double and ulong.
Syntax: `lshru`
Overall instruction length: `1 byte`.

## § 4 CMP Expressions

### § 4.1 CMP

#### § 4.1.1 `bcmp`

Compare two bytes from the stack and push the result onto the stack.
If the top byte is greater than the second, the result will be -1, if they are equal, the result will be 0 and if the
top byte is smaller than the second, the result will be -1. The result will be a byte.

```txt
0 0 0 0 0 0 0 0 // 0, the top byte is greater than the second
0 0 0 0 0 0 0 1 // 1, the top byte is equal to the second
0 0 0 0 0 0 1 0 // 2, the top byte is smaller than the second
```

Syntax: `bcmp`
Overall instruction length: `1 byte`.

#### § 4.1.2 `scmp`

Compare two shorts from the stack and push the result onto the stack.
If the top short is greater than the second, the result will be -1, if they are equal, the result will be 0 and if the
top short is smaller than the second, the result will be -1. The result will be a byte.

```txt
0 0 0 0 0 0 0 0 // 0, the top short is greater than the second
0 0 0 0 0 0 0 1 // 1, the top short is equal to the second
0 0 0 0 0 0 1 0 // 2, the top short is smaller than the second
```

Syntax: `scmp`
Overall instruction length: `1 byte`.

#### § 4.1.3 `icmp`

Compare two integers from the stack and push the result onto the stack.
If the top integer is greater than the second, the result will be -1, if they are equal, the result will be 0 and if the
top integer is smaller than the second, the result will be -1. The result will be a byte.

```txt
0 0 0 0 0 0 0 0 // 0, the top integer is greater than the second
0 0 0 0 0 0 0 1 // 1, the top integer is equal to the second
0 0 0 0 0 0 1 0 // 2, the top integer is smaller than the second
```

Syntax: `icmp`
Overall instruction length: `1 byte`.

#### § 4.1.4 `lcmp`

Compare two longs from the stack and push the result onto the stack.
If the top long is greater than the second, the result will be -1, if they are equal, the result will be 0 and if the
top long is smaller than the second, the result will be -1. The result will be a byte.

```txt
0 0 0 0 0 0 0 0 // 0, the top long is greater than the second
0 0 0 0 0 0 0 1 // 1, the top long is equal to the second
0 0 0 0 0 0 1 0 // 2, the top long is smaller than the second
```

Syntax: `lcmp`
Overall instruction length: `1 byte`.

#### § 4.1.5 `fcmp`

Compare two floats from the stack and push the result onto the stack.
If the top float is greater than the second, the result will be -1, if they are equal, the result will be 0 and if the
top float is smaller than the second, the result will be -1. The result will be a byte.

```txt
0 0 0 0 0 0 0 0 // 0, the top float is greater than the second
0 0 0 0 0 0 0 1 // 1, the top float is equal to the second
0 0 0 0 0 0 1 0 // 2, the top float is smaller than the second
```

Syntax: `fcmp`
Overall instruction length: `1 byte`.

#### § 4.1.6 `dcmp`

Compare two doubles from the stack and push the result onto the stack.

If the top double is greater than the second, the result will be -1, if they are equal, the result will be 0 and if the
top double is smaller than the second, the result will be -1. The result will be a byte.

```txt
0 0 0 0 0 0 0 0 // 0, the top double is greater than the second
0 0 0 0 0 0 0 1 // 1, the top double is equal to the second
0 0 0 0 0 0 1 0 // 2, the top double is smaller than the second
```

Syntax: `dcmp`
Overall instruction length: `1 byte`.

## § 5 Control flow

### § 5.1 Jumping

#### § 5.1.1 `jmp`

Jump to the instruction at the given address.

Syntax: `jmp <u4 address>`
Overall instruction length: `5 bytes`.

#### § 5.1.2 `jz`

Jump to the instruction at the given address if the the comparison result is 1 (00000001) (the two values are equal).

Syntax: `jz <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.3 `jnz`

Jump to the instruction at the given address if the the comparison result is not 1 (00000001) (the two values are not equal).

Syntax: `jnz <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.4 `je`

Jump to the instruction at the given address if the the comparison result is 1 (00000001) (the two compared values are equal).

Syntax: `je <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.5 `jne`

Jump to the instruction at the given address if the the comparison result is not 1 (00000001) (the two values are not equal).

Syntax: `jne <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.6 `jg`

Jump to the instruction at the given address if the the comparison result is 0 (00000000) (the first value is greater than the second).

This has no actual byte code, it is here for completeness. Use [`jz`](#-512-jz) instead, as it does the same.

Syntax: `jg <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.7 `jge`

Jump to the instruction at the given address if the the comparison result is 0 (00000000) or 1 (00000001) (the first value is greater than or equal to the second).

Syntax: `jge <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.8 `jl`

Jump to the instruction at the given address if the the comparison result is 2 (00000010) (the first value is smaller than the second).

Syntax: `jl <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.9 `jle`

Jump to the instruction at the given address if the the comparison result is 2 (00000010) or 1 (00000001) (the first value is smaller than or equal to the second).

Syntax: `jle <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.10 `jz`

Jump to the instruction at the given address if the the comparison result is 1 (00000001) (the two values are equal).

Syntax: `jz <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.11 `jnz`

Jump to the instruction at the given address if the the comparison result is not 1 (00000001) (the two values are not equal).

Syntax: `jnz <u4 address>`

Overall instruction length: `5 bytes`.
