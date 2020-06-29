#!/bin/bash -e

sudo pm2 kill
cd /home/ubuntu/backend/
# sudo -E --preserve-env pm2 --name backend start npm -- start
# cd /home/ubuntu/backend/
sudo -E --preserve-env pm2 --name backend restart npm -- start --update-env
cd /home/ubuntu/frontend/
# sudo -E --preserve-env pm2 --name frontend start npm -- start
# cd /home/ubuntu/frontend/
sudo -E --preserve-env pm2 --name frontend restart npm -- start --update-env
