import '../App.css';


const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-item footer-logo'>
        <img src={require('../images/little-lemon-logo-vert.png')} width="auto" height="75px" alt="Little Lemon logo" />
      </div>
      <div className='footer-item footer-copyright'>
        <p>&copy; Copyright Little Lemon</p>
      </div>
    </footer>
  );
};


export default Footer;