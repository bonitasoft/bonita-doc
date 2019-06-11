# Groovy script language in Bonita

In Bonita, it is a prerequisite to be comfortable with Java when implementing advanced behaviors in your processes, the below article aims at helping with Groovy, the scripting language used by Bonita.
Groovy has been chosen as the scripting language because it is :
* Concise, readable and have an expressive syntax, easy to learn for Java developers
* Seamlessly and transparently integrates and interoperates with Java and any third-party libraries


## From Java to Groovy

For a complete description, please have a look at the reference documentation [here](http://groovy-lang.org/differences.html).

### Strings

Text literals are represented in the form of chain of characters called strings. Groovy lets you instantiate `java.lang.String` objects, as well as GStrings (`groovy.lang.GString`) which are also called interpolated strings in other programming languages.

* Single quoted strings are a series of characters surrounded by single quotes: `'a single quoted string'`
* Triple single quoted strings are a series of characters surrounded by triplets of single quotes and are multiline: 

```groovy
def aMultilineString = '''line one
line two
line three'''
```

* Double quoted strings are a series of characters surrounded by double quotes: `"a double quoted string"`. Double quoted strings are plain `java.lang.String` if there’s no interpolated expression, but are `groovy.lang.GString` instances if interpolation is present. 

* String interpolation  

Any Groovy expression can be interpolated in all string literals, apart from single and triple single quoted strings. Interpolation is the act of replacing a placeholder in the string with its value upon evaluation of the string. The placeholder expressions are surrounded by `${}` or prefixed with `$` for dotted expressions. The expression value inside the placeholder is evaluated to its string representation when the GString is passed to a method taking a String as argument by calling `toString()` on that expression.

Here, we have a string with a placeholder referencing a local variable:

```groovy
def name = 'Romain' // a plain string
def greeting = "Hello ${name}"

assert greeting.toString() == 'Hello Romain'
```

In addition to `${}` placeholders, we can also use a lone `$` sign prefixing a dotted expression:

```groovy
def person = [name: 'Romain', age: 34]
assert "$person.name is $person.age years old" == 'Romain is 34 years old'
```

But only dotted expressions of the form `a.b`, `a.b.c`, etc, are valid, but expressions that would contain parentheses like method calls, curly braces for closures, or arithmetic operators would be invalid.  

More about Strings in Groovy [here](http://docs.groovy-lang.org/docs/groovy-2.4.16/html/documentation/#all-strings).

### Lambdas & Closures

Java 8 supports lambdas and method references:

```java
Runnable run = () -> System.out.println("Run");
list.forEach(System.out::println);
```

Java 8 lambdas can be more or less considered as anonymous inner classes. Groovy doesn’t support that syntax, but has closures instead:

```groovy
Runnable run = { println 'run' }
list.each { println it } // or list.each(this.&println)
```

Closures are heavily used when processing collections:

```groovy
def list = ['Daffy', 'Bugs', 'Elmer', 'Tweety', 'Silvester', 'Yosemite']
assert 'Bugs' == list.find { it == 'Bugs' }
assert ['Daffy', 'Bugs', 'Elmer'] == list.findAll { it.size() < 6 }
assert list.any { it =~ /a/ }
assert list.every { it.size() > 3 }
 
def map = [name: 'Messages from mrhaki', url: 'http://mrhaki.blogspot.com', blog: true]
def found = map.find { key, value -> key == 'name' }
assert found.key == 'name' && found.value == 'Messages from mrhaki'
found = map.find { it.value =~ /mrhaki/ }
assert found.key == 'name' && found.value == 'Messages from mrhaki'
assert [name: 'Messages from mrhaki', url: 'http://mrhaki.blogspot.com'] == map.findAll { key, value -> value =~ /mrhaki/ }
assert map.any { entry -> entry.value }
assert map.every { key, value -> key.size() >= 3 }
```

More about Closures in Groovy [here](http://docs.groovy-lang.org/docs/groovy-2.4.16/html/documentation/#_closures).

### Operators

* Identity operator

In Groovy, using `==` to test equality is different from using the same operator in Java. In Groovy, it is calling equals. If you want to compare reference equality, you should use is like in the following example:

```groovy
def list1 = ['Groovy 1.8','Groovy 2.0','Groovy 2.3'] // Create a list of strings   
def list2 = ['Groovy 1.8','Groovy 2.0','Groovy 2.3'] // Create another list of strings containing the same elements       
assert list1 == list2 // using ==, we test object equality                                 
assert !list1.is(list2) //	but using 'is', we can check that references are distinct
```


* Safe navigation operator `?.` to Avoid NullPointerException:

Suppose we have a simple model like this:

```groovy
class Company {
    Address address
    String name
}
 
class Address {
    Street street
    String postalCode
    String city
}
 
class Street {
    String name
    String number
    String additionalInfo
}
```

We want to display the street name, but we don't know if all object instances are available. To avoid a NullPointerException we write the following code:

```groovy
// company can be null.
if (company != null && company.getAddress() != null && company.getAddress().getStreet() != null) {
    println company.address.street.name
}
```

Groovy adds the safe navigation operator to shorten all this to:

```groovy
// company can be null.
println company?.address?.street?.name
```

* The Elvis operator `:?` to shorten ternary expression

```groovy
def sampleText
 
// Normal ternary operator.
def ternaryOutput = (sampleText != null) ? sampleText : 'Hello Groovy!'
 
// The Elvis operator in action. We must read: 'If sampleText is not null assign
// sampleText to elvisOuput, otherwise assign 'Viva Las Vegas!' to elvisOutput.
def elvisOutput = sampleText ?: 'Viva Las Vegas!'
```

More about Operators in Groovy [here](http://docs.groovy-lang.org/docs/groovy-2.4.16/html/documentation/#groovy-operators).

## Bonita use cases with Groovy

### Instantiate a Business Data

### Update a Business Data

### List Business Objects using DAO

### Search for Activity instances

### 



## References

* [Groovy 2.4.16 official documentation](http://docs.groovy-lang.org/docs/groovy-2.4.16/html/documentation/)
* [Groovy Goodness by MrHaki](https://mrhaki.blogspot.com/search/label/Groovy%3AGoodness)