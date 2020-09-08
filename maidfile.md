## build

Build our main app

```bash
tsc && npm run copy-static-assets
```

## watch

Compile ts & watch compile

```bash
tsc -w
```

## dev

Develop this project

```bash
nodemon dist/server.js
```

## image

Build docker image

```bash
docker build -t wangzezhi/core_oauth2_server:latest .
```

## image:push

Push docker image

```bash
docker push wangzezhi/core_oauth2_server:latest
```