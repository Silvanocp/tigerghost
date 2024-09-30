const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // O token agora está protegido como variável de ambiente no Netlify
    const url = 'https://api.github.com/repos/Silvanocp/tigerghost/contents/dbazul.csv';

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar o CSV: ' + response.statusText);
        }

        const csvText = await response.text();
        return {
            statusCode: 200,
            body: csvText
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
};
