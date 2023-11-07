import SelectInput from '../Select';
import SelectInputMultiple from '../selectMultiple';

const languages = [
  { value: "pt", label: "Português" },
  { value: "en", label: "Inglês" },
  { value: "es", label: "Espanhol" },
  { value: "fr", label: "Francês" },
  { value: "de", label: "Alemão" },
  { value: "it", label: "Italiano" },
  { value: "nl", label: "Holandês" },
  { value: "ru", label: "Russo" },
  { value: "ja", label: "Japonês" },
  { value: "zh", label: "Chinês (Simplificado)" },
  { value: "ar", label: "Árabe" },
  { value: "hi", label: "Hindi" },
  { value: "ko", label: "Coreano" },
  { value: "tr", label: "Turco" },
  { value: "sv", label: "Sueco" },
  { value: "pl", label: "Polonês" },
  { value: "vi", label: "Vietnamita" },
  { value: "th", label: "Tailandês" },
  { value: "el", label: "Grego" },
  { value: "da", label: "Dinamarquês" }
];


const Inputs = ({inputsValue, update}) => {
  return (
    <div className='inputs-select'>
        <SelectInput languages={languages} id={'origin'} title='Origem' name='origin' values={inputsValue.origin} update={update} oneElement={true}/>
        <SelectInputMultiple languages={languages} id={'translation'} title='Para traduzir' name='translation' update={update}/>
    </div>
  )
}

export default Inputs