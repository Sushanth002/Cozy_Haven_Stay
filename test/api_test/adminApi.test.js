const server = require("../../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

// assertion style shoot
chai.should();
chai.use(chaiHttp);

describe("AdminApi", () => {

  describe("POST /api/admin/login", () =>{
    it.skip("Admin login successfully", (done) => {
      const adminCredentials = {
        admin_email: "testadmin1@gmail.com",
        admin_password: "Sushanth@20"
      };

      chai.request(server)
          .post("/api/admin/login")
          .send(adminCredentials)
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            res.body.should.have.property('success').equal(true);
            res.body.should.have.property('data');
            res.body.data.should.have.property('admin_id');
            res.body.data.should.have.property('admin_name', 'testadmin1');
            res.body.data.should.have.property('admin_email', 'testadmin1@gmail.com');
            res.body.data.should.have.property('admin_phoneno', 'testadminphoneno1');
            res.body.should.have.property('message').equal('admin logged In Successfully');
            done();
          });
    });

    it.skip("Admin login with wrong email", (done) => {
      const adminCredentials = {
        admin_email: "wrongemail@gmail.com", // Wrong email
        admin_password: "Sushanth@20"
      };

      chai.request(server)
          .post("/api/admin/login")
          .send(adminCredentials)
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(401);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal('Invalid admin email');
            res.body.should.have.property('errors').that.is.an('array').that.is.empty;
            done();
          });
    });

    it.skip("Admin login with wrong password", (done) => {
      const adminCredentials = {
        admin_email: "testadmin1@gmail.com",
        admin_password: "WrongPassword" // Wrong password
      };

      chai.request(server)
          .post("/api/admin/login")
          .send(adminCredentials)
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(401);
            res.body.should.have.property('success').equal(false);
            res.body.should.have.property('message').equal('Invalid admin credentials');
            res.body.should.have.property('errors').that.is.an('array').that.is.empty;
            done();
          });
    });

  });


  // logout admin

  describe("POST /api/admin/logout", () => {
    // Test case for admin logout successfully
    it("Admin logout successfully", (done) => {
      chai.request(server)
        .post("/api/admin/logout/1") // Replace '1' with the admin ID
        .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg","userRole=admin"]) // Set a valid JWT token in the cookie
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.have.property('success').equal(true);
          res.body.should.have.property('message').equal('admin logged Out successfully');
          done();
        });
    });

    // Test case for admin logout with no JWT token
    it("Admin logout with no JWT token", (done) => {
      chai.request(server)
        .post("/api/admin/logout/1") // Replace '1' with the admin ID
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(500);
          res.body.should.have.property('error').equal('Unauthorized request');
          done();
        });
    });
  });

  // get all user

  describe("GET /api/admin/dashboard/get-all-user", () => {
    it("It has to get all users data", (done) => {
      chai.request(server)
        .get("/api/admin/dashboard/get-all-user")
        .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"])
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.have.property('success').equal(true);
          res.body.should.have.property('message').equal('all users fetched successfully');
          res.body.should.have.property('data').that.is.an('array');
          done();
        });
    });
  });


  // delete user by userid


  describe("DELETE /api/admin/dashboard/delete-user/1", () => {
    it.skip("It has to delete users data by user id", (done) => {
        chai.request(server)
            .delete("/api/admin/dashboard/delete-user/1") 
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"]) // Set the access token and user role in cookies
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal('User Deleted Successfully');
                done();
            });
    });

    it("It should return an error if no user with the given id is found", (done) => {
        chai.request(server)
            .delete("/api/admin/dashboard/delete-user/999") 
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"]) // Set the access token and user role in cookies
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(400);
                res.body.should.have.property('success').equal(false);
                res.body.should.have.property('message').equal('No user with given id found');
                res.body.should.have.property('errors').that.is.an('array').that.is.empty;
                done();
            });
    });
});


  // get all owner
  describe("GET /api/admin/dashboard/get-all-owner", () => {
    it("It will get all owners details", (done) => {
        chai.request(server)
            .get("/api/admin/dashboard/get-all-owner")
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"]) // Set the access token and user role in cookies
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal('all owners fetched successfully');
                res.body.should.have.property('data').that.is.an('array');
                res.body.data.forEach(owner => {
                    owner.should.have.property('owner_id');
                    owner.should.have.property('owner_name');
                    owner.should.have.property('email');
                    owner.should.have.property('gender');
                    owner.should.have.property('contact_no');
                    owner.should.have.property('address');
                });
                done();
            });
    });
});

  // delete owner by ownerid
  
  describe("DELETE /api/admin/dashboard/delete-owner/2", () => {
    it.skip("It will delete a hotel owner by ID", (done) => {
        chai.request(server)
            .delete("/api/admin/dashboard/delete-owner/4") // Replace '20' with the actual owner ID to delete
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"]) // Set the access token and user role in cookies
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.have.property('success').equal(true);
                res.body.should.have.property('message').equal('Owner Deleted Successfully');
                res.body.should.not.have.property('errors');
                done();
            });
    });

    it("It will fail to delete a hotel owner by non-existing ID", (done) => {
        chai.request(server)
            .delete("/api/admin/dashboard/delete-owner/9999") // Assuming '9999' is a non-existing owner ID
            .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"]) // Set the access token and user role in cookies
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(400);
                res.body.should.have.property('success').equal(false);
                res.body.should.have.property('message').equal('No owner with given id found');
                res.body.should.have.property('errors').that.is.an('array').that.is.empty;
                done();
            });
    });
});
  

// To get admin details by id

describe("GET /api/admin/dashboard/getadmin/1", () => {
  it("It will get admin details", (done) => {
      chai.request(server)
          .get("/api/admin/dashboard/getadmin/1") // Replace '1' with the actual admin ID to fetch
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"]) // Set the access token and user role in cookies
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(200);
              res.body.should.have.property('success').equal(true);
              res.body.should.have.property('data');
              res.body.data.should.have.property('admin_id').equal(1); // Assuming admin ID is 1
              res.body.data.should.have.property('admin_name', 'testadmin1');
              res.body.data.should.have.property('admin_email', 'testadmin1@gmail.com');
              res.body.data.should.have.property('admin_phoneno', 'testadminphoneno1');
              res.body.should.have.property('message').equal('admin detail fetched successfully');
              done();
          });
  });

  it("It will fail to get admin details for wrong admin ID", (done) => {
      chai.request(server)
          .get("/api/admin/dashboard/getadmin/99") // Assuming '9999' is a wrong admin ID
          .set("Cookie", ["accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0YWRtaW4xQGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0YWRtaW4xIiwiaWF0IjoxNzE0OTI4NDExLCJleHAiOjE3MTU1MzMyMTF9.OLfvNnnf7JmgUK2I4XZxTvyyXkpEZyryx3n7ta4QwGg", "userRole=admin"]) // Set the access token and user role in cookies
          .end((err, res) => {
              if (err) return done(err);
              res.should.have.status(500);
              res.body.should.have.property('success').equal(false);
              res.body.should.have.property('message').equal('Couldnot fetch admin detail ');
              res.body.should.have.property('errors').that.is.an('array').that.is.empty;
              done();
          });
  });
});

});
