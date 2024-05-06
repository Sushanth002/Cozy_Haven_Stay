const models = require("../../models/index");
// get all users
// 1->admin dashborad ->user section
module.exports.getAllUser = async () => {
  try {
    // console.log("########SERVICE START###############");

    let result = await models.userDetailModel.findAll();

    let dataValuesArray = result.map((instance) => instance.dataValues);
    // console.log("########SERVICE END###############");
    return dataValuesArray;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// get user by id
// 1->user dashboard -> user profile
module.exports.getUserById = async (id) => {
  try {
    const user_detail = await models.userDetailModel.findOne({
      where: { user_id: id },
    });
    return user_detail.dataValues;
  } catch (error) {
    console.log(error);
    return "FALIURE";
  }
};
module.exports.getUserByEmail = async (email) => {
  try {
    const user_detail = await models.userDetailModel.findOne({
      where: { email: email },
    });
    return user_detail.dataValues;
  } catch (error) {
    console.log(error);
    return "FALIURE";
  }
};

// add new user
// 1->user signup
module.exports.addNewUser = async (data) => {
  try {
    let result = await models.userDetailModel.create(data);
    return result.dataValues;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// delete user by id
// 1->admin dashboard -> admin wants to delete user
module.exports.deleteUserById = async (id) => {
  try {
    const result = models.userDetailModel.destroy({ where: { user_id: id } });
    return result; // noof affected row
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update existing user by id
// 1-> user dashboard -> user wants to update user_detail
module.exports.updateUserDetail = async (data) => {
  try {
    const [result] = await models.userDetailModel.update(
      {
        user_name: data.user_name,
        password: data.password,
        gender: data.gender,
        contact_no: data.contact_no,
        address: data.address,
      },
      {
        where: {
          user_id: data.user_id,
        },
      }
    );
    return result; //noofrowaffected
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
// update refresh token
module.exports.updateUserRefreshToken = async (data) => {
  try {
    const [result] = await models.userDetailModel.update(
      {
        refresh_token: data.refresh_token,
      },
      {
        where: {
          user_id: data.user_id,
        },
      }
    );
    return result; //noofrowaffected
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};
