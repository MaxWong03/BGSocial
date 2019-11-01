import { Icon, Button, Rating } from 'react-native-elements';
import React, { useEffect }from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';


export default function GameInfo({ game }) {
  console.log("Entered into GameInfo component page");
  const userID = 1;

  const playTimeMin = game.play_time_min;
  const playTimeMax = game.play_time_max;


  let wiPercentage = 0;
  

  // the following code are my 'Pie Bar' attempt
  //
  // useEffect(() => {
  //   api.get(`user/games/${game.bgg_id}/win`)
  //   .then((data) => {
  //     console.log("in the front end page", data.data.winPercentage);
  //     win_percentage = data.data.winPercentage;
  //   });
  // }, []);

  // if (win_percentage !== null) {
  //   const data = [ win_percentage, (100 - win_percentage) ]
 
  //   const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
  
  //   const pieData = data
  //   .filter(value => value > 0)
  //   .map((value, index) => ({
  //       value,
  //       svg: {
  //           fill: randomColor(),
  //           onPress: () => console.log('press', index),
  //       },
  //       key: `pie-${index}`,
  //   }))
  // }

  // const win_percentage = game.win_percentage

  return (
    <View>
      <ScrollView>
          <View 
            style={styles.imageContainer}
          >
            <Image
              style={styles.image}
              source={{ uri: `${game.image}` }}
            />
          </View>

          <View 
            style={styles.textContainer}
          >
            <Text style={styles.titleStyle} >{game.name}</Text>

            <View
              style={{ paddingVertical: 15 }}
            >

              { playTimeMin === playTimeMax &&
                <Text>Play time: {playTimeMin} mins</Text>
              }

              { playTimeMin !== playTimeMax &&
                <Text>Play time: {playTimeMin} to {playTimeMax} mins</Text>
              }

              <Text>Average Rating in Bgg: {game.average_bgg_rating}</Text>

              <Text>Category: {game.category}</Text>
              <Text>Description: </Text>
              <Text style={styles.descriptionStyle}>{game.description}</Text>

              <Text>Published year: {game.year_published}</Text>
              <Text>Mechanic: {game.mechanic}</Text>
              <Text>Last Played: {game.last_play}</Text>
              
            </View>

            {/* make the rating number as stars */}
            {/* 
            { win_percentage !== null &&
              <PieChart
                style={ { height: 200 } }
                data={ pieData }
              />
            } */}

            {/* <Rating
              type='star'
              defaultRating={7.11}
              ratingCount={10}
              imageSize={20}
              showRating
              onFinishRating={this.ratingCompleted}
            /> */}

            <Button
              buttonStyle={styles.button}
              title= ' back'
              type='outline'
              iconLeft={true}
              onPress={ () => navigation.goBack() }
              icon={
                <Icon
                  size={20}
                  name='arrow-circle-left'
                  type='font-awesome'
                  color='#bdbdbd'
                  title='Go back previous page'
                />
              } />
          </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'red',
  },
  image: {
    height: 250,
    width: '100%',
    // resizeMode: 'cover',
  },
  textContainer: {
    fontSize: 30,
  },
  titleStyle: {
    fontSize: 50,
    textAlign: 'center', // <-- the magic
  },
  descriptionStyle: {
    aspectRatio: 1,
    backgroundColor: '#E2DBDB',
    margin: 5,
    padding: 5,
    textAlign: 'center', // <-- the magic
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
});