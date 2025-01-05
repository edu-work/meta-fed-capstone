import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import Main, { initializeTimes } from "./components/Main";


test( 'Renders the BookingPage heading', () => {
  render(
    <MemoryRouter initialEntries={['/booking']}>
      <Main />
    </MemoryRouter>
  );
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
})


test( 'Verify initializeTimes returns expected value', () => {
  expect(initializeTimes()).toStrictEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
})

