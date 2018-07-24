const saveUser = data => {
  console.log(`New user subscribed: ${data.subscriber_number}`);
  // database.ref('/users/' + data.subscriber_number).set(data);
};

const sendSMS = async (address, content) => {
  try {
    // const user = await database.ref('/users/' + address).once('value');
    // const { access_token } = user.val();

    // const { data } = await axios.post(App.SEND_SMS(access_token), Template.SEND_SMS(address, content.trim()));
    console.log(address, content);
    // console.log(`Successfully sent SMS to ${address}`);
  } catch (err) {
    console.log(`Failure to send SMS`);
    // console.log(`Failure to send SMS to ${address}`);
    console.log(err);
  }
};

const returnSend = (res, content = '') => {
  const OK = 200;

  res.set('Content-Type', 'text/html');
  res.status(OK).send(content);
};

export const getToken = async (req, res) => {
  console.log('Am in');
  const { subscriber_number } = req.query;

  saveUser(req.query);
  sendSMS(subscriber_number, 'Welcome! Node test message');

  // Report to developer
  // if (subscriber_number !== App.developer.contact) {
  //   sendSMS(
  //     App.developer.contact,
  //     report(`${subscriber_number} subscribed to the SMS bot`)
  //   );
  // }
  returnSend(res);
};
