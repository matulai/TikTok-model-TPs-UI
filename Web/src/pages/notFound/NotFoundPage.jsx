import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className='notFound'>
      <h1>404 Not Found</h1>
      <Link to='/'>Go back to home</Link>
    </div>
  );
}

export default NotFoundPage;