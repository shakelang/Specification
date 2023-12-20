---
position: 3
title: Bytecode Instructions
tags: [specification, spec, interpreter, bytecode, instructions]
---

## Bytecode Definition

A bytecode is a sequence of bytes. We always have one `opcode` that is followed by zero or more `operands`.
Lets take a look at an example. We have a simple bytecode. We push two bytes onto the stack and add them together.

The code would look like this:

```bash
# Stack []
bpush 1
# Stack [1]
bpush 2
# Stack [1, 2]
badd
# Stack [3]
```

The bytecode would look like this (byte values are written in hexadecimal):

```txt
01 01 01 02 10
```

Lets group the bytes a little bit to make it more readable:

```txt
01 01
01 02
10
```

We start the interpretation at the first byte. It is the opcode `bpush`. The interpreter knows that the opcode
`bpush` is always followed by a operand. So it reads the next byte and interprets it as the operand. The instruction
tells it to push this byte onto the stack. The pointer is now at the third byte. As we are finished with the first instruction by now, the next byte is interpreted as an opcode again.

_(The interpreter will do the same for the next instruction, it is `bpush` again, so it will do basically the same as
for the first instruction.)_

After the second `bpush` instruction, the pointer is at the fifth byte. The next byte is the opcode `badd`. The
interpreter knows that the opcode `badd` is not followed by any operand. The instruction tells it to add the two bytes
on top of the stack together and push the result onto the stack. The pointer is incremented again. This code is _bad_ as the pointer is now at the end of the bytecode, but we have no `RET` instruction. The interpreter will throw an error. But for this example that should be enough.

_**Keep in mind, that mistakes in the bytecode can lead to undefined behavior. If we have a byte missing, value bytes
can be interpreted as opcodes and vice versa. This is a serious problem and leads to many security issues, especially
when we can modify operand bytes during runtime. So be careful when you write your own bytecode (or use tools and not
write the bytes by hand).**_

In the following sections we will define the opcodes and operands they are followed by.

## Stack and variable manipulation

The stack hereby refers to a stack of 8-bit-values. We can only put an 8-bit-value (further referred to as a `byte`,
not to be with the data type `byte`) on top of the stack and we can remove the topmost bit from the stack. We will
refer to the topmost byte as the `top/head` of the stack. The stack is a LIFO (last in, first out) data structure.
The stack is our main tool to manipulate data. We can use an instruction to push a constant onto the stack, then we push another constant onto the stack. Now we can use an add instruction to add the two constants together. Our stack will no longer contain the two constants, but the result of the addition. This would look like this:

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

#### § 1.1.1 `bpush` _`(0x01)`_

A `bpush` instruction pushes a single byte (or any 8-bit-value) onto the stack. It can also be used for a boolean or ubyte.
Syntax: `bpush <u1 value>`, so we have the byte signing a bpush instruction and then directly after that the byte we want to
push onto the stack. Overall instruction length: `2 bytes`.

#### § 1.1.2 `spush` _`(0x02)`_

A `spush` instruction pushes a short (or any 16-bit-value) onto the stack. It can also be used for a ushort.
Syntax: `spush <u2 value>`, so we have the byte signing a spush instruction and then directly after that the short we want to
push onto the stack. Overall instruction length: `3 bytes`.

#### § 1.1.3 `ipush` _`(0x03)`_

An `ipush` instruction pushes an integer (or any 32-bit-value) onto the stack. It can also be used for a float or uint.
Syntax: `ipush <u4 value>`, so we have the byte signing a ipush instruction and then directly after that the integer we want to push onto the stack. Overall instruction length: `5 bytes`.

#### § 1.1.4 `lpush` _`(0x04)`_

A `lpush` instruction pushes a long (or any 64-bit-value) onto the stack. It can also be used for a double or ulong.
Syntax: `lpush <u8 value>`, so we have the byte signing a lpush instruction and then directly after that the long we want to push onto the stack. Overall instruction length: `9 bytes`.

### § 1.2 Loading data from the local variable table

#### § 1.2.1 `bload` _`(0x05)`_

A `bload` instruction loads a byte from the local variable table onto the stack. The index stores the index of the byte in
the local variable table.
Syntax: `bload <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.2.2 `sload` _`(0x06)`_

A `sload` instruction loads a short from the local variable table onto the stack. The index stores the index of the bottom
byte of the short in the local variable table. The short will be loaded onto the stack. Overall instruction length: `3 bytes`.
Syntax: `sload <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.2.3 `iload` _`(0x07)`_

A `iload` instruction loads an integer from the local variable table onto the stack. The index stores the index of the bottom
byte of the integer in the local variable table. The integer will be loaded onto the stack.
Syntax: `iload <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.2.4 `lload` _`(0x08)`_

A `lload` instruction loads a long from the local variable table onto the stack. The index stores the index of the bottom
byte of the long in the local variable table. The long will be loaded onto the stack.
Syntax: `lload <u2 index>`
Overall instruction length: `3 bytes`.

### § 1.3 Storing data in the local variable table

#### § 1.3.1 `bstore` _`(0x09)`_

Store a byte from the stack in the local variable table. The index points to the byte in the local variable table.
Syntax: `bstore <u2 index>` -
Overall instruction length: `3 bytes`.

#### § 1.3.2 `sstore` _`(0x0A)`_

Store a short from the stack in the local variable table. The index points to the bottom byte of the short. The short
occupies two bytes (2 indices) in the local variable table.
Syntax: `sstore <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.3.3 `istore` _`(0x0B)`_

Store an integer from the stack in the local variable table. The index points to the bottom byte of the integer. The integer
occupies four bytes (4 indices) in the local variable table.
Syntax: `istore <u2 index>`
Overall instruction length: `3 bytes`.

#### § 1.3.4 `lstore` _`(0x0C)`_

Syntax: `lstore <u2 index>` - Store a long from the stack in the local variable table. The index points to the bottom byte of the long. The long occupies eight bytes (8 indices) in the local variable table.

## § 2 Arithmetic operations

### § 2.1 Addition

#### § 2.1.1 `badd` _`(0x10)`_

Add the two bytes from the stack and push the result (byte) onto the stack.
Syntax: `badd`
Overall instruction length: `1 byte`.

#### § 2.1.2 `sadd` _`(0x11)`_

Add the two shorts from the stack and push the result (short) onto the stack.
Syntax: `sadd`
Overall instruction length: `1 byte`.

#### § 2.1.3 `iadd` _`(0x12)`_

Add two integers from the stack and push the result (integer) onto the stack.
Syntax: `iadd`
Overall instruction length: `1 byte`.

#### § 2.1.4 `ladd` _`(0x13)´_

Add two longs from the stack and push the result (long) onto the stack.
Syntax: `ladd`
Overall instruction length: `1 byte`.

#### § 2.1.5 `fadd` _`(0x14)`_

Add two floats from the stack and push the result (float) onto the stack.
Syntax: `fadd`
Overall instruction length: `1 byte`.

#### § 2.1.6 `dadd` _`(0x15)`_

Add two doubles from the stack and push the result (double) onto the stack.
Syntax: `dadd`
Overall instruction length: `1 byte`.

### § 2.2 Subtraction

#### § 2.2.1 `bsub` _`(0x16)`_

Subtract two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bsub`
Overall instruction length: `1 byte`.

#### § 2.2.2 `ssub` _(0x17)_

Subtract two shorts from the stack and push the result (short) onto the stack.
Syntax: `ssub`
Overall instruction length: `1 byte`.

#### § 2.2.3 `isub` _`(0x18)`_

Subtract two integers from the stack and push the result (integer) onto the stack.
Syntax: `isub`
Overall instruction length: `1 byte`.

#### § 2.2.4 `lsub` _`(0x19)`_

Subtract two longs from the stack and push the result (long) onto the stack.
Syntax: `lsub`
Overall instruction length: `1 byte`.

#### § 2.2.5 `fsub` _`(0x1A)`_

Subtract two floats from the stack and push the result (float) onto the stack.
Syntax: `fsub`
Overall instruction length: `1 byte`.

#### § 2.2.6 `dsub` _`(0x1B)`_

Subtract two doubles from the stack and push the result (double) onto the stack.
Syntax: `dsub`
Overall instruction length: `1 byte`.

#### §2.2.7 `ubsub` _`(0x1C)`_

Subtract two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubsub`
Overall instruction length: `1 byte`.

#### § 2.2.8 `ussub` _`(0x1D)`_

Subtract two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `ussub`
Overall instruction length: `1 byte`.

#### § 2.2.9 `uisub` _`(0x1E)`_

Subtract two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uisub`
Overall instruction length: `1 byte`.

#### § 2.2.10 `ulsub` _`(0x1F)`_

Subtract two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `ulsub`
Overall instruction length: `1 byte`.

### § 2.3 Multiplication

#### § 2.3.1 `bmul` _`(0x20)`_

Multiply two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bmul`
Overall instruction length: `1 byte`.

#### § 2.3.2 `smul` _`(0x21)`_

Multiply two shorts from the stack and push the result (short) onto the stack.
Syntax: `smul`
Overall instruction length: `1 byte`.

#### § 2.3.3 `imul` _`(0x22)`_

Multiply two integers from the stack and push the result (integer) onto the stack.
Syntax: `imul`
Overall instruction length: `1 byte`.

#### § 2.3.4 `lmul` _`(0x23)`_

Multiply two longs from the stack and push the result (long) onto the stack.
Syntax: `lmul`
Overall instruction length: `1 byte`.

#### § 2.3.5 `fmul` _`(0x24)`_

Multiply two floats from the stack and push the result (float) onto the stack.
Syntax: `fmul`
Overall instruction length: `1 byte`.

#### § 2.3.6 `dmul` _`(0x25)`_

Multiply two doubles from the stack and push the result (double) onto the stack.
Syntax: `dmul`
Overall instruction length: `1 byte`.

#### § 2.3.7 `ubmul` _`(0x26)`_

Multiply two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubmul`
Overall instruction length: `1 byte`.

#### § 2.3.8 `usmul` _`(0x27)`_

Multiply two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `usmul`
Overall instruction length: `1 byte`.

#### § 2.3.9 `uimul` _`(0x28)`_

Multiply two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uimul`
Overall instruction length: `1 byte`.

#### § 2.3.10 `ulmul` _`(0x29)`_

Multiply two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `ulmul`
Overall instruction length: `1 byte`.

### § 2.4 Division

#### § 2.4.1 `bdiv` _`(0x2A)`_

Divide two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bdiv`
Overall instruction length: `1 byte`.

#### § 2.4.2 `sdiv` _`(0x2B)`_

Divide two shorts from the stack and push the result (short) onto the stack.
Syntax: `sdiv`
Overall instruction length: `1 byte`.

#### § 2.4.3 `idiv` _`(0x2C)`_

Divide two integers from the stack and push the result (integer) onto the stack.
Syntax: `idiv`
Overall instruction length: `1 byte`.

#### § 2.4.4 `ldiv` _`(0x2D)`_

Divide two longs from the stack and push the result (long) onto the stack.
Syntax: `ldiv`
Overall instruction length: `1 byte`.

#### § 2.4.5 `fdiv` _`(0x2E)`_

Divide two floats from the stack and push the result (float) onto the stack.
Syntax: `fdiv`
Overall instruction length: `1 byte`.

#### § 2.4.6 `ddiv` _`(0x2F)`_

Divide two doubles from the stack and push the result (double) onto the stack.
Syntax: `ddiv`
Overall instruction length: `1 byte`.

#### § 2.4.7 `ubdiv` _`(0x30)`_

Divide two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubdiv`
Overall instruction length: `1 byte`.

#### § 2.4.8 `usdiv` _`(0x31)`_

Divide two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `usdiv`
Overall instruction length: `1 byte`.

#### § 2.4.9 `uidiv` _`(0x32)`_

Divide two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uidiv`
Overall instruction length: `1 byte`.

#### § 2.4.10 `uldiv` _`(0x33)`_

Divide two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `uldiv`
Overall instruction length: `1 byte`.

### § 2.5 Modulo

#### § 2.5.1 `bmod` _`(0x34)`_

Modulo two bytes from the stack and push the result (byte) onto the stack.
Syntax: `bmod`
Overall instruction length: `1 byte`.

#### § 2.5.2 `smod` _`(0x35)`_

Modulo two shorts from the stack and push the result (short) onto the stack.
Syntax: `smod`
Overall instruction length: `1 byte`.

#### § 2.5.3 `imod` _`(0x36)`_

Modulo two integers from the stack and push the result (integer) onto the stack.
Syntax: `imod`
Overall instruction length: `1 byte`.

#### § 2.5.4 `lmod` _`(0x37)`_

Modulo two longs from the stack and push the result (long) onto the stack.
Syntax: `lmod`
Overall instruction length: `1 byte`.

#### § 2.5.5 `fmod` _`(0x38)`_

Modulo two floats from the stack and push the result (float) onto the stack.
Syntax: `fmod`
Overall instruction length: `1 byte`.

#### § 2.5.6 `dmod` _`(0x39)`_

Modulo two doubles from the stack and push the result (double) onto the stack.
Syntax: `dmod`
Overall instruction length: `1 byte`.

#### § 2.5.7 `ubmod` _`(0x3A)`_

Modulo two unsigned bytes from the stack and push the result (unsigned byte) onto the stack.
Syntax: `ubmod`
Overall instruction length: `1 byte`.

#### § 2.5.8 `usmod` _`(0x3B)`_

Modulo two unsigned shorts from the stack and push the result (unsigned short) onto the stack.
Syntax: `usmod`
Overall instruction length: `1 byte`.

#### § 2.5.9 `uimod` _`(0x3C)`_

Modulo two unsigned integers from the stack and push the result (unsigned integer) onto the stack.
Syntax: `uimod`
Overall instruction length: `1 byte`.

#### § 2.5.10 `ulmod` _`(0x3D)`_

Modulo two unsigned longs from the stack and push the result (unsigned long) onto the stack.
Syntax: `ulmod`
Overall instruction length: `1 byte`.

### § 2.6 Negation

#### § 2.6.1 `bneg` _`(0x3E)`_

Negate a byte from the stack and push the result (byte) onto the stack.
Syntax: `bneg`
Overall instruction length: `1 byte`.

#### § 2.6.2 `sneg` _`(0x3F)`_

Syntax: `sneg` - Negate a short from the stack and push the result (short) onto the stack.
Syntax: `sneg`
Overall instruction length: `1 byte`.

#### § 2.6.3 `ineg` _`(0x40)`_

Negate an integer from the stack and push the result (integer) onto the stack.
Syntax: `ineg`
Overall instruction length: `1 byte`.

#### § 2.6.4 `lneg` _`(0x41)`_

Negate a long from the stack and push the result (long) onto the stack.
Syntax: `lneg`
Overall instruction length: `1 byte`.

#### § 2.6.5 `fneg` _`(0x42)`_

Negate a float from the stack and push the result (float) onto the stack.
Syntax: `fneg`
Overall instruction length: `1 byte`.

#### § 2.6.6 `dneg` _`(0x43)`_

Negate a double from the stack and push the result (double) onto the stack.
Syntax: `dneg`
Overall instruction length: `1 byte`.

### § 2.7 Increment

#### § 2.7.1 `binc` _`(0x44)`_

Increment a byte from the stack and push the result (byte) onto the stack.
Syntax: `binc`
Overall instruction length: `1 byte`.

#### § 2.7.2 `sinc` _`(0x45)`_

Increment a short from the stack and push the result (short) onto the stack.
Syntax: `sinc`
Overall instruction length: `1 byte`.

#### § 2.7.3 `iinc` _`(0x46)`_

Increment an integer from the stack and push the result (integer) onto the stack.
Syntax: `iinc`
Overall instruction length: `1 byte`.

#### § 2.7.4 `linc` _`(0x47)`_

Increment a long from the stack and push the result (long) onto the stack.
Syntax: `linc`
Overall instruction length: `1 byte`.

#### § 2.7.5 `finc` _`(0x48)`_

Increment a float from the stack and push the result (float) onto the stack.
Syntax: `finc`
Overall instruction length: `1 byte`.

#### § 2.7.6 `dinc` _`(0x49)`_

Increment a double from the stack and push the result (double) onto the stack.
Syntax: `dinc`
Overall instruction length: `1 byte`.

### § 2.8 Decrement

#### § 2.8.1 `bdec` _`(0x4A)`_

Decrement a byte from the stack and push the result (byte) onto the stack.
Syntax: `bdec`
Overall instruction length: `1 byte`.

#### § 2.8.2 `sdec` _`(0x4B)`_

Decrement a short from the stack and push the result (short) onto the stack.
Syntax: `sdec`
Overall instruction length: `1 byte`.

#### § 2.8.3 `idec` _`(0x4C)`_

Decrement an integer from the stack and push the result (integer) onto the stack.
Syntax: `idec`
Overall instruction length: `1 byte`.

#### § 2.8.4 `ldec` _`(0x4D)`_

Decrement a long from the stack and push the result (long) onto the stack.
Syntax: `ldec`
Overall instruction length: `1 byte`.

#### § 2.8.5 `fdec` _`(0x4E)`_

Decrement a float from the stack and push the result (float) onto the stack.
Syntax: `fdec`
Overall instruction length: `1 byte`.

#### § 2.8.6 `ddec` _`(0x4F)`_

Decrement a double from the stack and push the result (double) onto the stack.
Syntax: `ddec`
Overall instruction length: `1 byte`.

## § 3 Bitwise Expressions

### § 3.1 Bitwise and

#### § 3.1.1 `band` _`(0x50)`_

Bitwise and two bytes from the stack and push the result (byte) onto the stack.
Can also be used for boolean and ubyte.
Syntax: `band`
Overall instruction length: `1 byte`.

#### § 3.1.2 `sand` _`(0x51)`_

Bitwise and two shorts from the stack and push the result (short) onto the stack.
Can also be used for char and ushort.
Syntax: `sand`
Overall instruction length: `1 byte`.

#### § 3.1.3 `iand` _`(0x52)`_

Bitwise and two integers from the stack and push the result (integer) onto the stack.
Can also be used for float and uint.
Syntax: `iand`
Overall instruction length: `1 byte`.

#### § 3.1.4 `land` _`(0x53)`_

Bitwise and two longs from the stack and push the result (long) onto the stack.
Can also be used for double and ulong.
Syntax: `land`
Overall instruction length: `1 byte`.

### § 3.2 Bitwise or

#### § 3.2.1 `bor` _`(0x54)`_

Bitwise or two bytes from the stack and push the result (byte) onto the stack.
Can also be used for boolean and ubyte.
Syntax: `bor`
Overall instruction length: `1 byte`.

#### § 3.2.2 `sor` _`(0x55)`_

Bitwise or two shorts from the stack and push the result (short) onto the stack.
Can also be used for char and ushort.
Syntax: `sor`
Overall instruction length: `1 byte`.

#### § 3.2.3 `ior` _`(0x56)`_

Bitwise or two integers from the stack and push the result (integer) onto the stack.
Can also be used for float and uint.
Syntax: `ior`
Overall instruction length: `1 byte`.

#### § 3.2.4 `lor` _`(0x57)`_

Bitwise or two longs from the stack and push the result (long) onto the stack.
Can also be used for double and ulong.
Syntax: `lor`
Overall instruction length: `1 byte`.

### § 3.3 Bitwise xor

#### § 3.3.1 `bxor` _`(0x58)`_

Bitwise xor two bytes from the stack and push the result (byte) onto the stack.
Can also be used for boolean and ubyte.
Syntax: `bxor`
Overall instruction length: `1 byte`.

#### § 3.3.2 `sxor` _`(0x59)`_

Bitwise xor two shorts from the stack and push the result (short) onto the stack.
Can also be used for char and ushort.
Syntax: `sxor`
Overall instruction length: `1 byte`.

#### § 3.3.3 `ixor` _`(0x5A)`_

Bitwise xor two integers from the stack and push the result (integer) onto the stack.
Can also be used for float and uint.
Syntax: `ixor`
Overall instruction length: `1 byte`.

#### § 3.3.4 `lxor` _`(0x5B)`_

Bitwise xor two longs from the stack and push the result (long) onto the stack.
Can also be used for double and ulong.
Syntax: `lxor`
Overall instruction length: `1 byte`.

### § 3.4 Bitwise not

#### § 3.4.1 `bnot` _`(0x5C)`_

Invert the byte on top of the stack and push the result (byte) onto the stack.
Syntax: `bnot`
Overall instruction length: `1 byte`.

#### § 3.4.2 `snot` _`(0x5D)`_

Invert the short on top of the stack and push the result (short) onto the stack.
Syntax: `snot`
Overall instruction length: `1 byte`.

#### § 3.4.3 `inot` _`(0x5E)`_

Invert the integer on top of the stack and push the result (integer) onto the stack.
Syntax: `inot`
Overall instruction length: `1 byte`.

#### § 3.4.4 `lnot` _`(0x5F)`_

Invert the long on top of the stack and push the result (long) onto the stack.
Syntax: `lnot`
Overall instruction length: `1 byte`.

#### § 3.5 Bitwise shift left

#### § 3.5.1 `bshl` _`(0x60)`_

Bitwise shift left a byte from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the byte below defines the byte to shift.
Can also be used for boolean and ubyte.
Syntax: `bshl`
Overall instruction length: `1 byte`.

#### § 3.5.2 `sshl` _`(0x61)`_

Bitwise shift left a short from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the short below defines the short to shift.
Can also be used for char and ushort.
Syntax: `sshl`
Overall instruction length: `1 byte`.

#### § 3.5.3 `ishl` _`(0x62)`_

Bitwise shift left an integer from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the integer below defines the integer to shift.
Can also be used for float and uint.
Syntax: `ishl`
Overall instruction length: `1 byte`.

#### § 3.5.4 `lshl` _`(0x63)`_

Bitwise shift left a long from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the long below defines the long to shift.
Can also be used for double and ulong.
Syntax: `lshl`
Overall instruction length: `1 byte`.

#### § 3.6 Bitwise shift right

#### § 3.6.1 `bshr` _`(0x64)`_

Bitwise shift right a byte from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the byte below defines the byte to shift.
Can also be used for boolean and ubyte.
Syntax: `bshr`
Overall instruction length: `1 byte`.

#### § 3.6.2 `sshr` _`(0x65)`_

Bitwise shift right a short from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the short below defines the short to shift.
Can also be used for char and ushort.
Syntax: `sshr`
Overall instruction length: `1 byte`.

#### § 3.6.3 `ishr` _`(0x66)`_

Bitwise shift right an integer from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the integer below defines the integer to shift.
Can also be used for float and uint.
Syntax: `ishr`
Overall instruction length: `1 byte`.

#### § 3.6.4 `lshr` _`(0x67)`_

Bitwise shift right a long from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the long below defines the long to shift.
Can also be used for double and ulong.
Syntax: `lshr`
Overall instruction length: `1 byte`.

#### § 3.7 Bitwise shift right unsigned

#### § 3.7.1 `bshru` _`(0x68)`_

Bitwise shift right unsigned a byte from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the byte below defines the byte to shift.
Can also be used for boolean and ubyte.
Syntax: `bshru`
Overall instruction length: `1 byte`.

#### § 3.7.2 `sshr` _`(0x69)`_

Bitwise shift right unsigned a short from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the short below defines the short to shift.
Can also be used for char and ushort.
Syntax: `sshr`
Overall instruction length: `1 byte`.

#### § 3.7.3 `ishru` _`(0x6A)`_

Bitwise shift right unsigned an integer from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the integer below defines the integer to shift.
Can also be used for float and uint.
Syntax: `ishru`
Overall instruction length: `1 byte`.

#### § 3.7.4 `lshru` _`(0x6B)`_

Bitwise shift right unsigned a long from the stack and push the result onto the stack.
The top byte of the stack defines the number of bits to shift, the long below defines the long to shift.
Can also be used for double and ulong.
Syntax: `lshru`
Overall instruction length: `1 byte`.

## § 4 CMP Expressions

### § 4.1 CMP

#### § 4.1.1 `bcmp` _`(0x70)`_

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

#### § 4.1.2 `scmp` _`(0x71)`_

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

#### § 4.1.3 `icmp` _`(0x72)`_

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

#### § 4.1.4 `lcmp` _`(0x73)`_

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

#### § 4.1.5 `fcmp` _`(0x74)`_

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

#### § 4.1.6 `dcmp` _`(0x75)`_

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

#### § 5.1.1 `jmp` _`(0x80)`_

Jump to the instruction at the given address.

Syntax: `jmp <u4 address>`
Overall instruction length: `5 bytes`.

#### § 5.1.2 `jz` _`(0x81)`_

Jump to the instruction at the given address if the the comparison result is 1 (00000001) (the two values are equal).

Syntax: `jz <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.3 `jnz` _`(0x82)`_

Jump to the instruction at the given address if the the comparison result is not 1 (00000001) (the two values are not equal).

Syntax: `jnz <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.4 `je` _`(0x83)`_

Jump to the instruction at the given address if the the comparison result is 1 (00000001) (the two compared values are equal).

Syntax: `je <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.5 `jne` _`(0x84)`_

Jump to the instruction at the given address if the the comparison result is not 1 (00000001) (the two values are not equal).

Syntax: `jne <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.6 `jg` _`(0x85)`_

Jump to the instruction at the given address if the the comparison result is 0 (00000000) (the first value is greater than the second).

This has no actual byte code, it is here for completeness. Use [`jz`](#-512-jz) instead, as it does the same.

Syntax: `jg <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.7 `jge` _`(0x86)`_

Jump to the instruction at the given address if the the comparison result is 0 (00000000) or 1 (00000001) (the first value is greater than or equal to the second).

Syntax: `jge <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.8 `jl` _`(0x87)`_

Jump to the instruction at the given address if the the comparison result is 2 (00000010) (the first value is smaller than the second).

Syntax: `jl <u4 address>`

Overall instruction length: `5 bytes`.

#### § 5.1.9 `jle` _`(0x88)`_

Jump to the instruction at the given address if the the comparison result is 2 (00000010) or 1 (00000001) (the first value is smaller than or equal to the second).

Syntax: `jle <u4 address>`

Overall instruction length: `5 bytes`.

#### § 6.1.1 `ret` _`(0x90)`_

Return from the current method.

Syntax: `ret`

Overall instruction length: `1 byte`.

#### § 6.1.2 `bret` _`(0x91)`_

Set the return value to a byte and return value (one byte).

**This instruction only sets the return value, it does not return from the method.**

_Can also be used for boolean and ubyte._

Syntax: `bret`

Overall instruction length: `1 byte`.

#### § 6.1.3 `sret` _`(0x92)`_

Set the return value to a short and return value (two bytes).

**This instruction only sets the return value, it does not return from the method.**

_Can also be used for char and ushort._

Syntax: `sret`

Overall instruction length: `1 byte`.

#### § 6.1.4 `iret` _`(0x93)`_

Set the return value to an integer and return value (four bytes).

**This instruction only sets the return value, it does not return from the method.**

_Can also be used for float and uint._

Syntax: `iret`

Overall instruction length: `1 byte`.

#### § 6.1.5 `lret` _`(0x94)`_

Set the return value to a long and return value (eight bytes).

**This instruction only sets the return value, it does not return from the method.**

_Can also be used for double and ulong._

Syntax: `lret`

## § 8 Misc

### § 8.1 `nop` _`(0x00)`_

Does nothing.

Syntax: `nop`

Overall instruction length: `1 byte`.

### § 8.2 `pop`

#### § 8.2.1 `bpop` _`(0xA1)`_

Pop the top byte from the stack.

Syntax: `pop`

Overall instruction length: `1 byte`.

#### § 8.2.2 `spop` _`(0xA2)`_

Pop the top two bytes from the stack.

Syntax: `spop`

Overall instruction length: `1 byte`.

#### § 8.2.3 `ipop` _`(0xA3)`_

Pop the top four bytes from the stack.

Syntax: `ipop`

Overall instruction length: `1 byte`.

#### § 8.2.4 `lpop` _`(0xA4)`_

Pop the top eight bytes from the stack.

Syntax: `lpop`

Overall instruction length: `1 byte`.

### § 8.3 `dup`

#### § 8.3.1 `bdup` _`(0xA5)`_

Duplicate the top byte on the stack.

Could be used to duplicate a byte, boolean or ubyte.

Syntax: `bdup`

Overall instruction length: `1 byte`.

#### § 8.3.2 `sdup` _`(0xA6)`_

Duplicate the top 2-byte element on the stack.

Could be used to duplicate a short, char or ushort.

Syntax: `sdup`

Overall instruction length: `1 byte`.

#### § 8.3.3 `idup` _`(0xA7)`_

Duplicate the top 4-byte element on the stack.

Could be used to duplicate an integer, float or uint.

Syntax: `idup`

Overall instruction length: `1 byte`.

#### § 8.3.4 `ldup` _`(0xA8)`_

Duplicate the top 8-byte element on the stack.

Could be used to duplicate a long, double or ulong.

Syntax: `ldup`

Overall instruction length: `1 byte`.

### § 8.4 `pcast` _`(0xB0)`_

Perform a primitive cast.
The following byte defines the type to cast to.

You can split this byte into two 4-bit numbers (0-15). The first 4-bit number defines the type to cast from, the second 4-bit number defines the type to cast to.

This table shows the available types:

| Type     | (Hex) | (Decimal) | (Binary) |
| -------- | ----- | --------- | -------- |
| `byte`   | `0x0` | `0`       | `0000`   |
| `short`  | `0x1` | `1`       | `0001`   |
| `int`    | `0x2` | `2`       | `0010`   |
| `long`   | `0x3` | `3`       | `0011`   |
| `ubyte`  | `0x4` | `4`       | `0100`   |
| `ushort` | `0x5` | `5`       | `0101`   |
| `uint`   | `0x6` | `6`       | `0110`   |
| `ulong`  | `0x7` | `7`       | `0111`   |
| `float`  | `0x8` | `8`       | `1000`   |
| `double` | `0x9` | `9`       | `1001`   |

For example, if you want to cast a byte to a short, you would use `0x01` (`0b00010001`). You can read this like this:
We want to cast `0x` `0` _to_ `1`, so we use `0x01`.

Syntax: `pcast <u1 type>`

Overall instruction length: `2 bytes`.
