// import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";

const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs');

// Use inquirer to prompt the user for input
inquirer
    .prompt([
        {
            message: "Type in your URL: ",
            name: "URL",
        },
    ])
    .then((answers) => {
        const url = answers.URL;
        let name_png = Math.random();
        // Generate the QR code image and save it to qr_img.png
        const qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream(name_png + ".png"));

        // Save the URL to URL.txt
        fs.writeFile(name_png + ".txt", url, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error("Prompt couldn't be rendered in the current environment.");
        } else {
            console.error("Something else went wrong:", error);
        }
    });
