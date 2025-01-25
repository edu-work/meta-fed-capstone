import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Main, { initializeTimes, updateTimes, getOpenReservations } from './components/Main';
import BookingForm from './components/BookingForm'
import * as utils from './utils/booking-api';
import { getTimeString, getDateZeroHour, getDateString, setDateZeroHour } from './utils/common';

describe("Booking Page", () => {
  test('Renders the BookingPage heading', () => {
    render(
      <MemoryRouter initialEntries={['/booking']}>
        <Main />
      </MemoryRouter>
    );
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
  })


  test('Verify initializeTimes() returns expected value', () => {
    const todaysDate = new Date();
    expect(initializeTimes()).toStrictEqual(getOpenReservations(todaysDate));
    //  expect(initializeTimes()).toStrictEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
  })


  test('Verify updateTimes() returns expected value', () => {
    const todaysDate = new Date();
    expect(updateTimes([], { type: 'check_availability', reservationDate: getDateString(todaysDate) })).toStrictEqual(getOpenReservations(todaysDate));
    //  expect(updateTimes([], {type: 'check_availability', reservationDate: todaysDate})).toStrictEqual(utils.fetchAPI(todaysDate));
    //  expect(initializeTimes()).toStrictEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
  })
});

describe("Reservation Form", () => {
  test("Valid date input element", () => {
    const handleSubmit = jest.fn();
    const handleUpdate = jest.fn();
    const availableTimes = initializeTimes();
    render(
      <MemoryRouter initialEntries={['/booking']}>
        <BookingForm onSubmitForm={handleSubmit} onUpdateTimes={handleUpdate} availableTimes={availableTimes} />
      </MemoryRouter>
    );

    const datePicker = screen.getByLabelText(/choose date/i, { selector: 'input' });
    expect(datePicker).toHaveAttribute('type', 'date');
  });

  test("Valid guest input element", () => {
    const handleSubmit = jest.fn();
    const handleUpdate = jest.fn();
    const availableTimes = initializeTimes();
    render(
      <MemoryRouter initialEntries={['/booking']}>
        <BookingForm onSubmitForm={handleSubmit} onUpdateTimes={handleUpdate} availableTimes={availableTimes} />
      </MemoryRouter>
    );

    const guests = screen.getByRole('spinbutton', { selector: 'input' });
    expect(guests).toHaveAttribute('min', '1');
    expect(guests).toHaveAttribute('max', '10');
  });

  test("Valid form submission", async () => {
    let availableTimes = initializeTimes();
    const handleUpdate = (e) => {
      availableTimes = updateTimes(availableTimes, { action: { type: 'check_availability', reservationDate: e.target.value } })
    }
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter initialEntries={['/booking']}>
        <BookingForm onSubmitForm={handleSubmit} onUpdateTimes={handleUpdate} availableTimes={availableTimes} />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button');
    await act(async () => {
      userEvent.click(submitButton);
    });

    expect(submitButton).toHaveAttribute('class');
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  test("Invalid form submission, no availability", () => {
    const availableTimes = [];
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter initialEntries={['/booking']}>
        <BookingForm onSubmitForm={handleSubmit} onUpdateTimes={updateTimes} availableTimes={availableTimes} />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    expect(submitButton).toHaveAttribute('disabled');
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});