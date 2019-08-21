import React, { useState, useEffect } from 'react'
import { getPhotoForUser } from '../GraphService'


interface AvatarProps {
    accessToken: string,
    userId: string | undefined,
    displayName?: string
}

const Avatar: React.SFC<AvatarProps> = ({accessToken, userId, displayName}) => {

    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        async function getAvatar() {
            if (accessToken && userId) {
                try {
                    const photoUrl = await getPhotoForUser(accessToken, userId);
                    setImageUrl(photoUrl);

                } catch (err) {
                    // this.props.showError('ERROR', JSON.stringify(err));
                }
            }
        }
        getAvatar()
    }, [])

    if (accessToken === '') {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <img src={imageUrl} title={displayName} alt={displayName} />
        </>
    )

}

export default Avatar