import '../App.css';
import Nav from "./Nav";


const Logo = () => {
  return (
    <div className="logo-container">
      <img className="logo" src={require('../images/little-lemon-logo.png')} alt="Little Lemon logo" />
    </div>
  )
}

const Header = () => {
  return (
    <header className={`header`}>
      <Logo />
      <Nav />
    </header>
  );
};


export default Header;