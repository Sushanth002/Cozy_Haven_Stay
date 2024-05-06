const assert = require("assert");
const adminService = require("../../src/services/admin/admin_detail.service");
const models = require("../../src/models/index");

describe("Admin Service", () => {
  describe("getAdminById testsuite", () => {
    before(async function () {
      console.log("[BEFORE]");
      let data = {
        admin_id: 99,
        admin_name: "testadmin1",
        admin_email: "testadmin1@gmail.com",
        admin_password: "testpassword1",
        admin_phoneno: "testphoneno1",
      };

      try {
        let result = await models.adminModel.create(data);
      } catch (error) {
        console.log("getAdminById before error");
      }
    });

    after(async function () {
      console.log("[AFTER]");
      let id = 99;
      try {
        let result = await models.adminModel.destroy({
          where: { admin_id: id },
        });
      } catch (error) {
        console.log("getAdminById after error");
      }
    });

    it("test1 should pass", async () => {
      const adminId = 99;
      const expectedResult = {
        admin_id: adminId,
        admin_name: "testadmin1",
        admin_email: "testadmin1@gmail.com",
        admin_password: "testpassword1",
        admin_phoneno: "testphoneno1",
      };
      const result = await adminService.getAdminById(adminId);
      assert.equal(result.admin_name, expectedResult.admin_name);
    });

    it("test2 should fail", async () => {
      const adminId = -1;
      const result = await adminService.getAdminById(adminId);
      assert.strictEqual(result, "FAILURE");
    });
  });

  describe("updateAdminDetail testsuite", () => {
    before(async function () {
      console.log("[BEFORE]");
      let data = {
        admin_id: 99,
        admin_name: "testadmin1",
        admin_email: "testadmin1@gmail.com",
        admin_password: "testpassword1",
        admin_phoneno: "testphoneno1",
      };

      try {
        let result = await models.adminModel.create(data);
      } catch (error) {
        console.log("error");
      }
    });

    after(async function () {
      console.log("[AFTER]");
      let id = 99;
      try {
        let result = await models.adminModel.destroy({
          where: { admin_id: id },
        });
      } catch (error) {
        console.log("error");
      }
    });
    it("test1 should pass", async () => {
      const adminData = {
        admin_id: 99,
        admin_name: "testadmin1updated",
        admin_password: "testpassword1updated",
        admin_phoneno: "testphoneno1updated",
      };
      const result = await adminService.updateAdminDetail(adminData);
      assert.equal(result, "SUCCESS");
    });

    it("test2 should fail", async () => {
      const adminData = {
        admin_id: 999,
        admin_name: "Updated Admin Name",
        admin_password: "updatedPassword",
        admin_phoneno: "9876543210",
      };
      const result = await adminService.updateAdminDetail(adminData);
      assert.strictEqual(result, "FAILURE");
    });
  });
});
