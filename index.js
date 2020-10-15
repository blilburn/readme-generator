const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function userInput() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of this project?"
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description. What, why, and how?"
        },
        {
            type: "input",
            name: "installation",
            message: "Provide the instructions required to install your project:"
        },
        {
            type: "input",
            name: "usage",
            message: "Provide examples for use. (Include screenshots as needed)"
        },
        {
            type: "input",
            name: "credits",
            message: "List your collaborators(links to their GitHub profiles)"
        },
        {
            type: "checkbox",
            name: "license",
            message: "Select licenses used for the application:",
            choices: [
                "MIT License",
                "Apache License",
                "GNU License"
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter any guidelines for contribution:"
        },
        {
            type: "input",
            name: "tests",
            message: "Enter any instructions for testing:"
        },
        {
            type: "input",
            name: "questions1",
            message: "Enter your LinkedIn URL:"
        },
        {
            type: "input",
            name: "questions2",
            message: "Enter your GitHub Username:"
        }
    ]);
}

function createReadMe(answers) {
    return `
# ${answers.title}

## Description 

${answers.description}

## Table of Contents 

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contibuting](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation

${answers.installation}

## Usage 

${answers.usage}

## Credits

${answers.credits}

## License

${answers.license}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

LinkedIn: ${answers.questions1}

GitHub: ${answers.questions2}

`;
}

async function initialize() {

    try {
        const answers = await userInput();

        const readme = createReadMe(answers);

        await writeFileAsync("README.md", readme);

        console.log("Successfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
}

initialize();