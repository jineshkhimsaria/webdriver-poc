FROM ubuntu:16.04

# Setting path & working directory
ARG WORK_DIR
ENV PATH /${WORK_DIR}/node_modules/.bin:$PATH
WORKDIR /${WORK_DIR}/
VOLUME  ${WORK_DIR}/logs:./logs
VOLUME  ${WORK_DIR}/reports:./logs/reports

# Copying required artifacts into docker
COPY ${WORK_DIR}/*.json ${WORK_DIR}/*.js ${WORK_DIR}/*.sh ./
COPY ${WORK_DIR}/pages/ ./pages/
COPY ${WORK_DIR}/tests/ ./tests/

# Install required libraries and apps
RUN apt-get update && apt-get install -y build-essential wget curl openjdk-8-jdk firefox && \
curl -o /usr/local/bin/jq http://stedolan.github.io/jq/download/linux64/jq && chmod +x /usr/local/bin/jq && \
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh && \
chmod 755 nodesource_setup.sh && bash nodesource_setup.sh 

# Install required libraries and apps
RUN apt-get install -y nodejs libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libatspi2.0-0 libcairo2 libcups2 libdbus-1-3 fonts-liberation \
    dbus-x11 xfonts-base xfonts-100dpi xfonts-75dpi xfonts-cyrillic xfonts-scalable \
    libxss1 lsb-release xdg-utils libnspr4

# Install google-chrome
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i --force-depends google-chrome-stable_current_amd64.deb

# Install node packages based on package.json
RUN npm install --silent && npm audit fix

# Run npm tests
CMD ["/usr/bin/npm", "run", "crossbrowser"]
