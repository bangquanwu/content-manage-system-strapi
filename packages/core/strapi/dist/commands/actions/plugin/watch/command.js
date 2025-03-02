"use strict";
const helpers = require("../../../utils/helpers.js");
const action = require("./action.js");
const command = ({ command: command2 }) => {
  command2.command("plugin:watch").description("Watch & compile your strapi plugin for local development.").option("-d, --debug", "Enable debugging mode with verbose logs", false).option("--silent", "Don't log anything", false).action(helpers.runAction("plugin:watch", action));
};
module.exports = command;
//# sourceMappingURL=command.js.map
