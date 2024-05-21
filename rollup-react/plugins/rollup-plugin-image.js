import { readFileSync } from 'fs'
import { extname } from 'path'
import { createFilter } from '@rollup/pluginutils'
import svgToMiniDataURI from 'mini-svg-data-uri'
const getDataUri = ({ format, isSvg, mime, source }) =>
  isSvg ? svgToMiniDataURI(source) : `data:${mime};${format},${source}`

const domTemplate = ({ dataUri }) => `
  var img = new Image();
  img.src = "${dataUri}";
  export default img;
`

const constTemplate = ({ dataUri }) => `
  var img = "${dataUri}";
  export default img;
`
export default function image(opts = {}) {
  const filter = createFilter(opts.include, opts.exclude)

  return {
    name: 'image',
    load(id) {
      if (!filter(id)) return null
      const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
      }
      const mime = mimeTypes[extname(id)]
      if (!mime) {
        return null
      }
      const isSvg = mime === mimeTypes['.svg']
      const format = isSvg ? 'utf-8' : 'base64'
      const source = readFileSync(id, format).replace(/[\r\n]+/gm, '')
      const dataUri = getDataUri({ format, isSvg, mime, source })
      const code = opts.dom
        ? domTemplate({ dataUri })
        : constTemplate({ dataUri })
      return code.trim()
    },
  }
}
