function Footer() {
  const date = new Date();

  return (
    <footer className="footer">
      <p className="footer__text">
        © {date.getFullYear()} Mesto Russia
        <br />
        Roman Kovalenko
      </p>
    </footer>
  );
}

export default Footer;
