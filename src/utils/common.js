
export const getDateZeroHour = (dateString) => {
    return( new Date(dateString+"T00:00:00.000") );
}

export const setDateZeroHour = (date) => {
    if( date instanceof Date ) {
        date.setHours(0,0,0,0);
    }

    return( date );
}

export const getDateString = (date) => {
    let dateString = '';

    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
        const day = String(date.getDate()).padStart(2, '0');
        dateString = `${year}-${month}-${day}`;
    }

    return dateString;
}


export const getTimeString = (date) => {
    let timeString = '';

    if (date instanceof Date) {
        const hour = date.getHours();
        const minute = date.getMinutes();
        timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }

    return timeString;
}


export const getTodaysDate = () => {
    return( getDateString( new Date() ) );
}
