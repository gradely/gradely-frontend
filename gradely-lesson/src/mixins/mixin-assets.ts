const MixinAssets = {
  methods: {
    staticImg(src: string) {
      return require(`@/assets/static/${src}`);
    },
  },
};

export { MixinAssets };
