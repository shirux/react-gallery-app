import React from 'react';
import Photo from './Photo';
import PhotoNotPhound from './PhotoNotFound';

const PhotoList = ({isLoading, data, match}) => {

    // Regex to remove the starting '/' character
    const regex = /^\//g;
    let query = match.url.replace(regex, '')
    // If route is base_url/search/:query then grabs param
    if (query.startsWith('search')) {
        query=match.params.query
    } 
    
    /**
     * Renders every photo from data prop
     */
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

    /**
     * Validates isLoading prop and renders photos if there is at least one
     */
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