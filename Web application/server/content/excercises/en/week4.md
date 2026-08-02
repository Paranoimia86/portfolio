# Exercise 4: Variables, Data Structures, and Type System

Variables and data structures are the foundation of any scripting language, and Bash and PowerShell differ significantly in this area. Bash uses dynamic typing without an explicit type system, where all values are essentially strings. In contrast, PowerShell works with strongly typed objects, allowing for more precise manipulation of data and their properties.

In Bash, data structures are primarily implemented using arrays and associative arrays (key-value pairs), while PowerShell provides hashtables and full-fledged objects. Working with objects in PowerShell enables access to properties and methods, which is a fundamental difference from text-based processing in Bash.

Environment variables represent a special type of variable that is accessible across processes. Their proper use is crucial, for example, in configuring applications or scripts.

Data serialization (e.g., JSON or XML) allows for storing and transferring structured data. In modern scripts, working with JSON is practically essential, especially when communicating with APIs or storing configurations.

<h1 class="exercise-topic"> Task 1: Dynamic vs. Strong Typing in Practice </h1>

<div class="exercise">

Create two scripts (Bash and PowerShell) that demonstrate the difference between dynamic and strong typing. The script should:

- assign a numeric value to a variable,
- then use it as both a string and a number,
- demonstrate the difference in behavior (e.g., addition vs. concatenation).

</div>

<h1 class="exercise-topic"> Task 2: Associative Data Structures </h1>

<div class="exercise">

In Bash, create an associative array containing user information (e.g., name → age).
In PowerShell, create an equivalent hashtable.
Then implement:

- displaying all elements,
- searching for a specific key,
- modifying a value.

</div>

<h1 class="exercise-topic"> Task 3: Working with Objects in PowerShell </h1>

<div class="exercise">

Create a PowerShell script that:

- retrieves a list of processes,
- creates a custom object for each process containing only selected properties (e.g., Name, Id, CPU),
- sorts these objects by CPU,
- selects the top 5 processes.

</div>

<h1 class="exercise-topic"> Task 4: Environment Variables and Their Inheritance </h1>

<div class="exercise">

Create a script that:

- sets an environment variable,
- starts a subprocess that uses this variable,
- then verifies whether the change is reflected outside the subprocess.

Analyze the behavior.

</div>

<h1 class="exercise-topic"> Task 5: JSON Serialization (PowerShell) </h1>

<div class="exercise">

Create a PowerShell script that:

- creates a custom data structure (e.g., a list of users),
- serializes it into a JSON file,
- then reads it back and displays it.

</div>

<h1 class="exercise-topic"> Task 6: JSON Processing in Bash </h1>

<div class="exercise">

Create a Bash script that:

- reads a JSON file,
- extracts a specific value (e.g., a user's name),
- uses a tool like `jq`.

</div>

<h1 class="exercise-topic"> Task 7: Data Transformation Between Formats </h1>

<div class="exercise">

Design a script (PowerShell or Bash) that:

- reads data in JSON format,
- transforms it into XML format,
- saves the result to a file.

</div>

<h1 class="exercise-topic"> Task 8: Combined Data Manipulation </h1>

<div class="exercise">

Create a script that:

- reads a list of users from a file (JSON),
- stores them in a data structure,
- filters them (e.g., age > 18),
- displays the result.

</div>

<h1 class="exercise-topic"> Task 9: Dynamic Creation of Data Structures </h1>

<div class="exercise">

Write a script that:

- reads input from the user,
- dynamically creates a data structure (array or hashtable),
- then displays it in serialized form (JSON).

</div>

<h1 class="exercise-topic"> Task 10: Type System Analysis </h1>

<div class="exercise">

Create an experimental script that:

- tests various operations on variables (numbers, strings, arrays),
- records the results,
- compares the behavior of Bash vs. PowerShell.

</div>
