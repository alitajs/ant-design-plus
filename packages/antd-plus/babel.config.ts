export default {
  plugins: [
    require.resolve('babel-plugin-import'), {
      libraryName: '@alitajs/autils',
      libraryDirectory: 'es'
    }
  ]
}
