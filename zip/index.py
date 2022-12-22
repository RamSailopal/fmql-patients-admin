from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os, yottadb, time
app = Flask(__name__)
CORS(app)

@app.route('/zip', methods=['GET'])
def user():

    if request.method == 'GET':
       zip = request.args.get('zip',type=str)
       key=yottadb.Key("^ZIP")[zip]
       if (key.get() == None ):
          lat = "Not found"
          lng = "Not found"
       else :
          dat = key.get().decode()
          datbit = dat.split(",")
          lng = datbit[1]
          lat = datbit[0]
       json_data = []
       content = {}
       content = {'zip': zip, 'long': lng, 'lat': lat }
       json_data.append(content)
       return(jsonify(json_data))