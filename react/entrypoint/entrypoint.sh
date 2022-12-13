#!/bin/bash
apt-get update
apt-get install -y npm curl
curl -sL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs
cd /home/react/fileman
apt-get install -y npm
npm install && npm start
tail -f /dev/null
