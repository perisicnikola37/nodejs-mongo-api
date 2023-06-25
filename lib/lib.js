const translationOptions = {
    method: 'POST',
    url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_API_KEY || 'default-api-key',
        'X-RapidAPI-Host': process.env.RAPIDAPI_API_HOST || 'default-api-host'
    },
    data: {
        from: process.env.FROM || 'gb',
        to: process.env.TO || 'ar',
        q: '' // text or content to be translated
    }
};

module.exports = translationOptions;
