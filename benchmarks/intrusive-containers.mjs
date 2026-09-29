// Benchmark: Intrusive unordered array vs linked list vs normal array
// Measures remove + re-add of a random item on pre-filled containers (N=10000, or N=… from the env).
//
// The item changes every iteration (a precomputed random order). Removing and
// re-adding the *same* item every iteration would benchmark a V8 Map/Set
// pathology instead (see map-same-key.mjs): the wrapper-node list's Map
// lookup becomes O(n) and dominates everything.
import { run, bench, group, summary, do_not_optimize } from 'mitata'

const N = Number(process.env.N ?? 10000)

const kIndex = Symbol('index')
const kPrev = Symbol('prev')
const kNext = Symbol('next')

// --- Intrusive unordered array (swap-remove) ---
class IntrusiveArray {
  items = []
  add(item) {
    item[kIndex] = this.items.length
    this.items.push(item)
  }
  remove(item) {
    const idx = item[kIndex]
    const last = this.items.pop()
    if (last !== item) {
      this.items[idx] = last
      last[kIndex] = idx
    }
    item[kIndex] = -1
  }
}

// --- Intrusive doubly linked list ---
class LinkedList {
  head = null
  tail = null
  add(item) {
    item[kPrev] = this.tail
    item[kNext] = null
    if (this.tail) this.tail[kNext] = item
    else this.head = item
    this.tail = item
  }
  remove(item) {
    const prev = item[kPrev]
    const next = item[kNext]
    if (prev) prev[kNext] = next
    else this.head = next
    if (next) next[kPrev] = prev
    else this.tail = prev
    item[kPrev] = null
    item[kNext] = null
  }
}

// --- Non-intrusive linked list (wrapper nodes + Map for O(1) lookup) ---
class WrapperLinkedList {
  head = null
  tail = null
  nodeMap = new Map() // item → node
  add(item) {
    const node = { value: item, prev: this.tail, next: null }
    if (this.tail) this.tail.next = node
    else this.head = node
    this.tail = node
    this.nodeMap.set(item, node)
  }
  remove(item) {
    const node = this.nodeMap.get(item)
    if (!node) return
    if (node.prev) node.prev.next = node.next
    else this.head = node.next
    if (node.next) node.next.prev = node.prev
    else this.tail = node.prev
    this.nodeMap.delete(item)
    // node becomes garbage → GC
  }
}

// --- Set (what most people reach for) ---
class SetContainer {
  items = new Set()
  add(item) { this.items.add(item) }
  remove(item) { this.items.delete(item) }
}

// --- Normal array (indexOf + splice) ---
class NormalArray {
  items = []
  add(item) { this.items.push(item) }
  remove(item) {
    const idx = this.items.indexOf(item)
    if (idx !== -1) this.items.splice(idx, 1)
  }
}

// Pre-create items and a random visiting order (deterministic LCG)
const items = Array.from({ length: N }, () => ({}))
const order = new Uint32Array(1 << 16)
let seed = 1
for (let i = 0; i < order.length; i++) {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  order[i] = seed % N
}

// Pre-fill containers
const ia = new IntrusiveArray()
const ll = new LinkedList()
const wl = new WrapperLinkedList()
const sc = new SetContainer()
const na = new NormalArray()
for (const item of items) { ia.add(item); ll.add(item); wl.add(item); sc.add(item); na.add(item) }

summary(() => {
  group(`remove + re-add a random item (N=${N})`, () => {
    let a = 0
    bench('intrusive array (swap-remove)', () => {
      const item = items[order[a++ & 0xffff]]
      ia.remove(item)
      ia.add(item)
      do_not_optimize(ia.items.length)
    }).gc('inner')

    let b = 0
    bench('intrusive linked list', () => {
      const item = items[order[b++ & 0xffff]]
      ll.remove(item)
      ll.add(item)
      do_not_optimize(ll.tail)
    }).gc('inner')

    let c = 0
    bench('Set (delete + add)', () => {
      const item = items[order[c++ & 0xffff]]
      sc.remove(item)
      sc.add(item)
      do_not_optimize(sc.items.size)
    }).gc('inner')

    let d = 0
    bench('linked list (wrapper nodes + Map)', () => {
      const item = items[order[d++ & 0xffff]]
      wl.remove(item)
      wl.add(item)
      do_not_optimize(wl.nodeMap.size)
    }).gc('inner')

    let e = 0
    bench('array (indexOf + splice)', () => {
      const item = items[order[e++ & 0xffff]]
      na.remove(item)
      na.add(item)
      do_not_optimize(na.items.length)
    }).gc('inner')
  })
})

await run()
