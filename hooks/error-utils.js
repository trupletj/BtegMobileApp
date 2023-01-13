export const sendErrorToServer = (error) => {
  // code to send the error message to the server for further analysis
  // for example:
  // fetch('/api/log-error', {
  //   method: 'POST',
  //   body: JSON.stringify(error),
  //   headers: { 'Content-Type': 'application/json' },
  // });
};

export const sendNotification = (error) => {
  // code to send a notification to the developer or the responsible team
  // for example:
  // sendEmail('developer@example.com', 'Error Occurred', error.message);
  // sendSMS('+1234567890', error.message);
};
