#!/bin/bash -e

cd /home/ubuntu/backend/
sudo -E source .bashrc && pm2 startOrRestart --name backend npm --start
