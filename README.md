# core_oauth2_server

[中文](http://review.xiaoyun.com/diffusion/21/browse/master/README-CN.md?as=remarkup)

### Install project dependence
```
npm i
```

### Run the project for the first time
```
npm run build
```

Create dbName `sso-server` of PostgreSQL, and execute pg.sql file or execute pg_strcut_only.sql file and run  `npm run initdb`

### Develop the project
```
npm run dev
```

and

```
npm run watch-ts
```

### Authorization Flow

Put this directly into your browser

```
http://localhost:3000/dialog/authorize?redirect_uri=http://localhost:3000&response_type=code&client_id=rmk
```

You should then get back decision option. The decision option will have the text and two buttons of

```
Hi Vincent W

RMK is requesting access to your account.

Do you approve?
[Allow] [Deny]
```

Click the [Allow] button and you will be redirected back to your above redirect_uri with the code attached as a query parameter like so

```
http://localhost:8998/?code=7HMEo1VA1xVS6EkJ
```

That's your authorization code. You will need to exchange that for a token. Go to your Postman or Paw and do a POST using the URL of

```
http://localhost:8998/oauth/token
```

The Raw payload of:

```
code=7HMEo1VA1xVS6EkJ&redirect_uri=http://localhost:8998&client_id=rmk&client_secret=rmk&grant_type=authorization_code
```

And set your content-type to: `application/x-www-form-urlencoded`

Then you'll get back your token which will look like this:

```
{
access_token: "nvhxw0MQf9CPbT2fr8FN4uUvGCSmCE2MiTIo14mniaaI5lJiLUwhs1OJc1d6blyJVFfPjlyFX0BhmCgJicpCdfoxJPbsYzl34FLKQDfRjC4uB9F9LlPoMmRrd98g8HN1pqCs6LYMNV24QXfvar87bSKx8f1K5F1gyWsgHbiaa9DpyHNC0NmaXz1ojDprw0aCfGlbZ6osvMng9tTWR1LmegtEJrHslPvRIq0CPXiS2l81VPAPNLUgDYivSnzEY0q7"
token_type: "bearer"
}
```

From there you exchange that for access to a resource. We'll access the api/userinfo resource. In your Advanced Rest Client use this URL with GET:

```
http://localhost:8998/api/userinfo
```

In the header section add the key of Authorization with the value of your access_token. It will look like this in Raw

```
Authorization: Bearer nvhxw0MQf9CPbT2fr8FN4uUvGCSmCE2MiTIo14mniaaI5lJiLUwhs1OJc1d6blyJVFfPjlyFX0BhmCgJicpCdfoxJPbsYzl34FLKQDfRjC4uB9F9LlPoMmRrd98g8HN1pqCs6LYMNV24QXfvar87bSKx8f1K5F1gyWsgHbiaa9DpyHNC0NmaXz1ojDprw0aCfGlbZ6osvMng9tTWR1LmegtEJrHslPvRIq0CPXiS2l81VPAPNLUgDYivSnzEY0q7s
```

You should then get back your user id like so:

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