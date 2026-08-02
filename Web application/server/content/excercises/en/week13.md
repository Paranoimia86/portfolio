# Exercise 13: Advanced Concepts and Parallelism

Script optimization is especially important when working with large volumes of data or during repeated execution. Inefficient scripts can unnecessarily burden the CPU, memory, or disk, leading to system slowdowns or process failures.

The foundation of optimization is identifying bottlenecks, for example, using tools like `time` (Bash) or `Measure-Command` (PowerShell). Subsequently, specific parts of the code can be targeted and optimized.

Efficient data handling involves minimizing the amount of data processed and using stream processing instead of loading entire files into memory. It is also important to avoid unnecessary disk operations.

Loops are a common source of inefficiency. In many cases, it is better to use optimized tools like `grep`, `awk`, or `sed`, which are designed for efficient data processing.

Parallelism allows multiple operations to be performed simultaneously, increasing script performance. In Bash, background processes are used, while in PowerShell, parallel pipelines are utilized. However, synchronization and access to shared resources must be addressed during design.

The goal is to find a balance between performance and readability. Optimization is most meaningful where it provides real benefits.

<h1 class="exercise-topic"> Task 1: Measuring Performance </h1>

<div class="exercise">

Design a script that performs a selected operation and measures its execution time. Compare two different implementations.

</div>

<h1 class="exercise-topic"> Task 2: Identifying Bottlenecks </h1>

<div class="exercise">

Create a script that contains an inefficient part, identify it, and propose an optimization.

</div>

<h1 class="exercise-topic"> Task 3: Efficient Data Processing </h1>

<div class="exercise">

Design a script that processes a large file without loading the entire content into memory.

</div>

<h1 class="exercise-topic"> Task 4: Loop Optimization </h1>

<div class="exercise">

Create a script that uses a loop, and then optimize it using tools like `grep` or `awk`.

</div>

<h1 class="exercise-topic"> Task 5: Minimizing Operations </h1>

<div class="exercise">

Design a script that:

- minimizes the number of disk operations,
- optimizes the pipeline.

</div>

<h1 class="exercise-topic"> Task 6: Parallelism in Bash </h1>

<div class="exercise">

Create a script that:

- processes multiple tasks in parallel,
- waits for their completion.

</div>

<h1 class="exercise-topic"> Task 7: Parallelism in PowerShell </h1>

<div class="exercise">

Design a script that:

- processes data in parallel,
- uses `ForEach-Object -Parallel`.

</div>

<h1 class="exercise-topic"> Task 8: Process Synchronization </h1>

<div class="exercise">

Create a script that:

- works with parallel processes,
- ensures proper synchronization.

</div>

<h1 class="exercise-topic"> Task 9: Scaling the Solution </h1>

<div class="exercise">

Design a script that:

- can handle increasing data volumes,
- maintains performance.

</div>

<h1 class="exercise-topic"> Task 10: Comprehensive Optimization </h1>

<div class="exercise">

Design a script that:

- includes parallelism,
- optimized data processing,
- minimized operations,
- is efficient and maintainable.

</div>
