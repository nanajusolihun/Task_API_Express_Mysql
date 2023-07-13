import Users from "../modules/user.js";
import messages from "../utils/message.js";
import fs from "fs";
import { Op } from "sequelize";

// CRUD
const createUser = async (req, res) => {
  const data = req.body;
  const file = req.file;

  if (file) {
    try {
      await Users.sync();
      const detail_Email = await Users.findOne({
        where: { email: data.email },
      });

      if (detail_Email) {
        const path = `./public/${file.filename}`;
        fs.unlinkSync(path);

        return messages(res, 404, `Email has been Register`);
      } else {
        const result = await Users.create({ ...data, image: file.filename });
        messages(res, 201, "Create user SUCCESS", result);
      }
    } catch (error) {
      messages(res, 500, error.message || "Internal Server Error");
    }
  } else {
    messages(res, 423, "File Image Required");
  }
};

const allUsers = async (req, res) => {
  const q = req.query.q ? req.query.q : "";
  const order_by = req.query.order_by ? req.query.order_by : "ASC";
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;

  try {
    await Users.sync();
    const total = await Users.findAndCountAll();
    const datas = await Users.findAll({
      where: {
        email: { [Op.substring]: q },
      },
      order: [["id", order_by]],
      offset: page === 1 ? 0 : (page - 1) * per_page,
      limit: per_page,
    });
    return messages(res, 200, "Users", datas, { page, per_page, total: total.count });
  } catch (error) {
    messages(res, 500, "Internal Server Error");
  }
};

const detailUser = async (req, res) => {
  const id = req.params.id;

  try {
    await Users.sync();
    const detail = await Users.findOne({
      where: { id },
    });
    if (!detail) {
      return messages(res, 404, `User ID :${id} not found`);
    } else {
      return messages(res, 201, "Detail user SUCCESS", detail);
    }
  } catch (error) {
    messages(res, 500, "Internal Server ERROR");
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await Users.sync();
    await Users.update(data, {
      where: { id },
    });
    return messages(res, 201, `Update user ID:${id} SUCCESS`);
  } catch (error) {
    messages(res, 500, "Internal Server ERROR");
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await Users.sync();
    const detail = await Users.destroy({
      where: { id },
    });
    if (!detail) {
      return messages(res, 404, `User ID :${id} not found`);
    } else {
      return messages(res, 201, `Delete user ID:${id} SUCCESS`, detail);
    }
  } catch (error) {
    messages(res, 500, "Internal Server ERROR");
  }
};

export { createUser, detailUser, updateUser, deleteUser, allUsers };
