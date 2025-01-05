import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import Main from "./components/Main";


test( 'Renders the BookingPage heading', () => {
  render(
    <MemoryRouter initialEntries={['/booking']}>
      <Main />
    </MemoryRouter>
  );
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
})
