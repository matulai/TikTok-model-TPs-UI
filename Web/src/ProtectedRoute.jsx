import {Navigate} from 'react-router-dom';
import {getTokenFromLocalStorage} from './utils/localStorage';

const ProtectedRoute = ({element}) => {
  const token = getTokenFromLocalStorage();
  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
