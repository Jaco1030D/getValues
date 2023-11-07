import { pdfjs } from 'react-pdf';
import { DOMParser } from "@xmldom/xmldom";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PizZip from 'pizzip';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const useCalculateValue = () => {
  const [value, setValue] = useState([]);

    const getTextFromPDF = async (FilePDF) => {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();
        
            reader.onloadend = async function () {

              try {

                const typedArray = new Uint8Array(reader.result);

                const pdf = await pdfjs.getDocument(typedArray).promise;

                let fullText = '';
        
                for (let i = 1; i <= pdf.numPages; i++) {

                  const page = await pdf.getPage(i);

                  const content = await page.getTextContent();

                  fullText += content.items.map((s) => s.str).join(' ');

                }
        
                resolve(fullText);

              } catch (error) {

                reject(error);

              }

            };
        
            reader.readAsArrayBuffer(FilePDF);

          });

    }

    function str2xml(str) {
      if (str.charCodeAt(0) === 65279) {
        str = str.substr(1);
      }
      return new DOMParser().parseFromString(str, "text/xml");
    }

    const getTextFromDocx = async (FileDOCX) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async function (e) {
          try {
            const zip = new PizZip(e.target.result);
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
            resolve(paragraphs.join(' '))
          } catch (error) {
            reject(error)
          }
        }

        reader.readAsArrayBuffer(FileDOCX);
      })
    }

    const getCountWord = (text) => {

        let countWords = text.trim().split(/\s+/).length

        return countWords

    }    

    const getNumWordsDOCX = async (FileDOCX) => {
      const res = await getTextFromDocx(FileDOCX)

      const numWords = await getCountWord(res)

      return numWords
    }
    const getNumWordsPDF = async (FilePDF) => {
      const res = await getTextFromPDF(FilePDF)

      const numWords = await getCountWord(res)

      return numWords
    }
    const calculateValues = (numWords, infos) => {
      const value = []

      console.log(numWords);

      console.log(infos);
      const languagesTarget = infos.translation

      console.log(languagesTarget);

      const originLanguage = infos.origin

      languagesTarget.forEach(element => {
        const valueTranslation = calculateValue(originLanguage, element)
        value.push(valueTranslation)
      });

      return value
    }

    const calculateValue = (origin, translation) => {
      return 50
    }

    const getNumWordsFile = (file) => {

    }
    const getExtension = (file) => {
      const name = file.name

      const fileNameParts = name.split('.');

      const extension = fileNameParts[fileNameParts.length - 1]

      return extension
    }
    return {
        getCountWord,
        getTextFromPDF,
        getNumWordsPDF,
        getTextFromDocx,
        getNumWordsDOCX,
        calculateValues,
        getExtension
    }
}