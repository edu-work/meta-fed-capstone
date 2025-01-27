import React from 'react';
import '../App.css';
import BookingForm from './BookingForm'


const BookingPage = (props) => {

  //    useEffect( () => { console.log( props.availableTimes ); }, [] );

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
                  Find a table for any occasion.
                </p>
              </div>
            </div>
            <img className={`hero-image`} src={require('../images/restaurant-guests.jpg')} alt="Little Lemon guests" />
          </article>
        </section>

        <section className='section'>
          <article className='main-article'>
            <h2 className="display-title">Book Now</h2>
            <BookingForm
              availableTimes={props.availableTimes}
              onUpdateTimes={props.onUpdateTimes}
              onSubmitForm={props.onSubmitForm} />
          </article>
        </section>
      </main>
    </>
  );
};

export default BookingPage;