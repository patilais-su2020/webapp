#!/bin/bash -e

source /etc/environment

cd /home/ubuntu/backend/
sudo pm2 start npm -- start

cd /home/ubuntu/frontend/
sudo pm2 start npm -- start
