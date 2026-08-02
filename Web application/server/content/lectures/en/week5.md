# Lecture 5: Control Structures and Program Flow

## Lecture Objective

The objective of this lecture is to provide students with a detailed understanding of controlling program flow in scripting languages Bash and PowerShell. The lecture focuses on the principles of algorithm design, implementation of decision-making mechanisms, and effective use of loops. Emphasis is placed on the ability to design solutions that are not only functional but also readable, maintainable, and error-resistant.

## 1. Program Flow Control – Basic Concept

Program flow control determines the order in which individual instructions are executed. In the simplest case, this involves sequential execution, where commands are processed linearly. However, such a model is suitable only for trivial tasks, as it does not allow for reacting to changing conditions or processing dynamic inputs.

In real-world scripts, it is necessary to:

- React to the system state (e.g., file existence)
- Perform operations on multiple elements
- Handle errors or exceptions
- Change program behavior based on inputs

Control structures enable the transition from linear to controlled and adaptive execution, where the program flow depends on data and conditions. From an algorithmic perspective, this involves introducing decision points and iterations.

Improperly designed program flow can lead to:

- Inefficient execution (unnecessary operations)
- Infinite loops
- Incorrect data processing
- Difficult code maintenance

Therefore, it is important to think about how the program will respond to various scenarios during script design.

## 2. Conditions – if, else, elif

Conditions are a fundamental tool for implementing decision-making. They allow different parts of the code to be executed depending on the current state of the program or system.

In scripting, conditions are often used to:

- Check for the existence of files or directories
- Evaluate command return values
- Validate inputs
- Branch logic based on parameters

In Bash, attention must be paid to syntax and working with test expressions:

<div class="bash-code-example">
<pre><code>if [ -f "data.txt" ]; then
echo "File exists"
else
echo "File does not exist"
fi
</code></pre>
</div>

PowerShell offers a more readable and consistent syntax:

<div class="powershell-code-example">
<pre><code>if (Test-Path "data.txt") {
Write-Output "File exists"
} else {
Write-Output "File does not exist"
}
</code></pre>
</div>

Extended branching allows for handling multiple scenarios:

<div class="bash-code-example">
<pre><code>if [ $value -gt 100 ]; then
echo "High value"
elif [ $value -gt 50 ]; then
echo "Medium value"
else
echo "Low value"
fi
</code></pre>
</div>

When designing conditions, it is important to:

- Cover all possible cases
- Avoid duplicate conditions
- Ensure readability

A common mistake is overly complex nested logic, which reduces clarity and increases the likelihood of errors.

## 3. Comparison and Logical Operators

Comparison operators allow expressing relationships between values, while logical operators enable combining multiple conditions into a single expression.

In Bash, it is necessary to distinguish between operators for different data types:

<div class="bash-code-example">
<pre><code>if [ "$a" -gt 10 ] && [ "$b" -lt 5 ]; then
echo "Condition met"
fi
</code></pre>
</div>

PowerShell uses a unified and consistent model:

<div class="powershell-code-example">
<pre><code>if ($a -gt 10 -and $b -lt 5) {
Write-Output "Condition met"
}
</code></pre>
</div>

These operators allow for:

- Define complex decision-making rules
- Validate multiple conditions simultaneously
- Optimize program logic

An important aspect is the so-called short-circuit evaluation, where the second part of the expression is not evaluated if the result can already be determined from the first part. This mechanism can improve performance but may also cause errors if not accounted for.

## 4. Loops – Repeating Operations

Loops are a fundamental tool for processing repetitive tasks. They allow the same operation to be applied to multiple elements without the need for manual code repetition.

The most common use is iteration over collections:

<div class="bash-code-example">
<pre><code>for file in *.txt; do
echo $file
done
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>foreach ($file in Get-ChildItem *.txt) {
Write-Output $file.Name
}
</code></pre>
</div>

Loops are key for:

- File processing
- Iterating over command outputs
- Batch data processing

When designing loops, it is important to focus on:

- Efficiency (minimizing the number of operations)
- Proper termination
- Readability

Improper use of loops can significantly reduce performance, especially when working with large datasets.

## 5. While Loop and Conditional Repetition

The while loop allows operations to be repeated based on a condition that is evaluated before each iteration. This type of loop is suitable in situations where the number of iterations is not known in advance.

<div class="bash-code-example">
<pre><code>count=0
while [ $count -lt 5 ]; do
echo $count
((count++))
done
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>$count = 0
while ($count -lt 5) {
Write-Output $count
$count++
}
</code></pre>
</div>

Typical use cases:

- Reading input (e.g., line by line)
- Waiting for a condition to be met
- Implementing control loops

The biggest risk is the creation of an infinite loop, which can burden the system. Therefore, it is essential to ensure that the condition changes during execution.

## 6. Branching with Case / Switch

When processing multiple possible values, using multiple conditions becomes unreadable and inefficient. The case and switch constructs provide a more elegant solution.

<div class="bash-code-example">
<pre><code>case $option in
start) echo "Starting";;
stop) echo "Stopping";;
*) echo "Unknown option";;
esac
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>switch ($option) {
"start" { "Starting" }
"stop" { "Stopping" }
default { "Unknown option" }
}
</code></pre>
</div>

These constructs:

- Improve readability
- Reduce redundancy
- Allow better organization of logic

They are ideal, for example, when processing script arguments or system states.

## 7. Controlling Flow with Break and Continue

The break and continue commands allow fine control over the flow of loops.

- break immediately terminates the loop
- continue skips the current iteration

<div class="bash-code-example">
<pre><code>for i in {1..5}; do
if [ $i -eq 3 ]; then
continue
fi
echo $i
done
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>foreach ($i in 1..5) {
if ($i -eq 3) {
continue
}
Write-Output $i
}
</code></pre>
</div>

These mechanisms are important for:

- Data filtering
- Optimizing processing
- Controlling algorithms

However, excessive or improper use can lead to unreadable code, so it is important to use them thoughtfully.
