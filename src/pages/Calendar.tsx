import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash'
import config from '../Config';
import { getEvents } from '../GraphService';

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types'

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
        <div>
            <h1>Calendar</h1>
            <Table>
                <thead>
                    <tr>
                        <th scope="col">Organizer</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                    </tr>
                </thead>
                <tbody>
                    {eventsData.map(
                        function (event: MicrosoftGraph.Event) {
                            return (
                                <tr key={event.id}>
                                    <td>{_.get(event,'organizer.emailAddress.name')}</td>
                                    <td>{event.subject}</td>
                                    <td>{formatDateTime(_.get(event,'start.dateTime'))}</td>
                                    <td>{formatDateTime(_.get(event,'end.dateTime'))}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
}

export default Calendar