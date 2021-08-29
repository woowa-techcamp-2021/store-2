import { db } from 'models';
import { AddressAttribures, AddressCreationAttributes } from 'models/address';
import { Model } from 'sequelize';

import errorGenerator from 'utils/error/error-generator';

const getAddress = async (uid: string): Promise<Model<AddressAttribures, AddressCreationAttributes>[]> => {
  const address = await db.Address.findAll({
    attributes: ['id', 'name', 'receiver', 'address', 'addressDetail'],
    where: {
      UserId: uid,
    },
    order: [['updatedAt', 'ASC']],
  });

  if (!address) {
    throw errorGenerator({
      message: 'GET /api/address - get address error',
      code: 'address/address-error',
    });
  }

  return address;
};

const addAddress = async (
  uid: string,
  name: string,
  receiver: string,
  address: string,
  addressDetail: string,
): Promise<Model<AddressAttribures, AddressCreationAttributes>[]> => {
  const count = await db.Address.count({
    where: {
      UserId: uid,
    },
  });
  if (count >= 3) {
    throw errorGenerator({
      message: 'POST /api/address - maximun address',
      code: 'address/maximun address',
    });
  }
  await db.Address.create({
    name,
    receiver,
    address,
    addressDetail,
    UserId: uid,
  });
  return getAddress(uid);
};

const removeAddress = async (
  id: string,
  uid: string,
): Promise<Model<AddressAttribures, AddressCreationAttributes>[]> => {
  await db.Address.destroy({ where: { id, UserId: uid } });
  return getAddress(uid);
};

export default { getAddress, addAddress, removeAddress };
