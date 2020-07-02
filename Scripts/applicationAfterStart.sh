#!/bin/bash -e

sudo npm install pm2 -g

source /home/ubuntu/.bashrc

# sudo -E --preserve-env pm2 --name backend start npm -- start
cd /home/ubuntu/backend/
sudo pm2 start npm -- start

cd /home/ubuntu/frontend/
sudo pm2 start npm -- start
