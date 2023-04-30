const recommendations = [
  {
    type: "video",
    title: "Relative Pronoun",
    is_recommended: 0,
    topic: {
      id: 376,
      topic: "Relative Pronoun",
      image: `${getAssetBaseURL("aws", "placeholders")}/topic.png`,
      subject_id: 2,
    },
    class: { id: 44, class_name: "Tour session" },
    duration: "06:00",
    reference: {
      id: 1,
      tour_id: 2,
      date: "0001-01-01T00:00:00Z",
      title: "Relative Pronoun",
      token: "785a352d110f3562523d2e2747a0829d-12",
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
      duration: "06:00",
    },
  },

  {
    type: "remedial",
    title: "Interrogative Pronoun",
    duration: "60:00",
    is_recommended: 0,
    topic: {
      id: 376,
      topic: "Tour session",
      image: `${getAssetBaseURL("aws", "placeholders")}/topic.png`,
      subject_id: 2,
    },
    reference: {
      id: 2,
      tour_id: 3,
      date: "0001-01-01T00:00:00Z",
      duration: "",
    },
  },

  //   {
  //     type: "video",
  //     title: "Interrogative Pronoun",
  //     is_recommended: 0,
  //     topic: {
  //       id: 376,
  //       topic: "Interrogative Pronoun",
  //       image: `https://gradly.s3.eu-west-2.amazonaws.com/placeholders/topic.png`,
  //       subject_id: 2,
  //     },
  //     class: { id: 44, class_name: "Tour session" },
  //     duration: "05:00",
  //     reference: {
  //       id: 1964,
  //       date: "0001-01-01T00:00:00Z",
  //       title: "Interrogative Pronoun",
  //       token: "785a352d110f3562523d2e2747a0829d-12",
  //       thumbnail:
  //         "https://gradely-videos.s3.eu-west-2.amazonaws.com/files/thumbnails/P5_Term1_English_Video19_Interrogative_Pronoun.jpg",
  //       url: "https://gradely-videos.s3.eu-west-2.amazonaws.com/PRY5_English_Language/P5_Term1_English_Video19_Interrogative_Pronoun.mp4",
  //       duration: "05:00",
  //     },
  //   },
];

export default recommendations;
