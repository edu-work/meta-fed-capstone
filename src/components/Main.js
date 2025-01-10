import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useReducer } from 'react';
import Homepage from "./Homepage";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./BookingConfirmationPage";
import * as utils from '../utils/booking-api';

export const initializeTimes = () => {
  return (utils.fetchAPI(new Date()));
//  return (window.fetchAPI(new Date()));
  //  return (["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
}

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'check_availability':
      const availability = utils.fetchAPI(new Date(action.reservationDate));
//      const availability = window.fetchAPI(new Date(action.reservationDate));
      console.log(`Action: ${JSON.stringify(action)}  Date: ${action.reservationDate}  Availability: ${availability}`)
      return availability; // initializeTimes();
    default:
      return ([...state]);
  }
}


const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  const handleReservationDate = (e) => {
    dispatch({ type: 'check_availability', reservationDate: e.target.value });
  }

  const navigate = useNavigate();

  const submitForm = (formData) => {
    if( window.submitAPI(formData) ) {
      navigate( "/confirmedbooking" );
    }
  }

  /*
    useEffect( () => {
      console.log( window.fetchAPI(new Date()) );
    }, []);
  */

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