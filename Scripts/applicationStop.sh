#!/bin/bash

sudo pm2 kill || true
sudo pm2 delete all || true
sudo rm -rf /home/ubuntu/*
# sudo rm -rf /opt/codedeploy-agent/deployment-root/*
# sudo service codedeploy-agent restart
# sudo service codedeploy-agent status
# sudo systemctl stop amazon-cloudwatch-agent.service
