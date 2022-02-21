import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
import Spin from './Spin';
import styles from '../Styles'

/** 
 *    @param options
 *    @param onPress
 */
export default function Radiobutton({options, onPress}) {
  const [value, setValue] = useState(null);
/** 
 *    @param selected
 */  
    function handlePress(selected){
        setValue(selected);
        onPress(selected);
    }

    function setDefault(){
        handlePress('male');
    }

    useEffect(()=> {
        setDefault();
    },[])

    return (
    <>
        {
        options.map((item) =>(
            <View key={item.value} style={styles.buttonContainer}>
                <Pressable style={styles.circle} onPress={() => handlePress(item.value)}>
                    {value === item.value && <View style={styles.checkCircle}><Spin></Spin></View>}
                </Pressable>
                <Text style={styles.labelBut}>{item.label}</Text>
            </View>
        ))
        }
    </>
  );
}
