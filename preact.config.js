import envVars from 'preact-cli-plugin-env-vars';
import path from 'path';

export default function (config, env, helpers) {
  config.resolve.modules.push(path.resolve(__dirname, './src/'));
  config.node.process = true;
  envVars(config, env, helpers);
}
