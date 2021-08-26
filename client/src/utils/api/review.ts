import { AxiosResponse } from 'axios';

import { IReviewState, IRieviewPost } from 'types/review';

import request from './request';

export const getReviewList = ({ itemId, pageId }: IReviewState): Promise<AxiosResponse> =>
  request('GET', `/api/reviews?itemId=${itemId}&pageId=${pageId || 1}`);

export const postReview = ({ score, title, content, file, ItemId }: IRieviewPost): Promise<AxiosResponse> =>
  request('POST', '/api/reviews', { score, title, content, file, ItemId });
