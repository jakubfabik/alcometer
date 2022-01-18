import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import react, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight,setWeight] = useState(0);
  const [bottle,setBottle] = useState(0);
  const [hour,setHour] = useState(0);
  const [gender, setGender] = useState('male');
  //for ios DropDownPicker:
  const [openBT, setOpenforBottles] = useState(false);
  const [openHR, setOpenforHours] = useState(false);

  const counter_list = Array();
  for(let i=0;i<20;i++){
    counter_list.push({label:i.toString(),value:i})
  }

  const genders = [{label: 'Male',value: 'male'},
  {label: 'Female',value: 'female'},
 ]

  function calculate(){
    return null;
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
        {counter_list.map((counter_list) => ( 
        <DropDownPicker.Item label={counter_list.label + (counter_list.value == 1 ? ' bottle':' counter_list')} value={counter_list.value} />
      ))}
      </DropDownPicker> */}
      <DropDownPicker 
        open={openBT}
        //value={counter_list.label + (counter_list.value == 1 ? ' bottle':' counter_list')} value={counter_list.value}
        items={counter_list}
        placeholder={bottle?("Selected "  + bottle.toString() + (bottle == 1 ? ' bottle ':' bottles ')):("No bottle selected")}
        setOpen={setOpenforBottles}
        setValue={setBottle}
        autoScroll={true}
      />
      {console.log("selected bottles: " + bottle)}
      <Text>Time</Text>
      <DropDownPicker 
        open={openHR}
        items={counter_list}
        placeholder={hour?("Selected "  + hour.toString() + (hour == 1 ? ' hour ':' houres ')):("No selected hours")}
        setOpen={setOpenforHours}
        setValue={setHour}
        autoScroll={true}
      />
      {console.log("selected hours: " + hour)}
      <Text>Gender</Text>
      <RadioForm
      initial={0}
      onPress={(value) => {setGender(value)}}
      radio_props={genders}
      style={styles.label}
      >
      </RadioForm>
      <Button onPress={calculate} style={styles.label} title="Calculate"></Button>
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
