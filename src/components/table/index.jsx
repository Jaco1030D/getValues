import React from 'react'
import File from '../file'

const Table = ({ files, inputsValue, value, languages }) => {
  return (
    <table>
        <thead>
        <tr id="header">
            <th>Nome</th>
            <th>Tipo</th>
            <th>Palavras</th>
            <th>Destino</th>
            <th>valor</th>
        </tr>
        </thead>
        <tbody>
        {Object.keys(files).map((key, index) => (
            <File file={files[key]} key={index} languages={languages} valueWord={value} inputsValue={inputsValue} />
        ))}
        </tbody>
    </table>
  )
}

export default Table