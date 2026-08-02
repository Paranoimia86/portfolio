# Exercise 5: Control Structures and Program Flow

Control structures determine the flow of program execution and allow scripts to respond to various situations during runtime. The foundation consists of conditions and branching, which enable different parts of code to execute based on specific criteria. Advanced usage includes combining multiple conditions, working with command return values, or making decisions based on patterns.

Iterations allow repeated execution of code over data or ranges of values. In practice, they are often used for file processing, data generation, or automated operations on sets of inputs.

Pattern-based decision-making (e.g., `case` in Bash or `switch` in PowerShell) provides an elegant way to handle situations where decisions are based on multiple options or patterns. It is a more readable alternative to multiple nested conditions.

Parallelism enables multiple operations to be performed simultaneously, increasing script efficiency. In Bash, this can be achieved using background processes, while in PowerShell, jobs or parallel pipelines are used.

An effective program flow design minimizes unnecessary operations, properly manages branching, and optimizes execution to ensure the script is fast, readable, and reliable.

<h1 class="exercise-topic"> Task 1: Advanced Branching </h1>

<div class="exercise">

Create a script that:

- accepts an input parameter (e.g., a number),
- performs different operations based on multiple conditions (e.g., value ranges),
- uses a combination of logical operators and command return values.

</div>

<h1 class="exercise-topic"> Task 2: Iteration and Data Generation </h1>

<div class="exercise">

Write a script that:

- generates a series of data (e.g., numbers 1–100),
- determines for each number whether it meets a specific condition (e.g., divisibility),
- saves the results to a file.

</div>

<h1 class="exercise-topic"> Task 3: Pattern-Based Decision-Making </h1>

<div class="exercise">

Create a script that:

- accepts input (e.g., a file name),
- performs different operations based on the file extension (e.g., `.txt`, `.log`, `.json`),
- uses `case` (Bash) or `switch` (PowerShell).

</div>

<h1 class="exercise-topic"> Task 4: Combining Conditions and Loops </h1>

<div class="exercise">

Design a script that:

- iterates through a list of files,
- applies conditions (e.g., size, name),
- performs an action only for those that meet multiple criteria.

</div>

<h1 class="exercise-topic"> Task 5: Parallelism in Bash </h1>

<div class="exercise">

Create a script that:

- runs multiple tasks in parallel (e.g., processing multiple files),
- waits for their completion,
- evaluates the results afterward.

</div>

<h1 class="exercise-topic"> Task 6: Parallelism in PowerShell </h1>

<div class="exercise">

Write a PowerShell script that:

- starts multiple jobs,
- monitors their status,
- processes the results upon completion.

</div>

<h1 class="exercise-topic"> Task 7: Program Flow Optimization </h1>

<div class="exercise">

Modify a script to:

- minimize the number of conditions,
- eliminate redundant operations,
- use more efficient constructs (e.g., `case` instead of multiple `if` statements).

</div>

<h1 class="exercise-topic"> Task 8: Data Generation and Filtering </h1>

<div class="exercise">

Create a script that:

- generates data (e.g., random numbers),
- filters them based on a condition,
- outputs only relevant results.

</div>

<h1 class="exercise-topic"> Task 9: Combining Parallelism and Conditions </h1>

<div class="exercise">

Design a script that:

- processes multiple inputs in parallel,
- applies conditions to each input,
- aggregates the results.

</div>

<h1 class="exercise-topic"> Task 10: Control Logic Design </h1>

<div class="exercise">

Design a complex script that:

- combines conditions, loops, and parallelism,
- processes input data,
- optimizes program flow for performance and readability.

</div>
