FROM kennethreitz/pipenv

ENV APP_HOME="/app"
ENV PROJECT="sns"

RUN apt-get update -qq && \
  apt-get install -y locales && \
  mkdir -p /${APP_HOME}

COPY . ${APP_HOME}

RUN cd ${APP_HOME} && \
  pipenv install

WORKDIR ${APP_HOME}/${PROJECT}

CMD pipenv run start

EXPOSE 8000
