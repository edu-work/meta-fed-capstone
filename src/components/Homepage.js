import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import DefaultButton from './DefaultButton'


const ReservationButton = ({ children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/booking');
  }

  return (
    <DefaultButton onClick={handleClick}>Reserve a Table</DefaultButton>
  );
}

const MenuButton = ({ children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <DefaultButton onClick={handleClick}>Online Menu</DefaultButton>
  );
}

const SpecialCard = ({ title, description, price, imageSrc }) => {

  return (
    <>
      <div className='special-card'>
        <div>
          <img className='special-image' src={require(`../images/${imageSrc}`)} alt={`${title} menu item`} />
        </div>
        <div style={{margin: "10px"}}>
          <div className='flex-container'>
            <p className='section-title'>{title}</p>
            <p className='price-story'>{price}</p>
          </div>
          <p className='paragraph-text special-copy'>{description}</p>
          <div className='flex-container'>
            <p className='section-title'>Order a delivery</p>
            <img src={require('../images/delivery-van.png')} alt="Delivery Van" width="35px" />
          </div>
        </div>
      </div>
    </>
  );
}


const Homepage = () => {
  return (
    <main className='main'>
      <section className={`hero-section`}>
        <article className={`hero-article`}>
          <div className={`hero-background`}>
            <div className={`hero-copy`}>
              <h1>Little Lemon</h1>
              <h2>Chicago</h2>
              <p>
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </p>
              <ReservationButton />
            </div>
          </div>
          <img className="hero-image" src={require('../images/restaurantfood.jpg')} alt="Little Lemon food" />
        </article>
      </section>

      <section className='section'>
        <article className='specials'>
          <div className='flex-container'>
            <h2 className="display-title">This weeks specials!</h2>
            <MenuButton />
          </div>
          <div className='specials-container'>
            <SpecialCard
              title={"Greek Salad"}
              price={"$12.99"}
              description={"The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."}
              imageSrc={'greek-salad.jpg'}
            />
            <SpecialCard
              title={"Brushetta"}
              price={"$5.99"}
              description={"Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."}
              imageSrc={"brushetta.jpg"}
            />
            <SpecialCard
              title={"Lemon Dessert"}
              price={"$5.00"}
              description={"This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."}
              imageSrc={"lemon-dessert.jpg"}
            />
          </div>
        </article>
      </section>
    </main>
  );
};

export default Homepage;