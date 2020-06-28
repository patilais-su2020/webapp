#!/bin/bash -e

cd
cd /home/ubuntu/backend/
sudo -E --preserve-env pm2 --name backend start npm -- start
cd /home/ubuntu/frontend/
sudo -E --preserve-env pm2 --name frontend start npm -- start
