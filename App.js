import { Text, TextInput, View, Alert, Animated} from 'react-native';
import { Button } from 'react-native-elements';
import {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import Radiobutton from './components/Radiobutton';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';



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
  const [color, setColor] = useState('red');

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
  
  useEffect(()=>{
    if(result >= 0.5 && result < 1){setColor('#fff3d1')}
    if(result < 0.5){setColor('#e4fad4')}
    if(result > 1){setColor('#ffd9d9')}
  },[result])

  function calculate(){
    //control part
      let mes = "Set";
      if(weight == 0) {
        mes +=" weight";
        weightAlert();
      };
      if(bottle == 0) {mes +=" bottles"};
      if(hour == 0) {mes +=" time"};
      setMessage(mes);
    //end of control part
      if(mes == "Set"){ //only if all has been set make the calculation
        if(gender == 'male'){setResult(forMale())}
        else{setResult(forFemale())}
    }
  }

  function resultcolor(){
    if(result>= 0.5 && result <1){
      return{
        color: '#fce703'
      }
    }
    if(result>=1){
      return{
        color: 'red'
      }
    }
  }

  return (
    
      <AnimatedBackgroundColorView
      color={color}
      initialColor='white'
      duration={10000}
      ><View style={styles.container}>
      <Text style={styles.heder}>Alcometer</Text>
      <Text style={styles.label}>Weight</Text>
      <TextInput
       returnKeyType='done'
        keyboardType='number-pad'
        placeholder='Enter your weight'
        onChangeText={text => setWeight(text)}
      />
      <Text style={styles.label}>Bottles</Text>
      <DropDownPicker
        zIndex={2000}
        open={openBT}
        items={counter_list}
        placeholder={bottle?("Selected "  + bottle.toString() + (bottle == 1 ? ' bottle ':' bottles ')):("No bottle selected")}
        setOpen={setOpenforBottles}
        setValue={setBottle}
        autoScroll={true}
      />
      <Text style={styles.label}>Time</Text>
      <DropDownPicker
        zIndex={1000}
        id="second"
        style={styles.bottomScroll}
        open={openHR}
        items={counter_list}
        placeholder={hour?("Selected "  + hour.toString() + (hour == 1 ? ' hour ':' houres ')):("No selected hours")}
        setOpen={setOpenforHours}
        setValue={setHour}
        autoScroll={true}
      />
      <Text style={styles.label}>Gender</Text>
{/*       <RadioForm
      initial={0}
      onPress={(value) => {setGender(value)}}
      radio_props={genders}
      style={styles.label}
      >
      </RadioForm> */}
      <Radiobutton style={styles.label} options={genders} onPress={(value) => {setGender(value)}} />
      <Text style={[styles.calculation,resultcolor()]}>{message == "Set"?(result>0?result:"No alcohol"):message}</Text>
      <Button onPress={calculate} buttonStyle={styles.button} title="Calculate"></Button>
      </View>
      </AnimatedBackgroundColorView>
    
  );
}

