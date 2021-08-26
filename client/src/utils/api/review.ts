import { AxiosResponse } from 'axios';

import { IReviewData, IReviewState } from 'types/review';

import request from './request';

export const getReviewList = ({ itemId, pageId }: IReviewState): Promise<AxiosResponse> =>
  request('GET', `/api/reviews?itemId=${itemId}&pageId=${pageId || 1}`);

export const postReview = ({ data }: IReviewData): Promise<AxiosResponse> =>
  request('POST', '/api/reviews', data, true);
