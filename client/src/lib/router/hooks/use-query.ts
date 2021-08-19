import { IQuery } from '../context/router-context';
import useHistory from './use-history';

const useQuery = (): IQuery => useHistory().query;

export default useQuery;
