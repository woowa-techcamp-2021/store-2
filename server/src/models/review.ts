import { Sequelize, DataTypes, ModelCtor, Model, Optional } from 'sequelize';

import { REVIEW } from 'config/constants';

export interface ReviewAttribures {
  id: number;
  score: number;
  title: string;
  contents: string;
  imgUrl: string;
  ItemId: number;
  UserId: string;
}

export type ReviewCreationAttributes = Optional<ReviewAttribures, 'id'>;

const reviewSchema = (sequelize: Sequelize): ModelCtor<Model<ReviewAttribures, ReviewCreationAttributes>> => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: REVIEW.MAX_SCORE,
    },
    title: {
      type: DataTypes.STRING(REVIEW.TITLE_MAX_LENGTH),
    },
    contents: {
      type: DataTypes.TEXT,
    },
    imgUrl: {
      type: DataTypes.TEXT,
    },
  });

  return Review;
};

export default reviewSchema;
