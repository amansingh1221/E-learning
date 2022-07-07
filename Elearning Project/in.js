const express = require("express");
const app = express();
const { createPool } = require("mysql");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const {
    CLIENT_FOUND_ROWS,
    CLIENT_LONG_PASSWORD,
} = require("mysql/lib/protocol/constants/client");
const { render, cookie } = require("express/lib/response");

const ejs = require("ejs");
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyparser.json());
var succl = " ";
var succr = " ";
var succc = " ";

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Ayush#12345",
    database: "e_learning",
    connectionLimit: 10,
    multipleStatements: true,
});

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("choice");

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only");
    }
}

app.listen(3000, () => {
    console.log("Listening on port 3000");
});



// Haja Ram
app.get("/", function (req, res) {
    res.render("home.ejs", { successl: succl, successr: succr, successc: succc });
});

app.get("/course", function (req, res) {
                pool.query("SELECT * FROM e_learning.course", function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        res.render("course", {
                            successl: succl,
                            successr: succr,
                            successc: succc,
                            result:result
                        });
                    }
                });
});

app.post("/login", function (req, res) {
    const Uname = req.body.username;
    const pass = req.body.password;
    pool.query(
        "select user_password from account where user_name = ? ",
        [Uname],
        function (err, result) {
            if (err) {
                throw err;
            } else {
                console.log(result.length);
                if (result.length > 0) {
                    var string = JSON.stringify(result);
                    var json = JSON.parse(string);
                    const pp = json[0].user_password;

                    if (pp == pass) {
                        pool.query(
                            "SELECT * FROM e_learning.course",
                            function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    res.cookie("student", Uname);
                                    pool.query('select stu_name from student where user_name="'+Uname+'"',function(err,r){
                                    res.render("student_dashboard", { result: result,mass: r[0].stu_name});
                                    });
                                }
                            }
                        );
                    } else {
                        const succl = "password did not match !";
                        res.render("login.ejs", {
                            successl: succl,
                            successr: succr,
                            successc: succc,
                        });
                    }
                } else {
                    const succl = "user not found";
                    res.render("login.ejs", {
                        successl: succl,
                        successr: succr,
                        successc: succc,
                    });
                }
            }
        }
    );
});

app.post("/register", function (req, res) {
    const naam = req.body.name;
    const Uname = req.body.username;
    const pass = req.body.password;
    const Cpass = req.body.confirmpassword;
    const Cnumber = req.body.contactnumber;
    pool.query(
        "select user_password from account where user_name = ? ",
        [Uname],
        function (err, result) {
            if (err) {
                throw err;
            } else {
                console.log(result.length);

                if (
                    pass === Cpass &&
                    Cnumber.toString().length === 10 &&
                    pass.toString().length >= 4 &&
                    result.length === 0
                ) {
                    const qu =
                        "insert into student ( user_name, stu_name,  contact_no) values (? , ?, ?)";
                    pool.query(qu, [Uname, naam, Cnumber], function (err, result) {
                        if (err) {
                            throw err;
                        }
                    });

                    const que =
                        "insert into account ( user_name,  user_password) values (? , ?)";
                    pool.query(que, [Uname, pass], function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            const succl = "Registered Successfully ! login now";
                            res.render("login.ejs", {
                                successl: succl,
                                successr: succr,
                                successc: succc,
                            });
                        }
                    });
                } else if (result.length > 0) {
                    const succr = "username already exit , try different";
                    res.render("register.ejs", {
                        successl: succl,
                        successr: succr,
                        successc: succc,
                    });
                } else if (Cnumber.toString().length != 10) {
                    const succr = "length of contact number should be 10";
                    res.render("register.ejs", {
                        successl: succl,
                        successr: succr,
                        successc: succc,
                    });
                } else if (pass.toString().length < 4) {
                    const succr = "length of password should be >=4";
                    res.render("register.ejs", {
                        successl: succl,
                        successr: succr,
                        successc: succc,
                    });
                } else if (pass != Cpass) {
                    const succr = "Password did not match ! ";
                    res.render("register.ejs", {
                        successl: succl,
                        successr: succr,
                        successc: succc,
                    });
                }
            }
        }
    );
});

app.post("/fp", function (req, res) {
    const sid = req.body.studentid;
    const Uname = req.body.username;
    const pass = req.body.password;
    const Cpass = req.body.confirmpassword;
    const Cnumber = req.body.contactnumber;

    pool.query(
        "select stu_id from student where user_name = ? and contact_no = ?",
        [Uname, Cnumber],
        function (err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length > 0) {
                    var string = JSON.stringify(results);
                    var json = JSON.parse(string);
                    const pp = json[0].stu_id;
                    console.log(pp);
                    if (Cnumber.toString().length == 10 && pass == Cpass && pp == sid) {
                        pool.query(
                            "update account set user_password = ? where user_name = ?",
                            [pass, Uname],
                            function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    const succc = "Yeah ! password updated successfully ";
                                    res.render("forgotpass.ejs", {
                                        successl: succl,
                                        successr: succr,
                                        successc: succc,
                                    });
                                }
                            }
                        );
                    } else {
                        const succc = "No data found ! Enter a valid details";
                        res.render("forgotpass.ejs", {
                            successl: succl,
                            successr: succr,
                            successc: succc,
                        });
                    }
                } else {
                    const succc = "No data found ! Enter a valid details";
                    res.render("forgotpass.ejs", {
                        successl: succl,
                        successr: succr,
                        successc: succc,
                    });
                }
            }
        }
    );
});

// Admin Pages
app.get("/adminlogin", (req, res) => {
    if (!req.cookies.admin) {
        res.render("adminlogin", { massage: "" });
    } else {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, result) {
                var res2 =
                    "select count(*) as c1 from student; select count(*) as c2 from course;select count(*) as c3 from quiz;select course.course_id,course_name,(select count(*)from quiz where course.course_id=quiz.course_id) as count1,(select count(*)from enrolls where course.course_id=enrolls.course_id) as count2 from course;";
                pool.query(res2, function (err, res1) {
                    if (err) throw err;
                    else {
                        res.render("adminpage_home", {
                            result: res1,
                            massage: result[0].admin_name,
                        });
                    }
                });
            }
        );
    }
});

app.post("/adminlogin", function (req, res) {
    const Uname = req.body.username;
    const pass = req.body.password;
    var res1 =
        'select * from account where user_name="' +
        Uname +
        '"; select * from admin where user_name="' +
        Uname +
        '"';
    pool.query(res1, function (err, result) {
        if (err) {
            throw err;
        } else {
            if (result[0].length > 0 && result[1].length > 0) {
                if (pass == result[0][0].user_password) {
                    res.cookie("admin", Uname);
                    var res2 =
                        "select count(*) as c1 from student; select count(*) as c2 from course;select count(*) as c3 from quiz;select course.course_id,course_name,(select count(*)from quiz where course.course_id=quiz.course_id) as count1,(select count(*)from enrolls where course.course_id=enrolls.course_id) as count2 from course;";
                    pool.query(res2, function (err, res1) {
                        if (err) throw err;
                        else {
                            res.render("adminpage_home", {
                                result: res1,
                                massage: result[1][0].admin_name,
                            });
                        }
                    });
                } else {
                    res.render("adminlogin", { massage: "Invalid Password" });
                }
            } else {
                const mass = "You are not Admin";
                res.render("adminlogin", { massage: mass });
            }
        }
    });
});

app.get("/adminpage_home", (req, res) => {
    if (req.cookies.admin) {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, res1) {
                var sql1 =
                    "select count(*) as c1 from student; select count(*) as c2 from course;select count(*) as c3 from quiz;select course.course_id,course_name,(select count(*)from quiz where course.course_id=quiz.course_id) as count1,(select count(*)from enrolls where course.course_id=enrolls.course_id) as count2 from course;";
                pool.query(sql1, function (err, res2) {
                    if (err) throw err;
                    else {
                        res.render("adminpage_home", {
                            result: res2,
                            massage: res1[0].admin_name,
                        });
                    }
                });
            }
        );
    } else {
        res.render("adminlogin", { massage: "Login is required" });
    }
});

app.get("/adminpage_student", (req, res) => {
    if (req.cookies.admin) {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, res1) {
                pool.query(
                    "select student.stu_id,stu_name,contact_no,user_name,count(*) as count from student join enrolls where student.stu_id=enrolls.stu_id group by student.stu_id order by student.stu_id asc",
                    function (err, result) {
                        if (err) {
                            throw err;
                        } else {
                            res.render("adminpage_student", {
                                result: result,
                                massage: res1[0].admin_name,
                            });
                        }
                    }
                );
            }
        );
    } else {
        res.render("adminlogin", { massage: "Login is required" });
    }
});
app.get("/adminpage_addcourse", (req, res) => {
    if (req.cookies.admin) {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, res1) {
                res.render("adminpage_addcourse", { massage: res1[0].admin_name,mass:"" });
            }
        );
    } else {
        res.render("adminlogin", { massage: "Login is required" });
    }
});

app.get("/adminpage_searchcourse", (req, res) => {
    if (req.cookies.admin) {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, res1) {
                res.render("adminpage_searchcourse", { massage: res1[0].admin_name,mass:"" });
            });
    } else {
        res.render("adminlogin", { massage: "Login is required" });
    }
});

app.get("/adminpage_changepassword", (req, res) => {
    if (req.cookies.admin) {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, res1) {
                res.render("adminpage_changepassword", { massage: res1[0].admin_name, result: "" });
            })
    } else {
        res.render("adminlogin", { massage: "Login is required" });
    }
});

app.get("/adminpage_updatecourse", (req, res) => {
    if (req.cookies.admin) {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, res1) {
                res.render("adminpage_updatecourse", { massage: res1[0].admin_name });
            });
    } else {
        res.render("adminlogin", { massage: "Login is required" });
    }
});

app.get("/adminpage_course", (req, res) => {
    if (req.cookies.admin) {
        pool.query(
            'Select admin_name from admin where user_name="' +
            req.cookies.admin +
            '"',
            function (err, res1) {
                pool.query("SELECT * FROM e_learning.course", function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        res.render("adminpage_course", { result: result, massage: res1[0].admin_name });
                    }
                });
            });
    }
    else {
        res.render("adminpage_course", { massage: "Login is required" });
    }
});

app.post("/upload", function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            var sql =
                'insert into course values ("' +
                req.body.courseid +
                '","' +
                req.body.coursename +
                '","' +
                req.body.coursefee +
                '","' +
                req.body.coursedesc +
                '","' +
                req.file.filename +
                '")';
            pool.query(sql, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    res.render("adminpage_addcourse",{mass:"Added Successfully"});
                }
            });
        }
    });
});
app.post("/search", function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            pool.query(
                'Select admin_name from admin where user_name="' +
                req.cookies.admin +
                '"',
                function (err, res1) {
            var sql =
                'select * from course where course_id="' + req.body.courseid + '"';
            pool.query(sql, function (err, result) {
                if(result.length==0)
                {
                    res.render("adminpage_searchcourse",{massage: res1[0].admin_name ,mass:"Course Not Found"});
                }
                else
                res.render("adminpage_updatecourse", { result: result,massage:res1[0].admin_name });
            });
        })
    }
    });
});

app.post("/change", function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            var sql =
                'Update course set course_name="' +
                req.body.coursename +
                '",course_fees="' +
                req.body.coursefee +
                '",course_desc="' +
                req.body.coursedesc +
                '" where course_id="' +
                req.body.courseid +
                '"';
            pool.query(sql, function (err, result) {
                console.log(result);
                res.render("adminpage_searchcourse");
            });
        }
    });
});


app.post("/find", function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            var sql =
                'select * from course where course_desc like "' +
                "%" +
                req.body.sea +
                "%" +
                '" or course_name like "' +
                "%" +
                req.body.sea +
                "%" +
                '" or course_id like "' +
                "%" +
                req.body.sea +
                "%" +
                '"';
            console.log(sql);
            pool.query(sql, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    res.render("student_dashboard", { result: result });
                }
            });
        }
    });
});

app.get("/home", (req, res) => {
    if (req.cookies.admin) {
        res.clearCookie('admin');
    }
    res.render('home', {
        successl: succl,
        successr: succr,
        successc: succc
    });
});

app.post("/pass", function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (req.body.newpassword === req.body.confirmnewpassword) {
                var sql = 'update account set user_password="'+req.body.newpassword+'" where user_name="' + req.cookies.admin + '"';
                pool.query(sql, function (err, result) {
                    if (err) {
                        throw err;
                    } else {
                        pool.query(
                            'Select admin_name from admin where user_name="' +
                            req.cookies.admin +
                            '"',
                            function (err, res1) {
                                if(err) throw err;
                                else
                                res.render("adminpage_changepassword", { massage: res1[0].admin_name, result: "Changed Successfully" });
                            });
                    }
                });
            }
            else {
                pool.query(
                    'Select admin_name from admin where user_name="' +
                    req.cookies.admin +
                    '"',
                    function (err, res1) {
                        res.render("adminpage_changepassword", { massage: res1[0].admin_name, result: "Password does not match" });
                    })
            }

        }
    });
});








//   404 Page
app.use((req, res) => {
    res.status(404).write("<h1>404 error....Page not found</h1>");
});
