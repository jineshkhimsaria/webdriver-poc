FROM ubuntu:16.04

ARG WORK_DIR
ENV PATH /${WORK_DIR}/node_modules/.bin:$PATH

COPY ${WORK_DIR}/*.json ${WORK_DIR}/
COPY ${WORK_DIR}/*.js ${WORK_DIR}/
COPY ${WORK_DIR}/pages/ ${WORK_DIR}/pages/
COPY ${WORK_DIR}/tests/ ${WORK_DIR}/tests/
COPY ${WORK_DIR}/*.yml ${WORK_DIR}/
COPY ${WORK_DIR}/*.sh ${WORK_DIR}/

WORKDIR /${WORK_DIR}/
RUN apt-get update && apt-get install -y build-essential wget curl openjdk-8-jdk firefox
RUN curl -o /usr/local/bin/jq http://stedolan.github.io/jq/download/linux64/jq && chmod +x /usr/local/bin/jq
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN chmod 755 nodesource_setup.sh && bash nodesource_setup.sh
RUN apt-get install -y nodejs 

RUN apt-get install -y libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libatspi2.0-0 libcairo2 libcups2 libdbus-1-3 fonts-liberation \
    dbus-x11 xfonts-base xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable \
    libxss1 lsb-release xdg-utils libnspr4

RUN cd /tmp && \
    wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i --force-depends google-chrome-stable_current_amd64.deb

RUN cd /${WORK_DIR} && npm install --silent && npm audit fix
CMD ["/usr/bin/npm", "run", "crossbrowser"]
