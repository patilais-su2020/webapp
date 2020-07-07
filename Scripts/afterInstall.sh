#!/bin/bash -e

sudo npm install pm2 -g

source /etc/environment

cd /home/ubuntu/backend/
sudo npm install 

cd /home/ubuntu/frontend/
sudo npm install

cd 
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/cloud-config/cloud-watch-config.json -s
