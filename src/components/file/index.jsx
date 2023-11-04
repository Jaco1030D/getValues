import React, { useEffect, useState } from 'react'
import { useCalculateValue } from '../../hooks/useCalculateValue';

const File = ({file}) => {
    const {getNumWordsPDF, getNumWordsDOCX, calculateValue } = useCalculateValue()
    const [numWords, setNumWords] = useState('Calculando...')
    const [value, setValue] = useState(0)
    const name = file.name
    const fileNameParts = name.split('.');
    const extension = fileNameParts[fileNameParts.length - 1]
    
    if (extension === "pdf") {
      getNumWordsPDF(file).then(res => {
      
        setNumWords(res)
      
        const valuePDF = calculateValue(res)

        setValue(valuePDF)

      }).catch(err => {

        setNumWords(0)
        
      })
    } else {
      getNumWordsDOCX(file).then(res => {

        setNumWords(res)
      
        const valueDOCX = calculateValue(res)

        setValue(valueDOCX)

      }).catch(err => {
        setNumWords(0)
      })
    }

    // useEffect(() => {
    //   const response = getNumWordsPDF(file)
    //   setNumWords(response)
    // },[])

  return (
    <>
    <td>
      <p>
      {name}
      </p>
    </td>
    <td>{extension}</td>
    <td>{numWords}</td>
    <td>R${value}</td>
    </>
  )
}

export default File