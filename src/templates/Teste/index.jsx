import React, { useState } from "react";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import { useCalculateValue } from '../../hooks/useCalculateValue';

function str2xml(str) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

// Get paragraphs as javascript array
function getParagraphs(content) {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  const paragraphs = [];

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = "";
    const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    if (fullText) {
      paragraphs.push(fullText);
    }
  }
  return paragraphs.join(' ');
}

const DocxReader = () => {
  const [paragraphs, setParagraphs] = useState([]);
  const [numWords, setNumWords] = useState()
  const {getCountWord, getTextFromDocx} = useCalculateValue();

  const onFileUpload = (e) => {

    const fileDOCX = e.target.files[0]
    getTextFromDocx(fileDOCX).then(res => setParagraphs(res)).catch(err => console.log(err))
    // const reader = new FileReader();
    // let file = event.target.files[0];

    // reader.onload = (e) => {
    //   const content = e.target.result;
    //   const paragraphs = getParagraphs(content);
    //   setParagraphs(paragraphs);
    //   setNumWords(getCountWord(paragraphs))
    // };

    // reader.onerror = (err) => console.error(err);

    // reader.readAsBinaryString(file);
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
