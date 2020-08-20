import React from 'react';

// Renders every photo from a base URL with params
const Photo = ({ farmId, serverId, id, secret }) => {
    return(
        <li>
            <img src={`https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`} alt="" />
        </li>
    )
}

export default Photo;