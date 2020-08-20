import React from 'react';

const Photo = ({ farmId, serverId, id, secret }) => {
    return(
        <li>
            <img src={`https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`} alt="" />
        </li>
    )
}

export default Photo;