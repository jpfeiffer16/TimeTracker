#!/usr/bin/node

const fs = require('fs');

function replaceCargoToml(newVersion, path) {
  let cargoText = fs.readFileSync(path, 'utf8');
  const cargoTomlRegex = /version = "(\d\.\d.\d)"/;
  
  let cargoMatch = cargoText.match(cargoTomlRegex);
  if (cargoMatch) {
    cargoText = cargoText.replace(cargoTomlRegex, `version = "${ newVersion }"`);
    fs.writeFileSync(path, cargoText, 'utf8');
  }
}

function replacePackageJson(newVersion, path) {
  let text = fs.readFileSync(path, 'utf8');
  const packageJsonRegex = /"version": "(\d\.\d.\d)"/;
  
  let match = text.match(packageJsonRegex);
  if (match) {
    text = text.replace(packageJsonRegex, `"version": "${ newVersion }"`);
    fs.writeFileSync(path, text, 'utf8');
  }
}

let newVersion;

if (process.argv.length > 2) {
  newVersion = process.argv[2];
} else { 
  throw 'Must include version';
}

//Client Version
replacePackageJson(newVersion, './client/package.json');

//Server Version
replacePackageJson(newVersion, './server/package.json');

//Server Native Version
replaceCargoToml(newVersion, './server_native/Cargo.toml');
