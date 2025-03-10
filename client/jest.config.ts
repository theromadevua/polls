export default {
  preset: "ts-jest",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Use ts-jest for .ts and .tsx files
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest for .js and .jsx files
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
