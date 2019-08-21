import React, { useState } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import config from '../Config';
import { getEvents } from '../GraphService';

// Helper function to format Graph date/time
function formatDateTime(dateTime) {
    return moment.utc(dateTime).local().format('M/D/YY h:mm A');
}

export const Calendar: React.SFC = () => {


    const [eventsData, updateEvents] = useState([])

    async function componentDidMount() {
        try {
            // Get the user's access token
            var accessToken = await (window as any).msal.acquireTokenSilent({
                scopes: config.scopes
            });
            // Get the user's events
            var events = await getEvents(accessToken);
            // Update the array of events in state
            this.setState({ events: events.value });
        }
        catch (err) {
            this.props.showError('ERROR', JSON.stringify(err));
        }
    }


    return (
        <pre><code>{JSON.stringify(this.state.events, null, 2)}</code></pre>
    );

}