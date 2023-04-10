export const onOpen = () => {
  SpreadsheetApp.getUi().createAddonMenu().addItem("Import Data", 'sidebar').addToUi();
  Logger.log('Start onOpen function');
};

export const sidebar = () => {
  var html = HtmlService.createTemplateFromFile("sidebar").evaluate();
  html.setTitle("Data Connector");
  SpreadsheetApp.getUi().showSidebar(html);
};

export const getContent = (formData) => {
  Logger.log('formData===>', formData);
  const url = formData.link;
  const options = {
    'method': formData.method,
    'headers': {
      'Authorization': 'Bearer ' + ScriptApp.getOAuthToken() // Set any necessary headers
    }
  };
  const response = UrlFetchApp.fetch(url, options).getContentText();
  const data = JSON.parse(response);
  displayDataOnSheet(data);
  Logger.log(data);
  return data;
};

export const displayDataOnSheet = (data) => {
  if (data === null || data === {}) {
    var ui = SpreadsheetApp.getUi();
    ui.alert('Failed. Please input correct info!');
    return;
  }
  const sheet = SpreadsheetApp.getActiveSheet();
  // Convert the data to a 2D array
  const keys = data.map((obj) => Object.keys(obj));
  const rows = data.map(obj => Object.values(obj));
  rows.unshift(keys[0]);
  // Clear any existing data on the sheet
  sheet.getDataRange().clear();
  // Set the new data on the sheet
  const startRow = 1;
  const startCol = 1;
  const numRows = rows.length;
  const numCols = rows[0].length;
  sheet.getRange(startRow, startCol, numRows, numCols).setValues(rows);
  // set alert
  var ui = SpreadsheetApp.getUi();
  ui.alert('Success loading data!');
}