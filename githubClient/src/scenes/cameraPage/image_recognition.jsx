const PAT = "481b1b657b1e48d597cc0574a5627bfd";
const USER_ID = "h37j5inclvcb";
const APP_ID = "com_recipe_finder_uow";
// const MODEL_ID = "general-image-recognition";
// const MODEL_VERSION_ID = "aa9ca48295b37401f8af92ad1af0d91d";

const MODEL_ID = 'food-item-recognition';
const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044'; 

const getRequestBody = (base64String) => {
  return JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            base64: base64String.split(',')[1],
          },
        },
      },
    ],
  });
};

const getRequestOptions = (base64String) => ({
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: "Key " + PAT,
  },
  body: getRequestBody(base64String),
});

const image_recognition = function(base64String) {
  return fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    getRequestOptions(base64String)
  ).then((response) => response.json());
};

export default image_recognition;