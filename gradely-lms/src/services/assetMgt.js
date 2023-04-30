const renderAssets = {
  methods: {
    staticImg(src) {
      return require(`@/assets/static/${src}`);
    },
    //dynamicImg(src) {
      //return require(`@/assets/dynamic/${src}`);
    //},
  },
};

export { renderAssets };
