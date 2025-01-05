import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import BookingForm from "./components/BookingForm";


test( 'Renders the BookingForm heading', () =>{
  render(
      <BookingForm />
  );
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
})