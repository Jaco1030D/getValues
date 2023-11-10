import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './style.css';
import LanguageValue from '../languageValue';

const Values = ({value, setValue, languages, setLanguages}) => {
    const [oneValue, setOneValue] = useState(true)

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

  return (
    <div className='value-box'>
        {oneValue ? (
            <>
            <div className='value-per-word'>
                <p>Valor padrão por palavras:</p>
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <Button onClick={handleOpen}>Mudar para preço por linguagem</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='modal'>
                    {languages && languages.map((language, index) => (
                        <LanguageValue value={language.value} setValue={setLanguages} index={index} label={language.label} />
                    ))}
                </div>
            </Modal>
            </>
        ) : (
            <>
                <p>Valor customizado por linguagem</p>
                <p>Preço por linguagem</p>
            </>
        )}
    </div>
  )
}

export default Values