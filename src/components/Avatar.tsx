import React, { useState, useEffect } from 'react'
import { getPhotoForUser } from '../GraphService'


interface AvatarProps {
    accessToken: string,
    userId: string | undefined,
    displayName?: string
}

const Avatar: React.SFC<AvatarProps> = ({accessToken, userId, displayName}) => {

    const [imageUrl, setImageUrl] = useState<string|undefined>('')

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
    }, [userId, accessToken, displayName])

 if (imageUrl) {
    return (
        <>
            <img src={imageUrl} width={400} height={400} title={displayName} alt={displayName} />
        </>
    )
 } else return (
     <>
     </>
 )

}

export default Avatar