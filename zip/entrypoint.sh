#!/bin/bash
cd /home/zip
pip3 install flask-cors
source /opt/yottadb/current/ydb_env_set
export FLASK_APP="index"
export FLASK_ENV="development"
flask run --host=0.0.0.0