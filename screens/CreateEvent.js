import React from 'react';
import InviteFriends from '../components/InviteFriends';
import DatePicker from '../components/DatePicker';
import SelectGames from '../components/SelectGames';

export default function createEventScreen() {
  return (
    <>
      <InviteFriends />
      <SelectGames />
      <DatePicker />
    </>
  );
}