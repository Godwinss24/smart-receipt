import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../config/db'



class Receipt extends Model<InferAttributes<Receipt>, InferCreationAttributes<Receipt>> {
  declare id: CreationOptional<string>
  declare userId: string;
  declare imageUrl: string;
  declare vendor: string;
  declare date: string;
  declare total: number;
  declare parsedText: string;

}

Receipt.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vendor: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  parsedText: {
    type: DataTypes.TEXT,
    allowNull: false
  },


}, { sequelize, timestamps: true, freezeTableName: true })




export default Receipt