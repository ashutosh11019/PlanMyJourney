import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravellersList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/services/AIModel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import LoginDialog from '@/components/custom/LoginDialog';

// CreateTrip Component
const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // seting the values to the form data
  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (err) => console.log(err)
  });

  // Generate Trip
  const OnGenerateTrip = async () => {

    // Check if all the fields are filled
    if (!formData?.location) {
      toast("Please select where you are planning to go.");
      return;
    } else if (isNaN(Number(formData?.noOfDays)) || Number(formData?.noOfDays) > 6 || Number(formData?.noOfDays) < 1) {
      toast("Please select how many days you are planning to go. (up to 6 days)");
      return;
    } else if (!formData?.budget) {
      toast("Please select your budget.");
      return;
    } else if (!formData?.noOfTraveler) {
      toast("Please select the number of travelers.");
      return;
    }

    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);
    // Replace the values in the AI_PROMPT
    const FINAL_PROMPT = AI_PROMPT
      .replaceAll('{location}', formData?.location?.label)
      .replaceAll('{noOfDays}', formData?.noOfDays)
      .replaceAll('{noOfTraveler}', formData?.noOfTraveler)
      .replaceAll('{budget}', formData?.budget)

    // console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setLoading(false);
    SavePromtResponse(result?.response?.text());
  }

  const SavePromtResponse = async (response) => {
    setLoading(true);
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
    const docId = uuidv4();
    // Save the response to the database
    await setDoc(doc(db, "AITrips", docId), {
      id: docId,
      userEmail: userEmail,
      userInput: formData,
      tripData: JSON.parse(response),
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  }
  // Get User Profile
  const GetUserProfile = (response) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.access_token}`, {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
        Accept: 'application/json',
      }
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      OnGenerateTrip();
      setOpenDialog(false);
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-32 px-5 mt-10">
      {/* Heading */}
      <h2 className="font-bold text-3xl text-gray-800 leading-snug">
        Let’s Tailor Your Perfect Getaway 🏞️✈️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Share a few details, and our smart planner will craft a personalized itinerary just for you.
      </p>

      {/* Form Fields */}
      <div className="mt-8 sm:mt-10 flex flex-col gap-12">
        {/* Destination */}
        <div>
          <h2 className="text-xl my-4 font-medium">Where’s Your Dream Destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            autocompletionRequest={{ types: ['(regions)'] }}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInput('location', v) }
            }}
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-xl my-4 font-medium">How Many Days Will Your Adventure Last?</h2>
          <Input placeholder="Ex. 3" type="number" onChange={(e) => handleInput('noOfDays', e.target.value)} />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl mt-4 font-medium">What’s Your Budget for the Trip?</h2>
          <p className="text-gray-500">This budget is for activities, excursions, and experiences throughout your trip.</p>
          <div className="grid md:grid-cols-4 gap-5 mt-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInput('budget', item.title)}
                className={`p-4 border rounded-lg hover:bg-yellow-50 hover:shadow-md cursor-pointer ${formData?.budget === item.title && 'shadow-lg border-black'}`}
              >
                <h2 className="text-3xl p-2">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Number of Travelers */}
        <div>
          <h2 className="text-xl mt-4 font-medium">How Many Travelers Will Join You?</h2>
          <div className="grid md:grid-cols-4 gap-5 mt-4">
            {SelectTravellersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInput('noOfTraveler', item.people)}
                className={`p-4 border rounded-lg hover:bg-yellow-50 hover:shadow-md cursor-pointer ${formData?.noOfTraveler === item.people && 'shadow-lg border-black'}`}
              >
                <h2 className="text-3xl p-2">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="flex justify-center my-10">
        <Button disabled={loading} onClick={OnGenerateTrip} className="w-full py-3 text-lg bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition duration-300">
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              <span>Creating Trip</span>
            </>
          ) : (
            'Create My Itinerary'
          )}
        </Button>
      </div>

      {/* Google Sign In Dialog */}
      <LoginDialog openDialog={openDialog} setOpenDialog={setOpenDialog} login={login} />
    </div>
  )

}

export default CreateTrip