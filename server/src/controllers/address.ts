import { Request, Response } from 'express';
import addressService from 'services/address';
import errorHandler from 'utils/error/error-handler';
import { decodeToken, getAccessToken } from 'utils/jwt';

interface IAddReqBody {
  name: string;
  receiver: string;
  address: string;
}

interface IRemoveReqBody {
  id: string;
}

export const getAddress = async (req: Request<unknown, unknown, unknown, unknown>, res: Response): Promise<void> => {
  const token = getAccessToken(req.headers.authorization);
  const { uid } = decodeToken('access', token);
  try {
    const address = await addressService.getAddress(uid);
    res.status(200).json(address);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const addAddress = async (
  req: Request<unknown, unknown, IAddReqBody, unknown>,
  res: Response,
): Promise<void> => {
  const token = getAccessToken(req.headers.authorization);
  const { uid } = decodeToken('access', token);
  const { name, receiver, address } = req.body;
  try {
    await addressService.addAddress(uid, name, receiver, address);
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};

export const removeAddress = async (
  req: Request<unknown, unknown, IRemoveReqBody, unknown>,
  res: Response,
): Promise<void> => {
  const token = getAccessToken(req.headers.authorization);
  const { uid } = decodeToken('access', token);
  const { id } = req.body;
  try {
    await addressService.removeAddress(id, uid);
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    const { statusCode, errorMessage } = errorHandler(err);
    res.status(statusCode).json({ errorMessage });
  }
};
