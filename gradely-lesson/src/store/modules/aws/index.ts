import axios from "axios";
import { ActionTree } from "vuex";
import { API_VERSION, API_BASE_URL } from "@/env";
import { $serviceApi as api } from "@/services/service-api";

const routes = {
  bucket_upload_url: "/aws/upload-file/",
  bucket_delete_url: "/aws/delete-file",
};

let axiosSource = axios.CancelToken.source();

const actions: ActionTree<any, any> = {
    async uploadToBucket({ commit }, { name, folder, file, base64 = 0 }) {
        let url_suffix = `${folder}?base64=${base64}`;
    
        let formData = new FormData();
        formData.append("file", file);
    
        try {
          const query = await axios.post(
            `${API_BASE_URL}/${API_VERSION}${routes.bucket_upload_url}${url_suffix}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("gradelyAuthToken")}`,
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: function(progressEvent:any) {
                let progress_count = parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)+""
                );
    
                commit("UPDATE_FILE_UPLOAD_PROGRESS", {
                  file_name: name,
                  file_progress: progress_count,
                  file_status: true,
                });
              }.bind(this),
    
              cancelToken: axiosSource.token,
            }
          );
          return query.data;
        } catch (error) {
          return error;
        }
      },

       // DOWNLOAD FILE FROM S3 BUCKET
  async downloadFromBucket({ commit }, { file_url, file_name }) {
    try {
      const query = await axios.get(file_url, {
        responseType: "blob",
        onDownloadProgress: function(progressEvent:any) {
          let progress_count = parseInt(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)+''
          );

          commit("UPDATE_FILE_DOWNLOAD_PROGRESS", {
            file_name: file_name,
            file_progress: progress_count,
            file_status: true,
          });
        }.bind(this),

        cancelToken: axiosSource.token,
      });

      let file_data = window.URL.createObjectURL(
        new Blob([query.data], { type: query.headers["content-type"] })
      );

      return file_data;
    } catch (error) {
      return error;
    }
  },

    // DELETE FILE FROM BUCKET
    async deleteFromBucket(_, file) {
        try {
          const query = await axios.delete(
            `${API_BASE_URL}/${API_VERSION}${routes.bucket_delete_url}?url=${file}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("gradelyAuthToken")}`,
              },
            }
          );
          return query.data;
        } catch (error) {
          return error;
        }
      },
    
      async cancelOngoingRequest({ commit }, type = null) {
        axiosSource.cancel();
        type === "download"
          ? commit("RESET_FILE_DOWNLOAD")
          : commit("RESET_FILE_PROGRESS");
        axiosSource = axios.CancelToken.source();
      },
    
      // RESET FILE PROGRESS STATUS
      resetProgressStatus({ commit }) {
        commit("RESET_FILE_PROGRESS");
      },
    
      // RESET FILE DOWNLOAD PROGRESS STATUS
      resetDownloadStatus({ commit }) {
        commit("RESET_FILE_DOWNLOAD");
      },
    
      // DOWNLOAD LOGGER
      async downloadLogger(_, token) {
        return await api.service("old").fetch(`/library/download-file/${token}`);
      },
}

export default {
    state:{
        file: {
            name: "",
            progress: 0,
            uploading: false,
          },
        
          download: {
            name: "",
            progress: 0,
            downloading: false,
          },
    },

    getters:{
        getName:(state:any) => state.name,
        getFileProgress: (state:any) => state.file,
        getDownloadProgress: (state:any) => state.download,
    },

    mutations:{
        UPDATE_FILE_UPLOAD_PROGRESS: (
            state:any,
            { file_name, file_progress, file_status }:any
          ) => {
            state.file.name = file_name;
            state.file.progress = file_progress;
            state.file.uploading = file_status;
          },
        
          // RESET UPLOAD PROGRESS FILE
          RESET_FILE_PROGRESS: (state:any) => {
            state.file.name = "";
            state.file.progress = 0;
            state.file.uploading = false;
          },
        
          UPDATE_FILE_DOWNLOAD_PROGRESS: (
            state:any,
            { file_name, file_progress, file_status }:any
          ) => {
            state.download.name = file_name;
            state.download.progress = file_progress;
            state.download.downloading = file_status;
          },
        
          RESET_FILE_DOWNLOAD: (state:any) => {
            state.download.name = "";
            state.download.progress = 0;
            state.download.data = {};
            state.download.downloading = false;
        
            // window.URL.revokeObjectURL();
          },
    },

    actions,

    namespaced:true
}