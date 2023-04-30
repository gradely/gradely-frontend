// SET PAGE BACKGROUND COLOR
const setPageBackgroundColor = (color) =>
  (document.body.style.backgroundColor = color);

// SET COLOR PROGRESS BACKGROUND
const getProgressBarColor = (progress) => {
  if (progress <= 45) return "brand-red";
  else if (progress > 45 && progress <= 75) return "brand-accent";
  else return "brand-green";
};

export { setPageBackgroundColor, getProgressBarColor };
