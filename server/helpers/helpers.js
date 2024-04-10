import bcrypt from "bcrypt";

export const hashedPasswordFtn = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(`Error with password hashing ${error}`);
  }
};

export const comparePassword = async (password, userPassword) => {
  try {
    const comparedPassword = bcrypt.compare(password, userPassword);
    return comparedPassword;
  } catch (error) {
    console.log(`Error with password comparing ${error}`);
  }
};
