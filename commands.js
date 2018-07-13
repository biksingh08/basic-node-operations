const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function errorHandler () {
  console.log("invalid command");
}

//where we will store our commands
function evaluateCmd(userInput) {
 //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];
  switch (command) {
       case "echo":
      //we will add the functionality of echo next within the object commandLibrary
       commandLibrary.echo(userInputArray.slice(1).join(" "));
       break;

       case "cat":
       commandLibrary.cat(userInputArray.slice(1));
       break;

       case "head":
       commandLibrary.head(userInputArray.slice(1));
       break;

       case "tail":
       commandLibrary.tail(userInputArray.slice(1));
       break;

       default: errorHandler();
       break;

   }
}

//where we will store the logic of our commands
const commandLibrary = {
  "echo": function(userInput) {
    done(userInput);
 },
 "cat": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data) => {
          if (err) throw err;
          done(data);
      });
  },
  "head": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           var dataLines = data.toString().split("\n");
           var resultData = "";
           for(var i = 0; i < 10; i++){
             resultData += dataLines[i];
             resultData += "\n";
           }
           done(resultData.toString());
       });
   },
   "tail": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var dataLines = data.toString().split("\n");
            var resultData = "";
            var i = dataLines.length - 10;
            for(var i; i < dataLines.length; i++){
              resultData += dataLines[i];
              resultData += "\n";
            }
            done(resultData.toString());
        });
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
