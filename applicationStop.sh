#!/bin/bash

pm2 delete nodeserver || true
pm2 delete webapp || true