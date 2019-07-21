import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import { Header } from '../../components';
import styles from "./styles";
import { generateRGB, mutateRGB } from '../../utilities';

export default class Home extends Component {

    state = {
        points: 0,
        timeLeft: 15,
        rgb: generateRGB(),
        size: 2,
        diffTileIndex: '',
        gameState: 'INGAME'       
    };

    generateSizeIndex = () => {
        return Math.floor(Math.random() * this.state.size);
      };

      generateNewRound = () => {
        const RGB = generateRGB();
        const mRGB = mutateRGB(RGB);
        const { points } = this.state;
        const size = Math.min(Math.max(Math.floor(Math.sqrt(points)),
        2), 5);
        this.setState({
          diffTileIndex: [this.generateSizeIndex(), this.generateSizeIndex()],
          diffTileColor: `rgb(${mRGB.r}, ${mRGB.g}, ${mRGB.b})`,
          rgb: RGB,
          size: Math.min(Math.max(Math.round(Math.sqrt(points)), 2), 4)
        });
      };

      onTilePress = (rowIndex, columnIndex) => {
          const { diffTileIndex, points, timeLeft } = this.state;
          if(rowIndex == diffTileIndex[0] && columnIndex ==
            diffTileIndex[1]) {
                this.setState({ points: points + 1, timeLeft: timeLeft + 2});
            } else {
                this.setState({ timeLeft: timeLeft -2 });
            }
            this.generateNewRound();
      }

      onBottomBarPress = async () => {
          switch(this.state.gameState) { 
              case 'INGAME': {
                  this.setState({ gameState: 'PAUSED'});
                  break;
              }
              case 'PAUSED': {
                  this.setState({ gameState: 'INGAME'});
                  break
              }
              case 'LOST': {
                  await this.setState({ points: 0, timeLeft: 15, size: 2
                });
                    this.generateNewRound();
                    this.setState({
                        gameState: 'INGAME'
                    })
                    break
              }
          }

      };
    
    componentWillMount() {
        this.generateNewRound();
        this.interval = setInterval(() => {
            if (this.state.gameState === 'INGAME') {
                if (this.state.timeLeft <= 0) {
                    this.setState({ gameState: 'LOST' });
                } else {
                    this.setState({ timeLeft: this.state.timeLeft - 1 });
                }
            }
        }, 1000)
      }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    

    render() {
        const { rgb, diffTileIndex, diffTileColor } = this.state;
        const { width } = Dimensions.get("window");

        const bottomIcon = 
            this.state.gameState === 'INGAME'
            ? require('../../assets/icons/pause.png')
            : this.state.gameState === 'PAUSED'
            ? require('../../assets/icons/play.png')
            : require('../../assets/icons/replay.png');

        return (
        <View style={styles.container}>
            <Header />
            <View style={{ height: width * 0.875, width: width * 0.875,
            flexDirection: 'row'}}>

                {Array(2).fill().map((val, columnIndex) => (
                <View style={{ flex: 1, flexDirection: 'column' }} key={columnIndex}>
                    {Array(2).fill().map((val, rowIndex) => (
                    <TouchableOpacity
                        key={`${rowIndex}.${columnIndex}`}
                        style={{
                            flex: 1,
                            backgroundColor:
                                    rowIndex == diffTileIndex[0] && columnIndex == diffTileIndex[1]
                                    ? diffTileColor
                                    : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                                    margin: 2
                                }}
                            onPress={() => this.onTilePress(rowIndex, columnIndex)}
                />
                        ))}
                </View>
                        ))}

            </View>
            <View style={styles.bottomContainer}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.counterCount}>{this.state.points}</Text>
                                <Text style={styles.counterLabel}>points</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.counterCount}>{this.state.timeLeft}</Text>
                                <Text style={styles.counterLabel}>seconds left</Text>
                            </View>
                            <View style={ styles.bestContainer}>
                                <Image source={require("../../assets/icons/trophy.png")}
                                style={styles.bestIcon} />
                                <Text style={styles.bestLabel}>
                                    0
                                </Text>
                            </View>
                            <View style = {styles.bestContainer}>
                                <Image source={require('../../assets/icons/clock.png')}
                                style={styles.longTimeIcon} />
                                <Text style={styles.bestTimeLabel}>
                                    0
                                </Text>
                            </View>
                            </View>
        </View>
        
        );
    }
}