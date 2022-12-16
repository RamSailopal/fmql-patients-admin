#!/bin/bash
cp -f /home/fmqlput/fmqlServer.js /home/vdp/FMQL/webservice/fmqlServer.js
cd /home/vdp/FMQL/webservice
npm install cors
su vdp -c "source /home/nodevista/etc/env && pm2 start /home/vdp/FMQL/webservice/fmqlServer.js > /home/vdp/logs/nodelog.log"
/home/nodevista/bin/start.sh
