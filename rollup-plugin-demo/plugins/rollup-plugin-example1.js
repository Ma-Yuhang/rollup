export default function example1() {
  return {
    name: 'my-example1',
    version: '1.0.0',
    options(opts) {
      // console.log("options--->opts", opts);
    },
    buildStart(opts) {
      // console.log("buildStart--->opts", opts);
    },
    resolveId(source, importer) {
      // console.log("resolveId--->source", source);
      // console.log("resolveId--->importer", importer);
    },
    load(id) {
      // console.log("load--->id", id);
    },
    transform(code, id) {
      // console.log("transform--->code", code);
      // console.log("transform--->id", id);
    },
    moduleParsed(moduleInfo) {
      console.log('moduleParsed--->moduleInfo', moduleInfo)
    },
    buildEnd() {
      console.log('buildEnd')
    },
    outputOptions(outputOptions) {
      console.log("outputOptions--->outputOptions", outputOptions);
    },
    // banner() {

    // },
    // renderChunk() {

    // },
    // augmentChunkHash() {
      
    // }
    // generateBundle(options, bundle) {
    //   console.log("generateBundle--->options", options);
    //   console.log("generateBundle--->bundle", bundle);
    // }
    writeBundle(options, bundle) {
      console.log("writeBundle--->options", options);
      console.log("writeBundle--->bundle", bundle);
    }
  }
}
