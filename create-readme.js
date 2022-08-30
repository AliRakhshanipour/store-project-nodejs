//  Default options, explained in documentation
// options = {
//   debug: false,
//   silent: false,
//   encoding: "utf-8",
//   addDescription: "",
//   addUsage: "",
//   modules: ["CommonJS"],
//   unpkg: false,
//   licenseFile: "LICENSE",
//   badges: [
//     "npm-version",
//     "travis",
//     "coveralls",
//     "dependencies",
//     "devDependencies",
//     "gitter",
//   ],
//   branch: "master",
//   replaceModuleReferences: true,
//   filename: "README.md",
// };

const ReadmeCreator = require("create-readme");

const readmeCreator = new ReadmeCreator(options);
// const data = readmeCreator.parse();
// const content = readmeCreator.render(data);
// const readme = readmeCreator.write(content);
// // readme.catch((err) => {
// //   console.log(err);
// // });
// process.exitCode = 1;
