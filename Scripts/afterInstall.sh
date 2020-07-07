#!/bin/bash -e

sudo npm install pm2 -g

source /etc/environment

cd /home/ubuntu/backend/
sudo npm install 

cd /home/ubuntu/frontend/
sudo npm install