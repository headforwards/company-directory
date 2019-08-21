import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import config from '../Config';
import { getEvents } from '../GraphService';


// Helper function to format Graph date/time
function formatDateTime(dateTime: Date) {
    return moment.utc(dateTime).local().format('M/D/YY h:mm A');
}

export const Calendar: React.SFC = () => {
    const [eventsData, updateEvents] = useState([])

    // async function componentDidMount() {
    useEffect(() => {
        async function fetchCalendarData() {
            try {
                // Get the user's access token
                var accessToken = await (window as any).msal.acquireTokenSilent({
                    scopes: config.scopes
                });
                // Get the user's events
                var events = await getEvents(accessToken);
                // Update the array of events in state
                updateEvents(events.value);
            }
            catch (err) {
                //showError('ERROR', JSON.stringify(err)); //Aargh, can't figure out how to define the passed function in props
            }
        }
        fetchCalendarData()
    }, [])


    return (
        <pre><code>{JSON.stringify(eventsData, null, 2)}</code></pre>
    );
}

export default Calendar