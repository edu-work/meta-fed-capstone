import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Main, { initializeTimes, updateTimes, getOpenReservations } from './components/Main';
import BookingForm from './components/BookingForm'
import * as utils from './utils/booking-api';
import { getDateString, setDateZeroHour } from './utils/common';


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
    const todaysDate = setDateZeroHour(new Date());  // Date must start at midnight (12am, 00:00)
    expect(initializeTimes()).toStrictEqual(getOpenReservations(todaysDate));
  })


  test('Verify updateTimes() returns expected value', () => {
    const todaysDate = setDateZeroHour(new Date());  // Date must start at midnight (12am, 00:00)
    expect(updateTimes([], { type: 'check_availability', reservationDate: getDateString(todaysDate) })).toStrictEqual(getOpenReservations(todaysDate));
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


  test("Valid time select element", async () => {
    const handleSubmit = jest.fn();
    const handleUpdate = jest.fn();
    const tomorrowsDate = setDateZeroHour(new Date());  // Date must start at midnight (12am, 00:00)
    tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
    const availableTimes = updateTimes([], { type: 'check_availability', reservationDate: getDateString(tomorrowsDate) });

    render(
      <MemoryRouter initialEntries={['/booking']}>
        <BookingForm onSubmitForm={handleSubmit} onUpdateTimes={handleUpdate} availableTimes={availableTimes} />
      </MemoryRouter>
    );

    const timeSelect = screen.getByLabelText(/choose time/i, { selector: 'select' });
//    const timeSelect = screen.getByRole('combobox', { name: /reserveTime/i });
    expect(timeSelect).toHaveTextContent(/:/);  // Check default value
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


  test("Valid occasion select element", async () => {
    const handleSubmit = jest.fn();
    const handleUpdate = jest.fn();
    const availableTimes = initializeTimes();

    render(
      <MemoryRouter initialEntries={['/booking']}>
        <BookingForm onSubmitForm={handleSubmit} onUpdateTimes={handleUpdate} availableTimes={availableTimes} />
      </MemoryRouter>
    );

    const occasionSelect = screen.getByRole('combobox', { name: /occasion/i });

    let selectValue = 'None';  // default value
    expect(occasionSelect).toHaveValue(selectValue);  // Check default value

    selectValue = 'Birthday';
    await userEvent.selectOptions(occasionSelect, selectValue);
    expect(occasionSelect).toHaveValue(selectValue);
    expect(screen.getByRole('option', {name: selectValue}).selected).toBe(true);

    selectValue = 'Anniversary';
    await userEvent.selectOptions(occasionSelect, selectValue);
    expect(occasionSelect).toHaveValue(selectValue);
    expect(screen.getByRole('option', {name: selectValue}).selected).toBe(true);
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