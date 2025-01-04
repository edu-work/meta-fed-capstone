import React, { useState } from 'react';
import '../App.css';

const AvailableTimes = (props) => {
    return (
        props.availableTimes.map((availableTime, index) => {
            return (<option key={index}>{availableTime}</option>);
        })
    )
}

const BookingForm = (props) => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const id = event.target.id;
        //        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [id]: value }));
    }

    const handleDate = (event) => {
        handleChange(event);
        props.onUpdateTimes(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`${JSON.stringify(inputs)}  ${props.availableTimes}`);
    }

    return (
        <>
            <h1>Book Now</h1>
            <form style={{ display: "grid", maxWidth: "200px", gap: "20px" }} onSubmit={handleSubmit}>
                <label htmlFor="res-date">Choose date</label>
                <input type="date" id="res-date" value={inputs.reservationDate} onChange={handleDate} />
                <label htmlFor="res-time">Choose time</label>
                <select id="res-time" value={inputs.reservationTime} onChange={handleChange}>
                    <AvailableTimes availableTimes={props.availableTimes} />
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input type="number" placeholder="1" min="1" max="10" id="guests" value={inputs.reservationGuests} onChange={handleChange} />
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" value={inputs.reservationOccasion} onChange={handleChange}>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                <input type="submit" value="Make Your reservation" />
            </form>
        </>
    )
}

export default BookingForm;