const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className="w-full text-center mt-20">IJ Store &copy;{currentYear}</p>
    </footer>
  );
};

export default Footer;
