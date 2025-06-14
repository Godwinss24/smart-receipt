import sequelize from "../config/db";
import User from "./User";

sequelize.sync({ alter: true });

sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Error connecting to the database:', err));

export { User };



