import { useState } from 'react';
import './styles.css';
import Table from '../../components/table';
import DropIntput from '../../components/DropInput';
import Inputs from '../../components/Inputs';

const languages = {
  origin: '',
  translation: ''
}
function Home() {
  const [files, setFiles] = useState({})
  const [inputsValue, setInputsValue] = useState(languages)

  console.log(inputsValue);

  const updateFieldHandler = (key, value) => {
    setInputsValue((prev) => {
      return { ...prev, [key]: value };
    });
  };
  console.log(inputsValue.origin);
  return (
    <div className="App">
        <DropIntput files={files} setFiles={setFiles} inputsValue={inputsValue} />
        <Inputs update={updateFieldHandler} inputsValue={inputsValue} />
        {files.length > 0 && inputsValue.origin.length > 0 && inputsValue.translation.length > 0 && <Table files={files} inputsValue={inputsValue} />}
    </div>
  );
}

export default Home;
