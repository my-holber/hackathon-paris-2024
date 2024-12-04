import React, { useRef, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Animated, Image } from 'react-native';

export function Section({ style, children, ...rest }: any) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startRotation();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('@/assets/images/bg.png')} style={styles.bg} resizeMode="cover">
        <Image
          source={require('@/assets/images/bg_planet_blur.png')}
          style={[
            styles.bgPlanetBlur,
          ]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('@/assets/images/bg_planet.png')}
          style={[
            styles.bgPlanet,
            {
              transform: [
                { rotate: rotateInterpolate },
              ],
            },
          ]}
          resizeMode="contain"
        />
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bg: {
    flex: 1,
  },
  bgPlanet: {
    width: '400%',
    position: 'absolute',
    bottom: '-50%',
    left: '-150%',
  },
  bgPlanetBlur: {
    width: '400%',
    position: 'absolute',
    bottom: '-50%',
    left: '-150%',
  },
});
