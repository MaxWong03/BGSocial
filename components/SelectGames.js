import React, { useState } from 'react';
import { Overlay, Button, Icon } from 'react-native-elements';
import useVisibility from '../hooks/useVisibility';
import SelectGamesModal from './SelectGamesModal';

export default function SelectGames({ getEventGameList, gameSelectList, onSelect }) {
  const {visible, showModal, closeModal} = useVisibility(false);

  const chooseGameAction = () => {
    const gameList = [];
    gameSelectList.forEach((game) => {
      game['selected'] && gameList.push(game['id'])
    });
    getEventGameList(gameList);
    closeModal();
  }

  return (
    <>
      <Button
        onPress={showModal}
        title={'Add Games'}
        icon={
          <Icon
            name='videogame-asset'
            type='material-icons'
            color='white'
          />
        }
      />
      <Overlay
        isVisible={visible}
        children={
          <SelectGamesModal
            goBack={closeModal}
            onSelect={onSelect}
            chooseGameAction={chooseGameAction}
            gameSelectList={gameSelectList}
          />
        }
      />
    </>
  )
}

const gamesArray = {
  "games": [
    {
      "id": 1,
      "name": "Die Macher",
      "description": "Die Macher is a game about seven sequential political races in different regions of Germany. Players are in charge of national political parties, and must manage limited resources to help their party to victory. The winning party will have the most victory points after all the regional elections. There are four different ways of scoring victory points. First, each regional election can supply one to eighty victory points, depending on the size of the region and how well your party does in it. Second, if a party wins a regional election and has some media influence in the region, then the party will receive some media-control victory points. Third, each party has a national party membership which will grow as the game progresses and this will supply a fair number of victory points. Lastly, parties score some victory points if their party platform matches the national opinions at the end of the game.The 1986 edition featured four parties from the old West Germany and supported 3-4 players. The 1997 edition supports up to five players in the re-united Germany and updated several features of the rules as well.  The 2006 edition also supports up to five players and adds a shorter five-round variant and additional rules updates by the original designer.",
      "year_published": 1986,
      "age": 14,
      "play_time_min": 240,
      "play_time_max": 240,
      "bgg_id": 1,
      "average_bgg_rating": 7.6246,
      "thumbnail": "https://cf.geekdo-images.com/thumb/img/Y2pmp3_tPmiyJ032upHBwqD49xM=/fit-in/200x150/pic4718279.jpg",
      "image": "https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg",
      "category": "Economic, Negotiation, Political",
      "mechanic": "Area Majority / Influence, Auction/Bidding, Dice Rolling, Hand Management, Simultaneous Action Selection",
      "selected": false
    },
    {
      "id": 12,
      "name": "Ra",
      "description": "Ra is an auction and set-collection game with an Ancient Egyptian theme.  Each turn players are able to purchase lots of tiles with their bidding tiles (suns).  Once a player has used up his or her suns, the other players continue until they do likewise, which may set up a situation with a single uncontested player bidding on tiles before the end of the round occurs.  Tension builds because the round may end before all players have had a chance to win their three lots for the epoch.  The various tiles either give immediate points, prevent negative points for not having certain types at the end of the round (epoch), or give points after the final round.  The game lasts for three epochs (rounds).  The game offers a short learning curve, and experienced players find it both fast-moving and a quick play.From the Box:The game spans 1500 years of Egyptian history in less than an hour!The players seek to expand their power and fame and there are many ways to accomplish this: Influencing Pharaohs, Building monuments, Farming on the Nile, Paying homage to the Gods, Advancing the technology and culture of the people. Ra is an auction and set collecting game where players may choose to take risks for great rewards or... And all this is for the glory of the Sun God Ra!",
      "year_published": 1999,
      "age": 12,
      "play_time_min": 45,
      "play_time_max": 60,
      "bgg_id": 12,
      "average_bgg_rating": 7.46857,
      "thumbnail": "https://cf.geekdo-images.com/thumb/img/6d0zX3j56NknAus56Wf_WqN7S9s=/fit-in/200x150/pic3013552.jpg",
      "image": "https://cf.geekdo-images.com/original/img/iA_LlRmPfFILGon-zvbWeEzxvX8=/0x0/pic3013552.jpg",
      "category": "Ancient, Mythology",
      "mechanic": "Auction/Bidding, Auction: Once Around, Constrained Bidding, Push Your Luck, Set Collection",
      "selected": false
    },
    {
      "id": 15,
      "name": "Cosmic Encounter",
      "description": "By request of Fantasy Flight Games, Board Game Geek lists the various editions of Cosmic Encounter in separate entries. Each edition is the same game at its core, but the features, compatible expansions, and production differ among them. This entry is for the original 1977 Eon version.Players represent alien races that are seeking to spread themselves onto five foreign worlds.  To accomplish this, they make challenges against other players and enlist the aid of interested parties.  But alien powers, which are unique to each race, give players ways to bend or outright break some rule in the game.The game continues until one player occupies five planets in other systems to win. Shared victories are possible and a player need not occupy ones own system to win.",
      "year_published": 1977,
      "age": 12,
      "play_time_min": 90,
      "play_time_max": 90,
      "bgg_id": 15,
      "average_bgg_rating": 6.91934,
      "thumbnail": "https://cf.geekdo-images.com/thumb/img/ku9JLe-4isTBgHyiJbZ5cSbf8S8=/fit-in/200x150/pic428608.jpg",
      "image": "https://cf.geekdo-images.com/original/img/5koT3dPNbvckjXGwCFBX3TYfLLk=/0x0/pic428608.jpg",
      "category": "Bluffing, Negotiation, Science Fiction",
      "mechanic": "Hand Management, Variable Player Powers",
      "selected": false
    },
    {
      "id": 18,
      "name": "RoboRally",
      "description": "The robots of the Robo Rally automobile factory spend their weekdays toiling at the assembly line. They put in hard hours building high-speed supercars they never get to see in action. But on Saturday nights, the factory becomes a world of mad machines and dangerous schemes as these robots engage in their own epic race.It takes speed, wits, and dirty tricks to become a racing legend! Each player chooses a robot and directs its moves by playing cards. Chaos ensues as all players reveal the cards theyve chosen. Players face obstacles like industrial lasers, gaping pits, and moving conveyor belts -- but those can also be used to their advantage! Each player aims to make it to each of the checkpoints in numerical order. The first player to reach all of the checkpoints wins. (source: http://avalonhill.wizards.com/games/robo-rally/comingsoon)In RoboRally players each control a different robot in a race through a dangerous factory floor. Several goals will be placed on the board and you must navigate your robot to them in a specific order. The boards can be combined in several different ways to accommodate different player counts and races can be as long or as short as players desire.In general, players will first fill all of their robots registers with facedown movement cards. This happens simultaneously and there is a time element involved. If you dont act fast enough you are forced to place cards randomly to fill the rest. Then, starting with the first register, everyone reveals their card. The card with the highest number moves first. After everyone resolves their movement they reveal the next card and so on. Examples of movement cards may be to turn 90 degrees left or right, move forward 2 spaces, or move backward 1 space though there are a bigger variety than that. You can plan a perfect route, but if another robot runs into you it can push you off course. This can be disastrous since you cant reprogram any cards to fix it!Robots fire lasers and factory elements resolve after each movement and robots may become damaged. If they take enough damage certain movement cards become fixed and can no longer be changed. If they take more they may be destroyed entirely. The first robot to claim all the goals in the correct order wins, though some may award points and play tournament style.The game was reprinted by Avalon Hill (Hasbro/WotC) in 2005.",
      "year_published": 1994,
      "age": 12,
      "play_time_min": 45,
      "play_time_max": 120,
      "bgg_id": 18,
      "average_bgg_rating": 7.09744,
      "thumbnail": "https://cf.geekdo-images.com/thumb/img/4zQbF0XfyuNPaiv8rPLyFV-Sbl8=/fit-in/200x150/pic1000553.jpg",
      "image": "https://cf.geekdo-images.com/original/img/6Qod68Kgmb6NgXWdOglFnfAZiiE=/0x0/pic1000553.jpg",
      "category": "Maze, Miniatures, Racing, Science Fiction",
      "mechanic": "Action Queue, Grid Movement, Modular Board, Race, Simultaneous Action Selection",
      "selected": false
    },
    {
      "id": 24,
      "name": "Twilight Imperium",
      "description": "Sprawling game of space faring races out to dominate known space.  This game combines a number of elements from other game systems into a unique package.  Hex tiles create the game board and each player begins with a race with unique powers.  The game focuses heavily on a political voting phase and a web of trade agreements between players.Part of the Twilight Imperium Series / Family.Expanded with:    Twilight Imperium: Borderlands    Twilight Imperium: Distant Suns    Twilight Imperium: Twilight Armada    Twilight Imperium: The Outer RimRe-implemented in:    Twilight Imperium (Second Edition)    Twilight Imperium (Third Edition)    Twilight Imperium (Fourth Edition)",
      "year_published": 1997,
      "age": 12,
      "play_time_min": 240,
      "play_time_max": 240,
      "bgg_id": 24,
      "average_bgg_rating": 6.64903,
      "thumbnail": "https://cf.geekdo-images.com/thumb/img/5ub28oCmkGHYgt-d00RkEgX5AQU=/fit-in/200x150/pic857.jpg",
      "image": "https://cf.geekdo-images.com/original/img/COM3xWJeoqoM5PXSwjRCjujM1cI=/0x0/pic857.jpg",
      "category": "Civilization, Negotiation, Political, Science Fiction, Space Exploration, Wargame",
      "mechanic": "Dice Rolling, Hexagon Grid, Modular Board, Tile Placement, Variable Player Powers, Voting",
      "selected": false
    }
  ]
}