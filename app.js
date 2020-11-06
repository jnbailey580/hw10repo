const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
var crewMembers = [];
var idArray =[];

function appLayout() {

    function createManager() {
      console.log("Create your team");
      inquirer.prompt([
        {
          type: "input",
          name: "managerName",
          message: "insert your manager's name",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "insert at least one character.";
          }
        },
        {
          type: "input",
          name: "managerId",
          message: "insert manager's id",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "insert a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Enter manager's email",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "insert valid email address.";
          }
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "insert manager's office number",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              return true;
            }
            return "insert a positive number greater than zero.";
          }
        }
      ]).then(function(response)  {
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
        crewMembers.push(manager);
        idArray.push(response.managerId);
        createManager();
      });
    }
  
    function startTeam() {
  
      inquirer.prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "what members would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            " Don't add any more members"
          ]
        }
      ]).then(function(list) {
        switch(list.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
        }
      });
    }
  
    function addEngineer() {
      inquirer.prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Insert engineer's name.",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "insert at least one character.";
          }
        },
        {
          type: "input",
          name: "engineerId",
          message: "insert engineer's id",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              if (idArray.includes(answer)) {
                return "This ID is taken. Please insert a different number.";
              } else {
                return true;
              }
                          
            }
            return "insert a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "insert engineer's email",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "insert engineer's GitHub username",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "insert at least one character.";
          }
        }
      ]).then(function(response) {
        const engineer = new Engineer(response.engineerName, response.engineerId, answers.engineerEmail, response.engineerGithub);
        teamMembers.push(engineer);
        idArray.push(response.engineerId);
        startTeam();
      });
    }
  
    function addIntern() {
      inquirer.prompt([
        {
          type: "input",
          name: "internName",
          message: "insert intern's name",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "insert at least one character.";
          }
        },
        {
          type: "input",
          name: "internId",
          message: "insert intern's id",
          validate: answer => {
            const pass = answer.match(
              /^[1-9]\d*$/
            );
            if (pass) {
              if (idArray.includes(answer)) {
                return " ID is  taken.  insert a different number.";
              } else {
                return true;
              }
                          
            }
            return "insert a positive number greater than zero.";
          }
        },
        {
          type: "input",
          name: "internEmail",
          message: "insert intern's email",
          validate: answer => {
            const pass = answer.match(
              /\S+@\S+\.\S+/
            );
            if (pass) {
              return true;
            }
            return "insert a valid email address.";
          }
        },
        {
          type: "input",
          name: "internSchool",
          message: "insert intern's school?",
          validate: answer => {
            if (answer !== "") {
              return true;
            }
            return "insert at least one character.";
          }
        }
      ]).then(function(response)  {
        const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
        teamMembers.push(intern);
        idArray.push(response.internId);
        startTeam();
      });
    }
  
    function startTeam() {
      console.log(crewMembers)
      // Create the output directory if the output path doesn't exist
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(crewMembers), "utf-8");
    }
  
    createManager();
  
  }
  
  
  appLayout();
  
