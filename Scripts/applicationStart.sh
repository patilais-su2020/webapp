#!/bin/bash -e

sudo npm install pm2 -g

source /home/ubuntu/.bashrc

# sudo -E --preserve-env pm2 --name backend start npm -- start
cd /home/ubuntu/backend/
sudo npm install 

cd /home/ubuntu/frontend/
sudo npm install
