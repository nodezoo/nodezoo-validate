/* Copyright (c) 2017 Richard Rodger and other contributors, MIT License */

var dgram = require('dgram')

var Wreck = require('wreck')


module.exports = function validate (options) {
  var seneca = this

  options.port = options.port || 8125
  options.host = options.host || '127.0.0.1'

  var client = dgram.createSocket('udp4')

  seneca.add( 'role:validate,cmd:validate', cmd_validate )


  function cmd_validate (msg, reply) {
    var res = {errors:[],services:{}}

    validate_web(this, res, done)
    validate_search(this, res, done)
    validate_info(this, res, done)
    validate_npm(this, res, done)
    validate_suggest(this, res, done)


    function done(service) {
      var data = new Buffer('deployrisk.service.validate.'+service+':'+
                            (res.services[service]?1:0)+'|g')

      console.log(data.toString())
      client.send(data, 0, data.length, options.port, options.host,
                  function(err) { if (err) seneca.log.warn(err) })

      if (5 == Object.keys(res.services).length) {
        reply(res)
      }
    }
  }


  function validate_suggest(seneca, res, done) {
    done = done.bind(null,'suggest')
    var q = 'vq'+((''+Math.random()).substring(2))
    seneca
      .gate()
      .act('role:suggest,cmd:add,query:'+q)
      .act('role:suggest,cmd:suggest,query:'+q.substring(0,q.length/2),
           function (err, out) {
             if(err) { 
               res.errors.push(err); 
               res.services.suggest = 0; 
               return done()
             }

             res.services.suggest = out[0] === q
             done()
           })
  }


  function validate_web(seneca, res, done) {
    done = done.bind(null,'web')

    Wreck.get(
      'http://web:8000/info/nid',
      function (err, result, payload) {
        if(err) { 
          res.errors.push(err); 
          res.services.web = 0; 
          return done()
        }

        res.services.web = ( -1 != payload.toString().indexOf('nid'))
        done()
      })
  }


  function validate_search(seneca, res, done) {
    done = done.bind(null,'search')
    done()
  }


  function validate_info(seneca, res, done) {
    done = done.bind(null,'info')
    done()
  }


  function validate_npm(seneca, res, done) {
    done = done.bind(null,'npm')
    done()
  }

}