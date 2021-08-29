export interface IListAddress {
  id: string;
  name: string;
  receiver: string;
  address: string;
  addressDetail: string;
}

export interface IAddressState {
  name: string;
  receiver: string;
  address: string;
  addressDetail: string;
}

export interface IAddressRemoveState {
  id: string;
}
