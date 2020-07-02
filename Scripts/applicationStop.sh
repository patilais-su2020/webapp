#!/bin/bash -e

sudo rm -rf /home/ubuntu/*
sudo rm -rd sudo rm -rf /opt/codedeploy-agent/deployment-root/*
sudo service codedeploy-agent restart
cd /home/ubuntu
sudo pm2 kill
sudo pm2 delete all