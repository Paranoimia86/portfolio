# Lecture 12: Security and Best Practices in Scripting

## Lecture Objective

The objective of this lecture is to provide students with a comprehensive understanding of security principles and best practices in creating scripts in Bash and PowerShell environments. The lecture synthesizes knowledge from previous weeks and focuses on designing solutions that are not only functional but also secure, reliable, and sustainable in real-world environments.

## 1. The Importance of Security in Scripting

Security in scripting is a crucial aspect that affects not only the functionality of the script but also the stability and integrity of the entire system. Scripts often interact with the operating system at a low level, manipulate files, execute processes, or communicate with external services. For this reason, even a relatively simple script can pose significant security risks.

Risks associated with scripting may include unauthorized access to data, unintentional execution of dangerous operations, or exposing the system to attacks. For example, improperly handled input can allow the execution of malicious commands, while incorrectly set permissions can expose sensitive data.

From a design perspective, it is essential to consider security from the very beginning of development. Security should not be an afterthought but an integral part of the design. This means identifying potential risks, minimizing them, and implementing mechanisms to prevent their exploitation.

## 2. Handling Sensitive Data

Scripts often work with sensitive data such as login credentials, API keys, or authentication tokens. These data represent a critical security element, as their leakage can lead to unauthorized access to systems or services.

One of the most common mistakes is storing sensitive data directly in the source code. This approach is particularly unsuitable when the script is shared, versioned, or stored in a repository. An attacker who gains access to the script can exploit this data.

A safer solution is to separate configuration from the script logic. Sensitive data should be stored in environment variables or external configuration files with restricted access. This approach increases flexibility while reducing the risk of compromise.

Additionally, it is important to ensure the protection of this data during transmission and storage. Using encrypted protocols and limiting access rights are basic measures that should be part of every design.

## 3. Input Validation and Error Protection

Input validation is one of the most important mechanisms for ensuring the correct and secure operation of a script. A script should never assume that input data is correct or safe.

Unvalidated input can lead to several issues, including incorrect data processing, script failure, or security vulnerabilities. In extreme cases, it can allow injection attacks, where malicious code is inserted into the script.

Example of basic validation:

<div class="bash-code-example">
<pre><code>if [ -z "$1" ]; then
    echo "Missing parameter"
    exit 1
fi
</code></pre>
</div>

When designing validation, it is necessary to:

- Verify the presence of inputs,
- Check their format and range,
- Restrict allowed characters or values,
- Handle edge cases.

Validation should be implemented as early as possible after receiving input to minimize the risk of incorrect processing in other parts of the script.

## 4. Principle of Least Privilege

The principle of least privilege is one of the fundamental security principles in software engineering. It means that a script should have only the permissions necessary to perform its task.

Running scripts with excessive permissions, such as as an administrator or root, increases the risk that the script will perform operations that can damage the system or expose sensitive data. In the event of an error or attack, such a script can have a much greater impact.

Therefore, it is necessary to analyze what permissions are truly needed during design and limit these permissions to the minimum. This approach reduces potential damage and increases system security.

## 5. Best Practices in Writing Scripts

Best practices represent a set of rules that lead to the creation of high-quality, clear, and maintainable code. Adhering to these practices has a significant impact on the quality of the final solution.

Key principles include using clear variable and function names that reflect their purpose. Equally important is dividing the code into smaller parts, which increases its clarity and allows for easier testing.

Another important aspect is documenting the code, which helps to understand its logic and facilitates its maintenance. Separating logic from input and output increases flexibility and allows for easier script extension.

Adhering to these principles leads to the creation of professional code suitable for team collaboration.

## 6. Maintainability and Readability of Code

Maintainability refers to the ability of a script to be easily modified and extended over time. Code readability is one of the main factors affecting its maintainability.

Code that is unclear or poorly structured is prone to errors, and its modification is time-consuming. Therefore, it is important to maintain a consistent writing style, use appropriate indentation, and logically organize the individual parts of the script.

From a design perspective, it is advisable to:

- Use comments to explain complex parts,
- Avoid unnecessarily complex constructions,
- Maintain a consistent script structure,
- Regularly refactor the code.

Maintainable code allows for easier fixes, extensions, and long-term script usage.

## 7. Deploying Scripts in Practice

Deploying a script involves its use in a real environment, where it must function reliably and securely. This step includes not only running the script but also integrating it into the existing system.

When deploying, it is necessary to consider the environment in which the script will run, resource availability, and the method of its execution. Task planning, monitoring, and logging play an important role, enabling the tracking of execution progress and identifying issues.

The script should be prepared for long-term use and include mechanisms for error handling, data security, and behavior monitoring. Only then can its reliable operation in practice be ensured.
