import React from 'react';
import '../App.css';


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
              </div>
            </div>
            <img className={`hero-image`} src={require('../images/restaurantfood.jpg')} alt="Little Lemon food" />
          </article>
        </section>

        <section></section>
      </main>
    );
};

export default Homepage;