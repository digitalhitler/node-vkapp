'use strict';

/*
VkClient.js

@author Sergey S Petrenko <spetrenko@me.com>
@see https://github.com/sergpetrenko/node-vkapp
@class VkClient
@todo see README.md
 */

const util            = require('util'),
      EventEmitter    = require('events').EventEmitter,
      crypto          = require('crypto'),
      http            = require('http'),
      querystring     = require('querystring'),
      url             = require('url'),
      fs              = require('fs'),
      https           = require('https');

class VkClient {

  constructor(config) {

    this.config = config;

    Object.assign(this, EventEmitter.prototype);

    this._session = {};
    this._session.accessToken = false;
    this._session.secretGiven = false;
    this._session.userId = false;

    if(this.config.secureConnection === true) {
      this.transport = https;
      this.transportPort = 443;
    } else {
      this.transport = http;
      this.transportPort = 80;
    }

    this.ready = false;

  }

  authorize(params) {

    let self = this;
    return new Promise(function(resolve, reject) {
      self._session.accessToken = 'f8fc55a9d46787d037fcbe3e490d96d7fd984a1f4197ee729553ada9c8adf84c1c94ca3525eb1b6e82375';
      self._session.userId = '316558338';
      self._session.secretGiven = 'fc36cee60d2aca5861'; //@todo only in http(not s)
     // console.log(self);
      resolve(true);
    });
  }

  request(method, request) {
    let self = this;
    console.log('requesting');
    return new Promise(function(resolve, reject) {
      if(typeof method !== 'string') {
        reject();
      }
      request.access_token = self._session.accessToken;
      request.v = self._session.version;
      console.log('requested');
      let requestString = querystring.stringify(request);

      let options = {
        host: 'api.vk.com',
        port: self.transportPort,
        path: '/method/' + method,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      };

      let postRequest = this.transport.request(options, function(res) {

        console.log('requested');
        var apiResponse = "";
        res.setEncoding('utf8');

        res.on('data', function(chunk) {
          apiResponse += chunk;
          console.log('chunk');
        });

        res.on('end', function() {
          try {
            let response = JSON.parse(apiResponse);
            if (!response.error) {
              resolve({
                total: response.response.shift(),
                data: response.response
              });
            } else {
              reject(); // @todo: describe!
            }
          } catch(e) {
            reject(); // @todo: describe!
          }
        });
      }).on('error', function (e) {
        reject(); // @todo: describe
      });

      postRequest.write(requestString);
      postRequest.end();
    });
  }
}

module.exports = VkClient;

