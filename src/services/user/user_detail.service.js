const db = require("../../config/dbconfig");
const models = require("../../models/index");
// get all users
// 1->admin dashborad ->user section
module.exports.getAllUser = async () => {
  try {
    const result = await models.userDetailModel.findAll();
    const dataValuesArray = result.map((instance) => instance.dataValues);
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
    return result; // noofitems OR 0
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};

// update existing user by id
// 1-> user dashboard -> user wants to update user_detail
module.exports.updateUser = async (data) => {
  try {
    const [result] = await models.userDetailModel.update(
      {
        user_name: data.user_name,
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
    return result;
  } catch (error) {
    console.log(error);
    return "FAILURE";
  }
};


//Posting Reviews

module.exports.addReview = async (bookingId, reviewMessage, rating) => {
  try {
    // Create the review
    const newReview = await models.reviewDetailModel.create({
      booking_id: bookingId,
      review: reviewMessage,
      rating: rating,
    });

    return newReview;
  } catch (error) {
    console.error("Error adding review:", error);
    throw new Error("Failed to add review");
  }
};


