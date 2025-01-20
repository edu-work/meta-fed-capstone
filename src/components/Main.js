import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useReducer } from 'react';
import Homepage from "./Homepage";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./BookingConfirmationPage";
import * as utils from '../utils/booking-api';
import { getTimeString, getDateZeroHour, setDateZeroHour } from '../utils/common';


export const getOpenReservations = (reservationDate) => {
  const todaysDate = new Date();
  const todayZeroHour = setDateZeroHour( new Date( todaysDate ) );
  let availability = [];

//  console.log(`Reservation Date: ${reservationDate}`)

  if( reservationDate >= todayZeroHour ) {
    availability = utils.fetchAPI(reservationDate);
//    console.log( `Reservation Date: ${reservationDate},  Today's Date: ${todayZeroHour}` );

    if( reservationDate.toISOString() === todayZeroHour.toISOString() ) {
      const currentTime = getTimeString( todaysDate );
//      console.log( `Current Time: ${currentTime}` );
      availability = availability.filter( (availableTime) => availableTime > currentTime);
    }
  }

  return( availability );
}

export const initializeTimes = () => {
  const todaysDate = setDateZeroHour( new Date() );
  return( getOpenReservations(todaysDate) );
}

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'check_availability':
      const availability = getOpenReservations( getDateZeroHour( action.reservationDate ) );
//      console.log(`Action: ${JSON.stringify(action)}  Date: ${action.reservationDate}  Availability: ${availability}`)
      return availability;
    default:
      return ([...state]);
  }
}


const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  const handleReservationDate = (e) => {
//    console.log(`Calling Dispatch`);
    dispatch({ type: 'check_availability', reservationDate: e.target.value });
  }

  const navigate = useNavigate();

  const submitForm = (formData) => {
    if( window.submitAPI(formData) ) {
      navigate( "/confirmedbooking" );
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={
          <BookingPage
            availableTimes={availableTimes}
            onUpdateTimes={handleReservationDate}
            onSubmitForm={submitForm}
          />} />
        <Route path="/confirmedbooking" element={<ConfirmedBooking />} />
      </Routes>
    </>
  );
};

export default Main;