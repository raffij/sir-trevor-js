/*
* Ultra simple logging
*/

SirTrevor.log = function(message) {
  if (!_.isUndefined(window.console) && SirTrevor.DEBUG) {
    window.console.log(message);
  }
};