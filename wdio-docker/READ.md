Running the tests with test inside WebdriverIO container with or without Selenium-grid container

In this directory we have Dockerfile of WebdriverIO image (wdio_ubuntu:9 present in ECR in AWS)

You have multiple options to execute the tests -

Option A. With WebdriverIO & Selenium Grid docker images - using existing docker image present in ECR & running docker-compose 

Pre-requisites -
1. docker                                               ------------ to run docker
2. docker-compose                                       ------------ to run docker-compose (multiple docker containers)                                        
3. aws-cli with ecr                                     ------------ to execute aws -cli & ecr commands (https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html)
4. user with ecr rights (eg. testautomation.user)      ------------ to download WebdriverIO docker image stored in ECR (wdio_ubuntu:9)

Steps -
1. sudo yum update -y
2. sudo amazon-linux-extras install -y docker
3. sudo service docker start
4. sudo usermod -a -G docker ec2-user
5. sudo curl -L https://github.com/docker/compose/releases/download/1.20.0/docker-compose-`uname -s`-`uname -m` -o /usr/bin/docker-compose
6. sudo chmod +x /usr/bin/docker-compose
7. LOGOUT & RELOGIN or restart the terminal
8. sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
9. unzip awscliv2.zip
10. sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin
11. aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 249932169932.dkr.ecr.eu-west-3.amazonaws.com (does not work on EC2, only local)
    For EC2, execute the following 
        a. aws ecr get-login --region eu-west-3
        b. aws ecr --region eu-west-3 | ${output from above step removing “-e none https://”}
12. docker pull 249932169932.dkr.ecr.eu-west-3.amazonaws.com/wdio_ubuntu:9
13. copy docker-compose from automated-tests repo, folder selenium-grid-wdio-docker/airbnb-wdio-selenium-grid-poc
14. docker-compose up

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

Option B. With WebdriverIO & Selenium Grid docker images - build the docker image via Dockerfile

Pre-requisites -
1. docker                                               ------------ to run docker
2. docker-compose                                       ------------ to run docker-compose (multiple docker containers)                                        

Steps -
1. copy docker-compose from automated-tests repo, folder selenium-grid-wdio-docker/airbnb-wdio-selenium-grid-poc
Build the docker image via Dockerfile by executing below command -
        docker build --build-arg WORK_DIR=airbnb-wdio-selenium-grid-poc -t wdio_ubuntu:9 .
2. execute "docker compose up"


Option C. With only WebdriverIO docker image (No selenium grid) - using existing docker image present in ECR & just running it

Pre-requisites -
1. docker                                               ------------ to run docker
2. aws-cli with ecr                                     ------------ to execute aws -cli & ecr commands (https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html)
3. user with ecr rights (eg. testautomation.user)      ------------ to download WebdriverIO docker image stored in ECR (wdio_ubuntu:9)

Steps -
1. sudo yum update -y
2. sudo amazon-linux-extras install -y docker
3. sudo service docker start
4. sudo usermod -a -G docker ec2-user
5. LOGOUT & RELOGIN or restart the terminal
6. sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
7. unzip awscliv2.zip
8. sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin
9. aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 249932169932.dkr.ecr.eu-west-3.amazonaws.com (does not work on 
EC2, only local)
    For EC2, execute the following 
        a. aws ecr get-login --region eu-west-3
        b. aws ecr --region eu-west-3 | ${output from above step removing “-e none https://”}
10. docker pull 249932169932.dkr.ecr.eu-west-3.amazonaws.com/wdio_ubuntu:9
11. docker run -it wdio_ubuntu:9


Option D. With only WebdriverIO docker image (No selenium grid) - build the docker image via Dockerfile

Pre-requisites -
1. docker                                               ------------ to run docker

Stepss -
1. copy Dockerfile & and the whole folder airbnb-wdio-poc from automated-tests repo, folder wdio-docker/airbnb-wdio-poc
Build the docker image via Dockerfile by executing below command -
        docker build --build-arg -t wdio_ubuntu:9 .
2. execute docker run -it wdio_ubuntu:9