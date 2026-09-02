/** @type {import('jest').Config} */
export default {
    testEnvironment: "node",

    extensionsToTreatAsEsm: [".ts"],

    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: "./tsconfig.json"
            }
        ]
    },

    testMatch: ["<rootDir>/src/**/*.spec.ts"],

    clearMocks: true,
}