#!/bin/bash -e

source /etc/environment

sudo systemctl start amazon-cloudwatch-agent.service

cd /home/ubuntu/backend/
sudo pm2 start npm -- start

cd /home/ubuntu/frontend/
sudo pm2 start npm -- start
