import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import RecordPlayer from '../components/RecordPlayer';
import RecordGame from '../components/RecordGame';
import RecordTime from '../components/RecordTime';
import RecordDuration from '../components/RecordDuration';
import { formatDuration } from '../utils/formatDuration';
import { deformatDuration } from '../utils/deformatDuration';
import { parsePresetDuration } from '../utils/parsePresetDuration';
import useDuration from '../hooks/useDuration';
import { getUserInfo } from './../hooks/sessionContext';
import useFriendSlot from '../hooks/useFriendSlot';
import useScore from '../hooks/useScore';
import { ScrollView } from 'react-native';
import useButtonProps from '../hooks/useButtonProps';
import { api } from './../api';

export default function EditPlayScreen() {
  //presetData and their parsing
  const users = useNavigationParam('users');
  const play = useNavigationParam('play');
  const game = useNavigationParam('game');
  const userGames = useNavigationParam('userGames');
  const userFriends = useNavigationParam('userFriends');
  const { navigate } = useNavigation();
  const { date: presetDate, duration, game_id, id: playID, playsUsers } = play;
  const { hour: presetHour, minute: presetMinute, second: presetSecond } = deformatDuration(duration);
  const { userData } = getUserInfo();
  const { avatar, id, name } = userData;
  const presetUserID = playsUsers.map(user => user.user_id);
  const presetScoreList =
    playsUsers.map(playObj => {
      return { id: playObj.user_id, score: playObj.score }
    });



  //states
  const [date, setDate] = useState(new Date(presetDate));
  const { hour, minute, second, changeHour, changeMinute, changeSecond }
    = useDuration(
      parsePresetDuration(presetHour),
      parsePresetDuration(presetMinute),
      parsePresetDuration(presetSecond)
    );
  const [gameRecord, setGameRecord] = useState([game.id]);
  const { friendSlots, changeFriendSlot } = useFriendSlot(presetUserID);
  const { scoreList, addScoreList, updateScoreList, deleteScoreList, isWinner, getWinners } = useScore(null, presetScoreList);
  const { buttonTitle, setButtonTitle, buttonColor, setButtonColor }
    = useButtonProps('Edit Score!', '#2089dc');

  const editScoreAction = () => {
    if (!hour && !minute && !second) {
      setButtonTitle('Input Hour, Minute, or Second');
      setButtonColor('red');
    } else if (!gameRecord.length) {
      setButtonTitle('Select A Game');
      setButtonColor('red');
    } else {
      setButtonColor('#2089dc');
      setButtonTitle('Edit Score!');
      const editPlay = {
        id: playID,
        date,
        duration: formatDuration(hour, minute, second),
        game_id: Number(gameRecord[0]),
        event_id: null,
        playsUsers: playsUsers.map((player, index) => {
          return {
            ...player,
            score: Number(scoreList[index].score),
            is_winner: getWinners().includes(scoreList[index].id)
          }
        })
      }

      api.post(`/plays/${playID}/edit`, editPlay)
        .then(() => navigate('Plays'))
        .catch(err => console.log(err));

    }
  }

  return (
    <>
      <ScrollView>
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
        <RecordGame
          userGames={userGames}
          setGameRecord={setGameRecord}
          presetGame={game.id}
        />
        <RecordPlayer
          userFriends={userFriends}
          recordFriendList={presetUserID}
          changeFriendSlot={changeFriendSlot}
          creator={{ avatar, id, name }}
          addScoreList={addScoreList}
          updateScoreList={updateScoreList}
          deleteScoreList={deleteScoreList}
          isWinner={isWinner}
          presetScoreList={presetScoreList}
          disabled={true}
        />
      </ScrollView>
      <Button
        title={buttonTitle}
        icon={
          <Icon
            name='check-circle'
            type='font-awesome'
            color='white'
            iconStyle={{ marginRight: 5 }}
          />
        }
        buttonStyle={{ backgroundColor: buttonColor }}
        onPress={editScoreAction}
      />
    </>
  )
}