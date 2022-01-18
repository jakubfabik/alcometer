import { StyleSheet, Text, TextInput, View, } from 'react-native';
import react, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App() {
  const [weight,setWeight] = useState(0);
  const [bottle,setBottle] = useState(0);
  //for ios DropDownPicker:
  const [open, setOpen] = useState(false);

  const bottles = Array();
  for(let i=0;i<20;i++){
    bottles.push({label:i.toString(),value:i})
  }

  return (
    <View style={styles.container}>
      <Text>Alcometer</Text>
      <Text>Weight</Text>
      <TextInput
        keyboardType='number-pad'
        placeholder='Enter your weight'
        onChangeText={text => setWeight(text)}
      />
      <Text>Bottles</Text>
      {/* <DropDownPicker style={styles.label} selectedValue={bottle} onValueChange={(itemValue) => setBottle(itemValue)}>
        {bottles.map((bottles) => ( 
        <DropDownPicker.Item label={bottles.label + (bottles.value == 1 ? ' bottle':' bottles')} value={bottles.value} />
      ))}
      </DropDownPicker> */}
      <DropDownPicker 
        open={open}
        //value={bottles.label + (bottles.value == 1 ? ' bottle':' bottles')} value={bottles.value}
        items={bottles}
        placeholder={bottle?("Selected "  + bottle.toString() + (bottle == 1 ? ' bottle ':' bottles ')):("No bottle selected")}
        setOpen={setOpen}
        setValue={setBottle}
        autoScroll={true}
      />
      {console.log("selected bottles: " + bottle)}
      <Text>Time</Text>
      <Text>Gender</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    marginLeft:10,
  },
  label: {
    marginBottom: 10,
  },
});
