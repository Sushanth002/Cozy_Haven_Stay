const server = require("../../index");

let chai = require("chai");
let chaiHttp = require("chai-http");

// assertion style shoot
chai.should();
chai.use(chaiHttp);


describe("OwnerApi", () => {


    //register new user

    describe("POST /api/user/register", () => {
        it("It will add new user details", (done) => {
            const newUser = {
                "user_name": "sushanth123",
                "password": "Sushanth@20",
                "email": "sushanth123@gmail.com",
                "gender": "MALE",
                "contact_no": "8688810980",
                "address": "HYD"
            };
    
            chai.request(server)
                .post('/api/user/register')
                .send(newUser)
                .end((err, res) => {
                    if (res.body.success) {
                        res.should.have.status(200);
                        res.body.should.have.property('success').which.is.true;
                        res.body.should.have.property('message').which.is.equal('new user registered');
                        res.body.should.have.property('data').which.is.an('object');
                        res.body.data.should.have.property('user_id');
                        res.body.data.should.have.property('user_name')
                        res.body.data.should.have.property('email')
                        res.body.data.should.have.property('gender')
                        res.body.data.should.have.property('contact_no')
                        res.body.data.should.have.property('address')
                    } else {
                        res.should.have.status(500);
                        res.body.should.have.property('success').which.is.false;
                        res.body.should.have.property('message').which.is.equal('Couldnot add new user to database ');
                        res.body.should.have.property('errors').which.is.an('array').that.is.empty;
                    }
                    done();
                });
        });
    });


//user login

describe("POST /api/user/login", () => {
    it("It will login user with correct credentials", (done) => {
        const loginData = {
            "email": "sushanth123@gmail.com",
            "password": "Sushanth@20"
        };

        chai.request(server)
            .post('/api/user/login')
            .send(loginData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').which.is.true;
                res.body.should.have.property('message').which.is.equal('user logged In Successfully');
                res.body.should.have.property('data').which.is.an('object');
                res.body.data.should.have.property('user_id');
                res.body.data.should.have.property('user_name');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('gender');
                res.body.data.should.have.property('contact_no');
                res.body.data.should.have.property('address');
                done();
            });
    });

    it("It will fail to login with incorrect password", (done) => {
        const loginData = {
            "email": "sushanth123@gmail.com",
            "password": "incorrectPassword"
        };

        chai.request(server)
            .post('/api/user/login')
            .send(loginData)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').which.is.false;
                res.body.should.have.property('message').which.is.equal('Invalid user credentials');
                res.body.should.have.property('errors').which.is.an('array').that.is.empty;
                done();
            });
    });
});

//user logout

describe("POST /api/user/logout", () => {
    // Test case for user logout successfully
    it("It will logout user successfully", (done) => {
        chai.request(server)
            .post("/api/user/logout")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=user"])
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').which.is.true;
                res.body.should.have.property('message').which.is.equal('user logged Out successfully');
                done();
            });
    });

    // Test case for user logout with no JWT token
    it("It will fail to logout without JWT token", (done) => {
        chai.request(server)
            .post("/api/user/logout")
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(500);
                res.body.should.have.property('error').which.is.equal('Unauthorized request');
                done();
            });
    });
});


//update user

describe("POST /api/user/dashboard/update-user", () => {
    // Test case for updating user details successfully
    it("It will update the user details", (done) => {
        chai.request(server)
            .post("/api/user/dashboard/update-user")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXNoYW50aDEyM0BnbWFpbC5jb20iLCJuYW1lIjoic3VzaGFudGgxMjMiLCJpYXQiOjE3MTQ5OTYxMjIsImV4cCI6MTcxNTYwMDkyMn0.739j43apt06_3HJIGkKZbOeJBsLYKXgTY0lFRv24rtY", "userRole=user"])
            .send({
                "user_id": "1",
                "user_name": "ramesh",
                "gender": "MALE",
                "contact_no": "9999999999",
                "address": "HYD"
            })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').which.is.true;
                res.body.should.have.property('message').which.is.equal(' user updated');
                done();
            });
    });

    // Test case for failing to update user details due to missing user_id
    it("It will fail to update user details due to missing user_id", (done) => {
        chai.request(server)
            .post("/api/user/dashboard/update-user")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXNoYW50aDEyM0BnbWFpbC5jb20iLCJuYW1lIjoic3VzaGFudGgxMjMiLCJpYXQiOjE3MTQ5OTYxMjIsImV4cCI6MTcxNTYwMDkyMn0.739j43apt06_3HJIGkKZbOeJBsLYKXgTY0lFRv24rtY", "userRole=user"])
            .send({
                "user_name": "ramesh",
                "gender": "MALE",
                "contact_no": "9999999999",
                "address": "HYD"
            })
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(500);
                res.body.should.have.property('success').which.is.false;
                res.body.should.have.property('message').which.is.equal('Couldnot update user in database ');
                done();
            });
    });
});

//past booking get by user id

describe("GET /api/user/dashboard/booking/past-bookings/get-by-user/1", () => {
    // Test case for getting past bookings by user id successfully
    it("It will get the past booking by user id", (done) => {
        chai.request(server)
            .get("/api/user/dashboard/booking/past-bookings/get-by-user/1")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXNoYW50aDEyM0BnbWFpbC5jb20iLCJuYW1lIjoic3VzaGFudGgxMjMiLCJpYXQiOjE3MTQ5OTYxMjIsImV4cCI6MTcxNTYwMDkyMn0.739j43apt06_3HJIGkKZbOeJBsLYKXgTY0lFRv24rtY", "userRole=user"])
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').which.is.true;
                res.body.should.have.property('message').which.is.equal('fetched past booking successfully');
                res.body.should.have.property('data').which.is.an('array');
                // Check data properties
                res.body.data.forEach(booking => {
                    booking.should.have.property('booking_id');
                    booking.should.have.property('hotel_id');
                    booking.should.have.property('user_id');
                    booking.should.have.property('no_rooms');
                    booking.should.have.property('total_booking_amount');
                    booking.should.have.property('checkin_date');
                    booking.should.have.property('checkout_date');
                    booking.should.have.property('booking_status');
            });
                done();
            });
    });
});


//add review for past bookings

describe("POST /api/user/dashboard/booking/past-bookings/add-review", () => {
    it("It will add the review for past bookings", (done) => {
        chai.request(server)
            .post("/api/user/dashboard/booking/past-bookings/add-review")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXNoYW50aDEyM0BnbWFpbC5jb20iLCJuYW1lIjoic3VzaGFudGgxMjMiLCJpYXQiOjE3MTQ5OTYxMjIsImV4cCI6MTcxNTYwMDkyMn0.739j43apt06_3HJIGkKZbOeJBsLYKXgTY0lFRv24rtY", "userRole=user"])
            .send({
                "booking_id": "100",
                "review": "good hotel",
                "rating": "4"
            })
            .end((err, res) => {
                if (err) return done(err);
                if (res.body.success) {
                    res.should.have.status(200);
                    res.body.should.have.property('message').which.is.equal('Added review to database');
                    res.body.should.not.have.property('errors');
                } else {
                    res.should.have.status(500);
                    res.body.should.have.property('message').which.is.equal('Couldnot add review to database');
                    res.body.should.have.property('errors').which.is.an('array').and.has.lengthOf(0);
                }
                done();
            });
    });
});


//to get future or current bookings by user id

describe("GET /api/user/dashboard/booking/current-booking/1", () => {
    it("It will get the future bookings", (done) => {
        chai.request(server)
            .get("/api/user/dashboard/booking/current-booking/1")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXNoYW50aDEyM0BnbWFpbC5jb20iLCJuYW1lIjoic3VzaGFudGgxMjMiLCJpYXQiOjE3MTQ5OTYxMjIsImV4cCI6MTcxNTYwMDkyMn0.739j43apt06_3HJIGkKZbOeJBsLYKXgTY0lFRv24rtY", "userRole=user"])
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').which.is.equal(true);
                res.body.should.have.property('message').which.is.equal('fetched current booking successfully');
                res.body.should.have.property('data').which.is.an('array').and.not.empty;
                res.body.data.forEach(booking => {
                    booking.should.have.property('booking_id');
                    booking.should.have.property('hotel_id');
                    booking.should.have.property('user_id');
                    booking.should.have.property('no_rooms');
                    booking.should.have.property('total_booking_amount');
                    booking.should.have.property('checkin_date');
                    booking.should.have.property('checkout_date');
                    booking.should.have.property('booking_status');
            });
            done();
            });
    });
});

//cancel bookings

describe("PUT /api/user/dashboard/booking/current-booking/cancel-booking", () => {
    it("It will cancel the bookings", (done) => {
        const data = {
            "booking_id": "1"
        };
        chai.request(server)
            .put("/api/user/dashboard/booking/current-booking/cancel-booking")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXNoYW50aDEyM0BnbWFpbC5jb20iLCJuYW1lIjoic3VzaGFudGgxMjMiLCJpYXQiOjE3MTQ5OTYxMjIsImV4cCI6MTcxNTYwMDkyMn0.739j43apt06_3HJIGkKZbOeJBsLYKXgTY0lFRv24rtY", "userRole=user"])
            .send(data)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').which.is.equal(true);
                res.body.should.have.property('message').which.is.equal('updated booking status');
                done();
            });
    });

    it("It will fail to cancel the booking if no booking_id provided", (done) => {
        const data = {}; // No booking_id provided
        chai.request(server)
            .put("/api/user/dashboard/booking/current-booking/cancel-booking")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXNoYW50aDEyM0BnbWFpbC5jb20iLCJuYW1lIjoic3VzaGFudGgxMjMiLCJpYXQiOjE3MTQ5OTYxMjIsImV4cCI6MTcxNTYwMDkyMn0.739j43apt06_3HJIGkKZbOeJBsLYKXgTY0lFRv24rtY", "userRole=user"])
            .send(data)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(500);
                res.body.should.have.property('success').which.is.equal(false);
                res.body.should.have.property('message').which.is.equal('couldnot update status of booking');
                res.body.should.have.property('errors').which.is.an('array').and.empty;
                done();
            });
    });
});




});
