import Constants from "expo-constants";
const { manifest } = Constants;

const ENV = {
  dev: {
    apiUrl: `http://${manifest.debuggerHost.split(':').shift()}:8081`,
    recipeApiKey: '998c4c5379e741b18622557bc0cc52b2',
  },
};

const getEnvVariables = (env = "") => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  else return ENV.dev;
};

export default getEnvVariables(Constants.manifest.releaseChannel);
