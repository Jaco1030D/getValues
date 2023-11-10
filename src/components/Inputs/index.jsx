import SelectInput from '../Select';
import SelectInputMultiple from '../selectMultiple';

const Inputs = ({inputsValue, update, languages}) => {
  return (
    <div className='inputs-select'>
        <SelectInput languages={languages} id={'origin'} title='Origem' name='origin' values={inputsValue.origin} update={update} oneElement={true}/>
        <SelectInputMultiple languages={languages} id={'translation'} title='Para traduzir' name='translation' update={update}/>
    </div>
  )
}

export default Inputs