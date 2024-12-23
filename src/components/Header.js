import Nav from "./Nav";


const Header = () => {
  return(
    <header>
        <img src={require('../images/little-lemon-logo.png')} width="auto" height="75px" alt="Little Lemon logo"/>
        <Nav></Nav>
    </header>
  );
};


export default Header;