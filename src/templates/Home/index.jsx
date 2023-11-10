import { useState } from 'react';
import './styles.css';
import Table from '../../components/table';
import DropIntput from '../../components/DropInput';
import Inputs from '../../components/Inputs';
import Values from '../../components/values';

const languagesValue = {
  origin: '',
  translation: ''
}
const languagesOrigin = [
  { value: 0, label: "Português" },
  { value: 0, label: "Inglês" },
  { value: 0, label: "Espanhol" },
  { value: 0, label: "Francês" },
  { value: 0, label: "Alemão" },
  { value: 0, label: "Italiano" },
  { value: 0, label: "Holandês" },
  { value: 0, label: "Russo" },
  { value: 0, label: "Japonês" },
  { value: 0, label: "Chinês (Simplificado)" },
  { value: 0, label: "Árabe" },
  { value: 0, label: "Hindi" },
  { value: 0, label: "Coreano" },
  { value: 0, label: "Turco" },
  { value: 0, label: "Sueco" },
  { value: 0, label: "Polonês" },
  { value: 0, label: "Vietnamita" },
  { value: 0, label: "Tailandês" },
  { value: 0, label: "Grego" },
  { value: 0, label: "Dinamarquês"}
]

function Home() {
  const [files, setFiles] = useState({})
  const [inputsValue, setInputsValue] = useState(languagesValue)
  const [valueWord, setValueWord] = useState(0.11)
  const [languages, setLanguages] = useState(languagesOrigin)

  const updateFieldHandler = (key, value) => {
    setInputsValue((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const updateValueByIndex = (index, newValue) => {
    setLanguages(prevValues => {
      return prevValues.map((value, i) => (i === index ? { ...value, value: newValue } : value));
    });
  };
  return (
    <div className="App">
        <DropIntput files={files} setFiles={setFiles} inputsValue={inputsValue} />
        <Inputs languages={languages} update={updateFieldHandler} inputsValue={inputsValue} />
        <Values languages={languages} setLanguages={updateValueByIndex} value={valueWord} setValue={setValueWord} />
        {files.length > 0 && inputsValue.origin.length > 0 && inputsValue.translation.length > 0 && <Table languages={languages} files={files} value={valueWord} inputsValue={inputsValue} />}
    </div>
  );
}

export default Home;
