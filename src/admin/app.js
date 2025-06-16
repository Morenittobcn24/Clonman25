const config = {
  locales: [
     'en',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
     'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config: {
    translations: {
      en: {
        "Auth.form.button.forgot-password": "Send Email",
      },
      es: {
        "Auth.form.button.forgot-password": "Enviar Email",
      },
    },
  },
  bootstrap() {},
};