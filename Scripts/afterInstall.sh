#!/bin/bash -e

sudo npm install pm2 -g
cd
cd /home/ubuntu/backend/
sudo npm install
sudo chown ubuntu:ubuntu /home/ubuntu/.pm2/rpc.sock /home/ubuntu/.pm2/pub.sock
source ../.bashrc && pm2 startOrRestart --name backend npm -- start
# sudo -E --preserve-env pm2 --name backend start npm -- start
# cd /home/ubuntu/frontend/
# sudo npm install
# sudo -E --preserve-env pm2 --name backend start npm -- start
