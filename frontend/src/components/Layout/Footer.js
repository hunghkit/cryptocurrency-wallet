import React from 'react';

const Footer = () => (
  <>
    <span>
      <a href="/" target="_blank">
        Bitcoin Wallet
      </a>{' '}
      &copy; 2020.
    </span>
    <span className="ml-auto">
      Powered by{' '}
      <a
        href="https://github.com/hunghkit"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hoàng Hung
      </a>
    </span>
  </>
);

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
