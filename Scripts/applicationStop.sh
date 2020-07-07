#!/bin/bash -e

sudo pm2 kill
sudo pm2 delete all
sudo rm -rf /home/ubuntu/*
# sudo rm -rf /opt/codedeploy-agent/deployment-root/*
# sudo service codedeploy-agent restart
# sudo service codedeploy-agent status
sudo systemctl stop amazon-cloudwatch-agent.service
