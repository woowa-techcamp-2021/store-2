import { Sequelize, ModelCtor, Model } from 'sequelize';

const likeSchema = (sequelize: Sequelize): ModelCtor<Model> => {
  const Like = sequelize.define('Like', {});

  return Like;
};

export default likeSchema;
