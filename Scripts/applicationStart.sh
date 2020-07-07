#!/bin/bash -e

source /etc/environment

sudo systemctl start amazon-cloudwatch-agent.service

cd /home/ubuntu/frontend/
sudo pm2 --name frontend start npm -- start

cd /home/ubuntu/backend/
sudo pm2 --name backend start npm -- start


