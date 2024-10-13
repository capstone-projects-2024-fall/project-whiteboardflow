module.exports = {
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
