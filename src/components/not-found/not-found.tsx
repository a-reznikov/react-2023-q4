import Link from 'next/link';
import './not-found.css';

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <div className="not-found">
      <h1 className="text-warning">Page not found</h1>
      <p className="text-warning">{`(please check the URL)`}</p>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFoundPage;
