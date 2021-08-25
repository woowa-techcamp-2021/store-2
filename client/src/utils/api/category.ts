import request from './request';
import { ResponseType } from './types';

export const getCategories = (): ResponseType => request('GET', '/api/categories');
