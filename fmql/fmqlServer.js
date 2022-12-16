#!/usr/bin/env node

/*
 * Simple cluster-based FMQL server that can also statically serve Rambler and
 * other one page apps and their CSS/JS.
 *
 * For local test invoke with: nohup node fmqlServer.js > SEESERVERRUN &
 *
 * Context: replaces use of Apache/Python for Web access to FMQL.
 *
 * - SIGKILL (kill -9) - cluster will kill workers (once they are done)
 * - see: curl http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1 -v
 *
 * TODO:
 * - more robust/tested restart/shutdown
 *   - more on SIGKILL, SIGINT, cluster vs worker (issues/misleading stuff)
 *     http://stackoverflow.com/questions/19796102/exit-event-in-worker-process-when-killed-from-master-within-a-node-js-cluster
 * - stress it
 * - morgan: See https://github.com/expressjs/morgan, apache like access/error log
 *   - cluster sharing log?
 *   - more logging with other modules
 * - more on dev vs prod: var env = process.env.NODE_ENV || 'development';
 * - try on Cache (vs nodem GTM). Add explicit support. Test one/close DB vs keep DB open in worker
 *
 * LICENSE:
 * This program is free software; you can redistribute it and/or modify it under the terms of
 * the GNU Affero General Public License version 3 (AGPL) as published by the Free Software
 * Foundation.
 * (c) 2016 caregraf
 */

'use strict';

var express = require("express"),
    compress = require("compression"),
    cluster = require('cluster'),
    nodem = require('nodem'),
    fmql = require('./fmql'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port = process.argv[2] || 9000;

/*
 * Typical 'cluster' setup
 */
if (cluster.isMaster) {

    var numCPUs = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }

    console.log("Master process %d (kill -9 this) with %d CPUs to play with", process.pid, numCPUs);

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // If forced, don't restart - uncaughtException forces with kill()
        if (worker.suicide === true)
            return;

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :( - starting a new one', worker.id);
        cluster.fork();

    });

}
else {

    var db = new nodem.Gtm();
    // { ok: 1, result: '1' }
    var ok = db.open();

    process.on('uncaughtException', function(err) {
        db.close();
        console.trace('Uncaught Exception - exiting worker');
        console.error(err.stack);
        // exit(1) - Uncaught Fatal Exception
        cluster.worker.kill();
    });

    var app = express();

    // gzip etc if accepted - must come before middleware for static handling
    app.use(compress());
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json()); 

    /*
     * Redirect / or index.html to schema (for now)
     */
    app.use(function(req, res, next) {
        if ((req.url.length === 0) || req.path.match(/index/) || req.path.match(/\/$/))
            res.redirect(302, "/schema");
        else
            next();
    });

    /*
     * Silently rewrites /rambler, /query and /schema to respective htmls
     */
    app.use(function(req, res, next) {
        if (req.path.match(/rambler/)) {
            req.url = "/fmRambler.html";
            console.log("Redirected /rambler to %s", req.url);
        }
        else if (req.path.match(/schema/)) {
            req.url = "/fmSchema.html";
            console.log("Redirected /schema to %s", req.url);
        }
        else if (req.path.match(/query/)) {
            req.url = "/fmQuery.html";
            console.log("Redirected /query to %s", req.url);
        }
        next();
    });

    // First try FMQL
    app.get("/fmqlEP", function(request, response) {

        // Enforce ?fmql="SOME QUERY" (rem: query arguments don't get routes of their own in Express)
        if (!(("fmql" in request.query) && (request.query.fmql !== ""))) {
            response.status(404).json({"error": "No FMQL Query Specified"});
            console.log("404'ing: %s", request.url);
            return;
        }

        // {"query": "DESCRIBE 2-9"}
        var query = request.query.fmql;

        console.log("Worker %s: invoking FMQL %s", cluster.worker.id, query);

        var jsont = fmql.query(db, query, false); // ask for text to preserve order

        // could use response.json but will be changing to jsonld so making explicit
        response.type('application/json');
        response.send(jsont);
        console.log("Response (100): %s\n\n", jsont.substring(0, 99));
    });

    app.post("/patdet", function(req, res) {
            var pat = req.body.id;
            var zip = req.body.zip;
            var name = req.body.name;
            var occupation = req.body.occupation;
            var city = req.body.city;
            var cell = req.body.cell;
            var work = req.body.work;
            var residence = req.body.residence;
            var email = req.body.email;
            var sex = req.body.sex;
            var totres="";
            var dbres=db.get({global: '^DPT', subscripts: [pat, '0']});  
            if (dbres.data !== "") {
                var reslts=dbres.data.split("^");
                for (i=0;i<reslts.length;i++) {
                    if (i===0) {
                        reslts[i]=name;
                    }
                    if (i===1) {
                        reslts[i]=sex;
                    }
                    if (i===6) {
                        reslts[i]=occupation;
                    }
                    if (i===10) {
                        reslts[i]=city;
                    }    
                    totres=totres + reslts[i] + '^';
                }
            }
            else {
                for (i=0;i<21;i++) {
                    if (i===0) {
                        totres=totres + name;
                    }
                    if (i===1) {
                        totres=totres + sex;
                    }
                    if (i===6) {
                        totres=totres + occupation;
                    }
                    if (i===10) {
                        totres=totres + city;
                    } 
                    else {
                        totres=totres + "^";
                    }   
                }
            }
            db.set('^DPT', pat, '0', totres);
            totres="";
            var dbres=db.get({global: '^DPT', subscripts: [pat, '.11']});
            if (dbres.data !== "") {
                var reslts=dbres.data.split("^");
                for (i=0;i<reslts.length;i++) {
                    if (i===5) {
                        reslts[i]=zip;
                    }
                    if (i===11) {
                        reslts[i]=zip;
                    } 
                    totres=totres + reslts[i] + '^';
                }
            }
            else {
                for (i=0;i<21;i++) {
                    if (i===5) {
                        totres=totres + zip;
                    }
                    if (i===11) {
                        totres=totres + zip;
                    }   
                    else {
                        totres=totres + "^";
                    } 
                } 
            }
            db.set('^DPT', pat, '.11', totres);
            totres="";
            var dbres=db.get({global: '^DPT', subscripts: [pat, '.13']});
            if (dbres.data !== "") {
                var reslts=dbres.data.split("^");
                for (i=0;i<reslts.length;i++) {
                    if (i===0) {
                        reslts[i]=residence;
                    }
                    if (i===1) {
                        reslts[i]=work;
                    }
                    if (i===2) {
                        reslts[i]=email;
                    } 
                    if (i===3) {
                        reslts[i]=cell;
                    } 
                    totres=totres + reslts[i] + '^';
                }
            }
            else {
                for (i=0;i<21;i++) {
                    if (i===0) {
                        totres=totres + residence;
                    }
                    if (i===1) {
                        totres=totres + work;
                    }
                    if (i===2) {
                        totres=totres + email;
                    }   
                    if (i===3) {
                        totres=totres + cell;
                    }   
                    else {
                        totres=totres + "^";
                    } 
                } 
            }
            db.set('^DPT', pat, '.13', totres);
            res.send('{ "status": "success" }');
            });

    // Not FMQL - try static - Express 4 respects order
    app.use(express.static(__dirname + "/static")); //use static files in ROOT/public folder

    var server = app.listen(port, function() {
        console.log("FMQL worker %d, process %d", cluster.worker.id, process.pid);
    });

}
