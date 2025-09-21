import { PHOTO_REF_URL } from '@/constants/options';
import { GetPlacesDetails } from '@/services/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { PiCalendarDotsDuotone, PiMoneyWavyDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const TripCard = ({ trip }) => {
    if (!trip?.tripData?.location) return null;

    const [PhotoURL, setPhotoURL] = useState('');
    
    const GetPlacePhoto = async () => {
        const query = {
            textQuery: trip?.tripData?.location + ' '
        };
        try {
            const response = await GetPlacesDetails(query);
            setPhotoURL(PHOTO_REF_URL.replace('{placeName}', response.data?.places[0]?.photos[0]?.name));
        } catch (error) {
            console.error('Error fetching place photo:', error);
        }
    };

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    return (
        <Link to={`/view-trip/${trip?.id}`}>
            <div className="mt-4 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer shadow-md rounded-xl p-3 hover:shadow-lg border">
                <img src={PhotoURL} alt={`${trip?.tripData?.location} image`} className="rounded-xl h-48 w-full object-cover" />
                <div className="flex flex-col mt-3">
                    <h3 className="font-semibold text-lg text-gray-600">{trip?.tripData?.location}</h3>
                    <div className="flex gap-3 mt-2">
                        {/* Days info card */}
                        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md text-sm text-gray-600">
                            <PiCalendarDotsDuotone className="text-xl text-purple-500" />
                            <p>{trip?.tripData?.duration}</p>
                        </div>
                        {/* Budget info card */}
                        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md text-sm text-gray-600">
                            <PiMoneyWavyDuotone className="text-xl text-green-500" />
                            <p>{trip?.tripData?.budget} Budget</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </Link>
    );
};

export default TripCard;
