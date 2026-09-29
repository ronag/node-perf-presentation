// Benchmark: the containers from intrusive-containers.mjs, with cold caches.
// LISTS independent containers of N items each, allocated round-robin so one
// list's items and nodes are spread across the heap. Every operation removes and
// re-adds a random item of a random list; with enough lists the working set is
// far larger than L3, so each operation starts from cold memory (LISTS=1: hot).
// No forced GCs: a plain timed loop, median of 5 runs after a warm-up.
// Usage: TYPE=array|intrusive-array|intrusive-list|set|wrapper-list N=30 LISTS=100000
const TYPE = process.env.TYPE ?? 'array'
const N = Number(process.env.N ?? 30)
const LISTS = Number(process.env.LISTS ?? 100_000)
const OPS = Number(process.env.OPS ?? 1_000_000)

const kIndex = Symbol('index')
const kPrev = Symbol('prev')
const kNext = Symbol('next')

class IntrusiveArray {
  items = []
  add (item) { item[kIndex] = this.items.length; this.items.push(item) }
  remove (item) {
    const idx = item[kIndex]
    const last = this.items.pop()
    if (last !== item) { this.items[idx] = last; last[kIndex] = idx }
    item[kIndex] = -1
  }
}

class IntrusiveList {
  head = null
  tail = null
  add (item) {
    item[kPrev] = this.tail
    item[kNext] = null
    if (this.tail) this.tail[kNext] = item
    else this.head = item
    this.tail = item
  }
  remove (item) {
    const prev = item[kPrev], next = item[kNext]
    if (prev) prev[kNext] = next
    else this.head = next
    if (next) next[kPrev] = prev
    else this.tail = prev
    item[kPrev] = null
    item[kNext] = null
  }
}

class WrapperList {
  head = null
  tail = null
  nodes = new Map()   // item → node
  add (item) {
    const node = { value: item, prev: this.tail, next: null }
    if (this.tail) this.tail.next = node
    else this.head = node
    this.tail = node
    this.nodes.set(item, node)
  }
  remove (item) {
    const node = this.nodes.get(item)
    if (node.prev) node.prev.next = node.next
    else this.head = node.next
    if (node.next) node.next.prev = node.prev
    else this.tail = node.prev
    this.nodes.delete(item)
  }
}

class SetContainer {
  items = new Set()
  add (item) { this.items.add(item) }
  remove (item) { this.items.delete(item) }
}

class ArrayContainer {
  items = []
  add (item) { this.items.push(item) }
  remove (item) { this.items.splice(this.items.indexOf(item), 1) }
}

const Ctor = { array: ArrayContainer, 'intrusive-array': IntrusiveArray, 'intrusive-list': IntrusiveList, set: SetContainer, 'wrapper-list': WrapperList }[TYPE]
if (!Ctor) throw new Error(`unknown TYPE ${TYPE}`)

const lists = Array.from({ length: LISTS }, () => new Ctor())
const flat = new Array(N * LISTS)
for (let i = 0; i < N; i++) {
  for (let l = 0; l < LISTS; l++) {
    const item = {}
    flat[l * N + i] = item
    lists[l].add(item)
  }
}

// A random visiting order over (list, item) pairs (deterministic LCG)
const order = new Uint32Array(1 << 20)
let seed = 1
for (let i = 0; i < order.length; i++) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  order[i] = seed % (N * LISTS)
}

function runOnce (ops) {
  const t0 = performance.now()
  for (let i = 0; i < ops; i++) {
    const v = order[i & (order.length - 1)]
    const list = lists[(v / N) | 0]
    const item = flat[v]
    list.remove(item)
    list.add(item)
  }
  return ((performance.now() - t0) * 1e6) / ops
}

runOnce(OPS / 5)   // warm up: JIT and caches
const runs = Array.from({ length: 5 }, () => runOnce(OPS)).sort((a, b) => a - b)
const heap = process.memoryUsage().heapUsed / 2 ** 20
console.log(`${TYPE.padEnd(16)} N=${N} LISTS=${LISTS}  ${runs[2].toFixed(1).padStart(7)} ns/op  [${runs[0].toFixed(1)}–${runs[4].toFixed(1)}]  heap ${heap.toFixed(0)} MiB`)
