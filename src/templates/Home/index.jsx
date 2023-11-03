import { useRef, useState } from 'react';
import './styles.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Table from '../../components/table';

function Home() {
  const [numArchives, setNumArchives] = useState(0)
  const [files, setFiles] = useState({})
  const [messageError, setMessageError] = useState()
  const input = useRef()
  const handleFileChange = (e) => {
    const count = e.target.files.length;
    const files = e.target.files
    setFiles(files)
    console.log(e.target.files);
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
  console.log(files);
  return (
    <div className="App">
      <div className="input file" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            <label htmlFor='file'>
              <AiOutlineCloudUpload id='icon' />
              Adicione seus arquivos:
            </label>
            Adicionados: {numArchives}
            <input ref={input} onDragOver={(e) => e.preventDefault()} type="file" id='file' name='archive8' onDrop={handleDrop} onChange={handleFileChange} accept=".pdf, .docx" multiple/>
            {messageError && <div>{messageError}</div>}
        </div>
        {files.length > 0 && <Table files={files} />}
    </div>
  );
}

export default Home;
