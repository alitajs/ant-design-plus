import { Config } from '@walrus/cli';

const config: Config = {
  entry: {
    ignore: ['.umi', '.umi-production','common', 'components', 'hooks', 'interface', 'theme', 'style', 'locale']
  }
};

export default config;
