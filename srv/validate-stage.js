/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */

var PORT = process.env.PORT || 11000
var SYSTEM_PORT = process.env.SYSTEM_PORT || 9000
var SYSTEM_HOST = process.env.SYSTEM_HOST || 'localhost'
var STATS_PORT = process.env.STATS_PORT || 8125
var STATS_HOST = process.env.STATS_HOST || 'localhost'

var Seneca = require('seneca')

Seneca({tag: 'repl'})
  .test('print')
  .listen(PORT)

  .use('entity')
  .use('../validate.js', {
    host:STATS_HOST,
    port:STATS_PORT
  })

  .client({host:SYSTEM_HOST, port:SYSTEM_PORT})


/*
  .ready(function () {
    this.act('role:validate,cmd:validate', console.log)
  })
*/
