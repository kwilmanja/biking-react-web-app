import React, {useCallback, useRef, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, Autocomplete, LoadScript} from '@react-google-maps/api';
import axios from "axios";
import {useNavigate, useParams} from "react-router";
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Search() {

    const navigate = useNavigate();
    const destinationRef = useRef();

    const newAddress = () => {
        const newAddress = encodeURIComponent(destinationRef.current.value);
        navigate(`/results/${newAddress}`);
    }

    const { isLoaded } =
        useJsApiLoader({
                           googleMapsApiKey: GOOGLE_KEY,
                           libraries: ['places']
                       });

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 37.7749,
        lng: -122.4194
    };

    const options = {
        zoom: 10
    };

    // if(!isLoaded){
    //     return <h1>Loading...</h1>;
    // }

    return (
        <div>
            <h1>Search </h1>

            {/*<GoogleMap*/}
            {/*    mapContainerStyle={mapContainerStyle}*/}
            {/*    center={center}*/}
            {/*    zoom={options.zoom}*/}
            {/*    options={{*/}
            {/*        streetViewControl: false,*/}
            {/*    }}*/}
            {/*>*/}
            {/*        <Marker position={center}/>*/}
            {/*    </GoogleMap>*/}


            {/*<Autocomplete>*/}
            <input className="form-control form-control-lg" type="text"
                   id="inputLarge" placeholder="Destination"
                   ref={destinationRef}
            />

            {/*</Autocomplete>*/}
            <button className="btn btn-primary mt-2" type="button" id="button-addon2"
                    onClick={newAddress}>Submit</button>

        </div>
    );
}

export default Search;