<template>
  <!-- TODO add validations on all empty inputs !important -->
  <div>
    <div class="open-create-question-card-wrapper position-relative">
      <div v-if="GET_IS_SINGLE_LOADING" class="loader position-absolute">
        <span class="icon-dotted-roller icon spinner animate font-15"></span>
      </div>

      <!-- edit question starts here -->
      <div
        v-if="isEdit"
        key="edit"
        class="create-course-inner-main edit-wrapper"
      >
        <!-- true-false-option start here -->
        <section
          v-if="active_question_type === 'bool'"
          class="true-false-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                  selected: 'true',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              titleText="Difficulty"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
              :value="parseInt(question_input_details.duration, 10)"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <div class="question-text">
              QUESTION TEXT
              <span
                aria-label="This is your question"
                class="hover-svg hint--primary hint--bottom hint--rounded"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                    fill="#11BDCF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                    fill="#11BDCF"
                  />
                  <path
                    d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                    fill="#11BDCF"
                  />
                </svg>
              </span>
            </div>
            <div class="input-txt-wrapper">
              <CustomInput
                :action="isEdit ? 'edit' : 'create'"
                @input="handle_quill_input"
                name="question"
                placeholder="Module Description"
                :content="question_input_details.question"
              />
            </div>
            <div class="label-holder-txt">Options</div>
            <!-- radio-wrapper-holder -->
            <div class="input-wrapper-radio">
              <button class="radio-btn-wrapper-container">
                <span class="read-only-boolean">True</span>
                <label
                  for="radio-first-btn"
                  class="ash-radio-wrapper-container"
                >
                  <span>
                    <input
                      type="radio"
                      id="radio-first-btn"
                      value="1"
                      name="boolean"
                      :checked="
                        parseInt(question_input_details.answer, 10) === 1
                      "
                      @change="
                        $set(
                          question_input_details,
                          'answer',
                          parseInt($event.target.value, 10)
                        )
                      "
                    />
                  </span>
                  <span class="correct-answer-txt">Correct answer</span>
                </label>
              </button>
            </div>
            <!-- radio wrapper end -->

            <!-- radio-wrapper-holder -->
            <div class="input-wrapper-radio">
              <button class="radio-btn-wrapper-container">
                <span class="read-only-boolean">False</span>
                <label
                  for="radio-second-btn"
                  class="ash-radio-wrapper-container"
                >
                  <span>
                    <input
                      type="radio"
                      id="radio-second-btn"
                      name="boolean"
                      value="0"
                      :checked="
                        parseInt(question_input_details.answer, 10) === 0
                      "
                      @change="
                        $set(
                          question_input_details,
                          'answer',
                          parseInt($event.target.value, 10)
                        )
                      "
                    />
                  </span>
                  <span class="correct-answer-txt">Correct answer</span>
                </label>
              </button>
            </div>
            <!-- radio wrapper end -->

            <!-- select option here -->
            <section class="select-dropdown-wrapper">
              <div class="label-holder-txt">Assign to Topic</div>
              <custom-drop-select
                :isAjax="true"
                :ajaxFunction="ajaxFunction"
                :items="items"
                :defaultText="question_input_details.topic"
                @change="handle_topic($event)"
                :empty_state="empty_state"
                @newAction="addNewTopic"
              />
            </section>
            <!-- select option ends here  -->
          </section>
        </section>
        <!-- true-false-option ends here -->

        <!-- short-answer options here -->
        <section
          v-if="active_question_type === 'short'"
          class="short-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                  selected: 'true',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
              :value="parseInt(question_input_details.duration, 10)"
            />
            <!-- end custom number select with label ends here -->
          </section>

          <!-- question-txt warapper -->
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>
          </section>
          <!-- question-txt wrapper end -->

          <!-- question-txt warapper -->
          <section class="custom-input-wrapper-container">
            <div class="label-holder-txt">
              Answer
              <span class="avatar">icon</span>
            </div>
            <div
              v-for="(item, index) in question_input_details.answer"
              :key="index"
              class="input-txt-wrapper"
            >
              <input
                class="text-area-main"
                :action="isEdit ? 'edit' : 'create'"
                @keydown="handle_text_input($event, index)"
                @input="handle_text_input($event, index)"
                :value="question_input_details.answer[index]"
                name="answer"
                placeholder="Write answer"
              />
            </div>
          </section>
          <!-- question-txt wrapper end -->
          <div class="checkbox-add-btn">
            <div
              @click="question_input_details.answer.push('')"
              class="add-btn"
            >
              <span class="circle">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11.5" stroke="#C5C5C5" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.6666 12.6665H12.6666V16.6665H11.3333V12.6665H7.33325V11.3332H11.3333V7.33317H12.6666V11.3332H16.6666V12.6665Z"
                    fill="#FAA017"
                  />
                </svg>
              </span>
              <span class="text">Add another acceptable answer</span>
            </div>
            <!-- checkbox -->
            <label for="checkbox-allow-input" class="mg-0 checkbox-wrapper">
              <input
                type="checkbox"
                class="checkbox-form-main"
                id="checkbox-allow-input"
              />
              <span class="checkbox-label-txt">Ignore input formating</span>
              <span
                class="hover-input-svg ml-2 pointer hint--bottom-left hint--medium hint--rounded hint--primary"
                aria-label="Grade as correct as long as the student provides the correct spelling, number or sequence of texts."
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="8" r="8" fill="#D5D5D5" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.33333 9V9.33334H8.66667V9C8.66667 8.70065 8.71763 8.62845 9.06667 8.36667C9.71763 7.87845 10 7.47842 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667H7.33333C7.33333 6.29848 7.63181 6 8 6C8.36819 6 8.66667 6.29848 8.66667 6.66667C8.66667 6.96603 8.61571 7.03823 8.26667 7.3C7.61571 7.78823 7.33333 8.18825 7.33333 9ZM8.6671 10.6657C8.6671 11.0339 8.36853 11.3323 8.00022 11.3323C7.63191 11.3323 7.33333 11.0339 7.33333 10.6657C7.33333 10.2975 7.63191 9.999 8.00022 9.999C8.36853 9.999 8.6671 10.2975 8.6671 10.6657Z"
                    fill="#555555"
                  />
                </svg>
              </span>
            </label>
            <!-- checkbox her -->
          </div>

          <!-- select option here -->
          <section class="select-dropdown-wrapper">
            <div class="label-holder-txt">Assign to Topic</div>
            <custom-drop-select
              :isAjax="true"
              :ajaxFunction="ajaxFunction"
              :items="items"
              :defaultText="question_input_details.topic"
              @change="handle_topic($event)"
              :empty_state="empty_state"
              @newAction="addNewTopic"
            />
          </section>
          <!-- select end option here -->
        </section>
        <!-- short-answer options ends here -->

        <!-- fill-in-the gap options here -->
        <section
          v-if="active_question_type === 'fill-gap'"
          class="short-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
              :value="parseInt(question_input_details.duration, 10)"
            />
            <!-- end custom number select with label ends here -->
          </section>

          <!-- question-txt warapper -->
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>
          </section>
          <!-- question-txt wrapper end -->

          <!-- question-txt warapper -->
          <section class="custom-input-wrapper-container">
            <div class="label-holder-txt">
              Answer
              <span class="avatar">icon</span>
            </div>
            <div class="input-txt-wrapper">
              <CustomInput
                :action="isEdit ? 'edit' : 'create'"
                @input="handle_quill_input"
                name="answer"
                placeholder="Module Description"
                :content="question_input_details.answer"
              />
            </div>
          </section>
          <!-- question-txt wrapper end -->

          <!-- select option here -->
          <section class="select-dropdown-wrapper">
            <div class="label-holder-txt">Assign to Topic</div>
            <custom-drop-select
              :isAjax="true"
              :ajaxFunction="ajaxFunction"
              :items="items"
              :defaultText="question_input_details.topic"
              @change="handle_topic($event)"
              :empty_state="empty_state"
              @newAction="addNewTopic"
            />
          </section>
          <!-- select end option here -->
        </section>
        <!-- fill-in-the gap options ends here -->

        <!--Essay type  -->
        <section
          v-if="active_question_type === 'essay'"
          class="essay-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                  selected: 'true',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.duration, 10)"
              header="Duration"
              :min="10"
              :max="100"
              @change="handle_duration"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <!-- question-txt warapper -->
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>
            <!-- question-txt wrapper end -->

            <section class="allow-select-number-wrapper">
              <!-- custom number select with label -->
              <CustomNumberSelectIncrement
                @change="handle_word_limit"
                header="Word Limit"
                :min="50"
                :max="100000"
                :value="Number(question_input_details.word_limit)"
              />
              <!-- end custom number select with label ends here -->

              <!-- select option here -->
              <section class="select-dropdown-wrapper">
                <div class="label-holder-txt">Assign to Topic</div>
                <custom-drop-select
                  :isAjax="true"
                  :ajaxFunction="ajaxFunction"
                  :items="items"
                  :defaultText="question_input_details.topic"
                  @change="handle_topic($event)"
                  :empty_state="empty_state"
                  @newAction="addNewTopic"
                />
              </section>
              <!-- select end option here -->
            </section>

            <!-- checkbox -->
            <label for="checkbox-allow-input" class="checkbox-wrapper">
              <input
                type="checkbox"
                class="checkbox-form-main"
                id="checkbox-allow-input"
                :checked="Number(question_input_details.file_upload) === 1"
                @change="
                  Number(question_input_details.file_upload) === 1
                    ? (question_input_details.file_upload = 0)
                    : (question_input_details.file_upload = 1)
                "
              />
              <span class="checkbox-label-txt">Allow file upload</span>
            </label>
            <!-- checkbox her -->
          </section>
        </section>
        <!-- essay-answer options ends here -->

        <!--Comprehension Passage type  -->
        <section
          v-if="active_question_type === 'comprehension'"
          class="essay-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Topic"
              :selectOptions="[
                {
                  value: 'grammer',
                  text: 'Grammar - Reading to undertand',
                },
                {
                  value: 'medium',
                  text: 'Medium',
                },
                {
                  value: 'hard',
                  text: 'Hard',
                },
              ]"
            />
            <!-- end custom select with label ends here -->
          </section>
          <section class="main-body-inner"></section>
        </section>
        <!-- Comprehension Passage ends here -->

        <!--Multiple Choice type  -->
        <section
          v-if="active_question_type === 'multiple'"
          class="essay-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                  selected: 'true',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.duration, 10)"
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>

            <!-- input two column -->
            <div class="container-flexed-dua-column-input-wrapper">
              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option A</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="A"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'A'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_a"
                    placeholder="Module Description"
                    :content="question_input_details.option_a"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->

              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option B</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="B"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'B'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_b"
                    placeholder="Module Description"
                    :content="question_input_details.option_b"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->
            </div>
            <!-- input-two column ends here -->

            <!-- input two column -->
            <div class="container-flexed-dua-column-input-wrapper">
              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option C</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="C"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'C'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_c"
                    placeholder="Module Description"
                    :content="question_input_details.option_c"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->

              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option D</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="D"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'D'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_d"
                    placeholder="Module Description"
                    :content="question_input_details.option_d"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->
            </div>
            <!-- input-two column ends here -->

            <!-- select option here -->
            <section class="select-dropdown-wrapper">
              <div class="label-holder-txt">Assign to Topic</div>
              <custom-drop-select
                :isAjax="true"
                :ajaxFunction="ajaxFunction"
                :items="items"
                :defaultText="question_input_details.topic"
                @change="handle_topic($event)"
                :empty_state="empty_state"
                @newAction="addNewTopic"
              />
            </section>
            <!-- select option ends here  -->
          </section>
        </section>
        <!-- Multiple Choice ends here -->
      </div>
      <!-- edit question ends here -->

      <!-- create question starts here -->
      <div v-if="!isEdit" key="create" class="create-course-inner-main">
        <!-- true-false-option start here -->
        <section
          v-if="active_question_type === 'bool'"
          class="true-false-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                  selected: 'true',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              titleText="Difficulty"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
              :value="parseInt(question_input_details.duration, 10)"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <div class="question-text">
              QUESTION TEXT
              <span
                aria-label="This is your question"
                class="hover-svg hint--primary hint--bottom hint--rounded"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                    fill="#11BDCF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                    fill="#11BDCF"
                  />
                  <path
                    d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                    fill="#11BDCF"
                  />
                </svg>
              </span>
            </div>
            <div class="input-txt-wrapper">
              <CustomInput
                :action="isEdit ? 'edit' : 'create'"
                @input="handle_quill_input"
                name="question"
                placeholder="Module Description"
                :content="question_input_details.question"
              />
            </div>
            <div class="label-holder-txt">Options</div>
            <!-- radio-wrapper-holder -->
            <div class="input-wrapper-radio">
              <button class="radio-btn-wrapper-container">
                <span class="read-only-boolean">True</span>
                <label
                  for="radio-first-btn"
                  class="ash-radio-wrapper-container"
                >
                  <span>
                    <input
                      type="radio"
                      id="radio-first-btn"
                      value="1"
                      name="boolean"
                      :checked="
                        parseInt(question_input_details.answer, 10) === 1
                      "
                      @change="
                        $set(
                          question_input_details,
                          'answer',
                          parseInt($event.target.value, 10)
                        )
                      "
                    />
                  </span>
                  <span class="correct-answer-txt">Correct answer</span>
                </label>
              </button>
            </div>
            <!-- radio wrapper end -->

            <!-- radio-wrapper-holder -->
            <div class="input-wrapper-radio">
              <button class="radio-btn-wrapper-container">
                <span class="read-only-boolean">False</span>
                <label
                  for="radio-second-btn"
                  class="ash-radio-wrapper-container"
                >
                  <span>
                    <input
                      type="radio"
                      id="radio-second-btn"
                      name="boolean"
                      value="0"
                      :checked="
                        parseInt(question_input_details.answer, 10) === 0
                      "
                      @change="
                        $set(
                          question_input_details,
                          'answer',
                          parseInt($event.target.value, 10)
                        )
                      "
                    />
                  </span>
                  <span class="correct-answer-txt">Correct answer</span>
                </label>
              </button>
            </div>
            <!-- radio wrapper end -->

            <!-- select option here -->
            <section class="select-dropdown-wrapper">
              <div class="label-holder-txt">Assign to Topic</div>
              <custom-drop-select
                :isAjax="true"
                :ajaxFunction="ajaxFunction"
                :items="items"
                defaultText="Select Topic"
                @change="handle_topic($event)"
                :empty_state="empty_state"
                @newAction="addNewTopic"
              />
            </section>
            <!-- select option ends here  -->
          </section>
        </section>
        <!-- true-false-option ends here -->

        <!-- short-answer options here -->
        <section
          v-if="active_question_type === 'short'"
          class="short-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                  selected: 'true',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
              :value="parseInt(question_input_details.duration, 10)"
            />
            <!-- end custom number select with label ends here -->
          </section>

          <!-- question-txt warapper -->
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>
          </section>
          <!-- question-txt wrapper end -->

          <!-- question-txt warapper -->
          <section class="custom-input-wrapper-container">
            <div class="label-holder-txt">Answer</div>
            <div
              v-for="(item, index) in question_input_details.answer"
              :key="index"
              class="input-txt-wrapper"
            >
              <!-- <CustomInput
                :action="isEdit ? 'edit' : 'create'"
                @input="handle_custom_text_input($event, index)"
                name="question"
                placeholder="Write Answer"
                :content="question_input_details.answer[index]"
                :format="format"
              />-->

              <input
                :action="isEdit ? 'edit' : 'create'"
                class="text-area-main"
                @keydown="handle_text_input($event, index)"
                @input="handle_text_input($event, index)"
                name="answer"
                placeholder="Write answer"
                :value="question_input_details.answer[index]"
              />
            </div>
          </section>
          <!-- question-txt wrapper end -->

          <div class="checkbox-add-btn">
            <div
              @click="question_input_details.answer.push('')"
              class="add-btn"
            >
              <span class="circle">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="11.5" stroke="#C5C5C5" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.6666 12.6665H12.6666V16.6665H11.3333V12.6665H7.33325V11.3332H11.3333V7.33317H12.6666V11.3332H16.6666V12.6665Z"
                    fill="#FAA017"
                  />
                </svg>
              </span>
              <span class="text">Add another acceptable answer</span>
            </div>
            <!-- checkbox -->
            <label for="checkbox-allow-input" class="mg-0 checkbox-wrapper">
              <input
                type="checkbox"
                class="checkbox-form-main"
                id="checkbox-allow-input"
                v-model="format"
              />
              <span class="checkbox-label-txt">Ignore input formating</span>
              <span
                class="hover-input-svg ml-2 pointer hint--bottom-left hint--medium hint--rounded hint--primary"
                aria-label="Grade as correct as long as the student provides the correct spelling, number or sequence of texts."
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="8" r="8" fill="#D5D5D5" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.33333 9V9.33334H8.66667V9C8.66667 8.70065 8.71763 8.62845 9.06667 8.36667C9.71763 7.87845 10 7.47842 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667H7.33333C7.33333 6.29848 7.63181 6 8 6C8.36819 6 8.66667 6.29848 8.66667 6.66667C8.66667 6.96603 8.61571 7.03823 8.26667 7.3C7.61571 7.78823 7.33333 8.18825 7.33333 9ZM8.6671 10.6657C8.6671 11.0339 8.36853 11.3323 8.00022 11.3323C7.63191 11.3323 7.33333 11.0339 7.33333 10.6657C7.33333 10.2975 7.63191 9.999 8.00022 9.999C8.36853 9.999 8.6671 10.2975 8.6671 10.6657Z"
                    fill="#555555"
                  />
                </svg>
              </span>
            </label>
            <!-- checkbox her -->
          </div>

          <!-- select option here -->
          <section class="select-dropdown-wrapper">
            <div class="label-holder-txt">Assign to Topic</div>
            <custom-drop-select
              :isAjax="true"
              :ajaxFunction="ajaxFunction"
              :items="items"
              defaultText="Select Topic"
              @change="handle_topic($event)"
              :empty_state="empty_state"
              @newAction="addNewTopic"
            />
          </section>
          <!-- select end option here -->
        </section>
        <!-- short-answer options ends here -->

        <!-- fill-in-the gap options here -->
        <section
          v-if="active_question_type === 'fill-gap'"
          class="short-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'fill-gap',
                  text: 'Fill-in-the-gap',
                  selected: 'true',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
              :value="parseInt(question_input_details.duration, 10)"
            />
            <!-- end custom number select with label ends here -->
          </section>

          <!-- question-txt warapper -->
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>
          </section>
          <!-- question-txt wrapper end -->

          <!-- question-txt warapper -->
          <section class="custom-input-wrapper-container">
            <div class="label-holder-txt">
              Answer
              <span class="avatar">icon</span>
            </div>
            <div class="input-txt-wrapper">
              <CustomInput
                :action="isEdit ? 'edit' : 'create'"
                @input="handle_quill_input"
                name="answer"
                placeholder="Module Description"
                :content="question_input_details.answer"
              />
            </div>
          </section>
          <!-- question-txt wrapper end -->

          <!-- select option here -->
          <section class="select-dropdown-wrapper">
            <div class="label-holder-txt">Assign to Topic</div>
            <custom-drop-select
              :isAjax="true"
              :ajaxFunction="ajaxFunction"
              :items="items"
              defaultText="Select Topic"
              @change="handle_topic($event)"
              :empty_state="empty_state"
              @newAction="addNewTopic"
            />
          </section>
          <!-- select end option here -->
        </section>
        <!-- fill-in-the gap options ends here -->

        <!--Essay type  -->
        <section
          v-if="active_question_type === 'essay'"
          class="essay-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.duration, 10)"
              header="Duration"
              :min="10"
              :max="100"
              @change="handle_duration"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <!-- question-txt warapper -->
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>
            <!-- question-txt wrapper end -->

            <section class="allow-select-number-wrapper">
              <!-- custom number select with label -->
              <CustomNumberSelectIncrement
                @change="handle_word_limit"
                header="Word Limit"
                :min="50"
                :max="100000"
                :value="Number(question_input_details.word_limit)"
              />
              <!-- end custom number select with label ends here -->

              <!-- select option here -->
              <section class="select-dropdown-wrapper">
                <div class="label-holder-txt">Assign to Topic</div>
                <custom-drop-select
                  :isAjax="true"
                  :ajaxFunction="ajaxFunction"
                  :items="items"
                  defaultText="Select Topic"
                  @change="handle_topic($event)"
                  :empty_state="empty_state"
                  @newAction="addNewTopic"
                />
              </section>
              <!-- select end option here -->
            </section>

            <!-- checkbox -->
            <label for="checkbox-allow-input" class="checkbox-wrapper">
              <input
                type="checkbox"
                class="checkbox-form-main"
                id="checkbox-allow-input"
                :checked="Number(question_input_details.file_upload) === 1"
                @change="
                  Number(question_input_details.file_upload) === 1
                    ? (question_input_details.file_upload = 0)
                    : (question_input_details.file_upload = 1)
                "
              />
              <span class="checkbox-label-txt">Allow file upload</span>
            </label>
            <!-- checkbox her -->
          </section>
        </section>
        <!-- essay-answer options ends here -->

        <!--Comprehension Passage type  -->
        <section
          v-if="active_question_type === 'comprehension'"
          class="essay-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'fill-gap',
                  text: 'Fill-in-the-gap',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Topic"
              :selectOptions="[
                {
                  value: 'grammer',
                  text: 'Grammar - Reading to undertand',
                },
                {
                  value: 'medium',
                  text: 'Medium',
                },
                {
                  value: 'hard',
                  text: 'Hard',
                },
              ]"
            />
            <!-- end custom select with label ends here -->
          </section>
          <section class="main-body-inner"></section>
        </section>
        <!-- Comprehension Passage ends here -->

        <!--Multiple Choice type  -->
        <section
          v-if="active_question_type === 'multiple'"
          class="essay-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="isEdit"
              @change="handle_question_type($event.event)"
              titleText="Type"
              :selectOptions="[
                {
                  value: 'bool',
                  text: 'True / False',
                },
                {
                  value: 'multiple',
                  text: 'Multiple Choice',
                  selected: 'true',
                },
                {
                  value: 'short',
                  text: 'Short Answer',
                },
                {
                  value: 'essay',
                  text: 'Essay',
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handle_difficulty_dropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected:
                    question_input_details.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected:
                    question_input_details.difficulty === 'medium'
                      ? true
                      : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected:
                    question_input_details.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.score, 10)"
              @change="handle_score"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question_input_details.duration, 10)"
              @change="handle_duration"
              header="Duration"
              :min="10"
              :max="100"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="question-text">
                QUESTION TEXT
                <span
                  aria-label="This is your question"
                  class="hover-svg hint--primary hint--bottom hint--rounded"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                      fill="#11BDCF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3561 8.5601C11.8705 8.58141 11.6116 8.77678 11.5219 8.96723C11.2867 9.46693 10.691 9.68137 10.1913 9.44618C9.69158 9.211 9.47715 8.61525 9.71233 8.11554C10.2345 7.00604 11.3595 6.60191 12.2684 6.56202C13.1427 6.52365 14.2308 6.80214 14.8327 7.5871C15.2959 8.19115 15.5562 8.95686 15.4511 9.76195C15.3445 10.5783 14.8789 11.3106 14.1233 11.8664C13.1144 12.6087 13.1162 12.9874 13.1165 13.0425C13.1165 13.0433 13.1165 13.0441 13.1165 13.0447C13.1165 13.597 12.6688 14.0447 12.1165 14.0447C11.5642 14.0447 11.1165 13.597 11.1165 13.0447C11.1165 12.088 11.6729 11.1862 12.9382 10.2554C13.3271 9.96932 13.4428 9.69557 13.4679 9.50308C13.4945 9.29933 13.4368 9.05335 13.2457 8.80415C13.2322 8.78663 13.1592 8.71368 12.9763 8.64796C12.8017 8.5852 12.5821 8.55018 12.3561 8.5601Z"
                      fill="#11BDCF"
                    />
                    <path
                      d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                      fill="#11BDCF"
                    />
                  </svg>
                </span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :action="isEdit ? 'edit' : 'create'"
                  @input="handle_quill_input"
                  name="question"
                  placeholder="Module Description"
                  :content="question_input_details.question"
                />
              </div>
            </section>

            <!-- input two column -->
            <div class="container-flexed-dua-column-input-wrapper">
              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option A</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="A"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'A'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_a"
                    placeholder="Module Description"
                    :content="question_input_details.option_a"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->

              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option B</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="B"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'B'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_b"
                    placeholder="Module Description"
                    :content="question_input_details.option_b"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->
            </div>
            <!-- input-two column ends here -->

            <!-- input two column -->
            <div class="container-flexed-dua-column-input-wrapper">
              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option C</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="C"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'C'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_c"
                    placeholder="Module Description"
                    :content="question_input_details.option_c"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->

              <!-- custom input wrapper -->
              <section class="custom-input-wrapper-container">
                <div class="custom-label-holder-txt">
                  <span class="item-option-label-left">
                    <span class="label-holder-txt">Option D</span>
                    <span class="avatar">icon</span>
                  </span>
                  <span class="item-option-label-right">
                    <label
                      for="radio-main-input"
                      class="radio-main-input-label"
                    >
                      <input
                        name="multiple-choice"
                        value="D"
                        type="radio"
                        class="radio-input-main"
                        :checked="question_input_details.answer === 'D'"
                        @change="
                          $set(
                            question_input_details,
                            'answer',
                            $event.target.value
                          )
                        "
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    :action="isEdit ? 'edit' : 'create'"
                    @input="handle_quill_input"
                    name="option_d"
                    placeholder="Module Description"
                    :content="question_input_details.option_d"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->
            </div>
            <!-- input-two column ends here -->

            <!-- select option here -->
            <section class="select-dropdown-wrapper">
              <div class="label-holder-txt">Assign to Topic</div>
              <custom-drop-select
                @change="handle_topic($event)"
                :isAjax="true"
                :ajaxFunction="ajaxFunction"
                :items="items"
                :defaultText="getDefaultText"
                :empty_state="empty_state"
                @newAction="addNewTopic"
              />
            </section>
            <!-- select option ends here  -->
          </section>
        </section>
        <!-- Multiple Choice ends here -->
      </div>
      <!-- create question ends here -->
      <div
        v-show="show_file || (isEdit && question_input_details.image)"
        class="image-section rounded-5 position-relative"
      >
        <div
          v-show="GET_IS_FILE_UPLOADING || GET_IS_DELETING"
          class="loader-main position-absolute"
        >
          <span class="icon-dotted-roller icon spinner animate font-15"></span>
        </div>
        <div class="avatar brand_navy_bg position-absolute pointer">
          <span
            @click="handle_image_delete"
            class="icon-decline font-13 color_white flex-center"
          ></span>
        </div>
        <img
          :src="
            isEdit && question_input_details.image
              ? question_input_details.image
              : ''
          "
          ref="preview-tag"
          class="image-preview"
          alt="image"
        />
      </div>
      <footer class="footer-main-card">
        <span class="left-wrapper-bin-container">
          <span class="icon icon-paper-clip mgr-10 gfont-15"></span>
          <input
            type="file"
            class="hidden-input"
            ref="file-upload"
            accept="image/*"
            @change="handle_preview"
          />
          <span class="click-text" @click="click_file_input">Attach Image</span>
        </span>

        <span class="right-wrapper-bin-container">
          <span
            @click="reset_fields"
            class="bin-icon-wrapper icon-wrapper icon-trash"
          ></span>
          <span class="btn-wrapper-right">
            <button
              :disabled="
                GET_QUESTION_LOADING ||
                  GET_IS_EDITING ||
                  isButtonDisabled ||
                  GET_IS_FILE_UPLOADING ||
                  GET_IS_DELETING
              "
              @click="handle_question_save"
              class="btn btn-accent"
            >
              <span
                v-show="GET_QUESTION_LOADING || GET_IS_EDITING"
                class="icon-dotted-roller icon spinner animate font-15"
              ></span>
              <span class="text">
                {{
                  isEdit
                    ? `${GET_IS_EDITING ? "Editing..." : "Edit Question"}`
                    : `${
                        GET_IS_FILE_UPLOADING
                          ? "Uploading..."
                          : GET_QUESTION_LOADING
                          ? "Saving..."
                          : "Save Changes"
                      }`
                }}
              </span>
            </button>
          </span>
        </span>
      </footer>
    </div>
    <div
      v-for="item in !isEdit
        ? questions
        : questions.filter(
            (question) => Number(question.id) !== Number($route.query.id)
          )"
      :key="item.id"
      class="closed-create-question-card-wrapper"
    >
      <section class="card-top-main-body">
        <span class="right-inner-wrapper">
          <span class="checkbox-holder icon-caret-down"></span>
          <span class="question-right">
            <span v-html="item.question"></span>
            <div>
              <span
                :class="
                  item.difficulty === 'medium'
                    ? 'medium'
                    : item.difficulty === 'hard'
                    ? 'hard'
                    : ''
                "
                class="bold-text"
                >{{ item.difficulty }}</span
              >
              <span class="duration-time"
                >Duration:&nbsp;{{ item.duration }}</span
              >
            </div>
          </span>
        </span>
        <span>
          <button
            v-if="item.owner === 1"
            @click="$emit('get-single-question', item.id)"
            class="avatar icon-edit-pen edit-btn"
          ></button>
        </span>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomInput from "./CustomTextInput/TextInput.vue";
import CustomNumberSelectIncrement from "./customNumberIncremental/customNumberIncremental.vue";
import CustomSelectWithLabel from "./CustomLabelSelect/CustomLabelSelect.vue";
import CustomDropSelect from "./SelectDropdown.vue";
import {
  GET_CREATE_QUESTIONS,
  GET_QUESTION_LOADING,
  GET_CLASS_QUESTION_DETAILS,
  GET_IS_EDITING,
  FETCH_CLASS_QUESTION_DETAILS,
  GET_EDIT_QUESTION,
  GET_IS_SINGLE_LOADING,
  GET_TOPICS_LOADING,
  CREATE_TOPIC,
  GET_TOPIC_STATUS,
} from "../pages/QuestionCreate/store.module.QuestionCreateModule/constants";
import { isEmpty } from "../services/stringMgt";
import {
  GET_ASSESMENT_DETAILS,
  GET_ASSESMENT_DETAILS_ACTION,
  GET_TEACHER_QUESTIONS,
} from "../pages/AssesmentQuestions/store.module.AssesmentQuestions/constants";
import {
  DELETE_FILE_ACTION,
  GET_IS_FILE_UPLOADING,
  GET_IS_DELETING,
  GET_DELETE_DETAILS,
} from "../store/module/general/constant";
import { TOAST_ACTION } from "./SideNotificationSnack/store.module/constants";
GET_TOPICS_LOADING;
export default {
  name: "CreateQuestionsCard",
  components: {
    CustomInput,
    CustomSelectWithLabel,
    CustomNumberSelectIncrement,
    CustomDropSelect,
  },
  data() {
    return {
      format: true,
      active_question_type: "multiple",
      show_file: false,
      file: null,
      manual_change: false,
      question_input_details: {
        difficulty: "easy",
        duration: 60,
        question: "",
        word_limit: this.active_question_type === "essay" ? 50 : null,
        file_upload: this.active_question_type === "essay" ? 0 : null,
      },
      questions: [],
      isEdit: false,
      isButtonDisabled: true,
      isDelete: false,

      topic_title: "",
      empty_state: {
        message: "Topic not found",
        action_name: "Create topic",
        loading: "",
      },
    };
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    ajaxFunction: { type: Function },
  },
  methods: {
    ...mapActions([
      FETCH_CLASS_QUESTION_DETAILS,
      TOAST_ACTION,
      DELETE_FILE_ACTION,
      GET_ASSESMENT_DETAILS_ACTION,
      CREATE_TOPIC,
    ]),

    sendToast(message, state) {
      this[TOAST_ACTION]({
        toastData: {
          toastOpen: true,
          toastText: message,
          toastState: state,
          showBtn: true,
        },
        timeout: 3500,
      });
    },

    updateEmptyState(message, action_name, loading) {
      this.empty_state = { message, action_name, loading };
    },

    addNewTopic(title) {
      this.topic_title = title;

      this.updateEmptyState(
        "Please wait while new topic is created...",
        "Create Topic",
        "Creating Topic"
      );

      this.CREATE_TOPIC(this.getNewTopicPayload)
        .then((response) => {
          this.updateEmptyState("Topic not found", "Create Topic", "");

          if (response?.code == 200) {
            setTimeout(() => {
              this.sendToast(
                `${this.topic_title} created and added to topic list`,
                "success"
              );
            }, 500);
          } else {
            setTimeout(() => {
              this.sendToast(`Topic creation failed`, "error");
            }, 500);
          }
        })
        .catch((err) => {
          console.log("error trying to create new topic", err);
          setTimeout(() => {
            this.updateEmptyState("Topic not found", "Create Topic", "");
            this.sendToast(`Topic creation failed`, "error");
          }, 500);
        });
    },

    handle_custom_text_input(event, index) {
      console.log("we out here again", event, index);
    },

    handle_text_input(event, index) {
      if (
        event?.target?.value.match(/(\w+)/g)?.length >= 10 &&
        event.code !== "Backspace" &&
        event.code === "Space"
      ) {
        this.sendToast("Short answer word limit reached", "error");
        event.preventDefault();
        return;
      }
      this.question_input_details.answer[index] = event.target.value;
      this.question_input_details = {
        ...this.question_input_details,
      };
      // this.$set(this.question_input_details, "difficulty", event.target.value)
    },
    // function to change question type on dropdown change
    handle_difficulty_dropdown({ event }) {
      this.$set(this.question_input_details, "difficulty", event.target.value);
      this.$set(
        this.question_input_details,
        "duration",
        this.question_input_details?.difficulty === "easy"
          ? 60
          : this.question_input_details?.difficulty === "medium"
          ? 75
          : this.question_input_details?.difficulty === "hard"
          ? 90
          : 60
      );
    },

    //handle active question type
    handle_question_type(e) {
      if (this.isEdit) {
        return;
      }
      this.active_question_type = e.target.value;
    },

    //duration change function
    handle_duration(e) {
      this.manual_change = true;
      this.$set(this.question_input_details, "duration", parseInt(e, 10));
    },

    // score handler
    handle_score(e) {
      this.$set(this.question_input_details, "score", parseInt(e, 10));
    },

    //pill input function onchange
    handle_quill_input(e) {
      if (e?.target?.value) {
        this.$set(
          this.question_input_details,
          e?.target?.name,
          e?.target?.value
        );
      } else {
        this.$set(this.question_input_details, e?.name, e?.value);
      }
    },

    //word limit function
    handle_word_limit(e) {
      this.$set(this.question_input_details, "word_limit", parseInt(e, 10));
    },

    //question save
    handle_question_save() {
      if (this.isEdit) {
        this.handle_question_edit();
        return;
      }
      const homeworkPayload = this[GET_ASSESMENT_DETAILS]?.data;
      let fileMeta;
      if (this.file) {
        fileMeta = {
          withFile: true,
          file: this.file,
        };
      }
      const obj =
        this.active_question_type === "short"
          ? {
              answer: this.question_input_details?.answer.filter(
                (e) => e.trim().length
              ),
            }
          : {};

      this.$emit("create-question", {
        param: { question_type: this.active_question_type },
        fileMeta,
        data: {
          ...this.question_input_details,
          ...obj,
          homework_id: homeworkPayload?.id,
          class_id: homeworkPayload?.class_id,
          subject_id: homeworkPayload?.subject?.id,
        },
      });
    },

    // question edit
    handle_question_edit() {
      const homeworkDetails = this[GET_ASSESMENT_DETAILS]?.data;
      if (this.question_input_details?.image && this.file) {
        this.isDelete = true;
        this[DELETE_FILE_ACTION](this.question_input_details?.image);
        return;
      }
      let fileMeta;
      if (this.file) {
        fileMeta = {
          withFile: true,
          file: this.file,
        };
      }
      const data = {};
      switch (this.active_question_type) {
        case "bool":
          data.answer = Number(this.question_input_details?.answer);
          data.question = this.question_input_details?.question;
          data.score = Number(this.question_input_details?.score);
          data.duration = Number(this.question_input_details?.duration);
          data.difficulty = this.question_input_details?.difficulty;
          data.image = this.question_input_details?.image;
          data.class_id = Number(homeworkDetails?.class_id);
          data.topic_id = Number(this.question_input_details?.topic_id);
          data.homework_id = Number(this.question_input_details?.homework_id);
          data.subject_id = Number(this.question_input_details?.subject_id);
          break;
        case "multiple":
          data.answer = this.question_input_details?.answer;
          data.question = this.question_input_details?.question;
          data.score = Number(this.question_input_details?.score);
          data.duration = Number(this.question_input_details?.duration);
          data.difficulty = this.question_input_details?.difficulty;
          data.image = this.question_input_details?.image;
          data.option_a = this.question_input_details?.option_a;
          data.option_b = this.question_input_details?.option_b;
          data.option_c = this.question_input_details?.option_c;
          data.option_d = this.question_input_details?.option_d;
          data.class_id = Number(homeworkDetails?.class_id);
          data.topic_id = Number(this.question_input_details?.topic_id);
          data.homework_id = Number(this.question_input_details?.homework_id);
          data.subject_id = Number(this.question_input_details?.subject_id);
          break;
        case "short":
          data.answer = this.question_input_details?.answer?.filter(
            (e) => e.trim().length
          );
          data.question = this.question_input_details?.question?.replace(
            /<[^>]+>/g,
            ""
          );
          data.score = Number(this.question_input_details?.score);
          data.duration = Number(this.question_input_details?.duration);
          data.difficulty = this.question_input_details?.difficulty;
          data.image = this.question_input_details?.image;
          data.class_id = Number(homeworkDetails?.class_id);
          data.topic_id = Number(this.question_input_details?.topic_id);
          data.homework_id = Number(this.question_input_details?.homework_id);
          data.subject_id = Number(this.question_input_details?.subject_id);
          break;
        case "essay":
          data.word_limit = this.question_input_details?.word_limit;
          data.question = this.question_input_details?.question;
          data.score = this.question_input_details?.score;
          data.duration = this.question_input_details?.duration;
          data.difficulty = this.question_input_details?.difficulty;
          data.image = this.question_input_details?.image;
          data.class_id = Number(homeworkDetails?.class_id);
          data.topic_id = Number(this.question_input_details?.topic_id);
          data.homework_id = Number(this.question_input_details?.homework_id);
          data.subject_id = Number(this.question_input_details?.subject_id);
          data.file_upload = Number(this.question_input_details?.file_upload);
          break;
        default:
          break;
      }
      this.$emit("edit-question", {
        fileMeta,
        data: {
          ...data,
        },
        homework_id: this.question_input_details?.id,
      });
    },

    //function to clear selection || reset fields
    reset_fields() {
      if (this.isEdit) {
        return;
      }
      this.question_input_details = {
        difficulty: "easy",
        duration: 10,
        question: "",
        score: 1,
        word_limit: this.active_question_type === "essay" ? 50 : null,
        file_upload: this.active_question_type === "essay" ? 0 : null,
        topic_id: this.question_input_details?.topic_id,
      };
      this.$refs["preview-tag"].src = "";
      this.$refs["file-upload"].value = "";
      this.file = null;
      this.show_file = false;
      this.$set(
        this.question_input_details,
        "duration",
        this.question_input_details?.difficulty === "easy"
          ? 60
          : this.question_input_details?.difficulty === "medium"
          ? 75
          : this.question_input_details?.difficulty === "hard"
          ? 90
          : 60
      );
    },

    click_file_input() {
      this.$refs["file-upload"].click();
    },

    handle_preview(e) {
      const [file] = e.target.files;
      const fileType = file?.type
        .split("/")
        .pop()
        .toLowerCase();
      const acceptedFileTypes = ["jpeg", "jpg", "png", "bmp", "gif"];
      if (!acceptedFileTypes.includes(fileType.toLowerCase())) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "we only accept JPEG,JPG,PNG files",
            toastState: "error",
            showBtn: true,
          },
          timeout: 3000,
        });
        return;
      } else if (file.size > 2048000) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "Max Upload size is 2MB only",
            toastState: "error",
            showBtn: true,
          },
          timeout: 3000,
        });
        return;
      } else {
        this.$refs["preview-tag"].src = URL.createObjectURL(file);
        this.file = file;
        this.show_file = true;
      }
    },

    handle_image_delete() {
      if (this.isEdit) {
        if (!this.question_input_details?.image && this.file) {
          this.$refs["preview-tag"].src = "";
          this.$refs["file-upload"].value = "";
          this.file = null;
          this.show_file = false;
          return;
        }
        this.DELETE_FILE_ACTION(this.question_input_details?.image);
        return;
      }
      if (
        this[GET_IS_FILE_UPLOADING] ||
        this[GET_IS_EDITING] ||
        this[GET_QUESTION_LOADING]
      ) {
        return;
      }
      this.$refs["preview-tag"].src = "";
      this.$refs["file-upload"].value = "";
      this.file = null;
      this.show_file = false;
    },

    handle_topic(topic_id) {
      if (!topic_id) {
        this.$set(this.question_input_details, "topic_id", "");
        return;
      }
      this.$set(
        this.question_input_details,
        "topic_id",
        parseInt(topic_id, 10)
      );
    },
  },

  computed: {
    ...mapGetters([
      GET_CREATE_QUESTIONS,
      GET_QUESTION_LOADING,
      GET_CLASS_QUESTION_DETAILS,
      GET_IS_EDITING,
      GET_TEACHER_QUESTIONS,
      GET_EDIT_QUESTION,
      GET_IS_FILE_UPLOADING,
      GET_IS_DELETING,
      GET_DELETE_DETAILS,
      GET_ASSESMENT_DETAILS,
      GET_TOPICS_LOADING,
      GET_IS_SINGLE_LOADING,
      GET_TOPIC_STATUS,
    ]),

    getDefaultText() {
      return this.question_input_details?.topic_id
        ? "Select Topic"
        : "Select Topic";
    },

    getNewTopicPayload() {
      return {
        topic: this.topic_title,
        subject_id: this.GET_ASSESMENT_DETAILS.data.subject.id,
        class_id: this.GET_ASSESMENT_DETAILS.data.class_id,
        term: this.getAuthUser.term,
      };
    },

    getAuthUser() {
      return JSON.parse(localStorage.getItem("authUser"));
    },
  },

  watch: {
    GET_CREATE_QUESTIONS() {
      if (
        this[GET_CREATE_QUESTIONS]?.data &&
        this[GET_CREATE_QUESTIONS]?.name.includes("success") &&
        this[GET_CREATE_QUESTIONS]?.message === "Question saved"
      ) {
        this.questions = [...this.questions, this.GET_CREATE_QUESTIONS.data];
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: this[GET_CREATE_QUESTIONS]?.message || "Questions Saved",
            toastState: "success",
            showBtn: true,
          },
          timeout: 3000,
        });
      } else {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_CREATE_QUESTIONS]?.message ||
              "Sorry please we encountered an error",
            toastState: "error",
            showBtn: true,
          },
          timeout: 3000,
        });
      }
    },

    GET_CLASS_QUESTION_DETAILS() {
      if (
        this[GET_CLASS_QUESTION_DETAILS]?.code === 200 &&
        this[GET_CLASS_QUESTION_DETAILS]?.data &&
        this[GET_CLASS_QUESTION_DETAILS]?.name === "success"
      ) {
        this.isEdit = true;
        this.active_question_type = this[
          GET_CLASS_QUESTION_DETAILS
        ]?.data?.type;
        this.question_input_details = {
          ...this[GET_CLASS_QUESTION_DETAILS]?.data,
        };
      }
    },

    questions() {
      this.reset_fields();
      if (this.active_question_type === "short" && !this.isEdit) {
        this.question_input_details.answer = [""];
      }
      if (!this.questions.length) {
        this.$emit("disable");
      } else {
        this.$emit("enable");
      }
    },

    active_question_type() {
      this.isButtonDisabled = true;
      if (this.isEdit) {
        return;
      }
      this.$nextTick(() => {
        this.reset_fields();
        this.active_question_type === "short"
          ? this.$set(this.question_input_details, "answer", [""])
          : null;
      });
    },

    GET_DELETE_DETAILS() {
      if (
        this[GET_DELETE_DETAILS] &&
        this[GET_DELETE_DETAILS]?.code &&
        this[GET_DELETE_DETAILS]?.message === "Success" &&
        this[GET_DELETE_DETAILS]?.name === "success"
      ) {
        if (this.isDelete) {
          this.isDelete = false;
          delete this.question_input_details.image;
          this.handle_question_edit();
          return;
        }
        this.$emit("edit-question", {
          data: {
            image: this.editedImage ? this.editedImage : null,
          },
          homework_id: this.question_input_details?.id,
        });
      }
    },

    question_input_details: {
      // watch for various validations to know when to disable the button

      // TODO write for comprehension

      handler() {
        switch (this.active_question_type) {
          case "bool":
            if (
              isEmpty(
                this.question_input_details?.question,
                this.question_input_details?.answer,
                this.question_input_details?.topic_id
              )
            ) {
              this.isButtonDisabled = true;
              return;
            }
            this.isButtonDisabled = false;
            break;
          case "multiple":
            if (
              isEmpty(
                this.question_input_details?.question,
                this.question_input_details?.answer,
                this.question_input_details?.topic_id,
                this.question_input_details?.option_a,
                this.question_input_details?.option_b,
                this.question_input_details?.option_c,
                this.question_input_details?.option_d
              )
            ) {
              this.isButtonDisabled = true;
              return;
            }
            this.isButtonDisabled = false;
            break;
          case "short":
            if (
              isEmpty(
                this.question_input_details?.question,
                this.question_input_details?.topic_id
              ) ||
              (this.question_input_details?.answer.length === 1 &&
              !this.question_input_details?.answer[0]?.length
                ? true
                : false) ||
              (this.question_input_details?.answer.filter((e) => e.trim())
                .length
                ? false
                : true) ||
              (this.question_input_details?.answer?.filter(
                (e) => e.match(/(\w+)/g)?.length > 5
              ).length
                ? true
                : false)
            ) {
              this.isButtonDisabled = true;
              return;
            }
            this.isButtonDisabled = false;
            break;
          case "essay":
            if (
              isEmpty(
                this.question_input_details?.question,
                this.question_input_details?.topic_id
              )
            ) {
              this.isButtonDisabled = true;
              return;
            }
            this.isButtonDisabled = false;
            break;

          default:
            break;
        }
      },
      deep: true,
    },

    $route() {
      // to clear the input fields whenever route changes in other to prevent un necessary things from getting caught up
      if (this?.$route?.query?.id) {
        this.isEdit = true;
        const query = this.$route?.query;
        if (query && query?.action && query?.action === "edit" && query?.id) {
          this[FETCH_CLASS_QUESTION_DETAILS]({
            question_id: parseInt(query?.id, 10),
          });
        }
      } else {
        this.isEdit = false;
        this.active_question_type = "bool";
        this.reset_fields();
      }
    },

    GET_TEACHER_QUESTIONS() {
      if (this[GET_TEACHER_QUESTIONS]?.data?.length) {
        this.questions = [...this[GET_TEACHER_QUESTIONS]?.data];
      }
    },

    GET_EDIT_QUESTION() {
      if (
        this[GET_EDIT_QUESTION]?.code === 200 &&
        this[GET_EDIT_QUESTION]?.code === 200 &&
        this[GET_EDIT_QUESTION]?.name === "success" &&
        this[GET_EDIT_QUESTION]?.message === "Question updated"
      ) {
        const callback = () => {
          this.isEdit = false;
          this.active_question_type = "bool";
          this.show_file = false;
          this.$router.push({ name: "LMSCreate", query: {} });
          this.$nextTick(() => {
            this.reset_fields();
          });
        };
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: this[GET_EDIT_QUESTION]?.message || "Questions Updated",
            toastState: "success",
            showBtn: true,
          },
          timeout: 3000,
          callback,
        });
      } else {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: this[GET_EDIT_QUESTION]?.message,
            toastState: "error",
            showBtn: true,
          },
          timeout: 3000,
        });
      }
    },
  },

  async mounted() {
    if (this[GET_TEACHER_QUESTIONS]?.data?.length) {
      this.questions = [...this[GET_TEACHER_QUESTIONS]?.data];
    }
    const query = this.$route?.query;
    if (query && query?.action && query?.action === "edit" && query?.id) {
      await this[FETCH_CLASS_QUESTION_DETAILS]({
        question_id: parseInt(query?.id, 10),
      });
    }
    this.$emit("disable");
    const isEdit =
      this.$route?.params?.action && this.$route.params.action.includes("edit")
        ? true
        : false;
    this.isEdit = isEdit;
  },
  updated() {
    window?.MathJax?.typeset();
  },
};
</script>
<style lang="scss" scoped>
.input-wrapper-radio {
  margin: 0.5rem 0px;
  .radio-btn-wrapper-container {
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    .read-only-boolean {
      font-style: normal;
      font-weight: normal;
      font-size: 0.875rem;
      line-height: 19px;
      color: #555555;
      padding-right: 2rem;
      padding-left: 1rem;
    }
    .ash-radio-wrapper-container {
      @include flex-row-center-nowrap;
      padding: 0.37rem;
      line-height: 0.4;
      background: #f5f5f5;
      border-radius: 4px;
      margin-bottom: 0px;
      cursor: pointer;
      .correct-answer-txt {
        font-style: normal;
        font-weight: normal;
        font-size: 0.875rem;
        line-height: 165%;
        display: flex;
        align-items: center;
        color: $color-grey-dark;
      }
    }
  }
}

.main-header-main {
  @include flex-row-start-wrap;
}

// column of two input in a row

.container-flexed-dua-column-input-wrapper {
  @include flex-row-between-nowrap;
  .custom-input-wrapper-container {
    width: 49%;

    .custom-label-holder-txt {
      @include flex-row-between-nowrap;
      .item-option-label-right {
        .radio-main-input-label {
          @include flex-row-between-nowrap;
        }
      }
      .radio-txt-label {
        font-style: normal;
        font-weight: normal;
        font-size: 0.875rem;
        line-height: 165%;
        color: #757575;
      }
    }
  }
  @include breakpoint-down(lg) {
    @include flex-column-center;
    .custom-input-wrapper-container {
      width: 100%;
    }
  }
}

.allow-select-number-wrapper {
  @include flex-row-between-wrap;
  flex-direction: column;
  align-items: flex-start;
  .select-wrapper-holder {
    width: 100%;
  }
  .select-dropdown-wrapper {
    @include flex-row-start-nowrap;
    align-items: flex-start;
    @include breakpoint-down(md) {
      @include flex-row-start-wrap;
    }
    .label-holder-txt {
      margin: 1.5rem 0rem;
      width: inherit;
    }
    .text-select-main {
      width: 100%;
      @include breakpoint-down(md) {
        width: 100%;
        margin: 1rem auto;
      }
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    margin: 1rem 0px;
  }
  .custom-dropdown-label-wrapper {
    margin: 1rem 0rem;
  }
}

// quill container for custom input
.input-txt-wrapper {
  margin-top: 0.67rem;
  margin-bottom: 0.67rem;
}

.custom-dropdown-label-wrapper {
  background: #f5f5f5;
  border-radius: 5px;
  padding: 0.45rem;
  margin: 1rem 0.34rem;
  .select-label-txt {
    border-right: 1.5px solid #d5d5d5;
    padding-right: 0.45rem;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
  }
  .select-option-main {
    border: transparent;
    background: transparent;
    padding-left: 0.45rem;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #353535;
  }
}

.checkbox-wrapper {
  @include flex-row-start-nowrap;
  margin-bottom: 1rem;
  width: fit-content;
  .checkbox-form-main {
    padding-bottom: 0.23rem;
  }
  .checkbox-label-txt {
    font-weight: normal;
    font-size: 0.875rem;
    line-height: 165%;
    display: flex;
    align-items: center;
    color: #757575;
  }
}

.select-wrapper-holder {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 61%;
  .select-option-main {
    width: inherit;
    padding: 0.45rem;
    border: 1px solid #7c6f6f;
    box-sizing: border-box;
    border-radius: 5px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #353535;
  }
}

.create-course-inner-main,
.edit-course-inner-main {
  padding: 1rem;
  .main-body-inner {
    .question-text {
      padding: 0.76rem 0px;
      .main-text {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 19px;
        text-transform: uppercase;
        color: #757575;
      }
      .hover-svg {
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
    border-top: 1px solid #d5d5d5;
    padding: 0.76rem 0px;
  }
  .label-holder-txt {
    margin: 1.5rem 0rem;
    font-style: normal;
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 19px;
    text-transform: uppercase;
    color: #757575;
  }
}

.closed-create-question-card-wrapper {
  background: #ffffff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border-radius: 5px;
  margin: 1rem auto;
  padding: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  .card-top-main-body {
    @include flex-row-between-nowrap;
    // closed-right inner drawer
    .right-inner-wrapper {
      @include flex-row-start-nowrap;
      align-items: flex-start;
      .checkbox-holder {
        padding-top: toRem(7);
      }
      .question-right {
        padding-left: 10px;
        .bold-text {
          font-style: normal;
          font-weight: bold;
          font-size: 13px;
          line-height: 18px;
          text-transform: uppercase;
          color: #113255;
        }
        .hard {
          color: #f6515b !important;
        }
        .medium {
          color: #faa017 !important;
        }
        .duration-time:before {
          content: "•";
          padding: 5px;
        }
        .duration-time {
          color: #858585;
          font-size: 0.797rem;
        }
      }
    }
    //closed-right inner drawer
    .edit-btn {
      background: #fff;
      border: 1px solid #d5d5d5;
      box-sizing: border-box;
    }
    .icon-edit-pen:before {
      color: #dadada;
    }
  }
}

.open-create-question-card-wrapper {
  background: #ffffff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border-radius: 5px;
  margin: 1rem auto;
  .image-section {
    margin: toRem(7);
    max-width: 260px;
    max-height: 170px;
    border: 1px solid #d5d5d5;
    background: #f5f5f5;
    .loader-main {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffffde;
      top: 0;
      bottom: 0;
      .icon-dotted-roller {
        font-size: 38px;
        color: #00000036;
      }
    }
    .avatar {
      min-width: 1.5rem;
      min-height: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      top: -6px;
      right: -6px;
      z-index: 1;
      transition: all 0.3s ease-in-out;
      background-color: #113255 !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-preview {
      max-width: inherit;
      max-height: inherit;
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  .footer-main-card {
    @include flex-row-between-wrap;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 0px 0px 5px 5px;

    .icon-wrapper {
      margin: 10px;
      cursor: pointer;
    }
    span.click-text {
      cursor: pointer;
    }
    .right-wrapper-bin-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn-wrapper-right {
        border-left: solid 2px #d5d5d5;
        padding-left: 7px;
        .btn-accent {
          font-weight: bold;
          font-size: 12px;
          line-height: 16px;
          display: flex;
          align-items: center;
          text-transform: uppercase;
        }
        .spinner {
          margin-right: 8px;
          font-size: 15px;
        }
      }
    }
    .left-wrapper-bin-container {
      @include flex-row-end-nowrap;
      color: $brand-black;
      .icon-image:before {
        content: "\e958";
        color: $brand-black;
      }
    }
  }
  .hidden-input {
    display: none;
  }
}

.checkbox-add-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0rem;
  @include breakpoint-custom-down(600) {
    flex-direction: column;
    align-items: flex-start;
  }
  .add-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    .text {
      font-size: 14px;
      color: #757575;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
    }
  }
  .mg-0 {
    @include breakpoint-custom-down(600) {
      margin-top: 0.5rem !important;
    }
  }
}
.text-area-main {
  border-radius: 5px;
  width: 100%;
  height: 2rem;
  padding: 1rem;
  border: 1px solid #96a0aa;
  box-shadow: 0 2px 2px 0 #2e3c490d;
}
.loader {
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #0000002e;
}
.question-text {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: #757575;
}
</style>
