import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface ScoreAttributes {
  id: number;
  title: string;
  scores: string;
}

export type ScoreCreationAttributes = Optional<ScoreAttributes, 'id'>;

const scoreSchema = (sequelize: Sequelize): ModelCtor<Model<ScoreAttributes, ScoreCreationAttributes>> => {
  const Score = sequelize.define('Score', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    scores: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return Score;
};

export default scoreSchema;
