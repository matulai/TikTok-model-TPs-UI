import {Navigate} from 'react-router-dom';
import { getTokenFromLocalStorage } from './utils/localStorage';

const UnprotectedRoute = ({element}) => {
  const token = getTokenFromLocalStorage();
  if (token !== null) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default UnprotectedRoute;
