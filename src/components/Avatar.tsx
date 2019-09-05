import React, { useState, useEffect } from 'react'
import { getPhotoForUser } from '../GraphService'
import UserAvatar from './NavBar/UserAvatar'


interface AvatarProps {
    accessToken: string,
    userId: string | undefined,
    displayName?: string
}

const emptyAvatarStyle= {
    width: '200px', 
    fontSize:'80px',
    textAlign: 'center',
    color: 'lightslategray'
} as any

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

            <img src={imageUrl} width={200} height={200} title={displayName} alt={displayName} />
        </>
    )
 } else return (
     <div 
     className="fas fa-user-circle fa-lg rounded-circle align-self-center mr-2"
     style={emptyAvatarStyle}
     >

     </div>
 )

}

export default Avatar