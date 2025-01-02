
const Nav = ({className}) => {
    return (
        <div className={`flex-container`}>
            <nav className={`flex-item`}>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="menu.html">Menu</a></li>
                    <li><a href="reservation.html">Reservations</a></li>
                    <li><a href="order.html">Order Online</a></li>
                    <li><a href="login.html">Login</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;