# Exercise 6: Functions, Scripting Modules, and Modularity

As scripts grow in complexity, it becomes crucial to design code that is readable, maintainable, and reusable. The foundation of this is functions, which allow logic to be divided into smaller, independent parts. Each function should have a clearly defined purpose and interface (API), i.e., inputs and outputs.

When designing functions, input validation is essential. A script should verify that the user has provided correct parameters and respond appropriately in case of errors. This increases the robustness and reliability of the solution.

A significant difference between Bash and PowerShell lies in handling return values. Bash primarily uses exit codes and standard output, while PowerShell works with an object-oriented output stream, enabling more flexible processing of function results.

Modularity refers to dividing code into multiple files or modules. In Bash, this is achieved using `source` (or `.`), while PowerShell supports full-fledged modules that can be imported. This approach allows code reuse and better project organization.

<h1 class="exercise-topic"> Task 1: Designing a Function as an API </h1>

<div class="exercise">

Design a Bash or PowerShell function that:

- accepts multiple parameters,
- performs a specific operation (e.g., file processing),
- has clearly defined inputs and outputs,
- is designed to be reusable.

</div>

<h1 class="exercise-topic"> Task 2: Input Validation </h1>

<div class="exercise">

Create a function that:

- accepts input parameters,
- verifies their validity (e.g., type, file existence),
- displays an error message and exits in case of invalid input.

</div>

<h1 class="exercise-topic"> Task 3: Return Values vs. Output </h1>

<div class="exercise">

Create a script that:

- implements a function returning a value using an exit code,
- implements a function returning a value via the output stream,
- demonstrates the difference between these approaches.

</div>

<h1 class="exercise-topic"> Task 4: Multiple Functions and Collaboration </h1>

<div class="exercise">

Design a script containing multiple functions that:

- collaborate with each other,
- pass data between them,
- form a logical unit (e.g., input processing → filtering → output).

</div>

<h1 class="exercise-topic"> Task 5: Bash Sourcing </h1>

<div class="exercise">

Split a script into multiple files:

- one file contains functions,
- another uses them via `source`,
- demonstrate code reuse.

</div>

<h1 class="exercise-topic"> Task 6: PowerShell Module </h1>

<div class="exercise">

Create a simple PowerShell module:

- define one or more functions,
- export them,
- import the module in another script and use the functions.

</div>

<h1 class="exercise-topic"> Task 7: Code Organization </h1>

<div class="exercise">

Design the structure of a scripting project:

- divide it into files/modules,
- separate logic and inputs,
- describe how the project could be extended.

</div>

<h1 class="exercise-topic"> Task 8: Reusing Functions </h1>

<div class="exercise">

Create a function that:

- is universal (e.g., input validation),
- is used in multiple places within the script.

</div>

<h1 class="exercise-topic"> Task 9: Advanced Parameter Handling </h1>

<div class="exercise">

Design a function that:

- supports optional parameters,
- has default values,
- handles various combinations of inputs.

</div>

<h1 class="exercise-topic"> Task 10: Complex Modular Script </h1>

<div class="exercise">

Design a script that:

- contains multiple functions,
- is divided into modules,
- validates inputs,
- processes data efficiently,
- is prepared for reuse.

</div>
