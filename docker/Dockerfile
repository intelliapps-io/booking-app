FROM node:12.14.1-stretch

## ROOT - Move Github SSH Key to Image
RUN mkdir -p /root/.ssh
ADD ./build-files/git-ssh/id_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts

## GIT CLONE - get files from github into docker image
RUN mkdir /var/node-app && mkdir /var/gitTemp
RUN cd var/gitTemp && git clone git@github.com:intelliapps-io/booking-app.git 
RUN cp -a /var/gitTemp/booking-app/. /var/node-app && rm -rf var/gitTemp
RUN cd /var/node-app && ls -a
RUN bash /var/node-app/deploy.sh
