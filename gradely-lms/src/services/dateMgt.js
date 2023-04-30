const monthFormat = [
  {
    full_name: "January",
    abbrev: "Jan"
  },
  {
    full_name: "February",
    abbrev: "Feb"
  },
  {
    full_name: "March",
    abbrev: "Mar"
  },
  {
    full_name: "April",
    abbrev: "Apr"
  },
  {
    full_name: "May",
    abbrev: "May"
  },
  {
    full_name: "June",
    abbrev: "Jun"
  },
  {
    full_name: "July",
    abbrev: "Jul"
  },
  {
    full_name: "August",
    abbrev: "Aug"
  },
  {
    full_name: "September",
    abbrev: "Sept"
  },
  {
    full_name: "October",
    abbrev: "Oct"
  },
  {
    full_name: "November",
    abbrev: "Nov"
  },
  {
    full_name: "December",
    abbrev: "Dec"
  }
];

const getMinutesPerSeconds = (time) => {
  let minutes = Math.trunc(Math.round(time) / 60);
  let minutes_in_secs = minutes * 60;
  let seconds = Math.round(time) - minutes_in_secs;
  return `${minutes}m:${seconds}s`;
};

const approximate = (digit) => Math.floor(digit);

// CONVERT DATE TO TIME STAMP AND COMPARE TO CURRENT
const getRelativeTime = (formattedDate) => {
  const timeStamp = new Date(formattedDate * 1000);

  const differenceInSeconds = (Date.now() - timeStamp) / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  // GET MONTHS IF DAYS IS GREATER THAN OR EQUAL TO 30
  if (differenceInDays >= 30) {
    if (differenceInDays === 30) return `1 month ago`;
    return `${approximate(differenceInDays / 30)} months ago`;
  }

  // GET DAYS IF HOURS IS GREATER THAN OR EQUAL TO 24
  if (differenceInHours >= 24) {
    if (differenceInHours === 24) return `1 day ago`;
    return `${approximate(differenceInHours / 24)} days ago`;
  }

  //Get HOURS IF MINUTES IS GREATER OR EQUAL TO 60
  if (differenceInMinutes >= 60) {
    if (differenceInMinutes === 60) return `1 hour ago`;
    return `${approximate(differenceInMinutes / 60)} hours ago`;
  }

  //GET MINUTES IF SECONDS IS GREATER OR EQUAL TO 60
  if (differenceInSeconds >= 60) {
    if (differenceInSeconds === 60) return `1 minute ago`;
    return `${approximate(differenceInSeconds / 60)} minutes ago`;
  }

  //GET SECONDS IF LESS THAN A MINTE
  if (differenceInSeconds < 60) {
    return `${approximate(differenceInSeconds)} seconds ago`;
  }
};

// FORMAT DATE IN READABLE FORM
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const shortMonthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const cleanUpDate = (time) => {
  const timeToIso = new Date(time).toISOString();
  const filteredTime = timeToIso.slice(0, 19).replace("T", " ");
  return filteredTime;
};
const getReadableDate = (date_string) => {
  let date_list = date_string.split("-");
  let day = date_list[0];
  let month = Number(date_list[1]) - 1;
  let year = date_list[2];

  let new_month = monthList[month];

  return `${day} ${new_month}, ${year}`;
};

const getShortReadableDate = (date_string) => {
  let date_list = date_string.split("-");
  let year = date_list[0];
  let month = Number(date_list[1]) - 1;
  let day_split = date_list[2].split(" ");
  let day = day_split[0];
  let new_month = shortMonthList[month];

  return `${day} ${new_month}, ${year}`;
};

export {
  monthFormat,
  getMinutesPerSeconds,
  getReadableDate,
  getRelativeTime,
  cleanUpDate,
  getShortReadableDate
};
