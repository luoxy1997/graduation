# suixingpay-fe-admin

基于 
[react@16.x](https://reactjs.org/)
[react-router@4.x](https://reacttraining.com/react-router/) 
[redux@3.x](http://redux.js.org/) 
[antd@3.x](http://ant-design.gitee.io/index-cn) 
的pc管理系统框架

## 相关文档

- [models(redux)](http://192.168.120.68/root/suixingpay-fe-admin/blob/master/src/models/README.md)
- [layouts(布局)](http://192.168.120.68/root/suixingpay-fe-admin/blob/master/src/layouts/README.md)
- [router(路由)](http://192.168.120.68/root/suixingpay-fe-admin/blob/master/src/router/README.md)

## 依赖
1. [nodejs v8.10.0](https://nodejs.org/en/)，推荐使用[nvm](https://github.com/creationix/nvm)管理node版本
1. [yarn v1.3.2](https://yarnpkg.com/zh-Hans/)

## 安装 & 启动

需要切换成公司npm私服

可以使用[nrm](https://github.com/Pana/nrm)管理npm registry

推荐使用yarn

```
$ npm set registry http://172.16.132.188:4873/

# if you use HTTPS, add an appropriate CA information
# ("null" means get CA list from OS)
$ npm set ca null

$ yarn config set registry http://172.16.132.188:4873/
```

下载
```
$ git clone http://192.168.120.68/root/suixingpay-fe-admin.git your-project-name
```

安装依赖
```
$ cd your-project-name
$ yarn
或
$ npm install 
```

开发模式运行
```
$ yarn start
或
$ npm run start 
```

开发模式以https方式运行

```
$ HTTPS=true yarn start
或
$ HTTPS=true npm run start
```

构建生产
```
$ yarn build
或
$ npm run build 
```

## 项目结构
```
.
├── dist            // 构建生成文件，用于发布
├── generator       // 代码生成工具 
├── public          // 静态文件存放目录，不经过webpack打包但是项目中还用到的文件
├── src             // 项目源码目录，开发主要在这个目录下进行
│   ├── commons     // 公共方法
│   ├── components  // 通用业务组件
│   ├── e2e         // 端对端测试
│   ├── layouts     // 布局
│   ├── mock        // mock数据
│   ├── models      // redux 封装，模块，提供数据
│   ├── pages       // 各个业务模块对应的页面
│   ├── router      // 路由相关
│   ├── App.jsx     // 项目入口组件
│   ├── index.ejs   // 入口html模版文件
│   ├── index.less  // 全局样式，不要轻易编写全局样式
│   ├── polyfill.js // 项目中使用到的一些polyfill
│   └── theme.js    // 主题变量
└── tests           // 测试用的一些脚本
```

## 连接后端
开发时通过在.roadhogrc文件中[配置proxy](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually)，与后端进行连接;
生产环境通过nginx进行配置；

### 开发环境
.roadhogrc文件中：
```
"proxy": {
    "/api": {
      "target": "http://192.168.0.103:8080"
    }
}
```
注：`api` 为前后端约定的请求地址前缀，一般axios`baseURL`也配置成 `api` ，具体以团队约定为准。


## ESLint 说明
如果前端项目，不是git根目录，在提交的时候，会报错 `Not a git repository`

修改package.json，lint-staged 如下即可
```
"lint-staged": {
    "gitDir": "../",
    "linters": {
        "**/*.{js,jsx}": "lint-staged:js",
        "**/*.less": "stylelint --syntax less"
    }
},
```
### 生产环境
前后端分离 ngnix配置 仅供参考：

js css static 这三个目录中的文件可以设置为强缓存：expires 10y;


```
# 后端服务地址
upstream api_service {
  server localhost:8080;
  keepalive 2000;
}

server {
    listen       80;
    server_name  www.shubin.wang shubin.wang;
    root /home/admin/deploy/react-web-boilerplate/dist;
    location / {
      index index.html;
      try_files $uri $uri/ /index.html; #react-router 防止页面刷新出现404
    }

    # 静态文件缓存，启用Cache-Control: max-age、Expires
    location ~ ^/(css|js|static)/ {
      expires 10y;
      access_log off;
      add_header Cache-Control "public";
    }
    
     # 代理ajax请求
    location ^~/api {
       proxy_pass http://api_service/;
       proxy_set_header Host  $http_host;
       proxy_set_header Connection close;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-Server $host;
    }
}
```

## TODO

- [ ] babel 升级到7 使用 [optional-chaining](https://www.npmjs.com/package/babel-plugin-transform-optional-chaining)简化取值判断;
- [ ] 前端监控，异常捕获
- [x] 各个模块内部独立xxx.modal.js，通过脚本生成modal；
- [ ] redux库重构，存储同步改成中间件、去掉page相关内容
