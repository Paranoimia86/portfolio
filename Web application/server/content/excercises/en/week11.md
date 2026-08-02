# Exercise 11: Networking and External Resources

Scripting in modern IT environments often involves communication with external systems over a network. Scripts no longer operate in isolation but integrate various services, APIs, and cloud platforms. This capability enables the automation of complex processes and the interconnection of multiple systems.

The foundation of network communication is the HTTP protocol, which operates on a client-server principle. A script acts as a client, sending requests (e.g., GET, POST), while the server's response contains data and a status code. Proper handling of status codes is key to the robustness of the solution.

An API serves as an interface for communication between systems. Working with APIs involves not only sending requests but also processing responses (most often in JSON format) and handling authentication. Security is critical—sensitive data must not be stored directly in the script.

The network environment is unpredictable, so scripts must include mechanisms for error handling, such as retries, timeouts, or response validation. A well-designed script can respond to outages and continue functioning.

Practical use lies primarily in system integration—a script retrieves data, processes it, and passes it on. Such solutions form the foundation of modern automation and DevOps processes.

<h1 class="exercise-topic"> Task 1: HTTP GET Request </h1>

<div class="exercise">

Design a script that sends an HTTP GET request to an API, processes the response, and outputs selected data.

</div>

<h1 class="exercise-topic"> Task 2: Status Code Check </h1>

<div class="exercise">

Create a script that:

- sends a request to a server,
- checks the HTTP status code,
- decides on the next steps based on the result.

</div>

<h1 class="exercise-topic"> Task 3: Working with REST APIs </h1>

<div class="exercise">

Design a script that:

- retrieves data from a REST API,
- processes it,
- filters specific items.

</div>

<h1 class="exercise-topic"> Task 4: JSON Data Processing </h1>

<div class="exercise">

Create a script that:

- reads a JSON response,
- extracts specific values,
- performs an operation on them.

</div>

<h1 class="exercise-topic"> Task 5: Authentication </h1>

<div class="exercise">

Design a script that:

- communicates with an API requiring authentication,
- uses a token or API key,
- ensures secure storage of credentials.

</div>

<h1 class="exercise-topic"> Task 6: Retry Mechanism </h1>

<div class="exercise">

Create a script that:

- attempts a network operation,
- retries in case of failure,
- terminates after a certain number of attempts.

</div>

<h1 class="exercise-topic"> Task 7: Timeout and Robustness </h1>

<div class="exercise">

Design a script that:

- sets a timeout for a request,
- handles situations where the server does not respond.

</div>

<h1 class="exercise-topic"> Task 8: System Integration </h1>

<div class="exercise">

Create a script that:

- retrieves data from an API,
- transforms it,
- saves it to a local file.

</div>

<h1 class="exercise-topic"> Task 9: Secure Data Handling </h1>

<div class="exercise">

Design a script that:

- uses environment variables to store sensitive data,
- utilizes them when communicating with an API.

</div>

<h1 class="exercise-topic"> Task 10: Comprehensive Integration Script </h1>

<div class="exercise">

Design a script that:

- communicates with an API,
- processes data,
- implements error handling, retries, and logging.

</div>
