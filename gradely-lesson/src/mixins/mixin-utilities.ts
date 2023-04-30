const MixinUtilities = {
  computed: {
    showMoreData() {
      return (array: Array<any>, showMore: boolean) => {
        if (Array.isArray(array) && array?.length > 5 && showMore === true) {
          return array?.splice(0, 5);
        } else {
          return array;
        }
      };
    },
  },
  methods: {
    isSuccessCode(response: any) {
      return [200, 201].includes(response?.code || response?.status)
        ? true
        : false;
    },

    isNil(value: any, defaultValue: any) {
      return ['<nil>', null, undefined, ''].includes(value)
        ? defaultValue
        : value;
    },

    isBase64Check(str: string) {
      if (str?.substring(0, 5) === 'data:') {
        return true;
      } else {
        return false;
      }
    },

    isBlobCheck(str: string) {
      if (str?.substring(0, 5) === 'blob:') {
        return true;
      } else {
        return false;
      }
    },

    strlen(str: string) {
      return ['<nill>', null, undefined, ''].includes(str) ? 0 : str?.length;
    },

    isBase64(encodedString: string) {
      const regexBase64 =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      return regexBase64.test(encodedString);
    },

    blobToFile(theBlob: any, fileName: string) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },

    replaceSpaces(str: string, replace: string) {
      return str.replace(/ /g, replace);
    },

    getMimeType(file: any, fallback = null) {
      const byteArray = new Uint8Array(file).subarray(0, 4);
      let header = '';
      for (let i = 0; i < byteArray.length; i++) {
        header += byteArray[i].toString(16);
      }
      switch (header) {
        case '89504e47':
          return 'image/png';
        case '47494638':
          return 'image/gif';
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          return 'image/jpeg';
        default:
          return fallback;
      }
    },
  },
};

export { MixinUtilities };
