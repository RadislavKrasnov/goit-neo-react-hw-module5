import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main>
      <div>
        404 Not Found. <Link to="/">Home</Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
