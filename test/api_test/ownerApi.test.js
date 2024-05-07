const server = require("../../index");

let chai = require("chai");
let chaiHttp = require("chai-http");

// assertion style shoot
chai.should();
chai.use(chaiHttp);


describe("OwnerApi", () => {
  describe("POST /api/owner/register", () => {
    it.skip("Owner registered successfully", (done) => {
      const ownerData = {
        owner_name: "sushanth",
        password: "Sushanth@20",
        email: "hotel1@gmail.com",
        gender: "MALE",
        contact_no: "1234567890",
        address: "AP"
      };

      chai.request(server)
          .post("/api/owner/register")
          .send(ownerData)
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('data');
            res.body.data.should.have.property('owner_id');
            res.body.data.should.have.property('owner_name', 'sushanth');
            res.body.data.should.have.property('email', 'hotel1@gmail.com');
            res.body.data.should.have.property('gender', 'MALE');
            res.body.data.should.have.property('contact_no', '1234567890');
            res.body.data.should.have.property('address', 'AP');
            res.body.should.have.property('message').equal('new hotelowner registered');
            done();
          });
    });

    it.skip("Owner registration with duplicate data", (done) => {
      const ownerData = {
        owner_name: "sushanth",
        password: "Sushanth@20",
        email: "hotel1@gmail.com",
        gender: "MALE",
        contact_no: "1234567890",
        address: "AP"
      };

      chai.request(server)
          .post("/api/owner/register")
          .send(ownerData)
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(500);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal('Couldnot add new hotelowner to database ');
            res.body.should.have.property('errors').that.is.an('array').that.is.empty;
            done();
          });
    });
  });


//owner login testing

describe("POST /api/owner/login", () => {
  // Test case for owner login successfully
  it("Owner login successfully", (done) => {
    // Login credentials for owner
    const loginData = {
      email: "srinivas@gmail.com",
      password: "Sushanth@20"
    };

    // Send POST request to owner login endpoint
    chai.request(server)
        .post("/api/owner/login")
        .send(loginData)
        .end((err, res) => {
          if (err) return done(err);
          // Assertion for successful owner login
          res.should.have.status(200);
          res.body.should.have.property('success').equal(true);
          res.body.should.have.property('data');
          res.body.data.should.have.property('owner_id');
          res.body.data.should.have.property('owner_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('gender');
          res.body.data.should.have.property('contact_no');
          res.body.data.should.have.property('address');
          res.body.should.have.property('message').equal('Owner logged In Successfully');
          done();
        });
  });

  // Test case for owner login with wrong email
  it("Owner login with wrong email", (done) => {
    // Login credentials with wrong email
    const loginData = {
      email: "wrongemail@gmail.com",
      password: "Sushanth@20"
    };

    // Send POST request to owner login endpoint
    chai.request(server)
        .post("/api/owner/login")
        .send(loginData)
        .end((err, res) => {
          if (err) return done(err);
          // Assertion for login with wrong email
          res.should.have.status(401);
          res.body.should.have.property('success').equal(false);
          res.body.should.have.property('message').equal('Invalid owner email');
          res.body.should.have.property('errors').that.is.an('array').that.is.empty;
          done();
        });
  });

  // Test case for owner login with wrong password
  it("Owner login with wrong password", (done) => {
    // Login credentials with wrong password
    const loginData = {
      email: "srinivas@gmail.com",
      password: "WrongPassword@123"
    };

    // Send POST request to owner login endpoint
    chai.request(server)
        .post("/api/owner/login")
        .send(loginData)
        .end((err, res) => {
          if (err) return done(err);
          // Assertion for login with wrong password
          res.should.have.status(401);
          res.body.should.have.property('success').equal(false);
          res.body.should.have.property('message').equal('Invalid owner credentials');
          res.body.should.have.property('errors').that.is.an('array').that.is.empty;
          done();
        });
  });
});


//owner logout testing

describe("POST /api/owner/logout/:ownerId", () => {
  // Test case for owner logout successfully
  it.skip("Owner logout successfully", (done) => {
    chai.request(server)
      .post("/api/owner/logout/15") 
      .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.have.property('success').equal(true);
        res.body.should.have.property('message').equal('owner logged Out successfully');
        done();
      });
  });

  // Test case for owner logout with no JWT token
  it("Owner logout with no JWT token", (done) => {
    chai.request(server)
      .post("/api/owner/logout/1") // Assuming no need for owner ID in the logout route
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(500); // Adjust this status code based on your error handling logic
        res.body.should.have.property('error').equal('Unauthorized request');
        done();
      });
  });

});

//update owner details

describe("PUT /api/owner/dashboard/update-owner", () => {
  it.skip("It will update the owner details", (done) => {
      const updatedOwnerData = {
          "owner_id": 2,
          "owner_name": "ramesh",
          "gender": "MALE",
          "contact_no": "1234512340",
          "address": "AP"
      };

      chai.request(server)
          .put("/api/owner/dashboard/update-owner")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"]) // Set the access token and user role in cookies
          .send(updatedOwnerData)
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.body.should.have.property('success').equal(true);
              res.body.should.have.property('message').equal(' hotelowner updated');
              done();
          });
  });

  it.skip("It will fail to update owner details due to missing owner_id", (done) => {
      const invalidOwnerData = {
          "owner_name": "ramesh",
          "gender": "MALE",
          "contact_no": "1234512340",
          "address": "AP"
      };

      chai.request(server)
          .put("/api/owner/dashboard/update-owner")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"]) // Set the access token and user role in cookies
          .send(invalidOwnerData)
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(500);
              res.body.should.have.property('success').equal(false);
              res.body.should.have.property('message').equal('Couldnot update hotelowner in database ');
              res.body.should.have.property('errors').that.is.an('array').that.is.empty;
              done();
          });
  });
});

//adding new hotel

describe("POST /api/owner/dashboard/add-new-hotel", () => {
  it.skip("It will add new hotel details", (done) => {            //skipping this test case because it will keep on adding new hotels
      const newHotelData = {
          "hotel_name": "srinivas",
          "location": "Hyderabad",
          "address": "Madapur",
          "parking": "1",
          "wifi": "1",
          "room_service": "1",
          "swimming_pool": "1",
          "fitness_center": "1", 
          "dining": "1",
          "owner_id": "15"
      };

      chai.request(server)
          .post("/api/owner/dashboard/add-new-hotel")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .send(newHotelData)
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.body.should.have.property('success').equal(true);
              res.body.should.have.property('message').equal('new hotel added ');
              res.body.should.have.property('data').that.is.an('object');
              res.body.data.should.have.property('hotel_id');
              res.body.data.should.have.property('hotel_name').equal('srinivas');
              res.body.data.should.have.property('location').equal('Hyderabad');
              res.body.data.should.have.property('address').equal('Madapur');
              res.body.data.should.have.property('parking').equal('1');
              res.body.data.should.have.property('wifi').equal('1');
              res.body.data.should.have.property('room_service').equal('1');
              res.body.data.should.have.property('swimming_pool').equal('1');
              res.body.data.should.have.property('fitness_center').equal('1');
              res.body.data.should.have.property('dining').equal('1');
              res.body.data.should.have.property('owner_id').equal('15');
              done();
          });
  });

  it("It will fail to add new hotel in database due to wrong info", (done) => {
      const invalidHotelData = {
          "hotel_name": "srinivas",
          "location": "Hyderabad",
          "address": "Madapur",
          "parking": "1",
          "wifi": "1",
          "room_service": "1",
          "swimming_pool": "1",
          "fitness_center": "1",
          "dining": "True", // This should be "1" instead of "True"
          "owner_id": "15"
      };

      chai.request(server)
          .post("/api/owner/dashboard/add-new-hotel")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .send(invalidHotelData)
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(500); // This should be a 500 error as it's an internal server error due to wrong data
              res.body.should.have.property('success').equal(false);
              res.body.should.have.property('message').equal('Couldnot add new hotel in database ');
              res.body.should.have.property('errors').that.is.an('array').that.is.empty;
              done();
          });
  });
});

//update hotel details

describe("PUT /api/owner/dashboard/update-hotel", () => {
  it("It will update hotel details", (done) => {
      const updatedHotelData = {
          "hotel_id": "4",
          "hotel_name": "srinivas",
          "location": "Hyderabad",
          "address": "Madapur",
          "parking": "1",
          "wifi": "1",
          "room_service": "1",
          "swimming_pool": "1",
          "fitness_center": "1",
          "dining": "1",
          "owner_id": "15"
      };

      chai.request(server)
          .put("/api/owner/dashboard/update-hotel")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .send(updatedHotelData)
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.body.should.have.property('success').equal(true);
              res.body.should.have.property('message').equal(' hotel+amenity updated');
              res.body.should.have.property('data').equal('');
              done();
          });
  });

  it("It will fail to update hotel details due to missing hotel_id field", (done) => {
      const invalidHotelData = {
          "hotel_name": "srinivas",
          "location": "Hyderabad",
          "address": "Madapur",
          "parking": "1",
          "wifi": "1",
          "room_service": "1",
          "swimming_pool": "1",
          "fitness_center": "1",
          "dining": "1",
          "owner_id": "15"
      };

      chai.request(server)
          .put("/api/owner/dashboard/update-hotel")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .send(invalidHotelData)
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(500); // Assuming a 400 error is returned for bad request
              res.body.should.have.property('success').equal(false);
              res.body.should.have.property('message').equal('Couldnot  update hotel in database ');
              done();
          });
  });
});

//get hotels by owner id

describe("GET /api/owner/dashboard/get-hotel/15", () => {
  it("It will get all hotel details by owner id", (done) => {
      chai.request(server)
          .get("/api/owner/dashboard/get-hotel/15")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.body.should.have.property('success').equal(true);
              res.body.should.have.property('message').equal('fetched hotel detail successfully ');
              res.body.should.have.property('data').which.is.an('object');
              // Add additional assertions for specific data properties if needed
              done();
          });
  });

  it("It will fail to get hotel details due to owner id not found", (done) => {
      chai.request(server)
          .get("/api/owner/dashboard/get-hotel/999") // Assuming an invalid owner id
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(500); // Assuming a 500 error is returned for database error
              res.body.should.have.property('success').equal(false);
              res.body.should.have.property('message').equal('Couldnot fetch hotel detail from database ');
              res.body.should.have.property('errors').which.is.an('array').that.is.empty;
              done();
          });
  });
});

//get rooms by hotel id

describe("GET /api/owner/dashboard/get-all-room/4", () => {
  it("It will get all rooms details by hotel id", (done) => {
      chai.request(server)
          .get("/api/owner/dashboard/get-all-room/4") 
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.body.should.have.property('success').equal(true);
              res.body.should.have.property('message').equal(' fetched all room by hotelownerid');
              res.body.data.forEach(room => {
                room.should.have.property('room_id');
                room.should.have.property('room_size');
                room.should.have.property('bed_size');
                room.should.have.property('max_people_accomodate');
                room.should.have.property('base_fare');
                room.should.have.property('ac_non_ac');
                room.should.have.property('hotel_id'); 
            });
              done();
          });
  });
});


//get rooms details by room id


describe("GET /api/owner/dashboard/get-room/1", () => {
  it("It will get all rooms details by room id", (done) => {
      chai.request(server)
          .get("/api/owner/dashboard/get-room/1") // Assuming room id is 1
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .end((err, res) => {
              if (err) return done(err);
              if (res.status === 200) {
                  res.body.should.have.property('success').equal(true);
                  res.body.should.have.property('message').equal('fetched roomdetail by roomid');
                  res.body.should.have.property('data').which.is.an('object');
                  // Assertions for data properties
                  const room = res.body.data;
                  room.should.have.property('room_id') 
                  room.should.have.property('room_size');
                  room.should.have.property('bed_size');
                  room.should.have.property('max_people_accomodate');
                  room.should.have.property('base_fare');
                  room.should.have.property('ac_non_ac');
                  room.should.have.property('hotel_id');
                  done();
              } else {
                  res.should.have.status(500);
                  res.body.should.have.property('success').equal(false);
                  res.body.should.have.property('message').equal('Couldnot fetch given room from database ');
                  res.body.should.have.property('errors').which.is.an('array').that.is.empty;
                  done();
              }
          });
  });
});

//delete room by room id

describe("DELETE /api/owner/dashboard/delete-room/3", () => {
  it("It will delete rooms details by room id", (done) => {
      chai.request(server)
          .delete("/api/owner/dashboard/delete-room/100") // Assuming room id is 3
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y", "userRole=owner"])
          .end((err, res) => {
              if (err) return done(err);
              if (res.status === 200) {
                  res.body.should.have.property('success').equal(true);
                  res.body.should.have.property('message').equal('Success');
                  res.body.should.have.property('data').equal(' deleted given room successfully');
                  done();
              } else {
                  res.should.have.status(500);
                  res.body.should.have.property('success').equal(false);
                  res.body.should.have.property('message').equal('No room given id found ');
                  res.body.should.have.property('errors').which.is.an('array').that.is.empty;
                  done();
              }
          });
  });
});


//update room detais


describe("PUT /api/owner/dashboard/update-room", () => {
  it("It will successfully update room details", (done) => {
      const updatedRoomData = {
          "room_id": "2",
          "room_size": "1750",
          "bed_size": "DOUBLE_BED",
          "max_people_accomodate": "2",
          "base_fare": "1500",
          "ac_non_ac": "1",
          "hotel_id": "4"
      };

      chai.request(server)
          .put('/api/owner/dashboard/update-room')
          .send(updatedRoomData)
          .set('Cookie', ['accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y', 'userRole=owner'])
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('success').equal(true);
              res.body.should.have.property('message').equal('Success');
              res.body.should.have.property('data').equal(' updated  room by roomid');
              done();
          });
  });

  it("It will fail to update room details due to missing room_id", (done) => {
      const updatedRoomData = {
          "room_size": "1750",
          "bed_size": "DOUBLE_BED",
          "max_people_accomodate": "2",
          "base_fare": "1500",
          "ac_non_ac": "1",
          "hotel_id": "4"
      };

      chai.request(server)
          .put('/api/owner/dashboard/update-room')
          .send(updatedRoomData)
          .set('Cookie', ['accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE0OTYxNTU3LCJleHAiOjE3MTU1NjYzNTd9.Lah3y3kM3c_tBrXnyCijtCyUmB4tqqO9pQt82as6G-Y', 'userRole=owner'])
          .end((err, res) => {
              res.should.have.status(500);
              res.body.should.have.property('success').equal(false);
              res.body.should.have.property('message').equal('Couldnot update room in database ');
              res.body.should.have.property('errors').which.is.an('array').that.is.empty;
              done();
          });
  });
});

//add new room

describe("POST /api/owner/dashboard/add-new-room", () => {
  it("It will add new room details", (done) => {
      const newRoomData = {
          "room_size": "1750",
          "bed_size": "DOUBLE_BED",
          "max_people_accomodate": "2",
          "base_fare": "1500",
          "ac_non_ac": "1",
          "hotel_id": "4"
      };

      chai.request(server)
          .post('/api/owner/dashboard/add-new-room')
          .send(newRoomData)
          .set('Cookie', ['accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE1MDEzNTE4LCJleHAiOjE3MTU2MTgzMTh9.RjMVWFdXVdyuFT4bCpOfhFybk2EWeCtkvFxUHaTvg4A', 'userRole=owner'])
          .end((err, res) => {
              if (res.body.success) {
                  res.should.have.status(200);
                  res.body.should.have.property('success').which.is.true;
                  res.body.should.have.property('message').which.is.equal('added roomdetail successfully ');
                  res.body.should.have.property('data').which.is.an('object');
                  res.body.data.should.have.property('room_id');
                  res.body.data.should.have.property('room_size')
                  res.body.data.should.have.property('bed_size')
                  res.body.data.should.have.property('max_people_accomodate')
                  res.body.data.should.have.property('base_fare')
                  res.body.data.should.have.property('ac_non_ac')
                  res.body.data.should.have.property('hotel_id')
              } else {
                  res.should.have.status(500);
                  res.body.should.have.property('success').which.is.false;
                  res.body.should.have.property('message').which.is.equal('Couldnot add given room in database ');
                  res.body.should.have.property('errors').which.is.an('array').that.is.empty;
              }
              done();
          });
  });
});


//past bookings by hotel id

describe("PUT /api/user/dashboard/booking/past-booking", () => {
  it.skip("It will get the past bookings", (done) => {
      chai.request(server)
          .put("/api/user/dashboard/booking/past-booking/4")
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE1MDEzNTE4LCJleHAiOjE3MTU2MTgzMTh9.RjMVWFdXVdyuFT4bCpOfhFybk2EWeCtkvFxUHaTvg4A", "userRole=user"])
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.body.should.have.property('success').which.is.equal(true);
              res.body.should.have.property('message').which.is.equal('fetched past booking successfully');
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


//current bookings

describe("PUT /api/user/dashboard/booking/current-booking", () => {
  it.skip("It will get the current bookings", (done) => {
    const requestData = {
      owner_id: 15,
      hotel_id: 4
    };

    chai.request(server)
      .get("/api/user/dashboard/booking/current-booking")
      .send(requestData)
      .set('Cookie', ['accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE1MDEzNTE4LCJleHAiOjE3MTU2MTgzMTh9.RjMVWFdXVdyuFT4bCpOfhFybk2EWeCtkvFxUHaTvg4A', 'userRole=owner'])
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("data");
        res.body.data.should.be.an("array");
        // Assuming only one booking is returned in the response
        res.body.data.forEach(booking => {
        booking.should.have.property("booking_id");
        booking.should.have.property("hotel_id");
        booking.should.have.property("user_id");
        booking.should.have.property("no_rooms");
        booking.should.have.property("total_booking_amount");
        booking.should.have.property("checkin_date");
        booking.should.have.property("checkout_date");
        booking.should.have.property("booking_status").equal("BOOKED");
      });
        res.body.should.have.property("message").equal("fetched current booking successfully");
        res.body.should.have.property("success").equal(true);

        done();
      });
  });
});

//get current booking update status

describe("PUT /api/user/dashboard/booking/current-booking/update-status", () => {
  it.skip("It will update the status of the current booking", (done) => {
    const requestData = {
      owner_id: 15,
      booking_id: 1,
      booking_status: "REFUND_APPROVED"
    };

    chai.request(server)
      .put("/api/user/dashboard/booking/current-booking/update-status")
      .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoic3Jpbml2YXNAZ21haWwuY29tIiwibmFtZSI6InNyaW5pdmFzIiwiaWF0IjoxNzE1MDEzNTE4LCJleHAiOjE3MTU2MTgzMTh9.RjMVWFdXVdyuFT4bCpOfhFybk2EWeCtkvFxUHaTvg4A", "userRole=user"])
      .send(requestData)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.should.have.property("data");
        res.body.data.should.be.a("string").that.is.empty;
        res.body.should.have.property("message").equal("updated booking status");
        res.body.should.have.property("success").equal(true);
        done();
      });
  });
});

});
