import { Request, Response } from 'express';

export const getTest = (req: Request, res: Response) => {
  try {
    // validation
    // service
    res.status(200).json('test');
  } catch (err) {
    res.status(500).json('fail');
  }
};
