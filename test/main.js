var serve = require('../');
var http = require('http');
var https = require('https');
var fs = require('fs');
var should = require('should');
var assert = require('assert')

require('mocha');

describe('static webserver', function() {
  describe('serving', function() {
    this.timeout(10000);

    it('should serve content', function(done) {
      var fixture = fs.readFileSync('./test/fixtures/raw-response.txt').toString();

      serve('./test/server/')();

      http.get('http://localhost:3000/', function(res) {
        res.on('data', function(body) {
          body.toString().should.equal(fixture);

          done();
        });
      });
    });

    it('should serve directory', function (done) {
      serve({
        root: './test/',
        port: 3005
      })();

      http.get('http://localhost:3005/', function(res) {
        res.on('data', function(body) {
          body.toString().should.match(/main\.js/)
          done();
        });
      });
    })

    it('should be able to inject html', function(done) {
      var fixture = fs.readFileSync('./test/fixtures/modified-response.txt').toString();

      serve({
        root: './test/server/',
        port: 3001
      })();

      http
        .request(
          {
            hostname: 'localhost',
            port: 3001,
            method: 'GET',
            headers: {'accept': 'text/html'}
          },
          function(res) {
            res.on('data', function(body) {
              assert(body.toString().indexOf(fixture) !== -1)
              done();
            });
          }
        )
        .end();
    });

    it('should allow using a specific hostname', function(done) {
      var fixture = fs.readFileSync('./test/fixtures/raw-response.txt').toString();

      serve({
        hostname: '127.0.0.1',
        root: './test/server/',
        livereload: false,
        port: 3002
      })();

      http
        .request(
          {
            hostname: '127.0.0.1',
            port: 3002,
            method: 'GET',
            headers: {'accept': 'text/html'}
          },
          function(res) {
            res.on('data', function(body) {
              body.toString().should.equal(fixture);
              done();
            });
          }
        )
        .end();
    });

    it('should serve content over https', function(done) {
      var fixture = fs.readFileSync('./test/fixtures/raw-response.txt').toString();

      serve({
        root: './test/server/',
        port: 3003,
        livereload: false,
        https: true
      })();

      https
        .request(
          {
            hostname: 'localhost',
            port: 3003,
            method: 'GET',
            headers: {'accept': 'text/html'},
            rejectUnauthorized: false // trust self signed cert
          },
          function(res) {
            res.on('data', function(body) {
              body.toString().should.equal(fixture);
              done();
            });
          }
        )
        .end();
    });
  });
});
