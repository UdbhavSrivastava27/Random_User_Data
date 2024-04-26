import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileCard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?page=1&results=1&seed=abc');
        setUserData(response.data.results[0]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden md:max-w-2xl md:mt-20 items-center justify-center flex border-black border-2">
      {userData && (
        <div className="md:flex">
          <div className="md:flex-shrink-0 mt-20 p-4 rounded-lg">
            <img className="h-48 w-full object-cover md:w-48 rounded-lg border-2 border-black p-1" src={userData.picture.large} alt="User" />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide  text-indigo-500 font-semibold">Name</div>
            <p className="mt-2 text-gray-900">{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</p>
            <div className="uppercase tracking-wide text-indigo-500 font-semibold mt-4">Email</div>
            <p className="mt-2 text-gray-900">{userData.email}</p>
            <div className="uppercase tracking-wide text-indigo-500 font-semibold mt-4">Gender</div>
            <p className="mt-2 text-gray-900">{userData.gender}</p>
            <div className="uppercase tracking-wide  text-indigo-500 font-semibold mt-4">Phone</div>
            <p className="mt-2 text-gray-900">{userData.phone}</p>
            <div className="uppercase tracking-wide text-indigo-500 font-semibold mt-4">Location</div>
            <p className="mt-2 text-gray-900">{`${userData.location.city}, ${userData.location.state}, ${userData.location.country}`}</p>
       
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
