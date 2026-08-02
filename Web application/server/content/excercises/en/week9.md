# Exercise 9: Error Handling and Script Robustness

Script robustness is crucial, especially in production environments where failures can have serious consequences. Therefore, it is important to properly implement error handling, i.e., mechanisms for catching and resolving errors.

In Bash, error handling is primarily achieved using return (exit) codes, where a value of 0 indicates success and a non-zero value indicates an error. PowerShell also provides an exception mechanism, which allows for advanced error control using `try/catch` constructs.

Defensive programming involves designing scripts to prevent errors—for example, by validating inputs, checking for file existence, or handling unexpected situations.

Logging is used to record the execution progress of a script, making debugging and auditing easier. Proper logging should include information about errors, warnings, and successful operations.

Testing scripts is important for verifying correctness and reliability. It includes testing various inputs, edge cases, and error scenarios.

<h1 class="exercise-topic"> Task 1: Working with Return Codes </h1>

<div class="exercise">

Design a script that performs multiple operations on files and evaluates the return code after each step. Based on the result, decide whether to continue or terminate execution.

</div>

<h1 class="exercise-topic"> Task 2: Implementing try/catch (PowerShell) </h1>

<div class="exercise">

Create a PowerShell script that:

- performs an operation that may fail,
- uses `try/catch` to catch the error,
- handles the error and outputs a relevant message.

</div>

<h1 class="exercise-topic"> Task 3: Defensive Programming </h1>

<div class="exercise">

Design a script that:

- validates all inputs (parameters, files),
- handles invalid inputs,
- prevents the script from crashing.

</div>

<h1 class="exercise-topic"> Task 4: Logging Operations </h1>

<div class="exercise">

Create a script that:

- records the execution progress in a log file,
- logs information about both successes and errors,
- includes timestamps.

</div>

<h1 class="exercise-topic"> Task 5: Combined Error Handling </h1>

<div class="exercise">

Design a script that:

- combines exit code checks and logging,
- responds to errors in various ways (e.g., retry, termination).

</div>

<h1 class="exercise-topic"> Task 6: Script Testing </h1>

<div class="exercise">

Design a test script that:

- tests various inputs (valid and invalid),
- evaluates the results,
- outputs a summary of the tests.

</div>

<h1 class="exercise-topic"> Task 7: Error Simulation </h1>

<div class="exercise">

Create a script that:

- intentionally triggers an error,
- catches it,
- logs it.

</div>

<h1 class="exercise-topic"> Task 8: Retry Mechanism </h1>

<div class="exercise">

Design a script that:

- attempts to perform an operation multiple times,
- retries on failure,
- terminates after a certain number of attempts.

</div>

<h1 class="exercise-topic"> Task 9: Complex Input Validation </h1>

<div class="exercise">

Create a script that:

- validates complex input (e.g., a combination of parameters),
- ensures their consistency,
- outputs errors in case of incorrect usage.

</div>

<h1 class="exercise-topic"> Task 10: Robust Script </h1>

<div class="exercise">

Design a comprehensive script that:

- includes input validation,
- implements error handling,
- uses logging,
- is resilient to errors.

</div>
