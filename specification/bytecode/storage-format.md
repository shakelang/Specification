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

### Package Name

The package name index is the index of the package name. We store one package name per file. The package name is a string that is used to identify the package that the file belongs to. For example it could be `com/shakelang/shake`.

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

### Constant Tag

The tag is used to identify the type of the constant. The tag is always the first byte of the constant.

- `0x01` UTF8
- `0x02` Byte
- `0x03` Short
- `0x04` Int
- `0x05` Long
- `0x06` Float
- `0x07` Double
- `0x08` Class
- `0x09` String

### UTF8 Constant

The UTF8 constant is used to store strings. The length of the string is stored in the constant. The string is stored as a UTF8 string.

```c
struct cp_info {
    u1 tag = 0x01;
    u2 length;
    u1 bytes[length];
};
```

#### Utf8 Constant Tag

The identifier of the constant. The tag of the UTF8 constant is `0x01`.

#### Utf8 Constant Length

The length of the string in bytes.

#### Utf8 Constant Bytes

The bytes of the string. The string is stored as a UTF8 string.

### Byte Constant

The byte constant is used to store bytes.

```c
struct cp_info {
    u1 tag = 0x02;
    u1 value;
};
```

#### Byte Constant Tag

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

#### Short Constant Tag

The identifier of the constant. The tag of the short constant is `0x03`.

#### Short Constant Value

The value of the short.

### Int Constant

The int constant is used to store ints.

```c

struct cp_info {
    u1 tag = 0x04;
    u4 value;
};

```

#### Int Constant Tag

The identifier of the constant. The tag of the int constant is `0x04`.

#### Int Constant Value

The value of the int.

### Long Constant

The long constant is used to store longs.

```c

struct cp_info {
    u1 tag = 0x05;
    u8 value;
};

```

#### Long Constant Tag

The identifier of the constant. The tag of the long constant is `0x05`.

#### Long Constant Value

The value of the long.

### Float Constant

The float constant is used to store floats.

```c

struct cp_info {
    u1 tag = 0x06;
    u4 value;
};

```

#### Float Constant Tag

The identifier of the constant. The tag of the float constant is `0x06`.

#### Float Constant Value

The value of the float.

### Double Constant

The double constant is used to store doubles.

```c
struct cp_info {
    u1 tag = 0x07;
    u8 value;
};
```

#### Double Constant Tag

The identifier of the constant. The tag of the double constant is `0x07`.

#### Double Constant Value

The value of the double.

### Class Constant

The class constant is used to store class names.

```c
struct cp_info {
    u1 tag = 0x08;
    u2 name_index;
};
```

#### Class Constant Tag

The identifier of the constant. The tag of the class constant is `0x08`.

#### Class ConstantName Index

The index of the UTF8 constant that contains the name of the class.

### String Constant

The string constant is used to store strings. Strings can be refferd to by the bytecode.

```c
struct cp_info {
    u1 tag = 0x09;
    u2 string_index;
};
```

#### String Constant Tag

The identifier of the constant. The tag of the string constant is `0x09`.

#### String Constant Utf8 Index

The index of the UTF8 constant that contains the string's value.

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

### Class Name Index

The index of the UTF8 constant that contains the name of the class.

### Class Super Index

The index of the UTF8 constant that contains the name of the super class.

### Class Flags

We can write the flags in binary to understand them better. We have 16 bits for the flags.
So we can store 16 booleans in the flags.

```txt
0000 0000 0000 0000
```

Here we have a list of all flags:

| Flag # | Hex Value | Binary Value        | Name         | Description                |
| ------ | --------- | ------------------- | ------------ | -------------------------- |
| 0      | `0x0001`  | `00000000 00000001` | `public`     | The class is public        |
| 1      | `0x0002`  | `00000000 00000010` | `private`    | The class is private       |
| 2      | `0x0004`  | `00000000 00000100` | `protected`  | The class is protected     |
| 3      | `0x0008`  | `00000000 00001000` | `static`     | The class is static        |
| 4      | `0x0010`  | `00000000 00010000` | `final`      | The class is final         |
| 5      | `0x0020`  | `00000000 00100000` | `interface`  | The class is an interface  |
| 6      | `0x0040`  | `00000000 01000000` | `abstract`   | The class is abstract      |
| 7      | `0x0080`  | `00000000 10000000` | `synthetic`  | The class is synthetic     |
| 8      | `0x0100`  | `00000001 00000000` | `annotation` | The class is an annotation |
| 9      | `0x0200`  | `00000010 00000000` | `enum`       | The class is an enum       |
| 10     | `0x0400`  | `00000100 00000000` | `object`     | The class is an object     |

### Class Interfaces

```c
struct interfaces {
    u4 count;
    u4 interfaces[count];
};
```

The interface count is the number of interfaces that the class implements.

Following the interface count is a list of indexes of the UTF8 constants that contain the names of the interfaces.

### Class Subclasses

```c
struct sub_classes {
    u4 count;
    class_info sub_classes[count];
};
```

The sub class count is the number of sub classes that the class has.

Following the sub class count is a list of sub classes. The sub classes are defined in the same way as the class.
(See [Classes](#classes))

### Class Methods

```c
struct methods {
    u4 count;
    method_info methods[count];
};
```

The method count is the number of methods that the class has. The methods are a list of methods that are defined in the class.

Following the method count is a list of methods. See [Methods](#methods) for more information.

### Class Fields

```c
struct fields {
    u4 count;
    field_info fields[count];
};
```

The field count is the number of fields that the class has. The fields are a list of fields that are defined in the class.

Following the field count is a list of fields. See [Fields](#fields) for more information.

### Class Attributes

```c
struct attributes {
    u4 count;
    attribute_info attributes[count];
};
```

The attribute count is the number of attributes that the class has. The attributes are a list of attributes that are defined in the class.

Following the attribute count is a list of attributes. See [Attributes](#attributes) for more information.

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

### Method Name Index

The index of the UTF8 constant that contains the name of the method.

### Method Type Index

The index of the UTF8 constant that contains the type of the method.

### Method Flags

The flags of the method. The flags are used to identify the visibility of the method.

We can write the flags in binary to understand them better. We have 16 bits for the flags.
So we can store 16 booleans in the flags.

```txt
0000 0000 0000 0000
```

Here we have a list of all flags:

| Flag # | Hex Value | Binary Value        | Name           | Description                |
| ------ | --------- | ------------------- | -------------- | -------------------------- |
| 0      | `0x0001`  | `00000000 00000001` | `public`       | The method is public       |
| 1      | `0x0002`  | `00000000 00000010` | `private`      | The method is private      |
| 2      | `0x0004`  | `00000000 00000100` | `protected`    | The method is protected    |
| 3      | `0x0008`  | `00000000 00001000` | `static`       | The method is static       |
| 4      | `0x0010`  | `00000000 00010000` | `final`        | The method is final        |
| 5      | `0x0020`  | `00000000 00100000` | `synchronized` | The method is synchronized |
| 6      | `0x0040`  | `00000000 01000000` | `native`       | The method is native       |
| 7      | `0x0080`  | `00000000 10000000` | `abstract`     | The method is abstract     |
| 8      | `0x0100`  | `00000001 00000000` | `strict`       | The method is strict       |

### Method Attributes

The attribute count is the number of attributes that the method has. The attributes are a list of attributes that are defined in the method.

Take a look at the [attributes](#attributes) section for more information.

## Fields

The fields are a list of fields that are defined in the file.

```c
struct field_info {
    u4 name_index;
    u4 type_index;
    u2 access_flags;
    u4 attribute_count;
    attribute_info attributes[attribute_count];
};
```

### Field Name Index

The index of the UTF8 constant that contains the name of the field.

### Field Type Index

The index of the UTF8 constant that contains the type of the field.

### Field Flags

The flags of the field. The flags are used to identify the visibility of the field.

We can write the flags in binary to understand them better. We have 16 bits for the flags.

```txt
0000 0000 0000 0000
```

Here we have a list of all flags:

| Flag # | Hex Value | Binary Value        | Name        | Description            |
| ------ | --------- | ------------------- | ----------- | ---------------------- |
| 0      | `0x0001`  | `00000000 00000001` | `public`    | The field is public    |
| 1      | `0x0002`  | `00000000 00000010` | `private`   | The field is private   |
| 2      | `0x0004`  | `00000000 00000100` | `protected` | The field is protected |
| 3      | `0x0008`  | `00000000 00001000` | `static`    | The field is static    |
| 4      | `0x0010`  | `00000000 00010000` | `final`     | The field is final     |
| 6      | `0x0040`  | `00000000 01000000` | `abstract`  | The field is abstract  |

### Field Attributes

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

### Attribute Name Index

The index of the UTF8 constant that contains the name of the attribute.

### Attribute Length

The length of the attribute in bytes.

### Attribute Info

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

##### Code Attribute Name Index

The index of the UTF8 constant that contains the name of the attribute. The name of the code attribute is `Code`.

##### Code Attribute Length

The length of the attribute in bytes.

##### Code Attribute Info

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

###### Code Attribute Max Stack

The maximum number of values that can be stored on the stack at the same time.

###### Code Attribute Max Locals

The maximum number of local variables that can be stored at the same time.

###### Code Attribute Code Length

The length of the bytecode in bytes.

###### Code Attribute Code

The bytecode of the method.

###### Code Attribute Exception Table Length

The length of the exception table.

###### Code Attribute Exception Table

The exception table is a list of exceptions that can be thrown in the method.

```c
struct exception_table_info {
    u2 start_pc;
    u2 end_pc;
    u2 handler_pc;
    u2 catch_type;
};
```

###### Exception Start PC

The start of the exception.

###### Exception End PC

The end of the exception.

###### Exception Handler PC

The handler of the exception.

###### Exception Catch Type

The type of the exception.

###### Exception Attributes

The attribute count is the number of attributes that the code attribute has. The attributes are a list of attributes that are defined in the code attribute.

Take a look at the [attributes](#attributes) section for more information.

## Type Descriptors

The type format is used to represent the type of a value in a string format.

### Primitive Type Descriptors

#### Byte Type Descriptor

The `byte` type is represented a single uppercase `B`.

#### Unsigned Byte (UByte) Type Descriptor

The `unsigned byte` type is, similar to the signed byte, represented a single lowercase `b`.

#### Short Type Descriptor

The `short` type is represented a single uppercase `S`.

#### Unsigned Short (UShort) Type Descriptor

The `unsigned short` type is, similar to the signed short, represented a single lowercase `s`.

#### Int Type Descriptor

The `int` type is represented a single uppercase `I`.

#### Unsigned Int (UInt) Type Descriptor

The `unsigned int` type is, similar to the signed int, represented a single lowercase `i`.

#### Long Type Descriptor

The `long` type is represented a single uppercase `J`.

#### Unsigned Long (ULong) Type Descriptor

The `unsigned long` type is, similar to the signed long, represented a single lowercase `j`.

#### Float Type Descriptor

The `float` type is represented a single uppercase `F`.

#### Double Type Descriptor

The `double` type is represented a single uppercase `D`.

#### Boolean Type Descriptor

The `boolean` type is represented a single uppercase `Z`.

#### Char Type Descriptor

The `char` type is represented a single uppercase `C`.

### Object Type Descriptor

The `object` type is represented a single uppercase `L` followed by the qualified name of the class and a `;`.
If the class is generic the generic types are added to the end of the type. We seperate the class name and the generic types by the `@` character. The generic types are seperated by a `+` character.
Every object type starts with a `L` and ends with a `;`.

For example we have the type `shake.lang.String` which is not generic and would be represented as
`Lshake/lang/String;`.

The type `shake.lang.List<shake.lang.String>` would be represented as `Lshake/lang/List@Lshake/lang/String;;`.
The type `shake.lang.Map<shake.lang.String, byte>` would be represented as `Lshake/lang/Map@Lshake/lang/String;+byte;`.

### Array Type Descriptor

To represent an array of something, we add a `[` to the start of the type. For example the type `int[]` would be represented as `[I`.
For multidimensional arrays we add a `[` for every dimension. For example the type `int[][]` would be represented as `[[I`.

## Method Descriptors

The method format is used to represent the signature of a method in a string format.

### Method Signature

The method signature contains of the following parts:

- The method name
- A `(` character to start the parameter list
- The parameter types seperated by a `,` character
- A `)` character to end the parameter list
- The return type

For example the method `int add(int a, int b)` would be represented as `add(I,I)I`.

A qualified method signature should additionally contain a qualified path. See [Path Signature](#path-signature).

### Path Signature

The path signature is the "path" of a method, class or field. It contains the package name, (optinally the parent class name) and the class/method/field name.

The package path is separated by the `/` character. When we have a parent class, we seperate it with the `:` character.

For example `shake.lang.String` would be represented as `shake/lang/String`. The method `shake.lang.String::length` would be represented as `shake/lang/String:length`.

If we have a class like this:

```shake
package shake.lang;

class String {
    public int length() {
        return 0;
    }

    class Builder {
        public String build() {
            return "";
        }
    }
}
```

The method `shake.lang.String.Builder::build` would be represented as `shake/lang/String:Builder:build`.
