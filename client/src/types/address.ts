export interface IListAddress {
  id: string;
  name: string;
  receiver: string;
  address: string;
}

export interface IAddressState {
  name: string;
  receiver: string;
  address: string;
}

export interface IAddressRemoveState {
  id: string;
}
