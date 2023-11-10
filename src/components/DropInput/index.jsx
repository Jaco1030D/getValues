import React, { useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';

const DropIntput = ({files, setFiles, inputsValue}) => {
    const [numArchives, setNumArchives] = useState(0)
    const [messageError, setMessageError] = useState()
    const input = useRef()
    const handleFileChange = (e) => {
        const count = e.target.files.length;
        const files = e.target.files
        setFiles(files)
        setNumArchives(count);
      }
      const handleDrop = (e) => {
        e.preventDefault()
        setMessageError('')
        if (e.dataTransfer.files.length > 0) {
          const acceptedFiles = Array.from(e.dataTransfer.files).filter(file =>
            file.name.toLowerCase().endsWith('.pdf') || file.name.toLowerCase().endsWith('.docx')
          );
        
          if (acceptedFiles.length > 0) {
            const newFileList = new DataTransfer();
            acceptedFiles.forEach(file => newFileList.items.add(file));
        
            input.current.files = newFileList.files;
            e.target.files = newFileList.files;
        
            setFiles(acceptedFiles);
            setNumArchives(acceptedFiles.length);
          } else {
            setMessageError('Apenas arquivos .pdf ou .docx são permitidos.');
          }
        }
      }
  return (
    <div className="input file" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <label htmlFor='file'>
        <AiOutlineCloudUpload id='icon' />
        Adicione seus arquivos:
        </label>
        Adicionados: {numArchives}
        <input ref={input} onDragOver={(e) => e.preventDefault()} type="file" id='file' name='archive8' onDrop={handleDrop} onChange={handleFileChange} accept=".pdf, .docx" multiple/>
        {inputsValue.origin.length === 0 && <p>Selecione o idima de origem</p>}
        {inputsValue.translation.length === 0 && <p>Selecione o idioma da tradução</p>}
        {messageError && <div>{messageError}</div>}
    </div>
  )
}

export default DropIntput