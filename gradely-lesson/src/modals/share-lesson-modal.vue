<template>
  <div>
    <modal-cover @closeModal="$emit('closeTriggered')">
      <template slot="modal-cover-header">
        <div class="gfont-15 font-weight-700 color-text text-uppercase p-3">Share Lesson</div>
      </template>

      <!--  MODAL BODY  -->
      <template slot="modal-cover-body">
        <div class="modal-cover-body px-3 py-2 position-relative">
          <!-- HEADER -->
          <div class="modal__header mgb-20">
            <img
              v-lazy="getAuthUser.image"
              alt="avatar"
              v-if="getAuthUser.image"
              class="avatar-wrapper"
            />
            <div
              class="avatar-wrapper color-white font-weight-600 gfont-13"
              v-else
              :class="$color.getProfileBgColor(getAuthUser.full_name)"
            >{{ $string.getStringInitials(getAuthUser.full_name) }}</div>

            <textarea
              class="form-control modal__header__textarea gfont-14"
              name="text"
              cols="30"
              rows="3"
              placeholder="Add caption"
              v-model="description"
            ></textarea>
          </div>

          <!-- LESSON DETAILS -->

          <div class="lesson-details-wrapper mgb-20">
            <div
              class="icon-wrapper position-relative"
              :class="$doc.getDocBgcolor(getFileExtension) + '-bg'"
            >
              <div class="play-wrapper brand-accent-light-bg index-9" v-if="isVideo">
                <div class="icon icon-play brand-accent gfont-13 mgl-2 mgt-2"></div>
              </div>

              <img v-lazy="staticImg('VideoPoster.png')" alt="game" class="file-thumbnail" />

              <img v-lazy="getImageSrc" alt class="file-thumbnail" v-if="isMedia || isGame" />

              <div v-else class="icon gfont-30" :class="$doc.getDocIconStyle(getFileExtension)"></div>
            </div>

            <div class="lesson-detail">
              <div class="color-text lesson-name text-capitalize">{{ getFileName }}</div>
              <div class="lesson-meta border-grey-dark">
                <span class="mgr-5">
                  {{
                  subject_name ? subject_name : 'Subject name'
                  }}
                </span>
                <span class="gfont-16 position-relative" style="top: 2px">•</span>
                <span class="mgl-5">Video Lesson</span>
              </div>

              <label
                v-if="0"
                for="new_file"
                class="gfont-12 font-weight-700 mgt-15 text-uppercase change-text"
              >Change</label>
              <!-- <div v-else style="height:30px"></div> -->

              <input
                type="file"
                name="new_file"
                id="new_file"
                hidden
                @change="replaceFile"
                :accept="acceptTypes"
              />
            </div>
          </div>

          <div class="selections">
            <div class="icon icon-teacher-class gfont-17 brand-inverse"></div>
            <cutom-select
              :defaultOptions="getTeacherClasses"
              title="Assigned Class"
              @updated="updateClassSelection"
            />
          </div>

          <div class="selections">
            <div class="icon icon-book-cover gfont-17 brand-inverse"></div>
            <cutom-select
              @toggle="handleSubjectToggleResponse"
              :defaultOptions="getSubjectList"
              title="Subject"
              :multiple="false"
              defaultPlaceholder="Select a subject"
              :disabled="disableSubjectSelection"
              @updated="updateSubjectSelection"
            />
          </div>

          <div class="selections">
            <div class="icon icon-group-users gfont-17 brand-inverse"></div>
            <cutom-select
              @toggle="handleStudentToggleResponse"
              :defaultOptions="getAllStudents"
              title="Assigned Students"
              defaultPlaceholder="All Students"
              :disabled="disableStudentSelection"
              showAvatar
              @updated="updateStudentSelection"
            />
          </div>
        </div>
      </template>
      <template slot="modal-cover-footer">
        <div class="modal-footer mgt-15">
          <div class="icon-container" @click="$emit('closeTriggered')">
            <span class="icon icon-trash gfont-20 color-ash pointer"></span>
            <span class="line"></span>
          </div>
          <button class="btn rounded-15 btn-accent" @click="uploadLessonMaterial" ref="post">SHARE</button>
        </div>
      </template>
    </modal-cover>
  </div>
</template>

<script>
import cutomSelect from '@/components/form-comps/cutom-select';
import { createNamespacedHelpers } from 'vuex';
import acceptTypes from '@/store/constants';
const subject = createNamespacedHelpers('subject');
const aws = createNamespacedHelpers('aws');
const lesson = createNamespacedHelpers('lesson');

export default {
  name: 'shareLessonModal',

  components: {
    modalCover: () =>
      import(
        /* webchunkName: "modals" */ '@/components/global-comps/modal-cover.vue'
      ),
    cutomSelect,
  },

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  watch: {
    selected_class: {
      handler(levels) {
        if (!this.getSubjectList?.length && levels.length) {
          levels.length > 1
            ? this.pushAlert(
                'No mutual subjects between selected classes',
                'warning'
              )
            : this.pushAlert('No subject in selected class', 'warning');
        }
      },
      immediate: false,
    },

    // uploaded_file: {
    //   async handler(file) {
    //     if (this.isVideo) this.video_src = await this.getVideoThumbnail(file);
    //     if (file && this.isMedia) this.setFileMedia(file);
    //   },
    //   immediate: true,
    // },
  },

  computed: {
    ...subject.mapGetters(['getTeacherRoles']),
    ...aws.mapGetters(['getName']),

    getUploadFilePayload() {
      return {
        name: this.getFileName,
        folder: this.getFolder,
        file: this.isMedia ? this.media_file : this.uploaded_file,
        base64: this.isMedia ? 1 : 0,
      };
    },

    getUploadLessonPayload() {
      return {
        content_id: this.content.id,
        class_id: this.selected_class_ids,
        student_list: this.selected_students,
        subject_id: this.selected_subjects,
        description: this.description,
        type: this.getFileType,
      };
    },

    getFolder() {
      if (this.isImage) return 'lesson/images';
      if (this.isVideo) return 'lesson/videos';
      return 'lesson/documents';
    },

    getTeacherClasses() {
      return this.getTeacherRoles.classes.map((level, index) => {
        level.name = level.class_name;
        level.selected = false;
        level.index = index;
        level.id = Number(level.class_id);
        return level;
      });
    },

    getSubjectList() {
      let subjects = this.selected_class.map((level) => level.subjects);

      if (!subjects.length) return [];

      if (subjects.length === 1)
        return subjects[0].map((subject, index) => {
          subject.index = index;
          subject.selected = false;
          return subject;
        });

      let common_subjects = subjects.reduce((list1, list2) =>
        list1.filter((subject) => {
          return list2.find(
            (sub) => Number(subject.subject_id) === Number(sub.subject_id)
          );
        })
      );

      return common_subjects.map((subject, index) => {
        subject.selected = false;
        subject.index = index;
        return subject;
      });
    },

    getAllStudents() {
      if (!this.selected_class_ids.length) return [];
      if (this.selected_class_ids.length > 1) return [];
      if (this.selected_class_ids.length) {
        return this.selected_class[0].students.map((student, index) => {
          student.name = `${student.firstname} ${student.lastname}`;
          student.selected = false;
          student.index = index;
          return student;
        });
      }
    },

    disableStudentSelection() {
      return (
        !this.selected_class_ids.length || this.selected_class_ids.length > 1
      );
    },

    disableSubjectSelection() {
      return !this.selected_class_ids.length;
    },

    isVideo() {
      let type = this.content?.type;
      return type === 'video';
    },

    isImage() {
      let type = this.content?.type;
      return type === 'image';
    },

    isGame() {
      let type = this.content?.type;
      return type === 'game';
    },

    isMedia() {
      let type = this.content?.type;
      return type === 'video' || type === 'image';
    },

    getFileExtension() {
      return this.content?.extension ? this.content.extension : 'pdf';
    },

    getFileType() {
      if (this.isMedia) return 'video';
      if (this.isGame) return 'game';
      return 'material';
    },

    getFileName() {
      let names =
        this.content?.title?.split('.') || this.content?.game_title?.split('.');
      if (names.length > 1) names?.pop();
      let name = names?.join('');
      return name || this.content?.game_title;
    },

    getImageSrc() {
      let thumbnail = this.content?.thumbnail || this.content?.game_image;
      return thumbnail
        ? thumbnail
        : this.isImage
        ? this.content?.url
        : this.staticImg('VideoPoster.png');
    },

    getImageUploadPayload() {
      return 'FILES';
    },
  },

  created() {
    this.$bus.$on('clearFileState', () => {
      this.continue_creation = false;
    });
  },

  mounted() {
    this.acceptTypes = acceptTypes.join(',');
  },

  data() {
    return {
      selected_class: [],
      selected_class_ids: [],
      selected_students: [],
      selected_subjects: '',
      uploaded_file: '',
      lesson_file_url: '',
      video_src: '',
      subject_name: '',
      media_file: '',
      acceptTypes: '',
      description: '',
      continue_creation: true,
    };
  },

  methods: {
    ...aws.mapActions(['uploadToBucket', 'resetProgressStatus']),
    ...lesson.mapActions(['shareLesson']),

    replaceFile(file) {
      this.uploaded_file = file.target.files[0];
    },

    updateClassSelection(selection) {
      this.selected_class = [...selection];

      this.selected_class_ids = selection.map((option) => option.id);
    },

    updateStudentSelection(selection) {
      this.selected_students = selection?.length
        ? selection.map((option) => Number(option.id))
        : this.getAllStudents.map((student) => Number(student.id));
    },

    updateSubjectSelection(selection) {
      this.subject_name = selection?.subject_id ? selection?.name : '';
      this.selected_subjects = selection?.subject_id
        ? Number(selection.subject_id)
        : '';
    },

    handleSubjectToggleResponse() {
      if (!this.selected_class_ids?.length)
        this.pushAlert('Please select at least one class', 'warning');
    },

    handleStudentToggleResponse() {
      if (!this.selected_class_ids?.length)
        this.pushAlert('Please select at least one class', 'warning');
      if (this.selected_class_ids.length > 1)
        this.pushAlert(
          'Custom student selection not possible for multiple classes',
          'warning'
        );
    },

    getVideoThumbnail(file) {
      return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement('video');

        videoPlayer.setAttribute('src', URL.createObjectURL(file));

        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
          reject('error when loading video file', ex);
        });

        videoPlayer.addEventListener('loadedmetadata', () => {
          setTimeout(() => {
            videoPlayer.currentTime = videoPlayer.duration / 10;
          }, 200);

          videoPlayer.addEventListener('seeked', () => {
            const canvas = document.createElement('canvas');
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL('image/png'));
          });
        });
      });
    },

    setFileMedia(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.media_file = reader.result;
      };
    },

    validateFields() {
      if (!this.description) {
        this.pushAlert('Caption missing', 'warning');
        return false;
      }
      if (!this.selected_class_ids?.length) {
        this.pushAlert('Select at least one class', 'warning');
        return false;
      }
      if (!this.selected_subjects) {
        this.pushAlert('Select a subject', 'warning');
        return false;
      }

      return true;
    },

    uploadLessonFile() {
      if (!this.validateFields()) return;
      this.handleClick('post', 'uploading file..');
      this.uploadToBucket(this.getUploadFilePayload)
        .then((response) => {
          if (!this.continue_creation) {
            this.pushAlert('File upload cancelled', 'warning');
            this.handleClick('post', 'Post', false);
            return;
          }

          this.handleClick('post', 'creating lesson..');
          this.resetProgressStatus();
          if (response.code == 200) {
            this.lesson_file_url = response.data.ObjectURL;
            this.uploadLessonMaterial();
          } else this.pushAlert('Failed to upload file', 'warning');
        })
        .catch(() => {
          this.pushAlert('error uploading file', 'error');
        });
    },

    uploadLessonMaterial() {
      if (!this.validateFields()) return;
      this.handleClick('post', 'sharing lesson..');
      this.shareLesson(this.getUploadLessonPayload)
        .then((response) => {
          console.log('response posting', response);
          this.handleClick('post', 'share', false);
          if (response.code === 200) {
            this.pushAlert('lesson shared', 'success');
            this.$emit('updateContent');

            setTimeout(() => {
              this.$emit('closeTriggered');
            }, 1250);
          } else this.pushAlert('Failed to post lesson', 'warning');
        })
        .catch(() => {
          this.handleClick('post', 'share', false);
          this.pushAlert('Error posting lesson', 'error');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay,
.modal-cover-overlay {
  z-index: 200;
}

.modal-cover-body {
  scroll-behavior: smooth;
}

.modal__header {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  gap: 0 toRem(15);

  .avatar-wrapper {
    @include square-shape(33);
    @include flex-row-center-nowrap;
    border-radius: toRem(7);
  }

  &__textarea {
    border-radius: toRem(10);
    overflow: hidden;
    resize: none;
  }
}

.lesson-details-wrapper {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  gap: 0 5px;
  border: 1px solid $border-grey;
  border-left: 0;
  border-radius: toRem(8);
  margin-left: toRem(48);

  .icon-wrapper {
    // width: 100px;
    aspect-ratio: 1;
    height: 90px;
    max-height: 90px;
    min-height: 90px;
    @include flex-row-center-nowrap;
    border-radius: toRem(8);
    position: relative;

    .file-thumbnail {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      border-top-right-radius: toRem(5);
      border-bottom-right-radius: toRem(5);
    }

    .play-wrapper {
      @include square-shape(25);
      @include flex-row-center-nowrap;
      position: absolute;
      border-radius: 50%;
      background: $brand-navy;
    }
  }

  .lesson-detail {
    padding: toRem(10);
    width: 100%;

    @include breakpoint-down(md) {
      padding: toRem(6);
    }

    @include breakpoint-down(sm) {
      padding: toRem(4);
    }

    .lesson-name {
      font-size: 1rem;
      font-weight: 700;
      text-transform: capitalize;

      @include breakpoint-down(md) {
        font-size: 0.9rem;
      }

      @include breakpoint-down(sm) {
        font-size: 0.85rem;
      }
    }

    .lesson-meta {
      font-size: 0.8rem;

      @include breakpoint-down(lg) {
        font-size: 0.75rem;
      }

      @include breakpoint-down(md) {
        font-size: 0.7rem;
      }

      @include breakpoint-down(sm) {
        font-size: 0.72rem;
      }
    }

    .change-text {
      display: inline-block;
      cursor: pointer;
      transition: color ease-in-out 0.25s;
      color: $brand-navy;
      &:hover {
        color: $brand-accent;
      }
    }
  }
}

.selections {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  margin-bottom: toRem(20);

  .icon {
    margin-right: toRem(30);
    transform: translateY(5px);
  }
}
.modal-footer {
  background: rgba(#d5d5f5, 0.6);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: toRem(7);

  .icon-container {
    display: flex;
    justify-content: flex-end;
  }

  .line {
    width: 1.1px;
    height: 28px;
    background: $border-grey-dark;
    margin: 0 toRem(8);
    position: relative;
    left: 2px;
  }

  .btn {
    color: $brand-navy;
    font-weight: 700;
    padding: 0.4rem 1.4rem;

    @include breakpoint-down(sm) {
      padding: 0.6rem 1.4rem;
    }
  }
}
</style>
<style>
.modal-cover-overlay .modal-sm-md-init {
  width: 520px;
}

@media screen and (max-width: 900px) {
  .modal-cover-overlay .modal-sm-md-init {
    width: 500px;
  }
}

@media screen and (max-width: 700px) {
  .modal-cover-overlay .modal-sm-md-init {
    width: 480px;
  }
}

@media screen and (max-width: 540px) {
  .modal-cover-overlay .modal-sm-md-init {
    width: 100%;
  }
}
</style>
