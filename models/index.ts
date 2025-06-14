import sequelize from "../config/db";
import Receipt from "./Receipt";
import User from "./User";

User.hasMany(Receipt, { foreignKey: "userId" });

Receipt.belongsTo(User, { foreignKey: "userId" });

sequelize.sync({ alter: true });

sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Error connecting to the database:', err));

export { User, Receipt };



