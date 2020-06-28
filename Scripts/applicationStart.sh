#!/bin/bash -e

cd /home/ubuntu/backend/
sudo -E --preserve-env pm2 --name backend start npm -- start --update-env
cd /home/ubuntu/frontend/
sudo -E --preserve-env pm2 --name frontend start npm -- start --update-env
