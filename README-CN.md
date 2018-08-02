# core_oauth2_server

[Englist](http://review.xiaoyun.com/diffusion/21/browse/master/README.md?as=remarkup)

### 安装项目依赖
```
npm i
```

### 第一次运行项目
```
npm run build
```
在 PostgreSQL 数据库下创建名为 `sso-server`后, 导入 pg.sql 文件 或 导入 pg_strcut_only.sql 并执行 `npm run initdb`

### 项目开发
```
npm run dev
```

和

```
npm run watch-ts
```

### 验证流程

浏览器直接访问

```
http://localhost:3000/dialog/authorize?redirect_uri=http://localhost:3000&response_type=code&client_id=rmk
```

页面返回决策选项，包括以下文字内容及两个按钮

```
Hi Vincent W

RMK 平台请求使用你的账户登录

是否允许？
[允许] [拒绝]
```

点击 [允许] 按钮，浏览器将重定向到上面的 redirect_uri 并带着 code 参数，如下
```
http://localhost:8998/?code=7HMEo1VA1xVS6EkJ
```

code 后就是授权码，需要使用授权码换取令牌。到 Postman 或 Paw 中向以下地址发一个 Post 请求

```
http://localhost:8998/oauth/token
```

Raw 内容为:


```
code=7HMEo1VA1xVS6EkJ&redirect_uri=http://localhost:8998&client_id=rmk&client_secret=rmk&grant_type=authorization_code
```

设置 content-type 为: `application/x-www-form-urlencoded`

之后会返回以下内容：

```
{
access_token: "nvhxw0MQf9CPbT2fr8FN4uUvGCSmCE2MiTIo14mniaaI5lJiLUwhs1OJc1d6blyJVFfPjlyFX0BhmCgJicpCdfoxJPbsYzl34FLKQDfRjC4uB9F9LlPoMmRrd98g8HN1pqCs6LYMNV24QXfvar87bSKx8f1K5F1gyWsgHbiaa9DpyHNC0NmaXz1ojDprw0aCfGlbZ6osvMng9tTWR1LmegtEJrHslPvRIq0CPXiS2l81VPAPNLUgDYivSnzEY0q7"
token_type: "bearer"
}
```

得到令牌后就可以请求用户信息及权限内容 `/api/userinfo`, 在 Postman 或 Paw 中向以下地址发 GET 请求

```
http://localhost:8998/api/userinfo
```

在 Header 中加 `Authorization` 字段

```
Authorization: Bearer nvhxw0MQf9CPbT2fr8FN4uUvGCSmCE2MiTIo14mniaaI5lJiLUwhs1OJc1d6blyJVFfPjlyFX0BhmCgJicpCdfoxJPbsYzl34FLKQDfRjC4uB9F9LlPoMmRrd98g8HN1pqCs6LYMNV24QXfvar87bSKx8f1K5F1gyWsgHbiaa9DpyHNC0NmaXz1ojDprw0aCfGlbZ6osvMng9tTWR1LmegtEJrHslPvRIq0CPXiS2l81VPAPNLUgDYivSnzEY0q7s
```

返回用户信息：

```
{
  userId: "1",
  username: "vincent",
  email: "admin@xiaoyun.com",
  scope: "*",
  ...
}
```

> Subsequent supplement ...