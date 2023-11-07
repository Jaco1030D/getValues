import React, { useEffect, useState } from 'react'
import { useCalculateValue } from '../../hooks/useCalculateValue';

const File = ({file, inputsValue}) => {
    const {getNumWordsPDF, getNumWordsDOCX, calculateValues, getExtension } = useCalculateValue()
    const [numWords, setNumWords] = useState('Calculando...')
    const [value, setValue] = useState([])
    const extension = getExtension(file)
    
    // if (extension === "pdf") {
    //   getNumWordsPDF(file).then(res => {
      
    //     setNumWords(res)
      
    //     const valuePDF = calculateValue(res)

    //     setValue(valuePDF)

    //   }).catch(err => {
        
    //     setNumWords(0)
    //   })
    // } else {
    //   getNumWordsDOCX(file).then(res => {

    //     setNumWords(res)
      
    //     const valueDOCX = calculateValue(res)

    //     setValue(valueDOCX)

    //   }).catch(err => {
    //     setNumWords(0)
    //   })
    // }
    useEffect(() => {
      if (extension === "pdf") {
        getNumWordsPDF(file)
          .then((res) => {
            setNumWords(res);
            const value = calculateValues(res, inputsValue);
            setValue(value);
          })
          .catch((err) => {
            setNumWords(0);
          });
      } else {
        getNumWordsDOCX(file)
          .then((res) => {
            setNumWords(res);
            const value = calculateValues(res, inputsValue);
            setValue(value);
          })
          .catch((err) => {
            setNumWords(0);
          });
      }
    }, [file, extension, inputsValue]);
    console.log(value);
    // useEffect(() => {
    //   const value = calculateValue(numWords, inputsValue)
    //   setValue(value)
    // },[])
  return (
    <>
    {inputsValue.translation && inputsValue.translation.map((item, index) => (
      <tr key={index}> 
      <td>
        <p>
        {file.name}
        </p>
      </td>
      <td>{extension}</td>
      <td>{numWords}</td>
      <td>{item}</td>
      <td>R${value[index]}</td>
      </tr>
    ))}
    
    </>
  )
}

export default File