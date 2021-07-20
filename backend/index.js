const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const saltRounds = 10;

app.use(express.json());
app.use(cors());



const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'neelrage07',
    database: 'ladybug_db'
});

const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2,'0')
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

app.post("/api/create_project", (req, res) => {
    const project_id = req.body.id;
    const project_name = req.body.name;
    const target_date = req.body.date;
    const created_on = getDate();
    const created_by = req.body.username;

    

    db.query(
    "INSERT INTO projects (project_id, project_name, target_end_date, created_on, created_by) VALUES (?,?,?,?,?)",
    [project_id, project_name, target_date, created_on, created_by],
    (err, result) => {
        console.log(err);
        res.send(true);
    }
    )
    
})

app.post("/api/invite", (req, res) => {
    const sender = req.body.sender;
    const reciever = req.body.reciever;
    const teamname = req.body.teamname;


    db.query(
    "INSERT INTO invites (sender_username, reciever_username, team_name) VALUES (?,?,?);",
    [sender, reciever, teamname],
    (err, result) => {
        console.log(err);
        res.send(true);
    }
    )
    
})

app.post("/api/issue", (req, res) => {
    const project_name = req.body.project_name;
    const issue_type = req.body.issue_type;
    const summary = req.body.summary;
    const description = req.body.description;
    const target_end_date = req.body.target_end_date;
    const reporter_name = req.body.reporter_name;
    const priority = req.body.priority;
    const assignee = req.body.assignee;
    const status = req.body.status;
    const date_identified = getDate();  


    db.query(
    "INSERT INTO issues (issue_summary, issue_description,  identified_by,  date_identified,  assigned_to,  status,  priority,  target_date, project_name, issue_type) VALUES (?,?,?,?,?,?,?,?,?,?);",
    [summary, description, reporter_name, date_identified, assignee, status, priority, target_end_date, project_name, issue_type],
    (err, result) => {
        console.log(err);
        res.send(true);
    }
    )
    
})

 

app.post("/api/register", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const username = req.body.username;
    const date = getDate();
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err)
        }

        db.query(
        "INSERT INTO people (person_name, person_email, username, created_on, password) VALUES (?,?,?,?,?)",
        [name, email, username, date, hash],
        (err, result) => {
            console.log(err);
            res.send(true);
        }
    )
    })

    
})

app.post("/api/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    

    db.query(
        "SELECT * from people WHERE person_email = ?;",
        email,
        (err, result) => {
            if (err){
                res.send({err: err})
            }
            if (result.length > 0){
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response){
                        res.send(result)
                    }
                    else {
                        res.send({message: "Wrong email/password combination"})
                    }
                });
            }
            else {
                res.send({message: "User doesn't exist"});
            }
        }
    );
});

app.post("/api/get_projects", (req, res) => {
    const username = req.body.username;

    db.query(
        "SELECT * from projects WHERE created_by = ?;",
        username,
        (err, result) => {
            if (err){
                console.log(err);
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send(false);
            }
        }
    );
});

app.post("/api/get_issues", (req, res) => {
    const project_id = req.body.id;

    db.query(
        "SELECT * from issues WHERE project_name = ?;",
        project_id,
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send(false);
            }
        }
    );
});

app.post("/api/get_person_issues", (req, res) => {
    const person_id = req.body.id;

    db.query(
        "SELECT * from issues WHERE assigned_to = ?;",
        person_id,
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send(false);
            }
        }
    );
});

app.post("/api/get_pp_issues", (req, res) => {
    const person_id = req.body.id;

    db.query(
        "SELECT * from issues WHERE identified_by = ?;",
        person_id,
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send(false);
            }
        }
    );
});

app.post("/api/issue_det", (req, res) => {
    const issue_summary = req.body.summary;

    db.query(
        "SELECT * from issues WHERE issue_summary = ?;",
        issue_summary,
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send(false);
            }
        }
    );
});

app.post("/api/get_invites", (req, res) => {
    const username = req.body.username;

    db.query(
        "SELECT * from invites WHERE reciever_username = ?;",
        username,
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send(false);
            }
        }
    );
});

app.post("/api/get_comments", (req, res) => {
    const id = req.body.issue_id;

    db.query(
        "SELECT * from comments WHERE issue_id = ?;",
        username,
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send(false);
            }
        }
    );
});

app.put("/api/update_issue", (req, res) => {
    const issue_id = req.body.id;
    const data_item = req.body.element_type;
    const data = req.body.data;


    db.query(
        `UPDATE issues SET ${data_item} = ? WHERE issue_id = ? ;`,
        [data, issue_id],
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send({message: "User doesn't exist"});
            }
        }
    );
});

app.put("/api/add_comment", (req, res) => {
    const issue_id = req.body.id;
    const sender = req.body.sender;
    const data_item = req.body.comment;
    const date = getDate;


    db.query(
        `ISERT INTO comments (issue_id, sender, comment, date) VALUES (?,?,?,?);`,
        [issue_id, sender, data_item, date ],
        (err, result) => {
            if (err){
                console.log(err);
                res.send({err: err});
            }
            if (result.length > 0){
               res.send(result);
            }
            else {
                res.send({message: "User doesn't exist"});
            }
        }
    );
});

app.listen(3001, ()=> (
    console.log('weiners and Gonads')
));