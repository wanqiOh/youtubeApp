import express from 'express';
import mysql from 'mysql';

const router = express.Router();

let dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'video'
}

// route our app
router.get('/', (req, res) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.header('Access-Control-Allow-Credentials', 'true');
    //connect to mysql server and world database
    //to get list of all countryname
    //create the connection
    let dbobj = mysql.createConnection(dbconfig);
    //connect the the database
    dbobj.connect(err => {
        if (err) {
            console.log("[mysql error]",err);
        }
        console.log("Connection to database is success for " + JSON.stringify(req.method) + " " + JSON.stringify(req.route.path));
        //res.send("Connection to database is success")
        //write a code for executing statements to do something
        //if connection to database is success here
        let query = "select * from ids";
        dbobj.query(query, (err, data) => {
            if (err) {
                console.log("[mysql error]",err);
            }
            console.log(data);
            //res.send("Connection to database is success. " + "<br>" + "Query is success.")
            res.send(data);
            dbobj.end(err => {
                if (err) {
                    console.log("[mysql error]",err);
                }
                console.log("Connection ended gracefully for " + JSON.stringify(req.method) + " " + req.route.path);
            })
        })


    })
    //never every write the statements which are dependent on previous call
    //back function activity/execution, outside call back function
    //always write dependent statements which are dependent on previous call
    //back function activity/execution inside the call back function itself.
    //res.send("Connection to database is success")

    //do not write a code for executing statements to do something
    //if connection to database is success here
});

router.post('/', (req, res) =>  {
    console.log('[backend]', req.body);
    let video = req.body;
    console.log('[category]', video.catgory);

    if(req.body.id == "" || req.body.id == undefined || req.body.catgory == "" || req.body.catgory == undefined){
        res.send([{
                "status":"Bad request body",
                "requestBodyReceived": req.body,
                "requestBodyExpected":"{'id':'abc'}"        
            }]);
            //process.exit()
            //do not use process.exit as it will end the node program and
            //then none of the endpoints will work
            console.log("[Bad request body]");
    }

    //create connection
    let dbobj = mysql.createConnection(dbconfig);
    //use connectionObject to conenct to database
    dbobj.connect(err => {
        if (err)
            console.log("[mysql error]",err);
        console.log("Connection to database is success for " + JSON.stringify(req.method) + " " + JSON.stringify(req.route.path));
        //execute the query
        let query = "insert into ids (id, category) values (?, ?)";
        dbobj.query(query, [video.id, video.catgory], (err, data) => {
            if (err)
                console.log("[mysql error]",err);
            console.log("Response for add video ids");
            console.log(data);
            //res.send(data)
            if (data.affectedRows === 1) {
                res.send([{
                    "addStatus": "Success",
                    "id": data.insertId,
                    "addRowCount": data.affectedRows
                }]);
            } else {
                res.send([{
                    "addStatus": "Fail",
                    "id": data.insertId,
                    "addRowCount": data.affectedRows
                }]);
            }
            dbobj.end(err => {
                if (err)
                    console.log("[mysql error]",err);
                console.log("Connection ended gracefully for " + JSON.stringify(req.method) + " " + req.route.path);
            })
        })
    });
})

export default router;