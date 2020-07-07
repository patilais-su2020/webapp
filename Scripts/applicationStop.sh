#!/bin/bash -e

sudo rm -rf /home/ubuntu/*
sudo rm -rf /opt/codedeploy-agent/deployment-root/*
sudo service codedeploy-agent restart
sudo service codedeploy-agent status
sudo systemctl stop amazon-cloudwatch-agent.service

cd /home/ubuntu
sudo pm2 kill
sudo pm2 delete all