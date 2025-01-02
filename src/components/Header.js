import '../App.css';


const Logo = () => {
  return(
    <div className="logo-container">
      <img className="logo" src={require('../images/little-lemon-logo.png')} alt="Little Lemon logo"/>
    </div>
  )
}

const Nav = ({className}) => {
  return (
    <nav className={`navigation`}>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="menu.html">Menu</a></li>
            <li><a href="reservation.html">Reservations</a></li>
            <li><a href="order.html">Order Online</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>
    </nav>
  );
};


const Header = () => {
  return(
    <header className={`header`}>
      <Logo />
      <Nav />
    </header>
  );
};


export default Header;