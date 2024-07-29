export const createExpTime = (days = 1) => {
  const currentTime = new Date();
  const expTime = new Date(currentTime.getTime() + Number(days) * 24 * 60 * 60 * 1000);
  expTime.setHours(23);
  expTime.setMinutes(50);
  expTime.setSeconds(0);
  expTime.setMilliseconds(0);

  return expTime;
};
