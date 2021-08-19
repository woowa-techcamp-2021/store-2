import { IQuery } from '../components/browser-router';
import useHistory from './use-history';

export const useQuery = (): IQuery => useHistory().query;
