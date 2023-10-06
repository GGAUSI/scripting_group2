const express = require("express");
const dummy = require("./data/dummy");
const mysql = require("mysql2");
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "rehabilitation",
    password: "",
})

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const query = "SELECT * FROM rooms WHERE availability = 'available' ";
    connection.query(query, (error, results) =>{
        if(error){
            console.log("There was an error");
            return res.status(500).send("Internal Server Error");
        }
        const rowCount = results.length;

        const query2 = "SELECT * FROM patients WHERE discharge_status = 'Admitted' ";
        connection.query(query2, (error, rows) =>{
            if(error){
                console.log("There was an error");
                console.log(error);
                return res.status(500).send("Internal Server Error");
            }
            const patients_rows = rows.length;

            const query3 = "SELECT bill FROM patients WHERE bill_status = 'unpaid' AND discharge_status = 'Admitted'";
            connection.query(query3, (error, results)=>{
                if(error){
                    console.log("There was an error");
                    console.log(error);
                    return res.status(500).send("Internal Server Error");
                }
                const rows = results
                let sum = 0;
                rows.forEach(function (item){
                   
                    sum += item.bill;
                })
                
                const data = {title : "Dashboard",
                active : "Dashboard",
                rooms: rowCount,
                patients: patients_rows,
                bill: sum,
            };
            res.render("index", data);
            })
            
        })

        
    })

  
});
app.get("/add", (req, res) => {
    const available_rooms_query = "SELECT * FROM rooms WHERE availability = 'available'";
    connection.query(available_rooms_query, (error, available_rooms)=>{
        if (error){
            console.error(error);
        }
        const rooms = available_rooms;

        const data = {title : "add",
        active : "add",
        free_rooms: rooms,
    };
        res.render("add_patients", data);
    })
    
});

//COPY FROM HERE

app.get("/discharge", (req, res) => {

    const query = "SELECT * FROM patients WHERE discharge_status = 'Admitted'";
    connection.query(query, (error, results) =>{
        if(error){
            console.log("There was an error");
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }

        const all_patients = results;

    const data = {title : "Discharge",
    active : "Discharge",
    patients_list: all_patients,
   };
   res.render("discharge", data);
    })

    
});

app.get("/follow_up", (req, res)=>{
    const query = "SELECT * FROM patients WHERE discharge_status = 'discharged'";
    connection.query(query, (error, results) =>{
        if(error){
            console.log("There was an error");
            console.log(error);
            return res.status(500).send("Internal Server Error");
        }

        const all_patients = results;

        const data = {title : "Follow up",
        active : "Follow up",
        patients_list: all_patients,
       };
       res.render("follow_up", data);
    })

    
})


app.post('/deletePatient', (req, res) => {

    const patientId = req.body.patient_id;
    const roomId = req.body.room_id;
    console.log(patientId)
    console.log("room: ", roomId);
    const deleteQuery = "UPDATE patients SET discharge_status='discharged' WHERE patient_id = ?";

    const update_room = "UPDATE rooms SET availability = 'available' WHERE room_id = ?";
    connection.query(deleteQuery, [patientId], (err, results) => {
        if (err) {
            console.error('Error discharging patient:', err);
            res.status(500).json({ error: 'Error discharging patient' });
            return;
        }
        console.log('Patient discharged successfully');
        res.status(200).json({ message: 'Patient discharged successfully' });
        connection.query(update_room, [roomId], (err, results)=>{
            if (err) {
                console.error('Error updating room patient:', err);
                res.status(500).json({ error: 'Error updating room' });
                return;
            }
        })
    });
})   
       //DISCHARGE CODE ENDS HERE

app.post("/send_mail", (req, res)=>{
    const email = req.body.recipientEmail;
    const subject = req.body.subject;
    const text = req.body.message;
    let config = {
        service: 'gmail',
        auth: {
            user: 'uchizistarrgausi@gmail.com',
            pass: 'rgxq kmnj hgbp ivbl',
        },
        tls: {
            rejectUnauthorized: false,
        },
    };
    let transporter = nodemailer.createTransport (config);
    let message ={
        from: '"Rehabilitation center" <uchizistarrgausi@gmail.com>',
        to: email,
        subject: subject,
        content: text,
    };
    console.log('SMTP Configuration:', config);
    console.log(message);

    transporter.sendMail(message)
        .then(() => {
            console.log('Email sent successfully');
            res.redirect('/follow_up');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            return res.status(500).json({ error });
        });

})

app.get('/contact_patient', (req, res) => {
    const email = req.query.data;
    console.log(email);

    const data = {title : "Email",
    active : "Follow up",
    email_address: email
   };
   res.render("email", data);
    

    
})          //DISCHARGE CODE ENDS HERE


app.get("/reports", (req, res) => {
    const query = "SELECT disease, COUNT(*) AS num_of_patients FROM patients GROUP BY disease";
    connection.query(query, (err, results)=>{
        if (err) {
            console.error('Error selecting from database:', err);
            res.status(500).json({ error: 'Error ' });
            return;
        }
        const diseases = [];
        results.forEach(function (item){
            diseases.push(item);
        })

        const disease = diseases.map(item => item.disease);
        const numPatients = diseases.map(item => item.num_of_patients);

        const query2 = "SELECT gender, COUNT(*) AS sex_distribution FROM patients GROUP BY gender";
        connection.query(query2, (error, results)=>{
            if (err) {
                console.error('Error selecting from database:', err);
                res.status(500).json({ error: 'Error ' });
                return;
            };
            const labels = results.map(item => item.gender);
            const patients_sex = results.map(item => item.sex_distribution);
            console.log(labels);

            const data = {title : "Reports",
            active : "Reports",
            disease,
            numPatients,
            labels,
            patients_sex,
            };
            res.render("reports", data);
        })
        

    })
   
});

app.get("/email", (req, res)=>{
    const email = req.body.email;
})


app.post("/add", (req, res)=>{

    connection.query("INSERT INTO patients SET ?", req.body, (error, results) =>{
        console.log(req.body);
        console.log(req.body.room)
        if(error){
            console.log("There was an error")
        }
        else{
            const room_query = "UPDATE rooms SET availability = ? WHERE room_id = ?";
            const update_query =mysql.format(room_query, ["unavailable", req.body.room]);
            connection.query(update_query, req.body, (error, results2) =>{
                console.log(req.body);
                if(error){
                    console.log("There was an error")
                    console.error(error);
                }
                else{
                    console.log(results2.affectedRows);
                }
            })
            res.redirect("/");
        }
    })
    

    
});

app.listen(3000, () => {
    console.log("server has started")}
    );

