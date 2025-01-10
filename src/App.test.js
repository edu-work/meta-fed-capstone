import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import Main, { initializeTimes, updateTimes } from "./components/Main";
import * as utils from './utils/booking-api';


test( 'Renders the BookingPage heading', () => {
  render(
    <MemoryRouter initialEntries={['/booking']}>
      <Main />
    </MemoryRouter>
  );
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
})


test( 'Verify initializeTimes() returns expected value', () => {
  const todaysDate = new Date();
  expect(initializeTimes()).toStrictEqual(utils.fetchAPI(todaysDate));
//  expect(initializeTimes()).toStrictEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
})


test( 'Verify updateTimes() returns expected value', () => {
  const todaysDate = new Date();
  expect(updateTimes([], {type: 'check_availability', reservationDate: todaysDate})).toStrictEqual(utils.fetchAPI(todaysDate));
//  expect(initializeTimes()).toStrictEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
})
