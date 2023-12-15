---
position: 2
title: Storage Format
tags: [specification, spec, interpreter, bytecode, instructions]
---

## File Format

One file contains one package. The file format is a binary format.
Lets look at the storage format of the bytecode files.

```c

struct File {
    u4 magic;
    u2 major;
    u2 minor;
    u4 package_name_index;
    u4 constant_pool_count;
    cp_info constant_pool[constant_pool_count];
    u4 class_count;
    class_info classes[class_count];
    u4 method_count;
    method_info methods[method_count];
    u4 field_count;
    field_info fields[field_count];
};

```

### Magic

The magic number is used to identify the file as a bytecode file. It is always `0x4a16a478` (in hex).

### Major and Minor

The major and minor version numbers are used to identify the version of the bytecode file. The major version number is incremented when the bytecode format changes in a way that is not backwards compatible. The minor version number is incremented when the bytecode format changes in a way that is backwards compatible.

At the time of writing, the major version number is `0` and the minor version number is `1`.

### Package Name Index

The package name index is the index of the package name. We store one package name per file. The package name is a string that is used to identify the package that the file belongs to. For example it could be `com.shakelang.shake`.

### Constant Pool Count & Constant Pool

The constant pool count is the number of entries in the constant pool. The constant pool is a list of constants that are used in the file.

Take a look at the [constant pool](#constant-pool) section for more information.

### Class Count & Classes

The class count is the number of classes in the file. The classes are a list of classes that are defined in the file.

Take a look at the [classes](#classes) section for more information.

### Method Count & Methods

The method count is the number of methods in the file. The methods are a list of methods that are defined in the file.

Take a look at the [methods](#methods) section for more information.

### Field Count & Fields

The field count is the number of fields in the file. The fields are a list of fields that are defined in the file.

Take a look at the [fields](#fields) section for more information.

## Constant Pool

The constant pool is a list of constants that are used in the file. The constants are used to store values that are used in the file. The length of one constant is not fixed. It depends on the type of the constant.

```c
struct cp_info {
    u1 tag;
    u1 info[];
};
```

### Tag

The tag is used to identify the type of the constant. The tag is always the first byte of the constant.

- `0x01` UTF8
- `0x02` Byte
- `0x03` Short
- `0x04` Int
- `0x05` Long
- `0x06` Float
- `0x07` Double
- `0x08` Class

### UTF8 Constant

The UTF8 constant is used to store strings. The length of the string is stored in the constant. The string is stored as a UTF8 string.

```c
struct cp_info {
    u1 tag = 0x01;
    u2 length;
    u1 bytes[length];
};
```

#### Tag

The identifier of the constant. The tag of the UTF8 constant is `0x01`.

#### Length

The length of the string in bytes.

#### Bytes

The bytes of the string. The string is stored as a UTF8 string.

### Byte Constant

The byte constant is used to store bytes.

```c
struct cp_info {
    u1 tag = 0x02;
    u1 value;
};
```

#### Tag

The identifier of the constant. The tag of the byte constant is `0x02`.

#### Value

The value of the byte.

### Short Constant

The short constant is used to store shorts.

```c

struct cp_info {
    u1 tag = 0x03;
    u2 value;
};

```

#### Tag

The identifier of the constant. The tag of the short constant is `0x03`.

#### Value

The value of the short.

### Int Constant

The int constant is used to store ints.

```c

struct cp_info {
    u1 tag = 0x04;
    u4 value;
};

```

#### Tag

The identifier of the constant. The tag of the int constant is `0x04`.

#### Value

The value of the int.

### Long Constant

The long constant is used to store longs.

```c

struct cp_info {
    u1 tag = 0x05;
    u8 value;
};

```

#### Tag

The identifier of the constant. The tag of the long constant is `0x05`.

#### Value

The value of the long.

### Float Constant

The float constant is used to store floats.

```c

struct cp_info {
    u1 tag = 0x06;
    u4 value;
};

```

#### Tag

The identifier of the constant. The tag of the float constant is `0x06`.

#### Value

The value of the float.

### Double Constant

The double constant is used to store doubles.

```c
struct cp_info {
    u1 tag = 0x07;
    u8 value;
};
```

#### Tag

The identifier of the constant. The tag of the double constant is `0x07`.

#### Value

The value of the double.

### Class Constant

The class constant is used to store class names.

```c
struct cp_info {
    u1 tag = 0x08;
    u2 name_index;
};
```

#### Tag

The identifier of the constant. The tag of the class constant is `0x08`.

#### Name Index

The index of the UTF8 constant that contains the name of the class.

## Classes

The classes are a list of classes that are defined in the file.

```c
struct class_info {
    u4 name_index;
    u4 super_index;
    u2 access_flags;
    u4 interface_count;
    u4 interfaces[interface_count];
    u4 sub_class_count;
    class_info sub_classes[sub_class_count];
    u4 method_count;
    method_info methods[method_count];
    u4 field_count;
    field_info fields[field_count];
    u4 attribute_count;
    attribute_info attributes[attribute_count];
};
```

### Name Index

The index of the UTF8 constant that contains the name of the class.

### Super Index

The index of the UTF8 constant that contains the name of the super class.

### Access Flags

We can write the access flags in binary to understand them better. We have 16 bits for the access flags.
So we can store 16 booleans in the access flags.

```txt
0000 0000 0000 0000
```

Here we have a list of all access flags:

| Flag # | Hex Value | Name        | Description            |
| ------ | --------- | ----------- | ---------------------- |
| 0      | `0x0001`  | `public`    | The class is public    |
| 1      | `0x0002`  | `private`   | The class is private   |
| 2      | `0x0004`  | `protected` | The class is protected |
| 3      | `0x0008`  | `static`    | The class is static    |
| 4      | `0x0010`  | `final`     | The class is final     |

### Interface Count & Interfaces

The interface count is the number of interfaces that the class implements. The interfaces are a list of indexes of UTF8 constants that contain the names of the interfaces.

### Sub Class Count & Sub Classes

The sub class count is the number of sub classes that the class has. The sub classes are a list of classes that are sub classes of the class.

### Method Count & Methods

The method count is the number of methods that the class has. The methods are a list of methods that are defined in the class.

Take a look at the [methods](#methods) section for more information.

### Field Count & Fields

The field count is the number of fields that the class has. The fields are a list of fields that are defined in the class.

Take a look at the [fields](#fields) section for more information.

### Attribute Count & Attributes

The attribute count is the number of attributes that the class has. The attributes are a list of attributes that are defined in the class.

Take a look at the [attributes](#attributes) section for more information.

## Methods

The methods are a list of methods that are defined in the file.

```c

struct method_info {
    u4 name_index;
    u4 qualified_name_index;
    u2 access_flags;
    u4 attribute_count;
    attribute_info attributes[attribute_count];
};

```

### Name Index

The index of the UTF8 constant that contains the name of the method.

### Qualified Name Index

The index of the UTF8 constant that contains the qualified name of the method.

### Access Flags

The access flags of the method. The access flags are used to identify the visibility of the method.

We can write the access flags in binary to understand them better. We have 16 bits for the access flags.
So we can store 16 booleans in the access flags.

```txt
0000 0000 0000 0000
```

Here we have a list of all access flags:

| Flag # | Hex Value | Name        | Description            |
| ------ | --------- | ----------- | ---------------------- |
| 0      | `0x0001`  | `public`    | The class is public    |
| 1      | `0x0002`  | `private`   | The class is private   |
| 2      | `0x0004`  | `protected` | The class is protected |
| 3      | `0x0008`  | `static`    | The class is static    |
| 4      | `0x0010`  | `final`     | The class is final     |

### Attribute Count & Attributes

The attribute count is the number of attributes that the method has. The attributes are a list of attributes that are defined in the method.

Take a look at the [attributes](#attributes) section for more information.

## Fields

The fields are a list of fields that are defined in the file.

```c
struct field_info {
    u4 name_index;
    u2 access_flags;
    u4 attribute_count;
    attribute_info attributes[attribute_count];
};
```

### Name Index

The index of the UTF8 constant that contains the name of the field.

### Access Flags

The access flags of the field. The access flags are used to identify the visibility of the field.

We can write the access flags in binary to understand them better. We have 16 bits for the access flags.

```txt
0000 0000 0000 0000
```

Here we have a list of all access flags:

| Flag # | Hex Value | Name        | Description            |
| ------ | --------- | ----------- | ---------------------- |
| 0      | `0x0001`  | `public`    | The class is public    |
| 1      | `0x0002`  | `private`   | The class is private   |
| 2      | `0x0004`  | `protected` | The class is protected |
| 3      | `0x0008`  | `static`    | The class is static    |
| 4      | `0x0010`  | `final`     | The class is final     |

### Attribute Count & Attributes

The attribute count is the number of attributes that the field has. The attributes are a list of attributes that are defined in the field.

Take a look at the [attributes](#attributes) section for more information.

## Attributes

The attributes are a list of attributes that are defined in the file.

```c
struct attribute_info {
    u4 name_index;
    u4 length;
    u1 info[length];
};
```

### Name Index

The index of the UTF8 constant that contains the name of the attribute.

### Length

The length of the attribute in bytes.

### Info

The info of the attribute. The info depends on the name of the attribute.

#### Code Attribute

The code attribute is used to store the bytecode of a method.

```c
struct attribute_info {
    u4 name_index;
    u4 length;
    u1 info[length];
};

```

##### Name Index

The index of the UTF8 constant that contains the name of the attribute. The name of the code attribute is `Code`.

##### Length

The length of the attribute in bytes.

##### Info

The info of the attribute. The info depends on the name of the attribute.

```c
struct code_attribute_info {
    u2 max_stack;
    u2 max_locals;
    u4 code_length;
    u1 code[code_length];
    u2 exception_table_length;
    exception_table_info exception_table[exception_table_length];
    u2 attribute_count;
    attribute_info attributes[attribute_count];
};
```

###### Max Stack

The maximum number of values that can be stored on the stack at the same time.

###### Max Locals

The maximum number of local variables that can be stored at the same time.

###### Code Length

The length of the bytecode in bytes.

###### Code

The bytecode of the method.

###### Exception Table Length

The length of the exception table.

###### Exception Table

The exception table is a list of exceptions that can be thrown in the method.

```c
struct exception_table_info {
    u2 start_pc;
    u2 end_pc;
    u2 handler_pc;
    u2 catch_type;
};
```

###### Start PC

The start of the exception.

###### End PC

The end of the exception.

###### Handler PC

The handler of the exception.

###### Catch Type

The type of the exception.

###### Attribute Count & Attributes

The attribute count is the number of attributes that the code attribute has. The attributes are a list of attributes that are defined in the code attribute.

Take a look at the [attributes](#attributes) section for more information.

## Type Format Strings

The type format is used to represent the type of a value in a string format.

### Primitive Types

#### Byte

The `byte` type is represented a single uppercase `B`.

#### Unsigned Byte (UByte)

The `unsigned byte` type is, similar to the signed byte, represented a single lowercase `b`.

#### Short

The `short` type is represented a single uppercase `S`.

#### Unsigned Short (UShort)

The `unsigned short` type is, similar to the signed short, represented a single lowercase `s`.

#### Int

The `int` type is represented a single uppercase `I`.

#### Unsigned Int (UInt)

The `unsigned int` type is, similar to the signed int, represented a single lowercase `i`.

#### Long

The `long` type is represented a single uppercase `J`.

#### Unsigned Long (ULong)

The `unsigned long` type is, similar to the signed long, represented a single lowercase `j`.

#### Float

The `float` type is represented a single uppercase `F`.

#### Double

The `double` type is represented a single uppercase `D`.

#### Boolean

The `boolean` type is represented a single uppercase `Z`.

#### Char

The `char` type is represented a single uppercase `C`.

#### Object

The `object` type is represented a single uppercase `L` followed by the qualified name of the class and a `;`.
If the class is generic the generic types are added to the end of the type. We seperate the class name and the generic types by the `@` character. The generic types are seperated by a `+` character.
Every object type starts with a `L` and ends with a `;`.

For example we have the type `shake.lang.String` which is not generic and would be represented as
`Lshake/lang/String;`.

The type `shake.lang.List<shake.lang.String>` would be represented as `Lshake/lang/List@Lshake/lang/String;;`.
The type `shake.lang.Map<shake.lang.String, byte>` would be represented as `Lshake/lang/Map@Lshake/lang/String;+byte;`.

### Array Types

To represent an array of something, we add a `[` to the start of the type. For example the type `int[]` would be represented as `[I`.
For multidimensional arrays we add a `[` for every dimension. For example the type `int[][]` would be represented as `[[I`.
