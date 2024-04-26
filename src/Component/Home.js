import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShimmerUI from './ShimmerUI';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randomSeed, setRandomSeed] = useState('');

  useEffect(() => {
    // Generate a random string for the seed
    const generateRandomString = (length) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    const fetchUserData = async () => {
      try {
        const seed = generateRandomString(3);
        setRandomSeed(seed);
        const response = await axios.get(`https://randomuser.me/api/?page=1&results=1&seed=${seed}`);
        setUserData(response.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <ShimmerUI />
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden md:max-w-2xl md:mt-20 items-center justify-center flex border-black border-2">
          {userData && (
            <div className="md:flex">
              <div className="md:flex-shrink-0 mt-20 p-4 rounded-lg">
                <img className="h-48 w-full object-cover md:w-48 rounded-lg border-2 border-black " src={userData.picture.large} alt="User" />
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
      )}
    </>
  );
};

export default Home;
