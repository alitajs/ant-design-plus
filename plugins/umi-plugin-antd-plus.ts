import { IApi } from 'umi';

export default (api: IApi) => {
  api.describe({
    key: 'sensoroDesign',
    config: {
      schema(joi) {
        return joi.object({
          dark: joi.boolean(),
          compact: joi.boolean()
        });
      }
    }
  });

  api.modifyBabelPresetOpts((opts) => {
    return {
      ...opts,
      import: (opts.import || []).concat([
        { libraryName: '@alitajs/antd-plus', libraryDirectory: 'es', style: true }
      ])
    };
  });
};
