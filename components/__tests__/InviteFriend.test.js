import React from 'react';
import { render } from '@testing-library/react-native'


import InviteFriendsOverlay from '../InviteFriendsOverlay';

describe('<InviteFriendsOverlay />', () => {
  it("renders without crashing", () => {
    render(<InviteFriendsOverlay/>);
  });

  it("close via button press", () => {
    const Overlay = render(<InviteFriendsOverlay/>)
    console.log(Overlay);
  });
});

const friendsArray = [
  {
    "friend_id": 1,
    "friend_name": "Max Wong",
    "friend_avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=921623601546635&height=350&width=350&ext=1574626882&hash=AeSZ-ILZTTrn2hrH",
    "invited": true
  },
  {
    "friend_id": 2,
    "friend_name": "Zongxi Li",
    "friend_avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2184479695188878&height=350&width=350&ext=1574626952&hash=AeS_rrrvqq3FXxd6",
    "invited": false
  },
  {
    "friend_id": 4,
    "friend_name": "Jaleel Will",
    "friend_avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/abelcabans/128.jpg",
    "invited": true
  },
  {
    "friend_id": 5,
    "friend_name": "Allen Olson",
    "friend_avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/BenouarradeM/128.jpg",
    "invited": true
  },
  {
    "friend_id": 6,
    "friend_name": "Mr. Clay Nolan",
    "friend_avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/josemarques/128.jpg",
    "invited": false
  }
]