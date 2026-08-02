# Lecture 11: Networking and External Resources

## Lecture Objective

The objective of this lecture is to provide students with a comprehensive understanding of how scripts communicate with external systems over a network. The lecture focuses on designing solutions capable of retrieving, processing, and sending data in real-time. Emphasis is placed on reliability, security, and the ability to handle unpredictable network conditions.

## 1. Importance of Network Communication in Scripting

In modern IT environments, scripts no longer operate in isolation on a single system but increasingly communicate with external services, databases, or cloud platforms. This capability significantly expands their usability, enabling the integration of various systems and automation of complex processes.

A script can, for example, fetch data from a web API, process it, and then store it locally or send it to another service. Such solutions are the foundation of modern integration scenarios, where different systems communicate over a network.

From a design perspective, it is important to understand that the network environment is dynamic and unpredictable. Connection outages, response delays, or changes in data structure can occur. Therefore, a script must be designed to handle these situations without failure and respond appropriately.

## 2. HTTP Communication – Basic Principles

The foundation of communication between a script and an external system is the HTTP protocol, which defines how requests are sent and responses are received. Every communication follows the client-server principle, where the script acts as the client and the external system as the server.

The most commonly used methods are GET, for retrieving data, and POST, for sending data. Other methods, such as PUT or DELETE, are used when working with REST APIs.

In Bash:

<div class="bash-code-example">
<pre><code>curl https://api.example.com/data
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>Invoke-RestMethod -Uri "https://api.example.com/data"
</code></pre>
</div>

An important aspect of HTTP communication is status codes, which inform about the result of the request. For example, code 200 indicates success, while codes 4xx or 5xx signal client or server errors.

When designing scripts, it is essential to check these codes and use them to control the program's flow. Ignoring status codes can lead to incorrect data processing or the script continuing after an operation failure.

## 3. Working with APIs (Application Programming Interface)

APIs provide standardized interfaces that enable communication between different software systems. In the context of scripting, APIs are one of the most important tools because they allow access to external data and services.

Using APIs enables:

- Retrieving real-time data (e.g., weather, financial data)
- Communicating with cloud services
- Automating processes across multiple systems

Example:

<div class="bash-code-example">
<pre><code>curl https://api.example.com/users
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>Invoke-RestMethod -Uri "https://api.example.com/users"
</code></pre>
</div>

When working with APIs, several aspects need to be addressed. In addition to sending requests, it is important to understand the response structure, authentication methods, and service limitations, such as request rate limits.

From a design perspective, it is crucial to ensure that the script can adapt to API changes, such as changes in data format or service availability. This requires a flexible and robust design.

## 4. Processing Data from APIs (JSON, XML)

Data retrieved from APIs is most commonly in JSON or XML format, with JSON being the dominant format today. Proper processing of this data is key to its further use.

In Bash:

<div class="bash-code-example">
<pre><code>curl api | jq '.name'
</code></pre>
</div>

In PowerShell:

<div class="powershell-code-example">
<pre><code>$response = Invoke-RestMethod -Uri "https://api.example.com"
$response.name
</code></pre>
</div>

PowerShell provides a significant advantage by automatically converting JSON into objects, allowing easy access to individual values. Bash, on the other hand, works with text, requiring external tools for parsing.

When processing data, it is necessary to consider:

- Validating the structure (whether it contains expected fields)
- Handling missing or invalid values
- Transforming data into a suitable format

Improper data processing can lead to incorrect results or script failure.

## 5. Authentication and Security

When communicating with external systems, it is often necessary to verify the identity of the user or application. This process is called authentication and can take various forms, such as API keys, tokens, or username and password.

<div class="bash-code-example">
<pre><code>curl -H "Authorization: Bearer TOKEN" https://api.example.com
</code></pre>
</div>

<div class="powershell-code-example">
<pre><code>Invoke-RestMethod -Headers @{Authorization="Bearer TOKEN"}
</code></pre>
</div>

Security is a critical aspect of design because mishandling authentication data can lead to misuse. Sensitive data should not be stored directly in the script but managed through secure mechanisms, such as environment variables or specialized storage.

Additionally, encrypted communication (HTTPS) must be used to prevent data interception during transmission.

## 6. Handling Errors in Network Communication

Network communication is prone to various types of errors that can occur on the client, server, or network side. Common issues include connection outages, timeouts, or invalid responses.

When designing scripts, it is necessary to implement mechanisms to handle these situations. This includes checking status codes, implementing retries, or setting timeouts.

Without these mechanisms, a script may fail at the first problem, which is unacceptable in practice. A robust script should be able to respond to errors and continue operation if possible.

## 7. Practical Use – System Integration

One of the greatest advantages of scripting is the ability to integrate different systems into a single unit. Scripts can act as a connecting element between services that would otherwise not communicate.

In practice, a script can, for example:

- Retrieve data from an external API
- Process and format it as required
- Save the result or send it to another system

Such solutions are the foundation of modern IT architectures, where interoperability between systems is crucial.

When designing integration solutions, it is necessary to consider reliability, security, and performance. A script should be able to handle situations where one of the systems is unavailable and ensure consistent data processing.
