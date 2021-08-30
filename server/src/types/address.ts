export interface IAddReqBody {
  name: string;
  receiver: string;
  address: string;
  addressDetail: string;
}

export interface IRemoveReqBody {
  data: {
    id: string;
  };
}
