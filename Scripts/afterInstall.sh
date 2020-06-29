#!/bin/bash -e

sudo npm install pm2 -g
cd
cd /home/ubuntu/backend/
sudo npm install
sudo -E --preserve-env pm2 --name backend restart npm -- start --update-env
cd /home/ubuntu/frontend/
sudo npm install
sudo -E --preserve-env pm2 --name backend restart npm -- start --update-env
