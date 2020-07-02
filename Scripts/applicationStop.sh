#!/bin/bash -e

sudo rm -rf *
sudo rm -rd sudo rm -rf /opt/codedeploy-agent/deployment-root/*
sudo service codedeploy-agent restart
pm2 kill
pm2 delete all