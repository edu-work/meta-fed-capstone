import React from 'react';
import '../App.css';
import BookingForm from './BookingForm'


const Booking = (props) => {
    return (
        <>  {/* React.Fragment */}
            <BookingForm availableTimes={props.availableTimes} onUpdateTimes={props.onUpdateTimes} />
        </>
    );
};

export default Booking;