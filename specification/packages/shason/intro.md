---
position: 1
title: Introduction
---

Shason is a JSON parser written in Kotlin. It is designed to be fast and easy to use. It is designed to be
compatible with the JSON specification ([RFC 8259](https://tools.ietf.org/html/rfc8259)).

[Api Reference](https://dokka.shakelang.com/util/shason)

## Installation

### Gradle

build.gradle

```groovy
implementation "com.shakelang.util:shason:$version"
```

build.gradle.kts

```kotlin
implementation("com.shakelang.util:shason:$version")
```

## Usage

### Parsing

To parse a JSON string, use the `json.parse` function:

```kotlin
import com.shakelang.shake.util.shason.json

val json = """
    {
        "name": "Shason",
        "version": "1.0.0"
    }
""".trimIndent()

val parsed = json.parse()
```

### Generating

To generate a JSON string, use the `json.stringify` function:

```kotlin
import com.shakelang.shake.util.shason.json

val json = json.stringify(
    mapOf(
        "name" to "Shason",
        "version" to "1.0.0"
    ),
    true
)
```
