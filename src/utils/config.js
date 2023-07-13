import Sequelize from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "",
  database: "my_pos",
  dialect: "mysql",
});

const checking = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
checking();

export default sequelize;
