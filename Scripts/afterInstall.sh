#!/bin/bash -e

sudo npm install pm2 -g
cd
cd /home/ubuntu/backend/
sudo npm install
sudo chown ubuntu:ubuntu /home/ubuntu/.pm2/rpc.sock /home/ubuntu/.pm2/pub.sock
source ../.bashrc 
db_hostname=$db_hostname db_name=$db_name db_username=$db_username db_password=$db_password pm2 start --name backend npm -- start
# sudo -E --preserve-env pm2 --name backend start npm -- start
# cd /home/ubuntu/frontend/
# sudo npm install
# sudo -E --preserve-env pm2 --name backend start npm -- start
