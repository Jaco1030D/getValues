import React, { useEffect, useState } from 'react'
import { useCalculateValue } from '../../hooks/useCalculateValue';

const File = ({file, inputsValue, valueWord, languages}) => {
    const {getNumWordsPDF, getNumWordsDOCX, calculateValues, getExtension } = useCalculateValue()
    const [numWords, setNumWords] = useState('Calculando...')
    const [value, setValue] = useState([])
    const [numPages, setNumPages] = useState(0)
    const {nameWithout, extension} = getExtension(file)
  
    useEffect(() => {
      if (extension === "pdf") {
        getNumWordsPDF(file)
          .then((res) => {
            setNumWords(res.numWords);
            const value = calculateValues(res.numWords, inputsValue, valueWord, languages);
            setValue(value);
            setNumPages(res.numPages)
          })
          .catch((err) => {
            setNumWords(0);
          });
      } else {
        getNumWordsDOCX(file)
          .then((res) => {
            setNumWords(res.numWords);
            const value = calculateValues(res.numWords, inputsValue, valueWord, languages);
            setValue(value);
            setNumPages(res.numPages)
          })
          .catch((err) => {
            setNumWords(0);
          });
      }
    }, [file, extension, inputsValue, valueWord, languages]);
  return (
    <>
    {inputsValue.translation && inputsValue.translation.map((item, index) => (
      <tr key={index}> 
      <td>
        <p>
        {nameWithout}
        </p>
      </td>
      <td>{extension}</td>
      <td>{numWords}</td>
      <td>{numPages}</td>
      <td>{item}</td>
      <td>R${value[index]}</td>
      </tr>
    ))}
    
    </>
  )
}

export default File