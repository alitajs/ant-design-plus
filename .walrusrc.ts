import { Config } from '@walrus/cli';

const config: Config = {
  entry: {
    ignore: ['.umi', 'common', 'components', 'hooks', 'interface', 'theme', 'style', 'locale']
  }
};

export default config;
