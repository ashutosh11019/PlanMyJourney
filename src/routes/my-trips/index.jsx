import React, { useEffect, useState } from 'react';
import { db } from '@/services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import TripCard from './components/TripCard';

const MyTrips = () => {
    const [userTrips, setUserTrips] = useState([]);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            window.location.href = '/';
            return;
        }
        
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email)); // Using the logged-in user's email
        const querySnapshot = await getDocs(q);
        const tripsData = [];
        querySnapshot.forEach((doc) => {
            tripsData.push(doc.data());
        });
        setUserTrips(tripsData);
    };

    useEffect(() => {
        GetUserTrips();
    }, []);

    return (
        <div className="sm:px-10 md:px-16 lg:px-32 xl:px-32 px-5 mt-10">
            <h2 className="text-2xl font-bold mb-6">Your Trips</h2>
            {userTrips.length === 0 ? (
                <p>No trips found for this user.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {userTrips.map((trip, index) => (
                        <TripCard key={index} trip={trip} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTrips;
