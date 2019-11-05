import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { useNavigationParam } from 'react-navigation-hooks';
import RecordPlayer from '../components/RecordPlayer';
import RecordGame from '../components/RecordGame';
import RecordTime from '../components/RecordTime';
import RecordDuration from '../components/RecordDuration';
import { formatDuration } from '../utils/formatDuration';


export default function EditPlayScreen() {
  const users = useNavigationParam('users');
  const play = useNavigationParam('play');
  const { date: presetDate, duration, game_id, id: playID, playsUsers } = play;
  const game = useNavigationParam('game');

  //states
  const [date, setDate] = useState(new Date(presetDate));
  console.log('users:', users);
  console.log('play:', play);
  console.log('game:', game);

  const editScoreAction = () => {
    console.log('date:', date);
  }

  return (
    <>
      <RecordTime
        date={date}
        setDate={setDate}
      />
      <Button
        title={'Edit Score!'}
        icon={
          <Icon
            name='check-circle'
            type='font-awesome'
            color='white'
          />
        }
        onPress={editScoreAction}
      />
    </>
  )
}