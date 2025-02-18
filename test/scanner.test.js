const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../examples/demo-app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Express App Tests", () => {
  // Test GET /home
  describe("GET /home", () => {
    it("should return status 200 and 'Hello World'", (done) => {
      chai
        .request(app)
        .get("/home")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal("Hello World");
          done();
        });
    });
  });

  // Test POST /users
  describe("POST /users", () => {
    it("should return status 201, authorization header, and user data", (done) => {
      const userData = { name: "John Doe", email: "john@example.com" };
      chai
        .request(app)
        .post("/users")
        .send(userData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res).to.have.header("authorization", "Bearer token12122");
          expect(res.body).to.deep.equal({
            message: "User created successfully",
            data: userData,
          });
          done();
        });
    });
  });

  // Test DELETE /users/:id
  describe("DELETE /users/:id", () => {
    it("should return status 200 and success message if user is deleted", (done) => {
      const userId = 1;
      chai
        .request(app)
        .delete(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: "User deleted successfully",
            data: {
              id: userId.toString(),
            },
          });
          done();
        });
    });

    it("should return status 404 and error message if user is not found", (done) => {
      const userId = 0; // Simulate a user not found scenario
      chai
        .request(app)
        .delete(`/users/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.deep.equal({
            status: 404,
            message: "User not found or could not be deleted",
          });
          done();
        });
    });
  });

  // Test PATCH /users/:id
  describe("PATCH /users/:id", () => {
    it("should return status 200 and updated user data if user is updated", (done) => {
      const userId = 1;
      const updatedData = { name: "Jane Doe" };
      chai
        .request(app)
        .patch(`/users/${userId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: "User updated successfully",
            data: {
              id: userId.toString(),
              ...updatedData,
            },
          });
          done();
        });
    });

    it("should return status 404 and error message if user is not found", (done) => {
      const userId = 0; // Simulate a user not found scenario
      const updatedData = { name: "Jane Doe" };
      chai
        .request(app)
        .patch(`/users/${userId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.deep.equal({
            status: 404,
            message: "User not found or could not be updated",
          });
          done();
        });
    });
  });

  // Test PUT /users/:id
  describe("PUT /users/:id", () => {
    it("should return status 200 and updated user data if user is updated", (done) => {
      const userId = 1;
      const updatedData = { name: "Jane Doe", email: "jane@example.com" };
      chai
        .request(app)
        .put(`/users/${userId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({
            status: 200,
            message: "User updated successfully",
            data: {
              id: userId.toString(),
              ...updatedData,
            },
          });
          done();
        });
    });

    it("should return status 404 and error message if user is not found", (done) => {
      const userId = 0; // Simulate a user not found scenario
      const updatedData = { name: "Jane Doe", email: "jane@example.com" };
      chai
        .request(app)
        .put(`/users/${userId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.deep.equal({
            status: 404,
            message: "User not found or could not be updated",
          });
          done();
        });
    });
  });
});
