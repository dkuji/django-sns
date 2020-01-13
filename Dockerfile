FROM node:13.5.0-stretch-slim as node
FROM kennethreitz/pipenv

ENV APP_HOME="/app"
ENV PROJECT="sns"

RUN apt-get update -qq && \
  apt-get install -y locales && \
  mkdir -p /${APP_HOME}

COPY . ${APP_HOME}

# YARN
ARG YARN_VERSION="1.21.1"
COPY --from=node /opt/yarn-v$YARN_VERSION /opt/yarn
COPY --from=node /usr/local/bin/node /usr/local/bin/
RUN ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn/bin/yarnpkg /usr/local/bin/yarnpkg

RUN cd ${APP_HOME} && \
  pipenv install && \
  pipenv install --dev && \
  yarn global add @vue/cli node-gyp && \
  yarn install && \
  yarn install --dev

WORKDIR ${APP_HOME}/${PROJECT}

CMD pipenv run start

EXPOSE 8000
