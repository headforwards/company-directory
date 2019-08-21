import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import config from '../Config';
import { getPeople } from '../GraphService';
import Avatar from '../components/Avatar'
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types'

const People: React.SFC = () => {

    const [people, updatePeople] = useState<MicrosoftGraph.Person[]>([])
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        async function getPeopleData() {

            try {
                // Get the user's access token
                const token = await (window as any).msal.acquireTokenSilent({
                    scopes: config.scopes
                });

                setAccessToken(token)

                var peopleData = await getPeople(token);
                // Update the array of events in state
                updatePeople(peopleData.value);
            }
            catch (err) {
                // this.props.showError('ERROR', JSON.stringify(err));
            }
        }
        if (people !== []) {
            getPeopleData()
        }
    }, [])


    return (
        <div>
            <h1>People</h1>
            <Table>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(
                        (person: MicrosoftGraph.Person) => {
                            return (
                                <tr key={person.id}>
                                    <td>{person.id}</td>
                                    <td>{person.displayName}</td>
                                    <td><Avatar userId={person.id} accessToken={accessToken} displayName={person.displayName} /></td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </div>
    );
}

export default People