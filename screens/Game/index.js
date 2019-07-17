import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Header } from '../../components';
import styles from "./styles";
import { generateRGB, mutateRGB } from '../../utilities';

export default class Home extends Component {

    state = {
        points: 0,
        timeLeft: 15,
        rgb: generateRGB(),
        size: 2,
        diffTileIndex: ''
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
    
    componentWillMount() {
        this.generateNewRound();
        this.interval = setInterval(() => {
          this.setState(state => ({ timeLeft: state.timeLeft - 1 }));
        }, 1000);
      }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    

    render() {
        const { rgb, diffTileIndex, diffTileColor } = this.state;
        const { width } = Dimensions.get("window");

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
                            <View style={{ flex: 1 }}>
                            </View>
                            </View>
        </View>
        
        );
    }
}