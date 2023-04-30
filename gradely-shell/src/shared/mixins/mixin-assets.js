import {
  LOCAL_SERVER,
  PROXY_AWS_ASSET_DOMAIN_URL,
  PROXY_AWS_ASSET_DOMAIN_VIDEO_URL,
  PROXY_CLOUDINARY_ASSET_DOMAIN_URL,
} from "@/env";

const AWS_ASSET_DOMAIN_URL = "https://gradly.s3.eu-west-2.amazonaws.com";
const AWS_ASSET_DOMAIN_VIDEO_URL =
  "https://gradely-videos.s3.eu-west-2.amazonaws.com";
const CLOUDINARY_ASSET_DOMAIN_URL = "https://res.cloudinary.com";

const MixinAssets = {
  methods: {
    mxStaticImg(src, module = null) {
      if (module) return require(`@/modules/${module}/assets/static/${src}`);
      else return require(`@/shared/assets/static/${src}`);
    },

    getServerRemoteURL(domain, type = null) {
      // AWS PROXY
      if (domain === "aws") {
        return type === "video"
          ? PROXY_AWS_ASSET_DOMAIN_VIDEO_URL
          : PROXY_AWS_ASSET_DOMAIN_URL;
      }

      // CLOUDINARY PROXY
      else return PROXY_CLOUDINARY_ASSET_DOMAIN_URL;
    },

    getAWSRemoteURL(variant, type = null) {
      let base_url = "";
      type === "video"
        ? (base_url += AWS_ASSET_DOMAIN_VIDEO_URL)
        : (base_url += AWS_ASSET_DOMAIN_URL);

      return `${base_url}/${variant}`;
    },

    getCloudinaryRemoteURL(variant) {
      return `${CLOUDINARY_ASSET_DOMAIN_URL}/${variant}`;
    },

    mxRemoteAsset(domain, variant, type = null) {
      return LOCAL_SERVER
        ? this.getServerRemoteURL(domain, type)
        : domain === "cloud"
        ? this.getCloudinaryRemoteURL(variant)
        : this.getAWSRemoteURL(variant, type);
    },

    getAssetBaseURL(domain, variant, type = null) {
      console.log(domain, variant, type);
      console.log(this.mxRemoteAsset(domain, variant, type));

      return this.mxRemoteAsset(domain, variant, type);
    },

    // mxDynamicAsset(src, module = null) {
    //   if (module) return require(`@/modules/${module}/assets/dynamic/${src}`);
    //   else return require(`@/shared/assets/dynamic/${src}`);
    // },
  },
};

export { MixinAssets };
