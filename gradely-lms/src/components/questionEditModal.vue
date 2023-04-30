<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <template slot="modal-cover-header">
      <div class="modal-cover-header header-nav-modal">
        <div class="preview-question">Edit Question</div>
      </div>
    </template>
    <template slot="modal-cover-body">
      <div v-if="question" class="modal-cover-body">
        <section
          v-if="question && question.type === 'bool'"
          class="true-false-option-container"
        >
          <section class="main-header-main">
            <CustomSelectWithLabel
              titleText="Type"
              :disabled="true"
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
              ]"
            />
            <CustomSelectWithLabel
              name="difficulty"
              titleText="Difficulty"
              @change="handleDifficultyDropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected: question.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected: question.difficulty === 'medium' ? true : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected: question.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <CustomNumberSelectIncrement
              :value="parseInt(question.score, 10) || 1"
              @change="handleScore"
            />
            <CustomNumberSelectIncrement
              :value="parseInt(question.duration, 10) || 60"
              header="Duration"
              :min="10"
              :max="100"
              @change="handleDuration"
            />
          </section>
          <section class="main-body-inner">
            <div class="input-txt-wrapper">
              <CustomInput
                :content="question.question || ''"
                name="question"
                @input="handleQuillInput"
                placeholder="Module Description"
              />
            </div>
            <div class="label-holder-txt">Options</div>
            <div class="input-wrapper-radio">
              <button class="radio-btn-wrapper-container">
                <span class="read-only-boolean">True</span>
                <label
                  for="radio-first-btn"
                  class="ash-radio-wrapper-container"
                >
                  <span
                    ><input
                      type="radio"
                      id="radio-first-btn"
                      value="1"
                      name="boolean"
                      :checked="parseInt(question.answer, 10) === 1"
                      @change="
                        $set(
                          question,
                          'answer',
                          parseInt($event.target.value, 10)
                        )
                      "
                  /></span>
                  <span class="correct-answer-txt">Correct answer</span>
                </label>
              </button>
            </div>
            <div class="input-wrapper-radio">
              <button class="radio-btn-wrapper-container">
                <span class="read-only-boolean">False</span>
                <label
                  for="radio-second-btn"
                  class="ash-radio-wrapper-container"
                >
                  <span
                    ><input
                      type="radio"
                      id="radio-second-btn"
                      name="boolean"
                      value="0"
                      :checked="parseInt(question.answer, 10) === 0"
                      @change="
                        $set(
                          question,
                          'answer',
                          parseInt($event.target.value, 10)
                        )
                      "
                  /></span>
                  <span class="correct-answer-txt">Correct answer</span>
                </label>
              </button>
            </div>
            <section class="select-dropdown-wrapper">
              <div class="label-holder-txt">Assign to Topic</div>
              <custom-drop-select
                :ajaxFunction="searchFunction"
                :items="items"
                :isAjax="true"
                defaultText="Select Topic"
                :value="question.topic_id || null"
                @change="handleTopic($event)"
              />
            </section>
          </section>
        </section>
        <section
          v-if="question && question.type === 'multiple'"
          class="short-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Type"
              :disabled="true"
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
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              name="difficulty"
              @change="handleDifficultyDropdown($event)"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected: question.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected: question.difficulty === 'medium' ? true : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected: question.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question.score, 10) || 1"
              @change="handleScore"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question.duration, 10) || 60"
              header="Duration"
              :min="10"
              :max="100"
              @change="handleDuration"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="label-holder-txt">
                Question Text<span class="avatar">icon</span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :content="question.question || ''"
                  name="question"
                  placeholder="Module Description"
                  @input="handleQuillInput"
                />
              </div>
            </section>

            <!-- input two column -->
            <div class="container-flexed-dua-column-input-wrapper d-flex">
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
                        :checked="question.answer.toLowerCase() === 'a'"
                        @change="$set(question, 'answer', $event.target.value)"
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    name="option_a"
                    placeholder="Module Description"
                    :content="question.option_a || ''"
                    @input="handleQuillInput"
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
                        :checked="question.answer.toLowerCase() === 'b'"
                        @change="$set(question, 'answer', $event.target.value)"
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    name="option_b"
                    placeholder="Module Description"
                    :content="question.option_b || ''"
                    @input="handleQuillInput"
                  />
                </div>
              </section>
              <!-- end custom input wrapper -->
            </div>
            <!-- input-two column ends here -->

            <!-- input two column -->
            <div class="container-flexed-dua-column-input-wrapper d-flex">
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
                        :checked="question.answer.toLowerCase() === 'c'"
                        @change="$set(question, 'answer', $event.target.value)"
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    name="option_c"
                    placeholder="Module Description"
                    :content="question.option_c || ''"
                    @input="handleQuillInput"
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
                        :checked="question.answer.toLowerCase() === 'd'"
                        @change="$set(question, 'answer', $event.target.value)"
                      />
                      <span class="radio-txt-label">Correct answer</span>
                    </label>
                  </span>
                </div>
                <div class="input-txt-wrapper">
                  <CustomInput
                    name="option_d"
                    placeholder="Module Description"
                    :content="question.option_d || ''"
                    @input="handleQuillInput"
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
                :ajaxFunction="searchFunction"
                :items="items"
                :isAjax="true"
                defaultText="Select Topic"
                :value="question.topic_id || null"
                @change="handleTopic($event)"
              />
            </section>
            <!-- select option ends here  -->
          </section>
        </section>
        <section
          v-if="question && question.type === 'short'"
          class="short-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Type"
              :disabled="true"
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
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom select with label -->
            <CustomSelectWithLabel
              titleText="Difficulty"
              @change="handleDifficultyDropdown($event)"
              name="difficulty"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected: question.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected: question.difficulty === 'medium' ? true : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected: question.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question.score, 10) || 1"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question.duration, 10) || 60"
              header="Duration"
              :min="10"
              :max="100"
              @change="handleDuration"
            />
            <!-- end custom number select with label ends here -->
          </section>

          <!-- question-txt warapper -->
          <section class="main-body-inner">
            <section class="custom-input-wrapper-container">
              <div class="label-holder-txt">
                Question Text<span class="avatar">icon</span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :content="question.question || ''"
                  name="question"
                  placeholder="Module Description"
                  @input="handleQuillInput"
                />
              </div>
            </section>
          </section>
          <!-- question-txt wrapper end -->

          <!-- question-txt warapper -->
          <section class="custom-input-wrapper-container">
            <div class="label-holder-txt">
              Answer<span class="avatar">icon</span>
            </div>
            <div
              v-for="(item, index) in question.answer"
              :key="index"
              class="input-txt-wrapper"
            >
              <input
                class="text-area-main"
                name="answer"
                placeholder="Write answer"
                @keydown="handleTextInput($event, index)"
                @input="handleTextInput($event, index)"
                :value="question.answer[index]"
              />
            </div>
          </section>
          <!-- question-txt wrapper end -->
          <div class="checkbox-add-btn">
            <div @click="question.answer.push('')" class="add-btn">
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
            </label>
            <!-- checkbox her -->
          </div>

          <!-- select option here -->
          <section class="select-dropdown-wrapper">
            <div class="label-holder-txt">Assign to Topic</div>
            <custom-drop-select
              :ajaxFunction="searchFunction"
              :items="items"
              :isAjax="true"
              defaultText="Select Topic"
              :value="question.topic_id || null"
              @change="handleTopic($event)"
            />
          </section>
          <!-- select end option here -->
        </section>
        <section
          v-if="question && question.type === 'essay'"
          class="essay-answer-option-container"
        >
          <section class="main-header-main">
            <!-- custom select with label -->
            <CustomSelectWithLabel
              :disabled="true"
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
              @change="handleDifficultyDropdown($event)"
              name="difficulty"
              :selectOptions="[
                {
                  value: 'easy',
                  text: 'Easy',
                  selected: question.difficulty === 'easy' ? true : false,
                },
                {
                  value: 'medium',
                  text: 'Medium',
                  selected: question.difficulty === 'medium' ? true : false,
                },
                {
                  value: 'hard',
                  text: 'Hard',
                  selected: question.difficulty === 'hard' ? true : false,
                },
              ]"
            />
            <!-- end custom select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question.score, 10) || 1"
              @change="handleScore"
            />
            <!-- end custom number select with label ends here -->

            <!-- custom number select with label -->
            <CustomNumberSelectIncrement
              :value="parseInt(question.duration, 10) || 60"
              header="Duration"
              :min="10"
              :max="100"
              @change="handleDuration"
            />
            <!-- end custom number select with label ends here -->
          </section>
          <section class="main-body-inner">
            <!-- question-txt warapper -->
            <section class="custom-input-wrapper-container">
              <div class="label-holder-txt">
                Question Text<span class="avatar">icon</span>
              </div>
              <div class="input-txt-wrapper">
                <CustomInput
                  :content="question.question || ''"
                  name="question"
                  placeholder="Module Description"
                  @input="handleQuillInput"
                />
              </div>
            </section>
            <!-- question-txt wrapper end -->

            <section class="allow-select-number-wrapper">
              <!-- custom number select with label -->
              <CustomNumberSelectIncrement
                header="Word Limit"
                :min="50"
                :max="100000"
              />
              <!-- end custom number select with label ends here -->

              <!-- select option here -->
              <section class="select-dropdown-wrapper">
                <div class="label-holder-txt">Assign to Topic</div>
                <custom-drop-select
                  :ajaxFunction="searchFunction"
                  :items="items"
                  :isAjax="true"
                  defaultText="Select Topic"
                  :value="question.topic_id || null"
                  @change="handleTopic($event)"
                />
              </section>
              <!-- select end option here -->
            </section>

            <!-- checkbox -->
            <label for="checkbox-allow-input" class="mt-3 checkbox-wrapper">
              <input
                type="checkbox"
                class="checkbox-form-main"
                id="checkbox-allow-input"
              />
              <span class="checkbox-label-txt">Allow file upload</span>
            </label>
            <!-- checkbox her -->
          </section>
        </section>
        <div
          v-show="!showFile"
          @click="$refs['file-upload'].click()"
          class="select-image pointer"
        >
          <input
            type="file"
            ref="file-upload"
            class="d-none"
            accept="image/*"
            @change="handlePreview"
          />
          <svg
            width="114"
            height="64"
            viewBox="0 0 114 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="112.778"
              height="63"
              rx="4.5"
              fill="#F5F5F5"
              stroke="#D5D5D5"
            />
            <path
              d="M24.1693 51.2204C24.1693 51.8124 24.0493 52.3484 23.8093 52.8284C23.5693 53.3004 23.2013 53.6764 22.7053 53.9564C22.2173 54.2284 21.5933 54.3644 20.8333 54.3644C19.7693 54.3644 18.9573 54.0764 18.3973 53.5004C17.8453 52.9164 17.5693 52.1484 17.5693 51.1964V45.6764H18.6493V51.2324C18.6493 51.9284 18.8333 52.4684 19.2013 52.8524C19.5773 53.2364 20.1413 53.4284 20.8933 53.4284C21.6693 53.4284 22.2293 53.2244 22.5733 52.8164C22.9253 52.4004 23.1013 51.8684 23.1013 51.2204V45.6764H24.1693V51.2204ZM29.3466 47.6924C30.1386 47.6924 30.7746 47.9684 31.2546 48.5204C31.7426 49.0724 31.9866 49.9044 31.9866 51.0164C31.9866 52.1124 31.7426 52.9444 31.2546 53.5124C30.7746 54.0804 30.1346 54.3644 29.3346 54.3644C28.8386 54.3644 28.4266 54.2724 28.0986 54.0884C27.7786 53.8964 27.5266 53.6764 27.3426 53.4284H27.2706C27.2866 53.5644 27.3026 53.7364 27.3186 53.9444C27.3346 54.1524 27.3426 54.3324 27.3426 54.4844V57.1244H26.2866V47.8124H27.1506L27.2946 48.6884H27.3426C27.5346 48.4084 27.7866 48.1724 28.0986 47.9804C28.4106 47.7884 28.8266 47.6924 29.3466 47.6924ZM29.1546 48.5804C28.4986 48.5804 28.0346 48.7644 27.7626 49.1324C27.4986 49.5004 27.3586 50.0604 27.3426 50.8124V51.0164C27.3426 51.8084 27.4706 52.4204 27.7266 52.8524C27.9906 53.2764 28.4746 53.4884 29.1786 53.4884C29.5706 53.4884 29.8906 53.3804 30.1386 53.1644C30.3946 52.9484 30.5826 52.6564 30.7026 52.2884C30.8306 51.9124 30.8946 51.4844 30.8946 51.0044C30.8946 50.2684 30.7506 49.6804 30.4626 49.2404C30.1826 48.8004 29.7466 48.5804 29.1546 48.5804ZM34.7254 54.2444H33.6694V45.1244H34.7254V54.2444ZM42.3552 51.0164C42.3552 52.0804 42.0832 52.9044 41.5392 53.4884C41.0032 54.0724 40.2752 54.3644 39.3552 54.3644C38.7872 54.3644 38.2792 54.2364 37.8312 53.9804C37.3912 53.7164 37.0432 53.3364 36.7872 52.8404C36.5312 52.3364 36.4032 51.7284 36.4032 51.0164C36.4032 49.9524 36.6712 49.1324 37.2072 48.5564C37.7432 47.9804 38.4712 47.6924 39.3912 47.6924C39.9752 47.6924 40.4872 47.8244 40.9272 48.0884C41.3752 48.3444 41.7232 48.7204 41.9712 49.2164C42.2272 49.7044 42.3552 50.3044 42.3552 51.0164ZM37.4952 51.0164C37.4952 51.7764 37.6432 52.3804 37.9392 52.8284C38.2432 53.2684 38.7232 53.4884 39.3792 53.4884C40.0272 53.4884 40.5032 53.2684 40.8072 52.8284C41.1112 52.3804 41.2632 51.7764 41.2632 51.0164C41.2632 50.2564 41.1112 49.6604 40.8072 49.2284C40.5032 48.7964 40.0232 48.5804 39.3672 48.5804C38.7112 48.5804 38.2352 48.7964 37.9392 49.2284C37.6432 49.6604 37.4952 50.2564 37.4952 51.0164ZM46.4648 47.7044C47.2488 47.7044 47.8288 47.8764 48.2048 48.2204C48.5808 48.5644 48.7688 49.1124 48.7688 49.8644V54.2444H48.0008L47.7968 53.3324H47.7488C47.4688 53.6844 47.1728 53.9444 46.8608 54.1124C46.5568 54.2804 46.1328 54.3644 45.5888 54.3644C45.0048 54.3644 44.5208 54.2124 44.1368 53.9084C43.7528 53.5964 43.5608 53.1124 43.5608 52.4564C43.5608 51.8164 43.8128 51.3244 44.3168 50.9804C44.8208 50.6284 45.5968 50.4364 46.6448 50.4044L47.7368 50.3684V49.9844C47.7368 49.4484 47.6208 49.0764 47.3888 48.8684C47.1568 48.6604 46.8288 48.5564 46.4048 48.5564C46.0688 48.5564 45.7488 48.6084 45.4448 48.7124C45.1408 48.8084 44.8568 48.9204 44.5928 49.0484L44.2688 48.2564C44.5488 48.1044 44.8808 47.9764 45.2648 47.8724C45.6488 47.7604 46.0488 47.7044 46.4648 47.7044ZM46.7768 51.1364C45.9768 51.1684 45.4208 51.2964 45.1088 51.5204C44.8048 51.7444 44.6528 52.0604 44.6528 52.4684C44.6528 52.8284 44.7608 53.0924 44.9768 53.2604C45.2008 53.4284 45.4848 53.5124 45.8288 53.5124C46.3728 53.5124 46.8248 53.3644 47.1848 53.0684C47.5448 52.7644 47.7248 52.3004 47.7248 51.6764V51.1004L46.7768 51.1364ZM53.0354 54.3644C52.2354 54.3644 51.5954 54.0884 51.1154 53.5364C50.6354 52.9764 50.3954 52.1444 50.3954 51.0404C50.3954 49.9364 50.6354 49.1044 51.1154 48.5444C51.6034 47.9764 52.2474 47.6924 53.0474 47.6924C53.5434 47.6924 53.9474 47.7844 54.2594 47.9684C54.5794 48.1524 54.8394 48.3764 55.0394 48.6404H55.1114C55.1034 48.5364 55.0874 48.3844 55.0634 48.1844C55.0474 47.9764 55.0394 47.8124 55.0394 47.6924V45.1244H56.0954V54.2444H55.2434L55.0874 53.3804H55.0394C54.8474 53.6524 54.5914 53.8844 54.2714 54.0764C53.9514 54.2684 53.5394 54.3644 53.0354 54.3644ZM53.2034 53.4884C53.8834 53.4884 54.3594 53.3044 54.6314 52.9364C54.9114 52.5604 55.0514 51.9964 55.0514 51.2444V51.0524C55.0514 50.2524 54.9194 49.6404 54.6554 49.2164C54.3914 48.7844 53.9034 48.5684 53.1914 48.5684C52.6234 48.5684 52.1954 48.7964 51.9074 49.2524C51.6274 49.7004 51.4874 50.3044 51.4874 51.0644C51.4874 51.8324 51.6274 52.4284 51.9074 52.8524C52.1954 53.2764 52.6274 53.4884 53.2034 53.4884ZM63.8114 54.2444H60.7154V53.6204L61.7234 53.3924V46.5404L60.7154 46.3004V45.6764H63.8114V46.3004L62.8034 46.5404V53.3924L63.8114 53.6204V54.2444ZM72.3778 47.6924C73.1058 47.6924 73.6498 47.8804 74.0098 48.2564C74.3698 48.6244 74.5498 49.2244 74.5498 50.0564V54.2444H73.5058V50.1044C73.5058 49.0884 73.0698 48.5804 72.1978 48.5804C71.5738 48.5804 71.1258 48.7604 70.8538 49.1204C70.5898 49.4804 70.4578 50.0044 70.4578 50.6924V54.2444H69.4138V50.1044C69.4138 49.0884 68.9738 48.5804 68.0938 48.5804C67.4458 48.5804 66.9978 48.7804 66.7498 49.1804C66.5018 49.5804 66.3778 50.1564 66.3778 50.9084V54.2444H65.3218V47.8124H66.1738L66.3298 48.6884H66.3898C66.5898 48.3524 66.8578 48.1044 67.1938 47.9444C67.5378 47.7764 67.9018 47.6924 68.2858 47.6924C69.2938 47.6924 69.9498 48.0524 70.2538 48.7724H70.3138C70.5298 48.4044 70.8218 48.1324 71.1898 47.9564C71.5658 47.7804 71.9618 47.6924 72.3778 47.6924ZM78.9726 47.7044C79.7566 47.7044 80.3366 47.8764 80.7126 48.2204C81.0886 48.5644 81.2766 49.1124 81.2766 49.8644V54.2444H80.5086L80.3046 53.3324H80.2566C79.9766 53.6844 79.6806 53.9444 79.3686 54.1124C79.0646 54.2804 78.6406 54.3644 78.0966 54.3644C77.5126 54.3644 77.0286 54.2124 76.6446 53.9084C76.2606 53.5964 76.0686 53.1124 76.0686 52.4564C76.0686 51.8164 76.3206 51.3244 76.8246 50.9804C77.3286 50.6284 78.1046 50.4364 79.1526 50.4044L80.2446 50.3684V49.9844C80.2446 49.4484 80.1286 49.0764 79.8966 48.8684C79.6646 48.6604 79.3366 48.5564 78.9126 48.5564C78.5766 48.5564 78.2566 48.6084 77.9526 48.7124C77.6486 48.8084 77.3646 48.9204 77.1006 49.0484L76.7766 48.2564C77.0566 48.1044 77.3886 47.9764 77.7726 47.8724C78.1566 47.7604 78.5566 47.7044 78.9726 47.7044ZM79.2846 51.1364C78.4846 51.1684 77.9286 51.2964 77.6166 51.5204C77.3126 51.7444 77.1606 52.0604 77.1606 52.4684C77.1606 52.8284 77.2686 53.0924 77.4846 53.2604C77.7086 53.4284 77.9926 53.5124 78.3366 53.5124C78.8806 53.5124 79.3326 53.3644 79.6926 53.0684C80.0526 52.7644 80.2326 52.3004 80.2326 51.6764V51.1004L79.2846 51.1364ZM85.5432 47.6924C85.9672 47.6924 86.3472 47.7724 86.6832 47.9324C87.0272 48.0924 87.3192 48.3364 87.5592 48.6644H87.6192L87.7632 47.8124H88.6032V54.3524C88.6032 55.2724 88.3672 55.9644 87.8952 56.4284C87.4312 56.8924 86.7072 57.1244 85.7232 57.1244C84.7792 57.1244 84.0072 56.9884 83.4072 56.7164V55.7444C84.0392 56.0804 84.8312 56.2484 85.7832 56.2484C86.3352 56.2484 86.7672 56.0844 87.0792 55.7564C87.3992 55.4364 87.5592 54.9964 87.5592 54.4364V54.1844C87.5592 54.0884 87.5632 53.9524 87.5712 53.7764C87.5792 53.5924 87.5872 53.4644 87.5952 53.3924H87.5472C87.1152 54.0404 86.4512 54.3644 85.5552 54.3644C84.7232 54.3644 84.0712 54.0724 83.5992 53.4884C83.1352 52.9044 82.9032 52.0884 82.9032 51.0404C82.9032 50.0164 83.1352 49.2044 83.5992 48.6044C84.0712 47.9964 84.7192 47.6924 85.5432 47.6924ZM85.6872 48.5804C85.1512 48.5804 84.7352 48.7964 84.4392 49.2284C84.1432 49.6524 83.9952 50.2604 83.9952 51.0524C83.9952 51.8444 84.1392 52.4524 84.4272 52.8764C84.7232 53.2924 85.1512 53.5004 85.7112 53.5004C86.3592 53.5004 86.8312 53.3284 87.1272 52.9844C87.4232 52.6324 87.5712 52.0684 87.5712 51.2924V51.0404C87.5712 50.1604 87.4192 49.5324 87.1152 49.1564C86.8112 48.7724 86.3352 48.5804 85.6872 48.5804ZM93.13 47.6924C93.682 47.6924 94.154 47.8124 94.546 48.0524C94.946 48.2924 95.25 48.6324 95.458 49.0724C95.674 49.5044 95.782 50.0124 95.782 50.5964V51.2324H91.378C91.394 51.9604 91.578 52.5164 91.93 52.9004C92.29 53.2764 92.79 53.4644 93.43 53.4644C93.838 53.4644 94.198 53.4284 94.51 53.3564C94.83 53.2764 95.158 53.1644 95.494 53.0204V53.9444C95.166 54.0884 94.842 54.1924 94.522 54.2564C94.202 54.3284 93.822 54.3644 93.382 54.3644C92.774 54.3644 92.234 54.2404 91.762 53.9924C91.298 53.7444 90.934 53.3764 90.67 52.8884C90.414 52.3924 90.286 51.7884 90.286 51.0764C90.286 50.3724 90.402 49.7684 90.634 49.2644C90.874 48.7604 91.206 48.3724 91.63 48.1004C92.062 47.8284 92.562 47.6924 93.13 47.6924ZM93.118 48.5564C92.614 48.5564 92.214 48.7204 91.918 49.0484C91.63 49.3684 91.458 49.8164 91.402 50.3924H94.678C94.67 49.8484 94.542 49.4084 94.294 49.0724C94.046 48.7284 93.654 48.5564 93.118 48.5564Z"
              fill="#757575"
            />
            <path
              d="M60.4436 20.2667V20.267C60.4436 20.5499 60.3312 20.8212 60.1311 21.0213C59.931 21.2213 59.6597 21.3337 59.3767 21.3337C59.0938 21.3336 58.8225 21.2212 58.6224 21.0212C58.4224 20.8211 58.31 20.5498 58.31 20.2668C58.31 19.9839 58.4224 19.7126 58.6224 19.5125C58.8225 19.3124 59.0938 19.2 59.3767 19.2C59.6597 19.2 59.931 19.3124 60.1311 19.5124C60.3312 19.7124 60.4436 19.9838 60.4436 20.2667ZM66.1324 16.3556V29.1555C66.132 29.5326 65.982 29.8941 65.7154 30.1607C65.4488 30.4273 65.0873 30.5773 64.7102 30.5778H49.0658C48.6887 30.5773 48.3272 30.4273 48.0606 30.1607C47.794 29.8941 47.644 29.5326 47.6436 29.1555V16.3556C47.644 15.9785 47.794 15.617 48.0606 15.3504C48.3272 15.0838 48.6887 14.9338 49.0658 14.9333H64.7102C65.0873 14.9338 65.4488 15.0838 65.7154 15.3504C65.982 15.617 66.132 15.9785 66.1324 16.3556ZM64.711 26.0172L64.7102 16.3556H49.0658V24.5943L52.3268 21.3333C52.5937 21.067 52.9554 20.9175 53.3325 20.9175C53.7096 20.9175 54.0712 21.067 54.3382 21.3333L58.3103 25.3055L60.149 23.4667C60.416 23.2004 60.7776 23.0508 61.1547 23.0508C61.5318 23.0508 61.8935 23.2004 62.1604 23.4667L64.711 26.0172Z"
              fill="#959595"
            />
          </svg>
        </div>
        <div
          v-show="showFile"
          class="image-section rounded-5 position-relative"
        >
          <div
            v-if="GET_IS_FILE_UPLOADING"
            class="loader-main position-absolute"
          >
            <span
              class="icon-dotted-roller icon spinner animate font-15"
            ></span>
          </div>
          <div class="avatar brand_navy_bg position-absolute pointer">
            <span
              @click="handleImageDelete"
              class="icon-decline font-13 color_white flex-center"
            ></span>
          </div>
          <img
            :src="question.image ? question.image : ''"
            ref="preview-tag"
            class="image-preview"
            alt="image"
          />
        </div>
      </div>
    </template>
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-between">
        <div class="left-section">
          <span
            @click="$emit('delete', currentQuestion)"
            class="pointer icon-trash"
          ></span>
        </div>
        <div class="right-section">
          <span class="pointer text-btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.25 0.75H0.75C0.58424 0.750002 0.42527 0.81585 0.30806 0.93306C0.19085 1.05027 0.125002 1.20924 0.125 1.375V3.875C0.125 4.04076 0.190848 4.19973 0.308058 4.31694C0.425268 4.43415 0.58424 4.5 0.75 4.5C0.91576 4.5 1.07473 4.43415 1.19194 4.31694C1.30915 4.19973 1.375 4.04076 1.375 3.875V2H6.375V12H4.5C4.33424 12 4.17527 12.0658 4.05806 12.1831C3.94085 12.3003 3.875 12.4592 3.875 12.625C3.875 12.7908 3.94085 12.9497 4.05806 13.0669C4.17527 13.1842 4.33424 13.25 4.5 13.25H9.5C9.66576 13.25 9.82473 13.1842 9.94194 13.0669C10.0592 12.9497 10.125 12.7908 10.125 12.625C10.125 12.4592 10.0592 12.3003 9.94194 12.1831C9.82473 12.0658 9.66576 12 9.5 12H7.625V2H12.625V3.875C12.625 4.04076 12.6908 4.19973 12.8081 4.31694C12.9253 4.43415 13.0842 4.5 13.25 4.5C13.4158 4.5 13.5747 4.43415 13.6919 4.31694C13.8092 4.19973 13.875 4.04076 13.875 3.875V1.375C13.875 1.20924 13.8091 1.05027 13.6919 0.93306C13.5747 0.81585 13.4158 0.750002 13.25 0.75Z"
                fill="#113255"
              />
            </svg>
          </span>
          <span class="divider-main"></span>
          <span class="main-btn">
            <button
              @click="$emit('next')"
              class="btn btn-md btn-accent brand_navy"
            >
              Next Question
            </button>
          </span>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
import CustomInput from "./CustomTextInput/TextInput.vue";
import CustomNumberSelectIncrement from "./customNumberIncremental/customNumberIncremental.vue";
import CustomSelectWithLabel from "./CustomLabelSelect/CustomLabelSelect.vue";
import CustomDropSelect from "./SelectDropdown.vue";
import { mapActions, mapGetters } from "vuex";
import { TOAST_ACTION } from "./SideNotificationSnack/store.module/constants";
import {
  GET_IS_FILE_UPLOADING,
  POST_UPLOAD_FILE,
  GET_UPLOAD_DETAILS,
  DELETE_FILE_ACTION,
} from "../store/module/general/constant";

export default {
  name: "EditModal",
  components: {
    ModalCover,
    CustomInput,
    CustomNumberSelectIncrement,
    CustomSelectWithLabel,
    CustomDropSelect,
  },
  data() {
    return {
      // currentQuestion: 0
      question: {},
      showFile: false,
      manualChange: false,
    };
  },
  props: {
    questions: {
      type: Array,
    },
    currentQuestion: {},
    items: {
      type: Array,
      default: () => [],
    },
    searchFunction: {
      type: Function,
    },
  },
  methods: {
    ...mapActions([TOAST_ACTION, POST_UPLOAD_FILE, DELETE_FILE_ACTION]),
    handleDifficultyDropdown({ event }) {
      this.$set(this.question, "difficulty", event?.target?.value);
    },
    handleQuillInput(e) {
      if (e?.target?.value) {
        this.$set(this.question, e?.target?.name, e?.target?.value);
      } else if (e?.value) {
        this.$set(this.question, e?.name, e?.value);
      } else {
        this.$set(this.question, e?.name, "");
      }
    },
    handleTextInput(event, index) {
      if (
        event?.target?.value.match(/(\w+)/g)?.length >= 5 &&
        event.code !== "Backspace" &&
        event.code === "Space"
      ) {
        event.preventDefault();
        return;
      }
      this.question.answer[index] = event.target.value;
      this.question = {
        ...this.question,
      };
      this.$forceUpdate();
    },
    handleImageDelete() {
      if (this[GET_IS_FILE_UPLOADING]) {
        return;
      }
      if (this.question?.image) {
        this[DELETE_FILE_ACTION](this.question?.image);
      }
      this.$refs["preview-tag"].src = "";
      this.$refs["file-upload"].value = "";
      this.$set(this.question, "image", "");
      this.showFile = false;
    },
    async handlePreview(e) {
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
        this.showFile = true;
        const formData = new FormData();
        formData.append("file", file);
        await this[POST_UPLOAD_FILE](formData);
      }
    },
    handleScore(e) {
      this.$set(this.question, "score", parseInt(e, 10));
    },
    handleDuration(e) {
      this.manualChange = true;
      this.$set(this.question, "duration", parseInt(e, 10));
    },
    handleTopic(e) {
      if (!e) {
        this.$set(this.question, "topic_id", "");
        return;
      }
      this.$set(this.question, "topic_id", parseInt(e, 10));
    },
  },
  watch: {
    currentQuestion() {
      this.question = this.questions.filter(
        (question) => Number(question.id) === Number(this.currentQuestion)
      )[0];
    },
    question: {
      handler() {
        if (
          this.question.type === "short" &&
          !Array.isArray(this.question.answer)
        ) {
          const splited = this.question.answer.split(",");
          if (!splited || !splited.length) {
            this.$set(this.question, "answer", [this.question?.answer]);
          } else {
            this.$set(this.question, "answer", splited);
          }
        }
        this.question?.image ? (this.showFile = true) : (this.showFile = false);
        if (!this.manual_change) {
          this.$set(
            this.question,
            "duration",
            this.question?.difficulty === "easy"
              ? 60
              : this.question?.difficulty === "medium"
              ? 75
              : this.question?.difficulty === "hard"
              ? 90
              : 60
          );
        } else {
          this.manualChange = false;
        }

        this.$emit("edit", { question: this.question });
      },
      deep: true,
    },
    GET_UPLOAD_DETAILS() {
      if (
        this[GET_UPLOAD_DETAILS]?.code === 200 &&
        this[GET_UPLOAD_DETAILS]?.name === "success" &&
        this[GET_UPLOAD_DETAILS]?.message === "Success" &&
        this[GET_UPLOAD_DETAILS]?.data &&
        this[GET_UPLOAD_DETAILS]?.data?.ObjectURL
      ) {
        this.$set(
          this.question,
          "image",
          this[GET_UPLOAD_DETAILS]?.data?.ObjectURL
        );
      }
    },
  },
  computed: {
    ...mapGetters([GET_IS_FILE_UPLOADING, GET_UPLOAD_DETAILS]),
  },
  mounted() {
    this.question = this.questions.filter(
      (question) => Number(question.id) === Number(this.currentQuestion)
    )[0];
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  padding: 1rem;
  .main-header-main {
    @include flex-row-start-wrap;
  }
  .main-body-inner {
    border-top: 1px solid #d5d5d5;
    padding: 0.76rem 0px;
    .input-txt-wrapper {
      margin-top: 0.67rem;
      margin-bottom: 0.67rem;
    }
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
  }
  .label-holder-txt {
    font-style: normal;
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 19px;
    text-transform: uppercase;
    color: #757575;
    margin: 1rem 0rem;
  }
  .input-txt-wrapper {
    margin-top: 0.67rem;
    margin-bottom: 0.67rem;
    .text-area-main {
      border-radius: 5px;
      width: 100%;
      height: 2rem;
      padding: 1rem;
      border: 1px solid #96a0aa;
      box-shadow: 0 2px 2px 0 #2e3c490d;
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
  .select-image {
    margin-top: 1rem;
  }
  .image-section {
    margin: toRem(7) 0rem;
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
}
.modal-cover-footer {
  background: #f5f5f5;
  align-items: center;
  .right-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text-btn {
      background: #fceacf;
      border-radius: 10px;
      padding: 0.6rem 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .divider-main {
      height: 24px;
      margin: 0px 10px;
      border: 1px solid #d5d5d5;
    }
    .main-btn {
      .btn {
        padding: 0.5rem;
      }
    }
  }
}
.pointer {
  cursor: pointer;
}
.header-nav-modal {
  background: #ffffff;
  box-shadow: 0px 1px 4px #00000026;
  .preview-question {
    font-weight: bold;
    font-size: 1rem;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #353535;
  }
}
.container-flexed-dua-column-input-wrapper {
  @include breakpoint-custom-down(640) {
    display: block !important;
  }
  .custom-input-wrapper-container {
    width: 48%;
    margin: 1%;
    @include breakpoint-custom-down(640) {
      width: 100% !important;
      margin: 0;
    }
  }
}
</style>
