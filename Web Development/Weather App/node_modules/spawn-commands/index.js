/*!
 * spawn-commands <https://github.com/jonschlinkert/spawn-commands>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var eachSeries = require('async-each-series');
var child = require('child_process');
var win32 = process.platform === 'win32';

function commands(cmds, cb) {
  cmds = Array.isArray(cmds) ? cmds : [cmds];

  eachSeries(cmds, function (cmd, next) {
    var command = win32 ? 'cmd' : cmd.cmd;
    var args = normalizeArgs(cmd);

    child.spawn(command, args, {stdio: 'inherit'})
      .on('error', next)
      .on('close', next);
  }, cb);
}

commands.sync = function (cmds) {
  cmds = Array.isArray(cmds) ? cmds : [cmds];

  cmds.forEach(function (cmd) {
    var command = win32 ? 'cmd' : cmd.cmd;
    var args = normalizeArgs(cmd);
    child.spawnSync(command, args, {
      stdio: 'inherit'
    });
  });
};

function normalizeArgs(obj) {
  var args = [obj.cmd + ' ' + obj.args.join(' ')];
  return win32 ? ['/c'].concat(args) : obj.args;
}

/**
 * Expose `spawnCommands`
 */

module.exports = commands;
