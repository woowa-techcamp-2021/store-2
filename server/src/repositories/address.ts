import { db } from 'models';
import { AddressAttribures, AddressCreationAttributes } from 'models/address';
import { Model } from 'sequelize';

import errorGenerator from 'utils/error/error-generator';

const getAddress = async (uid: string): Promise<Model<AddressAttribures, AddressCreationAttributes>[]> => {
  const address = await db.Address.findAll({
    attributes: ['id', 'name', 'receiver', 'address'],
    where: {
      UserId: uid,
    },
    order: [['updatedAt', 'DESC']],
  });

  if (!address) {
    throw errorGenerator({
      message: 'GET /api/address - get address error',
      code: 'address/address-error',
    });
  }

  return address;
};

const addAddress = async (uid: string, name: string, receiver: string, address: string): Promise<void> => {
  await db.Address.create({
    name,
    receiver,
    address,
    UserId: uid,
  });
};

const removeAddress = async (id: string, uid: string): Promise<void> => {
  await db.Address.destroy({ where: { id, UserId: uid } });
};

export default { getAddress, addAddress, removeAddress };
