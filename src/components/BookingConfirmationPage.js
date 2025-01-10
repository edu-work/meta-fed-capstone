import React from 'react';
import '../App.css';


const ConfirmedBooking = (props) => {
    return (
        <>  {/* React.Fragment */}
      <main className='main'>
        <section className={`hero-section`}>
          <article className={`hero-article`}>
            <div className={`hero-background`}>
              <div className={`hero-copy`}>
                <h1>Little Lemon</h1>
                <h2>Table Reservation - Chicago</h2>
                <p>
                  We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </p>
              </div>
            </div>
            <img className={`hero-image`} src={require('../images/restaurant-guests.jpg')} alt="Little Lemon guests" />
          </article>
        </section>

        <section>
            <h1>Booking Confirmed</h1>
        </section>
      </main>
        </>
    );
};

export default ConfirmedBooking;