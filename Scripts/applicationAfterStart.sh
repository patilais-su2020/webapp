#!/bin/bash -e

sudo npm install pm2 -g

source /home/ubuntu/.bashrc

# sudo -E --preserve-env pm2 --name backend start npm -- start
cd /home/ubuntu/backend/
sudo -E --preserve-env db_hostname=$db_hostname db_name=$db_name db_username=$db_username db_password=$db_password pm2 start npm -- start

cd /home/ubuntu/frontend/
sudo -E --preserve-env db_hostname=$db_hostname db_name=$db_name db_username=$db_username db_password=$db_password pm2 start npm -- start
