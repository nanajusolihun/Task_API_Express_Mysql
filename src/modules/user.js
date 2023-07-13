import sequelize from "../utils/config.js";
import DataTypes from "sequelize";

const Users = sequelize.define("Users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Users;
