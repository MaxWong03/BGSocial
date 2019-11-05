import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { useNavigationParam } from 'react-navigation-hooks';
import RecordPlayer from '../components/RecordPlayer';
import RecordGame from '../components/RecordGame';
import RecordTime from '../components/RecordTime';
import RecordDuration from '../components/RecordDuration';
import { formatDuration } from '../utils/formatDuration';
import { deformatDuration } from '../utils/deformatDuration';
import useDuration from '../hooks/useDuration';


export default function EditPlayScreen() {
  const users = useNavigationParam('users');
  const play = useNavigationParam('play');
  const game = useNavigationParam('game');
  const { date: presetDate, duration, game_id, id: playID, playsUsers } = play;
  const { hour: presetHour, minute: presetMinute, second: presetSecond } = deformatDuration(duration);

  //states
  const [date, setDate] = useState(new Date(presetDate));
  const { hour, minute, second, changeHour, changeMinute, changeSecond } = useDuration(presetHour, presetMinute, presetSecond);

  const editScoreAction = () => {
    console.log('date:', date);
    console.log('hour:', hour);
    console.log('minute:', minute);
    console.log('second:', second);
  }

  return (
    <>
      <RecordTime
        date={date}
        setDate={setDate}
      />
      <RecordDuration
        hour={hour}
        minute={minute}
        second={second}
        changeHour={changeHour}
        changeMinute={changeMinute}
        changeSecond={changeSecond}
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