'use strict';

var mysql = require('mysql');
var async = require('async');
var fs = require('fs');
var mkdirp = require('mkdirp');
var _ = require('underscore');
var config = require('./config.json');

var filePaths = [
  config.path.table,
  config.path.sql,
  config.path.md
];

var tableTemp = {
  tableName:'',
  fields: [],
  keys: []
};

var fieldTemp = {
  Field: '',
  Type: '',
  Collation: '',
  Null: '',
  Key: '',
  Default: null,
  Extra: '',
  Comment: ''
};

var keyTemp = {
  Non_unique    : '',
  Key_name      : '',
  Column_name   : '',
  Type          : '',
  Comment       : '',
  Index_comment : ''
};

var descTemp = {
  Name: '',
  Engine: '',
  Comment: ''
};

//创建连接
var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
  // host     : 'localhost',
  // user     : 'root',
  // password : 'root',
  // database : 'gxd-jx'
});

async.waterfall([
  // 尝试创建相关路径
  function (cb) {

    async.mapSeries(filePaths,
      function (item, callback) {
        mkdirp(item, callback);
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
    connection.query("SHOW TABLE STATUS" , function(err, rows) {
      if (err) {
          return cb(err);
        } else {
          var allKeyArr, // 需要的 key 转成数组形式
           mapRows; // 最终传递的 rows

          // console.log(rows);
          allKeyArr = _.allKeys(descTemp);

          // console.log(allKeyArr);
          //[ 'Name', 'Engine', 'Comment' ]

          mapRows = _.map(rows, function (item) {
            var cpItem =  _.extend({}, item);
            // var argArr = [cpItem].concat(allKeyArr);
            var needData = _.pick.apply(_, [cpItem].concat(allKeyArr));
            // console.log(needData);
            return needData;
          });

          // console.log(mapRows);

          fs.writeFile(config.path.all_tables,
              JSON.stringify(mapRows, null, "\t"),
              function (err) {
                  cb(err, mapRows);
            });

          // cb(null, mapRows);
        }
    });
  },
  // 获取create sql
  function (rows, cb) {
    async.mapSeries(rows,
      function (item, callback) {
        var tableName = item.Name;
        connection.query("SHOW CREATE TABLE " + tableName, function (err, _rows) {
          var create_sql =  _rows[0]['Create Table'].replace(/AUTO_INCREMENT=\d+\s/,"")+';';

          // console.log(create_sql);

          fs.writeFile(config.path.sql+tableName+'.sql', create_sql, function (err) {
                  callback(err, tableName);
            });

        });
      },
      function(err) {
        cb(err, rows);
      });
  },
  // 数据转json
  function (rows, cb) {

    async.mapSeries(rows,
      function (item, callback) {

        var tableName = item.Name;

        connection.query("SHOW FULL COLUMNS FROM " + tableName, function (err, _rows) {

          connection.query("SHOW KEYS FROM " + tableName, function (indexErr, _keyRows) {
            // console.log(tableName);
            // console.log('---');
            // console.log(_rows);

            // console.log(_keyRows);

            var allKeyArr, // 需要的 key 转成数组形式
             mapRows, // 最终传递的 _rows
             tableSaveData = {},
             indexKeyArr,
             mapIndexRows;

             /**
             * fields
             */
             allKeyArr = _.allKeys(fieldTemp);
             mapRows = _.map(_rows, function (item) {
               var cpItem =  _.extend({}, item);
               var needData = _.pick.apply(_, [cpItem].concat(allKeyArr));
               return needData;
             });
             _.extend(tableSaveData, tableTemp);

             /**
              * keys
              */
             indexKeyArr = _.allKeys(keyTemp);
             mapIndexRows = _.map(_keyRows, function (item) {
               var cpItem =  _.extend({}, item);
               var needData = _.pick.apply(_, [cpItem].concat(indexKeyArr));

                if(needData.Key_name === 'PRIMARY') {
                  needData.Type = 'PRIMARY';
                }else if(needData.Non_unique === 0) {
                  needData.Type = 'UNIQUE';
                }else {
                  needData.Type = 'INDEX';
                }

               return needData;
             });

             tableSaveData.tableName = tableName;
             tableSaveData.fields = mapRows;
             tableSaveData.keys = mapIndexRows;

            //  console.log(tableSaveData);

             fs.writeFile(config.path.table+tableName+'.json',
                 JSON.stringify(tableSaveData, null, "\t"),
                 function (err) {
                  return   callback(err, tableSaveData);
               });

          });



        });
    }, function(err, tableNames) {
      cb(err, tableNames);
    });

  }
], function (err) {
  connection.end();

  // fs.writeFile('data/all.js', JSON.stringify({'tmp':'123'}), function (err) {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log("Export Account Success!");
  //   });
  if(err) {
    throw err;
  }
});
