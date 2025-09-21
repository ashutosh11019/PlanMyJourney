import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Information from '../components/Information';
import Hotels from '../components/Hotels';
import Itinerary from '../components/Itinerary';

const ViewTrip = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
        window.location.href = '/';
    }
    const { tripId } = useParams();
    const [tripData, setTripData] = React.useState([]);
    
    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    const getTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setTripData(docSnap.data());4
        } else {
            console.log("No such document!");
            toast("No Trip Found");
        }
    }
  return (
    <div className='p-6 md:px-20 lg:px-40 xl:px-60'>
        {/* Information Section */}
        <Information tripInfo={tripData}/>
        {/* Hotel Section */}
        <Hotels tripInfo={tripData}/>
        {/* Itinerary Section */}
        <Itinerary tripInfo={tripData}/>
    </div>
  )
}

export default ViewTrip