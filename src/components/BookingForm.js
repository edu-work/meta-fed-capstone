import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import '../App.css';
import { getTodaysDate, setDateZeroHour } from '../utils/common';


const validationSchema = yup.object({
  reserveDate: yup.date()
    .min(setDateZeroHour(new Date()), `Reservation Date must be ${getTodaysDate()} or later`)
    .required('Reservation Date is required')
    .typeError('Select a valid date'),
  reserveTime: yup.string()
    .required('Reservation Time is required'),
  guests: yup.number()
    .positive().integer()
    .min(1, 'At least 1 guest for reservation')
    .max(10, 'Guests must not exceed 10')
    .required('Number of guests is required')
    .typeError('Enter Guests between 1 and 10'),
  occasion: yup.string()
    .required('An occasion is required')
}).required();


const BookingForm = (props) => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      reserveDate: getTodaysDate(),
//      reserveTime: '',
      guests: 1,
      occasion: 'None'
    }
  });
  const [options, setOptions] = useState(props.availableTimes);
  const lastReserveDate = useRef(null);

  const onUpdateTimes = props.onUpdateTimes;

  const watchReserveDate = watch("reserveDate");
  //  const watchReserveTime = watch("reserveTime");
  //  const watchGuests = watch("guests");
  //  const watchOccasion = watch("occasion");

  useEffect(() => {
    const fetchTimes = () => {
      if (watchReserveDate !== lastReserveDate.current) {
//        console.log(`Fetch Watch Date: ${watchReserveDate}`)
        lastReserveDate.current = watchReserveDate;
        onUpdateTimes({ target: { value: watchReserveDate } });
      }
    };

    fetchTimes();
  }, [watchReserveDate, onUpdateTimes]);

  useEffect(() => {
    if (JSON.stringify(props.availableTimes) !== JSON.stringify(options)) {
//      console.log(`Set Options`)
      setOptions(props.availableTimes);
    }
  }, [props.availableTimes, options]);

  const onSubmit = (data) => {
    //    alert(`${JSON.stringify(inputs)}`);
    props.onSubmitForm(data);
    reset();
  }

  const hasAvailabilty = props.availableTimes && props.availableTimes.length !== 0;
  const isDisabled = !hasAvailabilty || (Object.keys(errors).length > 0);

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="reserveDate" className="section-title">Choose date</label>
        <input {...register("reserveDate")} type="date" id="reserveDate" name="reserveDate" aria-label="Select Reservation Date" min={getTodaysDate()}/>
        {errors?.reserveDate && <p className="error-message">{errors.reserveDate?.message}</p>}
        {/*         <p className="error-message">{watchReserveDate}</p>  */}

        {hasAvailabilty ? (
          <>
            <label htmlFor="reserveTime" className="section-title">Choose time</label>
            <select {...register("reserveTime")} id="reserveTime" name="reserveTime" aria-label="Select Reservation Time" >
              {/* <option disabled value="">select time</option> */}
              {options.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
              {/*
              {props.availableTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
              */}
            </select>
            {errors?.reserveTime && <p className="error-message">{errors.reserveTime?.message}</p>}
          </>
        ) : <p className="error-message">Sorry, there are no table reservations available</p>}

        <label htmlFor="guests" className="section-title">Number of guests</label>
        <input {...register("guests")} type="number" placeholder="1" min="1" max="10" id="guests" name="guests" aria-label="Enter Number of Guests" />
        {errors?.guests && <p className="error-message">{errors.guests?.message}</p>}
        {/*        <p className="error-message">{watchGuests}</p> */}

        <label htmlFor="occasion" className="section-title">Occasion</label>
        <select {...register("occasion")} id="occasion" name="occasion" aria-label="Select Occasion">
          <option>None</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        {errors?.occasion && <p className="error-message">{errors.occasion?.message}</p>}

        <button className="button button-content" type="submit" aria-label="Submit Reservation" disabled={isDisabled}>Make Your Reservation</button>
      </form>
    </>
  )
}

export default BookingForm;