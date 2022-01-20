import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import react, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight,setWeight] = useState(0);
  const [bottle,setBottle] = useState(0);
  const [hour,setHour] = useState(0);
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("Set");
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

  function bottToLit(){return bottle * 0.33}
  function grams(){return bottToLit() * 8 * 4.5}
  function burning(){return weight / 10}
  function gramsLeft(){return grams() - (burning() * hour)}
  function forMale() {return (gramsLeft() / (weight * 0.7)).toFixed(2)}
  function forFemale() {return (gramsLeft() / (weight * 0.6)).toFixed(2)}


  const weightAlert = () =>
    Alert.alert(
      "Weight parameter can not be empty.",
      " ",
      [
        { text: "OK",}
      ]
    );

  function calculate(){
    //control part
      let mes = "Set";
      if(weight == 0) {
        mes +=" weight,";
        weightAlert();
      };
      if(bottle == 0) {mes +=" bottles,"};
      if(hour == 0) {mes +=" time,"};
      setMessage(mes);
    //control part
      if(mes == "Set"){ //only if all is set make the calculation
        if(gender == 'male'){setResult(forMale())}
        else{setResult(forFemale())}
    }
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
      <Text>Time</Text>
      <DropDownPicker 
        open={openHR}
        items={counter_list}
        placeholder={hour?("Selected "  + hour.toString() + (hour == 1 ? ' hour ':' houres ')):("No selected hours")}
        setOpen={setOpenforHours}
        setValue={setHour}
        autoScroll={true}
      />
      <Text>Gender</Text>
      <RadioForm
      initial={0}
      onPress={(value) => {setGender(value)}}
      radio_props={genders}
      style={styles.label}
      >
      </RadioForm>
      <Text>{message == "Set"?(result>0?result:"No alcohol."):message}</Text>
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
