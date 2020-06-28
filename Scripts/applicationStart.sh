#!/bin/bash -e

cd /home/ubuntu/backend/
sudo -E --preserve-env pm2 --name backend restart npm -- start --update-env
cd /home/ubuntu/frontend/
sudo -E --preserve-env pm2 --name frontend restart npm -- start --update-env
