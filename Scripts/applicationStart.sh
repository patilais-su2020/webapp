#!/bin/bash -e

source /etc/environment
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /home/ubuntu

sudo systemctl start amazon-cloudwatch-agent.service

cd /home/ubuntu/frontend/
sudo pm2 --name frontend start npm -- start

cd /home/ubuntu/backend/
sudo pm2 --name backend start npm -- start

sudo pm2 save

