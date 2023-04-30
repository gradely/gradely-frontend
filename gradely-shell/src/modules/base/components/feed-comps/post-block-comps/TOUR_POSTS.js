import { $serviceDate } from "@/services/service-date";
import TOUR_STUDENTS from "@/store/general/students";

let authUser = JSON.parse(localStorage.getItem("authUser"));

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

let { y1, m2, d2, h02, b2, s2 } = $serviceDate
  .formatDate(tomorrow, false)
  .getAll();
let formated_date = `${y1}-${m2}-${d2}T${h02}:${b2}:${s2}Z`;

const tour_posts = [
  {
    id: 0,
    tour_id: 3,
    subject_id: 2,
    description: "",
    type: "live_class",
    tag: null,
    like_count: 0,
    comment_count: 0,
    token: "BCe4KkhvWq14k6cmKa5nCVUvRpn4ZZjlw4v2JFGnhRfxCeYs56",
    view_by: "class",
    my_like_status: false,
    user: {
      id: authUser.id,
      name: authUser.full_name,
      image: authUser.image,
      code: authUser.code,
    },
    reference: {
      id: 1,
      title: "Interrogative Pronoun",
      availability: formated_date,
      requester_id: 5180,
      class_id: 1470,
      subject_id: 2,
      student_id: null,
      repetition: "once",
      session_count: 1,
      category: "class",
      is_school: 1,
      meeting_room: "WIU2FLJ0RWDDMJSEBPCCMKPHV5K1WL",
      meta: null,
      status: "pending",
      subject: {
        id: 2,
        name: "English Language",
        image: `${getAssetBaseURL(
          "aws",
          "backdev"
        )}/images/subjects/1651502462/2/english-language.png`,
      },
      teacher: {
        id: authUser.id,
        first_name: authUser.full_name.split(" ")[0],
        last_name: authUser.full_name.split(" ")[1],
        image: authUser.image,
        code: authUser.code,
        type: "teacher",
      },
      class: {
        id: 1470,
        class_name: "Junior secondary school 2",
        global_class_id: 8,
      },
      recommended_students: [TOUR_STUDENTS[1], TOUR_STUDENTS[3]],
    },
    subject: {
      id: 2,
      name: "English Language",
      image: `${getAssetBaseURL(
        "aws",
        "backdev"
      )}/images/subjects/1651502462/2/english-language.png`,
    },
    class: {
      id: 1470,
      class_code: "SAMCO/JSS2",
      class_name: "Junior secondary school 2",
      global_class_id: 8,
      global_class_description: "Year 8/JSS 2",
    },
    is_owner: true,
    created_at: "2022-06-28T13:20:03Z",
    updated_at: null,
    attachments: null,
    comments: null,
  },
  {
    id: 0,
    tour_id: 2,
    subject_id: 1,
    description: "Relative Pronoun - Recommended Resource",
    type: "share",
    tag: "video",
    like_count: 0,
    comment_count: 0,
    token: "V63M1YBV7dsjDDPRIxQbTddnA3Q5p97FAyD7QtelAyho19dZYP",
    view_by: "class",
    my_like_status: false,
    user: {
      id: authUser.id,
      name: authUser.full_name,
      image: authUser.image,
      code: authUser.code,
    },
    reference: {
      id: 1828,
      type: "share",
      recommendation_type: null,
      tag: "video",
      source: "video_content",
      subject_id: null,
      subject_name: null,
      topic_id: 162,
      topic: "Pronoun",
      thumbnail: `${getAssetBaseURL(
        "aws",
        "files",
        "video"
      )}/thumbnails/P5_Term1_English_Video18_Relative_Pronoun.jpg`,
      url: `${getAssetBaseURL(
        "aws",
        "PRY5_English_Language",
        "video"
      )}/P5_Term1_English_Video18_Relative_Pronoun.mp4`,
      token: "785a352d110f3562523d2e2747a0829d-12",
      owner: "gradely",
      created_at: formated_date,
      recommended_students: [
        TOUR_STUDENTS[0],
        TOUR_STUDENTS[1],
        TOUR_STUDENTS[3],
      ],
    },
    subject: {
      id: 1,
      name: "English Language",
      image: `${getAssetBaseURL(
        "aws",
        "backdev"
      )}/images/subjects/1651935687/1/mathematics.png`,
    },
    class: {
      id: 1470,
      class_code: "SAMCO/JSS2",
      class_name: "Junior secondary school 2",
      global_class_id: 8,
      global_class_description: "Year 8/JSS 2",
    },
    is_owner: true,
    created_at: "2022-06-28T10:50:46Z",
    updated_at: null,
    attachments: null,
    comments: null,
  },
  {
    id: 0,
    tour_id: 1,
    subject_id: 1,
    description: null,
    type: "homework",
    tag: null,
    like_count: 0,
    comment_count: 0,
    token: "moe1fv4yfvo6xn7cpmzmkkrt6dos4v",
    view_by: "class",
    my_like_status: false,
    user: {
      id: authUser.id,
      name: authUser.full_name,
      image: authUser.image,
      code: authUser.code,
    },
    reference: {
      id: 1,
      type: "homework",
      title: "Gradely LMS Tour",
      description: "",
      open_date: "2022-07-12T11:36:00Z",
      close_date: formated_date,
      my_attempt_status: false,
      is_closed: true,
      question_count: 0,
      question_duration: 150,
      is_proctor: 0,
      publish_status: 1,
      review_status: 1,
      tag: "homework",
      submitted_student_count: 0,
      completion_rate: 0,
      selected_student: 0,
      expected_student_count: 5,
      created_at: "2022-07-12T10:36:34Z",
      publish_at: "2022-07-12T11:40:00Z",
      subject: "English Lnaguage",
      class_name: "Junior secondary school 2",
      user: {
        id: authUser.id,
        name: authUser.full_name,
        image: authUser.image,
        code: authUser.code,
      },
      recommended_students: [],
    },
    subject: {
      id: 1,
      name: "English Lnaguage",
      image: `${getAssetBaseURL(
        "aws",
        "backdev"
      )}/images/subjects/1651935687/1/mathematics.png`,
    },
    class: {
      id: 1470,
      class_code: "SAMCO/JSS2",
      class_name: "Junior secondary school 2",
      global_class_id: 8,
      global_class_description: "Year 8/JSS 2",
    },
    is_owner: true,
    created_at: "2022-07-12T10:36:34Z",
    updated_at: null,
    attachments: null,
    comments: null,
  },
];

export default tour_posts;
