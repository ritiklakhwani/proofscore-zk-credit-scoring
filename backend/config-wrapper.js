import { getConfig } from "@vlayer/sdk/config";

export function createConfigForIndex(index) {
    // Store the original env variables
    const originalEnv = {
        CHAIN_NAME: process.env.CHAIN_NAME,
        PROVER_URL: process.env.PROVER_URL,
        JSON_RPC_URL: process.env.JSON_RPC_URL,
        EXAMPLES_TEST_PRIVATE_KEY: process.env.EXAMPLES_TEST_PRIVATE_KEY
    };

    // Get the configuration for the specified index
    const configJson = process.env[`CONFIG_${index}`];
    if (!configJson) {
        throw new Error(`Configuration CONFIG_${index} not found in environment variables`);
    }

    // Parse the JSON configuration
    const config = JSON.parse(configJson);

    // Set the environment variables
    process.env.CHAIN_NAME = config.CHAIN_NAME;
    process.env.PROVER_URL = config.PROVER_URL;
    process.env.JSON_RPC_URL = config.JSON_RPC_URL;
    process.env.EXAMPLES_TEST_PRIVATE_KEY = config.EXAMPLES_TEST_PRIVATE_KEY;

    // Get the SDK config
    const sdkConfig = getConfig();

    // Restore the original env variables
    process.env.CHAIN_NAME = originalEnv.CHAIN_NAME;
    process.env.PROVER_URL = originalEnv.PROVER_URL;
    process.env.JSON_RPC_URL = originalEnv.JSON_RPC_URL;
    process.env.EXAMPLES_TEST_PRIVATE_KEY = originalEnv.EXAMPLES_TEST_PRIVATE_KEY;

    return sdkConfig;
} 