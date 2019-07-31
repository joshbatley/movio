import envVars from 'preact-cli-plugin-env-vars';

export default function (config, env, helpers) {
  config.node.process = true;
  envVars(config, env, helpers);
}
