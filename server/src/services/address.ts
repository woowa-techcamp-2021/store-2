import addressRepisitory from 'repositories/address';
import { AddressAttribures, AddressCreationAttributes } from 'models/address';
import { Model } from 'sequelize/types';

async function getAddress(uid: string): Promise<Model<AddressAttribures, AddressCreationAttributes>[]> {
  return addressRepisitory.getAddress(uid);
}

async function addAddress(
  uid: string,
  name: string,
  receiver: string,
  address: string,
  addressDetail: string,
): Promise<Model<AddressAttribures, AddressCreationAttributes>[]> {
  return addressRepisitory.addAddress(uid, name, receiver, address, addressDetail);
}

async function removeAddress(id: string, uid: string): Promise<Model<AddressAttribures, AddressCreationAttributes>[]> {
  return addressRepisitory.removeAddress(id, uid);
}

export default { getAddress, addAddress, removeAddress };
