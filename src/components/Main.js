import { Routes, Route } from 'react-router-dom';
import React, { useReducer } from 'react';
import Homepage from "./Homepage";
import BookingPage from "./BookingPage";


const initializeTimes = () => {
  return( ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] );
}

const updateTimes = (state, action) => {
  switch(action.type) {
    default:
      return( [...state, "23:00"] );
  }
}


const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  const handleReservationDate = (e) => {
    dispatch( {type: 'check_availability', reservationDate: e.target.value} );
  }
  
  console.log( availableTimes );

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/booking" element={
        <BookingPage 
          availableTimes={availableTimes}
          onUpdateTimes={handleReservationDate}
        />} />
    </Routes>
  );
};


export default Main;