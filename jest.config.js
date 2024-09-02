export default {
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    reporters: [
      'default',
      ['jest-html-reporter', {
        pageTitle: 'Test Report',
        outputPath: './reports/test-report.html',
        includeFailureMsg: true,
        includeConsoleLog: true
      }]
    ]
  };
  