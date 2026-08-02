# Exercise 3: Advanced Command Line Usage

Advanced command line usage enables efficient data processing and task automation without the need for a graphical interface. One of the fundamental principles is command chaining, which involves linking multiple commands in sequence. In Bash, operators such as `;`, `&&`, and `||` are used to determine under what conditions commands are executed.

Another important concept is input and output redirection. Standard input (stdin), output (stdout), and error output (stderr) can be redirected to files or between commands. This allows, for example, saving results to files or separating errors from regular output.

Pipes allow multiple commands to be connected so that the output of one command becomes the input of the next. In Bash, tools like `grep` (text filtering), `awk` (text data processing), and `sed` (text editing) are often used. In PowerShell, similar functionality is achieved using the object pipeline and commands like `Where-Object`.

Efficient CLI usage also involves the ability to combine commands, use command history, shorten syntax, and optimize commands to be fast and clear. Optimization includes minimizing the number of commands or effectively using pipelines.

<h1 class="exercise-topic"> Task 1: Command Chaining </h1>

<div class="exercise">

Write a Bash command that:

- creates a new file,
- writes text into it,
- and then displays its content only if the previous operations were successful.

</div>

<h1 class="exercise-topic"> Task 2: Output Redirection </h1>

<div class="exercise">

Create a Bash command that:

- writes the contents of a directory to a file,
- saves error messages to another file.

</div>

<h1 class="exercise-topic"> Task 3: Combined Redirection </h1>

<div class="exercise">

Write a command that redirects both standard and error output to a single file.

</div>

<h1 class="exercise-topic"> Task 4: Filtering with grep </h1>

<div class="exercise">

Create a command that:

- displays the contents of a file,
- filters lines containing a specific word.

</div>

<h1 class="exercise-topic"> Task 5: Text Processing with awk </h1>

<div class="exercise">

Write a command that:

- processes a text file,
- displays only the first column from each line.

</div>

<h1 class="exercise-topic"> Task 6: Text Editing with sed </h1>

<div class="exercise">

Write a command that replaces a specific word in a text with another word.

</div>

<h1 class="exercise-topic"> Task 7: Pipeline in PowerShell </h1>

<div class="exercise">

Write a PowerShell command that:

- retrieves a list of processes,
- filters only those using more than a certain amount of memory.

</div>

<h1 class="exercise-topic"> Task 8: Efficient Command Combination </h1>

<div class="exercise">

Design a command or short script that:

- finds all `.log` files,
- filters lines containing the word "error",
- counts them.

</div>

<h1 class="exercise-topic"> Task 9: Command Optimization </h1>

<div class="exercise">

Optimize the command (`cat file.txt | grep "text"`), which uses unnecessary steps, to make it as efficient as possible (e.g., reducing the number of commands in the pipeline).

</div>

<h1 class="exercise-topic"> Task 10: Combining Multiple Tools </h1>

<div class="exercise">

Write a command that:

- displays the contents of a file,
- filters specific lines,
- modifies the text,
- and saves the result to a new file.

</div>
