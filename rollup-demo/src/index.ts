import { getRandom } from './utils'

console.log(getRandom(1, 5))
const a: number = 1;

Promise.resolve(a).then((res) => {
  console.log(res)
})
