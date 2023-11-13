import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import './style.css';
import LanguageValue from '../languageValue';
import { ThemeProvider, createTheme } from '@mui/material';
import Button from '../Button';

const theme = createTheme({
    palette: {
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

const Values = ({value, setValue, languages, setLanguages}) => {
    const [oneValue, setOneValue] = useState(true)

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

  return (
    <div className='value-box'>
        <ThemeProvider theme={theme}>

        {oneValue ? (
            <>
            <div className='value-per-word'>
                <p>Valor padrão por palavras:</p>
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <Button text={'Mudar preço por linguagem'} handleClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='modal'>
                    <div className="languages">
                    {languages && languages.map((language, index) => (
                        <LanguageValue value={language.value} setValue={setLanguages} index={index} label={language.label} />
                    ))}
                    </div>
                    <div className='container-button'>
                        <Button text={'Salvar alterações e fechar'} handleClick={handleClose} />
                    </div>
                </div>
            </Modal>
            </>
        ) : (
            <>
                <p>Valor customizado por linguagem</p>
                <p>Preço por linguagem</p>
            </>
        )}
        </ThemeProvider>
    </div>
  )
}

export default Values