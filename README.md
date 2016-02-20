# database dictionary build 快速创建数据库字典

### What Can I do ?

1. 我们只需要一款浏览器 (没错!我说的是 __浏览器__ 不是ie! ^.^ )
2. 支持语言 node.js / php
3. 支持数据库 MySQL
4. 如果需要团队共同维护一个项目管理的数据字典
5. 碰巧你和我一样,都厌恶了 Word
6. 如果你更喜欢 用URL 展示你的demo
7. 更快,生成`.json`数据,而不是去执行查看命令

给我一个浏览器,一个运行脚本环境,还你一个简洁清晰的数据字典

#### 组成结构

1. Angular.js 主要负责路由 和 过滤,以及页面的渲染
2. Bootstrap 页面css
3. `.json` 所有数据存储,最后都以一个 `.json`文件的形式

#### 文件结构

```
database_dictionary_build/
├── dist/
|   ├── images/
|   ├── scripts/
|   ├── server/
|   ├── styles/
|   ├── views/
|   ├── fonts/
|   |   ├── lato/
|   |   └── glyphicons/
|   ├── database_dictionary_build.zip
|   ├── README.MD
|   └── index.html
├── app/
|   ├── images/
|   ├── scripts/
|   |   ├── controllers/
|   |   ├── directives/
|   |   ├── filters/
|   |   ├── services/
|   |   ├── router.js
|   |   └── app.js
|   ├── styles/
|   ├── views/
|   ├── index.html
|   └── robots.txt
├── server/
|   ├── config.json
|   ├── js-build-mysql-db-dictionary.js
|   └── php-build-mysql-db-dictionary.php
└── test/
    ├── spec/
    |   ├─ controllers/
    |   ├─ filters/
    |   └─ services/
    ├── .jshintrc
    └── karma.conf.js
```

#### 初衷

项目调整阶段时,数据库变动较为频繁, 碰巧新人加入而表缺少注释, 且一个库多达 100多个表,致使新人熟悉数据机构接口更加困难.  
excel 面向普通用户的, 作为程序员就应该用程序员的方式.  
Anyway 最终我的方案是 php/node == build ==> `.json` 文件,再有 ng 加载出来.  
从而大家只要在 目标数据库上加 __注释__,或者修改结构数据. 再执行生成脚本 就可以更新 `.json`文件.  


#### 原型

从数据库中获取建表语句  

生成 相应的json 文件  



#### 产品规划

1. 后台生成
2. 前台view
3. 引导页



### How to use ?

1. 配置 `server/config.json` 数据库信息
2. 执行 `node`/`php` 脚本  
3. 访问 `相应目录`
4. 支持模糊搜索
