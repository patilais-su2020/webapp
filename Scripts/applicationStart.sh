#!/bin/bash -e

source /etc/environment

ls

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/home/ubuntu/cloud-config/cloud-watch-config.json -s
sudo systemctl start amazon-cloudwatch-agent.service

cd /home/ubuntu/backend/
sudo pm2 start npm -- start

cd /home/ubuntu/frontend/
sudo pm2 start npm -- start
