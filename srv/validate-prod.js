/* Copyright (c) 2014-2017 Richard Rodger and other contributors, MIT License */

var BASES = process.env.BASES.split(',')
var STATS_PORT = process.env.STATS_PORT || 8125
var STATS_HOST = process.env.STATS_HOST || 'localhost'

var Seneca = require('seneca')

Seneca({tag: 'validate', timeout: 99999})
  .test('print')

  .use('entity')
  .use('../validate.js', {
    host:STATS_HOST,
    port:STATS_PORT
  })

  .use('mesh', {
    pin: 'role:validate',
    bases: BASES,
    host: '@eth0',
    sneeze: {silent:false}
  })
