#!/bin/bash -e

cd /home/ubuntu/backend/
sudo chown ubuntu:ubuntu /home/ubuntu/.pm2/rpc.sock /home/ubuntu/.pm2/pub.sock
source ../.bashrc && pm2 startOrRestart --name backend npm --start
