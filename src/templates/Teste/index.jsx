import React, { useState } from "react";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import { useCalculateValue } from '../../hooks/useCalculateValue';
// import mammoth from 'mammoth.js'

const DocxReader = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [numWords, setNumWords] = useState()
  const {getCountWord, getTextFromDocx} = useCalculateValue();

  const onFileUpload = (e) => {

    const fileDOCX = e.target.files[0]
    getTextFromDocx(fileDOCX).then(res => console.log('Tudo certo'))
  };

  return (
    <div>
        <input type="file" onChange={onFileUpload} name="docx-reader" />
        {numWords}
        {paragraphs}
    </div>
  );
};

export default DocxReader;
