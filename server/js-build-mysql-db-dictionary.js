'use strict';

var mysql = require('mysql');
var async = require('async');
var fs = require('fs');
var mkdirp = require('mkdirp');

var DATABASE = 'mianshi';

var filePaths = [
  'data/table_info',
  'data/sql',
  'data/md'
];

//创建连接
var connection = mysql.createConnection({
  host     : '182.92.163.224',
  user     : 'root',
  password : '9aa0f5be39',
  database : DATABASE
});

async.waterfall([
  // 尝试创建相关路径
  function (cb) {
    // mkdirp('data', function (err) {
    //     cb();
    // });
    async.mapSeries(filePaths,
      function (item, callback) {
        mkdirp(item, function (err) {
          callback(err);
        });
      },function(err) {
        cb(err);
    });

  },
  // 尝试连接数据库
  function( cb) {
    connection.connect(function(err) {
      return cb(err);
    });

  },
  function ( cb) {

    // connection.query('SELECT 1 + 1 AS solution', function(err, rows) {
    //   if (err) {
    //     return cb(err);
    //   } else {
    //     console.log('The solution is: ', rows[0].solution);
    //     cb();
    //   }
    // });

    connection.query("SHOW TABLE STATUS" , function(err, rows) {
      if (err) {
          return cb(err);
        } else {
          // console.log(rows);
          cb(null, rows);
        }
    });
  },
  function (rows, cb) {

    async.mapSeries(rows,
      function (item, callback) {

        var tableName = item.Name;

        connection.query("SHOW FULL COLUMNS FROM " + tableName, function (err, rows) {
          console.log(tableName);
          console.log('---');
          console.log(rows);
          callback(null, rows);
        });
    }, function(err, tableNames) {
      // console.log(tableNames);
      cb(err, tableNames);
    });

  }
], function (err) {
  connection.end();
  if(err) {
    throw err;
  }
});
