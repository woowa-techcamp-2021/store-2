import { Request, Response } from 'express';
import addressService from 'services/address';
import errorHandler from 'utils/error/error-handler';
import { decodeToken, getAccessToken } from 'utils/jwt';

import { IAddReqBody, IRemoveReqBody } from 'types/address';

export const getAddress = async (req: Request, res: Response): Promise<void> => {
  const token = getAccessToken(req.headers.authorization);
  const { uid } = decodeToken('access', token);
  try {
    const adrs = await addressService.getAddress(uid);
    res.status(200).json(adrs);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const addAddress = async (req: Request<unknown, unknown, IAddReqBody>, res: Response): Promise<void> => {
  const token = getAccessToken(req.headers.authorization);
  const { uid } = decodeToken('access', token);
  const { name, receiver, address, addressDetail } = req.body;
  try {
    const adrs = await addressService.addAddress(uid, name, receiver, address, addressDetail);
    res.status(200).json(adrs);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const removeAddress = async (req: Request<unknown, unknown, IRemoveReqBody>, res: Response): Promise<void> => {
  const token = getAccessToken(req.headers.authorization);
  const { uid } = decodeToken('access', token);
  const { id } = req.body.data;
  try {
    const address = await addressService.removeAddress(id, uid);
    res.status(200).json(address);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
