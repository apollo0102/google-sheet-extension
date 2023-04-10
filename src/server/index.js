import doGet from './webapp';
import getScriptToken from './controllers/ExampleController';
import { onOpen, sidebar, getContent, displayDataOnSheet } from './controllers/MainController';

// Expose public functions by attaching to `global`
global.doGet = doGet;
//global.getScriptToken = getScriptToken;
global.onOpen = onOpen;
global.sidebar = sidebar;
global.getContent = getContent;
global.displayDataOnSheet = displayDataOnSheet;
