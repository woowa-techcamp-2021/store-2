export interface IAddReqBody {
  name: string;
  receiver: string;
  address: string;
}

export interface IRemoveReqBody {
  data: {
    id: string;
  };
}
