import React, {useState, useEffect} from 'react';
import {View, Animated, Easing} from 'react-native';

const Spin = (stop) => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '100deg'],
  });


  useEffect(() => {
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start()
  },[]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.Image
        style={{height: 37, width: 37, transform: [{rotate: spin}]}}
        source={{
          uri:
            'https://cdn.picpng.com/circle/small/circle-embellishment-decoration-107750.png',
        }}
      />
    </View>
  );
};

export default Spin;