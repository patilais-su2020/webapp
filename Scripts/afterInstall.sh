#!/bin/bash -e

sudo npm install pm2 -g

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/cloud-config/cloud-watch-config.json -s
sudo systemctl start amazon-cloudwatch-agent.service

source /etc/environment

cd /home/ubuntu/backend/
sudo npm install 

cd /home/ubuntu/frontend/
sudo npm install