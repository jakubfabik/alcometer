import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, {useState, useEffect} from 'react';
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
                    {value === item.value && <View style={styles.checkedCircle}><Text style={styles.checkCircle}>X</Text></View>}
                </Pressable>
                <Text style={styles.label}>{item.label}</Text>
            </View>
        ))
        }
    </>
  );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: 10,
        alignItems: 'center',
    },
    label: {
        marginLeft: 10,
    },
    circle: {
        height: 35,
        width: 35,
        borderRadius: 20,
        transform: [{ rotate: '45deg'}],
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#000',
        borderLeftColor: '#075fff',
        borderRightColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkCircle: {
        fontSize: 20,
		fontWeight: "bold",
        
    },
})
