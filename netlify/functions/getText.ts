import { Handler } from '@netlify/functions'

const reader = require("any-text")

const readDocument = async () => {
    try {
      const result = await reader.getText('./a.docx');
      return result;
    } catch (error) {
      console.error('Erro ao ler o documento Word:', error);
      throw error;
    }
  };

export const handler: Handler = async (event) => {
    try {
        const result = await readDocument();
    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro interno do servidor' }),
          };
    }
}