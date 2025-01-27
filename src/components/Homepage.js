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

      <section></section>
    </main>
  );
};

export default Homepage;