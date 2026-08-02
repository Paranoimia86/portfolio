# Exercise 2: Shell Architecture and Execution Model

A shell acts as an intermediary between the user and the operating system, where each command execution creates a process. A process is a running instance of a program that is allocated system resources such as memory and CPU. When working with a shell, it is important to understand that some commands are executed within the current shell, while others create a new process or a so-called subshell.

A subshell is a subprocess that inherits the environment of the parent shell, but changes made in the subshell do not propagate back to the parent process. Closely related to this is the concept of the environment, which is a set of environment variables that influence the behavior of processes.

Another important aspect is the execution context. A shell can operate in interactive mode (e.g., a terminal where the user enters commands manually) or non-interactive mode (e.g., script execution). These modes differ, for example, in how configuration files are loaded and how commands behave.

A pipeline is a mechanism that allows multiple commands to be connected. In the Bash environment, text output is transferred between commands, while in PowerShell, objects are transferred, enabling more advanced data operations.

Every script has its lifecycle – from initiation, through the execution of individual commands, to termination. Upon script termination, the so-called exit code is important, signaling success or failure. By convention, a value of 0 indicates success, while non-zero values indicate an error.

<h1 class="exercise-topic"> Task 1: Process and Subshell in Bash </h1>

<div class="exercise">

Create a Bash script that sets a variable in the main shell and then attempts to change it in a subshell. Verify whether the change is reflected in the original shell, and appropriately display the output.

</div>

<h1 class="exercise-topic"> Task 2: Working with Environment Variables </h1>

<div class="exercise">

Write a Bash script that displays the values of selected environment variables (e.g., HOME, PATH, USER) and then creates a custom environment variable that is also accessible to a subprocess.

</div>

<h1 class="exercise-topic"> Task 3: Interactive vs. Non-Interactive Mode </h1>

<div class="exercise">

Create a script that determines whether it is running in interactive or non-interactive mode and displays different messages accordingly.

</div>

<h1 class="exercise-topic"> Task 4: Pipeline in Bash </h1>

<div class="exercise">

Write a Bash command (or short script) that:

- displays the contents of a directory,
- filters only files with the .txt extension,
- counts them using a pipeline.

</div>

<h1 class="exercise-topic"> Task 5: Pipeline in PowerShell </h1>

<div class="exercise">

Write a PowerShell command that:

- retrieves a list of files,
- filters only .txt files,
- displays their names and counts them using a pipeline.

</div>

<h1 class="exercise-topic"> Task 6: Exit Codes and Error Checking </h1>

<div class="exercise">

Create a script (Bash or PowerShell) that:

- attempts to execute a command (e.g., opening a non-existent file),
- checks the exit code of the previous command,
- displays a success or error message.

</div>

<h1 class="exercise-topic"> Task 7: Working with Multiple Processes </h1>

<div class="exercise">

Write a Bash script that runs two commands in parallel (e.g., `sleep 5` and `sleep 3`) and displays a message once both processes have completed.

</div>

<h1 class="exercise-topic"> Task 8: Subshell and Pipeline </h1>

<div class="exercise">

Create a Bash command or script that uses a subshell in combination with a pipeline. For example, process the output of a command in a subshell and then pass it to another command for further processing.

</div>

<h1 class="exercise-topic"> Task 9: Exit Code of a Custom Script </h1>

<div class="exercise">

Write a script that:

- checks if an argument was provided at runtime,
- if not, exits with an exit code of 1,
- if yes, displays the argument and exits with an exit code of 0.

</div>

<h1 class="exercise-topic"> Task 10: Logging and Progress Monitoring </h1>

<div class="exercise">

Create a script that:

- executes multiple commands in sequence,
- checks the exit code after each command,
- logs the result (success/failure) to a log file.

</div>
