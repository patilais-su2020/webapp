#!/bin/bash -e

sudo npm install pm2 -g
cd /home/ubuntu/backend/
sudo npm install
sudo -E pm2 --name webapp start npm -- start
cd /home/ubuntu/frontend/
sudo npm install
sudo -E pm2 --name webapp start npm -- start