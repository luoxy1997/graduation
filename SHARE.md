# 管理系统架构分享

## 管理系统架构相关文档

- [models(redux)](http://192.168.120.68/root/suixingpay-fe-admin/blob/master/src/models/README.md)
- [layouts(布局)](http://192.168.120.68/root/suixingpay-fe-admin/blob/master/src/layouts/README.md)
- [router(路由)](http://192.168.120.68/root/suixingpay-fe-admin/blob/master/src/router/README.md)

## 所需依赖
1. [nodejs v8.10.0](https://nodejs.org/en/)，推荐使用[nvm](https://github.com/creationix/nvm)管理node版本
1. [yarn v1.3.2](https://yarnpkg.com/zh-Hans/)

## 安装 & 启动

组件、工具发布在公司的npm私服上，需要切换成公司npm私服进行依赖安装。

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
$ cd your-project-name # 进入项目根目录
$ yarn
或
$ npm install 
```

开发模式运行
```
$ yarn start
或
$ npm run start
 
浏览器访问：http://localhost:8000/
```

构建生产
```
$ yarn build
或
$ npm run build 
```

## 代码生成工具

### 安装 & 启动

```
# 全局安装工具
$ npm install sx-gen -g 

# 进入项目根目录
$ cd your-project-name

# 启动服务
$ sx-gen 

浏览器访问：http://localhost:5001/
```

## 相关文档

- [公司npm私服](http://172.16.132.188:4873/)
- [代码规范](http://172.16.60.168/standard/front/html_specification.html)
- [组件库sx-antd](http://172.16.132.188:5001/)
- [工具库sx-utils](http://172.16.132.188:5000/)
- [请求封装sx-ajax](http://172.16.60.168/framework/front/sx-ajax.html)
- [数据管理sx-redux](http://192.168.120.68/root/suixingpay-fe-admin/blob/master/src/models/README.md)


