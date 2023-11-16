import SelectInput from '../Select';
import SelectInputMultiple from '../selectMultiple';
import './styles.css';


const Inputs = ({inputsValue, update, languages}) => {
  return (
    <div className='inputs-select'>
        <SelectInput languages={languages} id={'origin'} title='Traduzir de' name='origin' values={inputsValue.origin} update={update} oneElement={true}/>
        <SelectInputMultiple languages={languages} id={'translation'} title='Traduzir para' values={inputsValue.origin} name='translation' update={update}/>
    </div>
  )
}

export default Inputs