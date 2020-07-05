import axios from 'axios';

const translate = (sourceLang, targetLang, word) => {
  return axios({
    method: 'GET',
    url:
      'https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host':
        'systran-systran-platform-for-language-processing-v1.p.rapidapi.com',
      'x-rapidapi-key': 'bd4714acc3msh8da2c7d829ea9f9p13ab38jsn4b1c796e6687',
      useQueryString: true,
    },
    params: {
      source: sourceLang,
      target: targetLang,
      input: word,
    },
  })
    .then(response => {
      data = response.data.outputs[0].output.matches;
      return {responseCode: 200, data: data};
    })
    .catch(error => {
      return {responseCode: 400, message: error};
    });
};

export default translate;
