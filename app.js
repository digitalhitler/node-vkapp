'use strict';

const VkClient = require('./VkClient');

const testConf = {
  clientId: '3140623',
  clientSecret: 'VeWdmVclDCtn6ihuP1nt',
  scopes: ['video'],
  secureConnection: true,
  version: '5.37'
};

let myVk = new VkClient(testConf);
myVk.authorize().then(
  resolve => vkReady(resolve),
  error => myVk.handleError(error)
);

function vkReady(result) {
  console.log(result);
}

//function vkReady(result) {
//  console.log('i am ready');
//  myVk.request("video.get", { album_id: 22, count: 200 })
//    .then(function(files) {
//      //console.log(files);
//
//      files.data.forEach(function(curr, index) {
//        //   console.log(curr);
//
//
//        let goodFile = curr.files.mp4_720 || curr.files.mp4_480 || curr.files.mp4_360;
//        let fname = curr.title || index;
//
//        console.log('wget ' + goodFile + ' -O ' + fname + '.mp4');
//        downloadQueue.push(goodFile);
//      });
//
//      console.log(downloadQueue);
//
//      downloadQueue.forEach(function(item, index) {
//        //console.log('wget ' + item + ' -O ' + index + '.mp4');
//      });
//    });
//}

//
//// App variables
//var DOWNLOAD_DIR = './downloads/';
//
//// Function to download file using HTTP.get
//var download_file_httpget = function(file_url) {
//  var options = {
//    host: url.parse(file_url).host,
//    port: 80,
//    path: url.parse(file_url).pathname
//  };
//
//  var file_name = url.parse(file_url).pathname.split('/').pop();
//  var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
//
//  http.get(options, function(res) {
//    res.on('data', function(data) {
//      file.write(data);
//    }).on('end', function() {
//      file.end();
//      console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
//    });
//  });
//};

const http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(5000, '127.0.0.1');
