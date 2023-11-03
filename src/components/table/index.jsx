import React from 'react'
import File from '../file'

const Table = ({ files }) => {
  return (
    <table>
        <tr id="header">
            <th>Nome</th>
            <th>Tipo</th>
            <th>Palavras</th>
            <th>valor</th>
        </tr>
        {Object.keys(files).map((key, index) => (
          <tr key={index}>
            <File file={files[key]} />
          </tr>
        ))}
    </table>
  )
}

export default Table