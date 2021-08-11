import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

export interface ReviewAttribures {
  id: string;
  score: number;
  title: string;
  contents: string;
  img_url: string;
}

interface ReviewCreationAttributes extends Optional<ReviewAttribures, 'id'> {}

const MAX_SCORE = 5;

const reviewSchema = (
  sequelize: Sequelize,
): ModelCtor<Model<ReviewAttribures, ReviewCreationAttributes>> => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: MAX_SCORE,
    },
    title: {
      type: DataTypes.STRING(30),
    },
    contents: {
      type: DataTypes.STRING(100),
    },
    img_url: {
      type: DataTypes.TEXT,
    },
  });

  return Review;
};

export default reviewSchema;
