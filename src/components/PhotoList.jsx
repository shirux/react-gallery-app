import React from 'react';
import Photo from './Photo';
import PhotoNotPhound from './PhotoNotFound';

const PhotoList = ({isLoading, data, match}) => {

    const regex = /^\//g;
    let query = match.url.replace(regex, '')
    if (query.startsWith('search')) {
        query=match.params.query
    } 
    
    const photos = data.map(photo => 
        <Photo 
            key={photo.id}
            farmId={photo.farm}
            serverId={photo.server}
            id={photo.id}
            secret={photo.secret}
            alt={photo.alt}
        />
    );

    const renderPhotos = () => {
        return(
            (isLoading) 
                ? <img src="/search.gif" alt="search gif"/>
                : (photos.length > 0) 
                    ?  <React.Fragment>
                            <h2>Results for: {query}</h2>
                            <ul>
                                {photos}
                            </ul>
                        </React.Fragment>
                    :  <ul><PhotoNotPhound /></ul>
        )
    }

    return(
        <div className="photo-container">
            {renderPhotos()}
        </div>
        
    )
}

export default PhotoList;