const formatTimeStamp = (timeStamp, data = "full") => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateObject = new Date(timeStamp * 1000);
  const dayNum = dateObject.getDay();
  const date = dateObject.toLocaleDateString("en-US");

  switch (data) {
    case "day":
      return days[dayNum];
      break;

    case "date":
      return date;
      break;

    default:
      return `${days[dayNum]} ${date}`;
  }
};

export default formatTimeStamp;
