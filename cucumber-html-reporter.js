const reporter = require("cucumber-html-reporter");
const fs = require("fs");
const moment = require("moment");

const reportsPath = "./cypress/reports";
const metadataFile = `${reportsPath}/metadata.json`;

fs.readFile(metadataFile, "utf-8", (error, metadata) => {
  if (error) {
    throw new Error(`An error occurred while reading file: "${metadataFile}"!`);
  } else {
    const data = JSON.parse(metadata);

    const options = {
      theme: "hierarchy",
      jsonDir: "cypress/reports",
      output: `cypress/reports/${moment().format("YYYY-MM-DD_h-mm-ssa")}_${data.browser}_aliexpress-report.html`,
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      launchReport: true,
      ignoreBadJsonFile: true,
      metadata: {
        "App Version": "1.0.0",
        "Test Environment": "QA",
        Browser: `${data.browser} v${data.browserVersion}`,
        Platform: data.platform,
        Parallel: "Scenarios",
        Executed: "Locally",
      },
    };

    reporter.generate(options);

    // Deletes all the json files inside the reports directory
    fs.readdirSync(reportsPath)
      .filter(file => /[.]json$/.test(file))
      .map(file => fs.unlinkSync(`${reportsPath}/${file}`));
  }
});
