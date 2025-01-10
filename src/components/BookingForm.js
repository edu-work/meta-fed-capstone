import React, { useState } from 'react';
import '../App.css';

function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

const AvailableTimes = (props) => {
    return (
        props.availableTimes.map((availableTime, index) => {
            return (<option key={index}>{availableTime}</option>);
        })
    )
}

const BookingForm = (props) => {
    const [inputs, setInputs] = useState({'res-date': getTodaysDate(), 'res-time': props.availableTimes[0], guests: 1, occasion: 'Birthday'});

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
        alert(`${JSON.stringify(inputs)}`);
        props.onSubmitForm(inputs);
    }

    return (
        <>
            <h2>Book Now</h2>
            <form style={{ display: "grid", maxWidth: "200px", gap: "20px" }} onSubmit={handleSubmit}>
                <label htmlFor="res-date">Choose date</label>
                <input type="date" id="res-date" value={inputs['res-date']} onChange={handleDate} />
                <label htmlFor="res-time">Choose time</label>
                <select id="res-time" value={inputs['res-time']} onChange={handleChange}>
                    <AvailableTimes availableTimes={props.availableTimes} />
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input type="number" placeholder="1" min="1" max="10" id="guests" value={inputs.guests} onChange={handleChange} />
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" value={inputs.occasion} onChange={handleChange}>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                </select>
                <input type="submit" value="Make Your reservation" />
            </form>
        </>
    )
}

export default BookingForm;