const core = require('@actions/core');
const github = require('@actions/github');

try {
    // Get environment variables
    const useEnvVars = core.getInput('use-env-vars') === 'true';
    
    // Get user name from either env var or input
    let nameToGreet;
    if (useEnvVars) {
        nameToGreet = process.env.USER_NAME;
        if (!nameToGreet) {
            throw new Error('USER_NAME environment variable is not set but use-env-vars is true');
        }
    } else {
        nameToGreet = core.getInput('user-name');
        if (!nameToGreet) {
            throw new Error('user-name input is required');
        }
    }

    // Input validation
    if (nameToGreet.trim() === '') {
        throw new Error('Name cannot be empty');
    }
    
    if (nameToGreet.length > 50) {
        throw new Error('Name is too long (max 50 characters)');
    }

    // Get greeting format from env var or use default
    const greetingFormat = process.env.GREETING_FORMAT || 'Hello {name}!';
    
    // Apply greeting format
    const contextVariables = {
        name: nameToGreet,
        repo: github.context.repo.repo,
        owner: github.context.repo.owner,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    // Replace variables in the greeting format with actual values
    let greeting = greetingFormat;
    for (const [key, value] of Object.entries(contextVariables)) {
        greeting = greeting.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
    
    // Output the greeting
    console.log(greeting);
    core.setOutput("greeting", greeting);
    
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}
