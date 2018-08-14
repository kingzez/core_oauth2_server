### Health check 'curl /ping'
FROM reg.yunpro.cn/bjwjh/node:10.0.0

WORKDIR /app

ADD ./package.json /app/
ADD ./package-lock.json /app/
ADD ./dist /app/dist
ADD ./views /app/views


RUN \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN npm i --only=production --registry https://registry.npm.taobao.org

ENV PORT=8998
ENV NODE_ENV='production'
ENV DB_NAME='oauth2_server'
ENV DB_HOSTNAME='10.11.3.137'
ENV DB_PORT='5432'
ENV SESSION_HOST='http://10.11.3.137:11104'

EXPOSE 8998
CMD node ./dist/server.js
