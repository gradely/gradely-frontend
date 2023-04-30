const MixinAssets = {
  methods: {
    mxStaticImg(src) {
      return require(`@/assets/static/${src}`);
    },

    mxDynamicAsset(src) {
      return require(`@/assets/dynamic/${src}`);
    },
  },
};

export { MixinAssets };
