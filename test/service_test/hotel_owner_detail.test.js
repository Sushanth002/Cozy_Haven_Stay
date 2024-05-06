const assert = require("assert");
const hotelOwnerService = require("../../src/services/hotel/hotel_owner_detail.service");
const models = require("../../src/models/index");

describe("Admin Service", () => {
  describe("getHotelOwnerById testsuite", () => {
    before(async function () {
      await models.hotelOwnerDetailModel.create({
        owner_id: 99,
        owner_name: "TestOwner",
        password: "testpassword",
        email: "testowner@example.com",
        gender: "MALE",
        contact_no: "1234567890",
        address: "Test Address",
      });
    });
    after(async function () {
      await models.hotelOwnerDetailModel.destroy({
        where: { email: "testowner@example.com" },
      });
    });
    it("test1 should pass", async () => {
      const ownerId = 99;
      const result = await hotelOwnerService.getHotelOwnerById(ownerId);
      assert.equal(result.owner_name, "TestOwner");
    });
    it("test2 should fail", async () => {
      const ownerId = 999;
      const result = await hotelOwnerService.getHotelOwnerById(ownerId);
      assert.equal(result, "FAILURE");
    });
  });

  describe("addNewHotelOwner testsuite", () => {
    after(async function () {
      await models.hotelOwnerDetailModel.destroy({
        where: { email: "testowner@example.com" },
      });
    });
    it("test1 should pass", async () => {
      const newHotelOwnerData = {
        owner_id: 99,
        owner_name: "TestOwner",
        password: "testpassword",
        email: "testowner@example.com",
        gender: "MALE",
        contact_no: "1234567890",
        address: "Test Address",
      };
      const result = await hotelOwnerService.addNewHotelOwner(
        newHotelOwnerData
      );
      assert.equal(result.owner_name, "TestOwner");
    });

    it("test2 should fail", async () => {
      const existingHotelOwnerData = {
        owner_name: "TestOwner2",
        password: "testpassword",
        email: "testowner@example.com", //already present
        gender: "FEMALE",
        contact_no: "9876543210",
        address: "Test Address 2",
      };
      const result = await hotelOwnerService.addNewHotelOwner(
        existingHotelOwnerData
      );
      assert.equal(result, "FAILURE");
    });
  });

  describe("deleteHotelOwnerById testsuite", () => {
    before(async function () {
      let newHotelOwnerData = {
        owner_id: 99,
        owner_name: "TestOwnerToDelete",
        password: "testpassword",
        email: "testownerToDelete@example.com",
        gender: "MALE",
        contact_no: "1234567890",
        address: "Test Address for deletion",
      };
      await models.hotelOwnerDetailModel.create(newHotelOwnerData);
    });

    it("test1 should pass", async () => {
      const result = await hotelOwnerService.deleteHotelOwnerById(99);
      assert.equal(result, 1);
    });
    it("test2 should fail", async () => {
      const result = await hotelOwnerService.deleteHotelOwnerById(999);
      assert.equal(result, 0);
    });
  });
  describe("updateHotelOwner testsuite", () => {
    before(async function () {
      const newHotelOwnerData = {
        owner_id: 99,
        owner_name: "TestOwnerToUpdate",
        password: "testpassword",
        email: "testownerToUpdate@example.com",
        gender: "MALE",
        contact_no: "1234567890",
        address: "Test Address for update",
      };

      await models.hotelOwnerDetailModel.create(newHotelOwnerData);
    });
    after(async function () {
      await models.hotelOwnerDetailModel.destroy({
        where: { owner_id: 99 },
      });
    });
    it("test1 should pass", async () => {
      const updateData = {
        owner_id: 99,
        owner_name: "UpdatedOwnerName",
        password: "updatedpassword",
        gender: "FEMALE",
        contact_no: "9876543210",
        address: "Updated Test Address",
      };
      const result = await hotelOwnerService.updateHotelOwner(updateData);
      assert.strictEqual(result[0], 1);
    });
    it("test2 should fail", async () => {
      const updateData = {
        owner_id: 999,
        owner_name: "UpdatedOwnerName",
        password: "updatedpassword",
        gender: "FEMALE",
        contact_no: "9876543210",
        address: "Updated Test Address",
      };
      const result = await hotelOwnerService.updateHotelOwner(updateData);
      assert.strictEqual(result[0], 0);
    });
  });
});
