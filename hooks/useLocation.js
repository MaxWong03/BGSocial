import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function useLocation(presetLocation) {
  const [location, setLocation] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  async function getIP() {
    try {
      let ipResponse = await axios.get('https://api.ipify.org?format=json');
      const { ip } = ipResponse.data;
      return ip;
    } catch (e) {
      console.log(e);
    }
  }

  async function getCoords() {
    try {
      const ip = await getIP();
      let coords = await axios.get(`https://ipvigilante.com/${ip}`)
      const { latitude, longitude } = coords.data.data;
      setLatitude(latitude);
      setLongitude(longitude);
      return { latitude, longitude };

    } catch (e) {
      console.log(e);
      const lighthouseLocation = { latitude: 49.281233, longitude: -123.115241 };
      setLatitude(lighthouseLocation.latitude);
      setLongitude(lighthouseLocation.longitude);
      return { latitude, longitude };
    }
  }

  async function getAddressByIP() {
    try {
      const { latitude, longitude } = await getCoords();
      let addressResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5bd73585b2364285bae1cf2cf7e09da7`)
      const { formatted: address } = addressResponse.data.results[0];
      setLocation(address);

    } catch (e) {
      console.log(e);
    }
  }

  async function getAddressByCords() {
    try {
      if (latitude && longitude) {
        let addressResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5bd73585b2364285bae1cf2cf7e09da7`)
        const { formatted: address } = addressResponse.data.results[0];
        setLocation(address);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getCordsByAddress() {
    try {
        let cordsResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${presetLocation}&key=5bd73585b2364285bae1cf2cf7e09da7`)
        const { geometry } = cordsResponse.data.results[0]
        setLatitude(geometry.lat);
        setLongitude(geometry.lng);
    } catch (e) {
      console.log('getCordsByAddress Error:', e)
    }
  }
  //on load
  useEffect(() => {
    if (presetLocation) {
      console.log('\ngetCordsByAddress')
      getCordsByAddress();
    } else {
      console.log('\ngetAddressByIP')
      getAddressByIP();
    }
  }, []);

  //on lat/long change
  useEffect(() => {
    console.log('\ngetAddressByCords')
    getAddressByCords();
  }, [longitude])

  return {
    location,
    latitude: Number(latitude),
    longitude: Number(longitude),
    setLatitude,
    setLongitude
  }
}