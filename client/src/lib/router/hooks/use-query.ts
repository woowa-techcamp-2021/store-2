import useHistory from './use-history';

import { IQuery } from '../context/router-context';

const useQuery = (): IQuery => useHistory().query;

export default useQuery;
