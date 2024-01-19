const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="footer container-fluid text-center my-4">
      <p className="mx-auto">
        <a
          href="https://github.com/a-reznikov/react-2023-q4/tree/module05"
          style={{ color: '#FFFFFF' }}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>{' '}
        © 2024
      </p>
    </footer>
  );
};

export default Footer;
