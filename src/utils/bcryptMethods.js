const bcrypt = require("bcrypt");

module.exports.isPasswordCorrect = async (inputpassword, hashedpassword) => {
  try {
    const result = await bcrypt.compare(inputpassword, hashedpassword);
    return result;
  } catch (error) {
    throw new Error(500, "Password comparison failed");
  }
};

module.exports.encryptPassword = (inputPassword) => {
  return bcrypt.hash(inputPassword, 10);
};
