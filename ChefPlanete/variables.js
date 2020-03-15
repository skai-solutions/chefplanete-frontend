import Constants from "expo-constants";
const { manifest } = Constants;

const ENV = {
  dev: {
    apiUrl: `http://${manifest.debuggerHost.split(':').shift()}:8081`,
    recipeApiKey: 'your-api-key-here',
    imageUrlBase: 'https://spoonacular.com/recipeImages',
    ingredientUrlBase: 'https://spoonacular.com/cdn/ingredients_100x100',
  },
};

const getEnvVariables = (env = "") => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  else return ENV.dev;
};

export default getEnvVariables(Constants.manifest.releaseChannel);
