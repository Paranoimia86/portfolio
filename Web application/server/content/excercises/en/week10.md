# Exercise 10: Automation and Task Scheduling

Automation replaces manual and repetitive tasks with scripts, increasing efficiency and reducing the risk of errors. In practice, it is used for tasks such as backups, monitoring, or system management. The key goal is to design scripts that work reliably, repeatedly, and without user intervention.

Task scheduling ensures that scripts are automatically executed at a defined time or based on events. In Linux, `cron` is used, while in Windows, Task Scheduler is the tool of choice. When designing, it is important to account for different environments (e.g., missing variables, different permissions) and ensure logging and error handling.

An important principle is idempotence, the ability of a script to execute repeatedly without negative consequences. Automated solutions should include input validation, error handling, and monitoring. In practice, this often involves a combination of techniques—scheduling, logging, data processing, and error response.

<h1 class="exercise-topic"> Task 1: Automation Design </h1>

<div class="exercise">

Design a script that automates a selected administrative task and can be executed without user intervention. Consider repeatability and stability of the solution.

</div>

<h1 class="exercise-topic"> Task 2: Cron Configuration </h1>

<div class="exercise">

Create a Bash script and configure it to run regularly using `cron`. Ensure proper redirection of output and errors.

</div>

<h1 class="exercise-topic"> Task 3: Cron Environment </h1>

<div class="exercise">

Design a script that verifies the availability of necessary variables and tools when executed via `cron` and logs them.

</div>

<h1 class="exercise-topic"> Task 4: Task Scheduler </h1>

<div class="exercise">

Create a PowerShell script and schedule it using Task Scheduler with a defined trigger and logging.

</div>

<h1 class="exercise-topic"> Task 5: Idempotent Script </h1>

<div class="exercise">

Design a script that performs an operation on the system such that repeated execution does not lead to errors or an inconsistent state.

</div>

<h1 class="exercise-topic"> Task 6: Error Handling in Automation </h1>

<div class="exercise">

Create a script that detects errors during execution, logs them, and responds appropriately (e.g., retry or termination).

</div>

<h1 class="exercise-topic"> Task 7: Execution Logging </h1>

<div class="exercise">

Design a script that logs the start, progress, and completion of execution, including errors and timestamps.

</div>

<h1 class="exercise-topic"> Task 8: Notification Mechanism </h1>

<div class="exercise">

Create a script that generates a notification (e.g., output or simulated alert) after task execution.

</div>

<h1 class="exercise-topic"> Task 9: Combined Task </h1>

<div class="exercise">

Design a script that performs multiple operations (e.g., backup and cleanup), is scheduled, and includes logging and error handling.

</div>

<h1 class="exercise-topic"> Task 10: Comprehensive Automation System </h1>

<div class="exercise">

Design a solution that combines automation, scheduling, monitoring, and robustness, suitable for long-term practical use.

</div>
