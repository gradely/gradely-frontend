export default {
  // AWS FILE PROGRESS UPDATE
  UPDATE_FILE_UPLOAD_PROGRESS: (
    state,
    { file_name, file_progress, file_status }
  ) => {
    state.file.name = file_name;
    state.file.progress = file_progress;
    state.file.uploading = file_status;
  },

  // RESET UPLOAD PROGRESS FILE
  RESET_FILE_PROGRESS: (state) => {
    state.file.name = "";
    state.file.progress = 0;
    state.file.uploading = false;
  },

  UPDATE_FILE_DOWNLOAD_PROGRESS: (
    state,
    { file_name, file_progress, file_status }
  ) => {
    state.download.name = file_name;
    state.download.progress = file_progress;
    state.download.downloading = file_status;
  },

  RESET_FILE_DOWNLOAD: (state) => {
    state.download.name = "";
    state.download.progress = 0;
    state.download.data = {};
    state.download.downloading = false;

    // window.URL.revokeObjectURL();
  },
};
