import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import { getDateString } from '../utils/common';


const ConfirmedBooking = (props, reservation) => {
  const location = useLocation();
  const formData = location.state;

  return (
    <>  {/* React.Fragment */}
      <main className='main'>
        <section className={`hero-section`}>
          <article className={`hero-article`}>
            <div className={`hero-background`}>
              <div className={`hero-copy`}>
                <h1>Little Lemon</h1>
                <h2>Table Reservation - Chicago</h2>
                <p>Thank you and we look forward to your visit.</p>
              </div>
            </div>
            <img className={`hero-image`} src={require('../images/restaurant-guests.jpg')} alt="Little Lemon guests" />
          </article>
        </section>

        <section className="section">
          <article className='main-article'>
            <h2 className="display-title">Booking Confirmed</h2>
            <div className="confirmation-copy">
              <p className="display-title">
                <span className="section-title">Reservation Date:</span> {getDateString(formData.reserveDate)}
              </p>
              <p className="display-title">
                <span className="section-title">Reservation Time:</span> {formData.reserveTime}
              </p>
              <p className="display-title">
                <span className="section-title">Guests:</span> {formData.guests}
              </p>
              <p className="display-title">
                <span className="section-title">Occasion:</span> {formData.occasion}
              </p>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default ConfirmedBooking;