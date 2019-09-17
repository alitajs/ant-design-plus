export default {
  plugins: [
    [require.resolve('babel-plugin-import'), {
      libraryName: '@alitajs/autils',
      libraryDirectory: 'es',
      camel2DashComponentName: false
    }, 'autils-import']
  ]
}
