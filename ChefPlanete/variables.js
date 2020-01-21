import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://172.30.2.110:8081"
  },
};

const getEnvVariables = (env = "") => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  else return ENV.dev;
};

export default getEnvVariables(Constants.manifest.releaseChannel);
