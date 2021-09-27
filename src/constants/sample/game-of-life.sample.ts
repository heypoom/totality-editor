export const GameOfLife = `
const SIZE = 30
const PADDING = 10

const CLEAR_COLOR = '#efefef'
const FILL_COLOR = '#badc58'

const ctx = canvas.getContext('2d')

const parse = (input: string) =>
  input.trim().split('\\n').map(line => line.split('').map(char => Number(char === 'O')))

const hsl = (i = 1, count = 8, s = 90, l = 60) =>
  \`hsl(\${i * Math.trunc(360 / count)}, \${s}%, \${l}%)\`

const range = (from: number, to: number): number[] => {
  const list: number[] = []
  for (let n = from; n < to; n++) list.push(n)

  return list
}

const setOpacity = (hex: string, alpha: number) => 
  \`\${hex}\${Math.floor(alpha * 255).toString(16).padStart(2, "0")}\`

const irange = (from: number, to: number) => range(from, to + 1)
const direction = irange(-1, 1)

function paintCell(row: number, col: number, style: string) {
  ctx.fillStyle = style
  ctx.fillRect((col * SIZE) + PADDING, (row * SIZE) + PADDING, SIZE, SIZE)
}

function clearBuffer(rows: number, cols: number, clearColor = CLEAR_COLOR) {
  for (const row of range(0, rows)) {
    for (const col of range(0, cols)) {
      paintCell(row, col, clearColor)
    }
  }
}


function draw(grid: number[][], style = FILL_COLOR) {
  for (const row of range(0, grid.length)) {
    for (const col of range(0, grid[0].length)) {
      const cell = grid[row][col]
      if (cell) paintCell(row, col, style)
    }
  }
}

ctx.fillStyle = CLEAR_COLOR
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Any live cell with fewer than two live neighbors dies, as if caused by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

class World {
  cells: number[][]
  future: number[][]

  // Store the frame snapshots
  snapshots: number[][][]

  frameDelay = 100

  constructor(cells: number[][]) {
    this.cells = cells
  }

  static fromText(text: string) {
    return new World(parse(text))
  }

  async computeCell(pos: [row: number, col: number]) {
    const [row, col] = pos
    let liveNeighbors = 0
  
    for (const r of direction) {
      if (!this.cells[row + r]) continue
  
      for (const c of direction) {
        const cell = this.cells[row + r][col + c]
        if (cell === undefined) continue
  
        // paintCell(row + r, col + c, cell ? '#f6e58d' : '#686de0') 
        // await delay(0)
        // paintCell(row, col, '#be2edd')
        // await delay(0)
  
        liveNeighbors += cell
      }
    }
  
    liveNeighbors -= this.cells[row][col]

    // Copy by default.
    // Cell is alive?
    if (this.cells[row][col]) {
      // Death by underpopulation OR overpopulation.
      const shouldBeDead = liveNeighbors < 2 || liveNeighbors > 3
      this.future[row][col] = Number(!shouldBeDead) 
    } else {
      // Live by reproduction.
      if (liveNeighbors === 3) this.future[row][col] = 1
    }
  
    // await tick() 
    // paintCell(row, col, this.future[row][col] === 1 ? '#badc58' : '#6ab04c')
  }

  async update() {
    // Make a copy.
    this.future = this.cells.map((_, row) => [...this.cells[row]])

    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[row].length; col++) {
        await this.computeCell([row, col])
      }
    }

    this.cells = this.future
  }

  async evolve(maxIteration = 1) {
    this.snapshots = []

    const maxRow = this.cells.length 
    const maxCol = this.cells[0].length

    for (let iteration = 0; iteration <= maxIteration; iteration++) {
      await this.update()

      clearBuffer(maxRow, maxCol)

      for (let s = 1; s <= this.snapshots.length; s++) {
        draw(this.snapshots[s - 1], setOpacity(FILL_COLOR, 0.05 * s))
      }

      draw(this.cells)

      await delay(this.frameDelay)

      // Insert new snapshots.
      this.snapshots.push(this.cells)

      // Remove the oldest snapshot.
      if (this.snapshots.length > 5) this.snapshots.shift()
    }
  }
}

// Any live cell with fewer than two live neighbors dies, as if caused by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

const pattern = \`
.O.............
..O............
OOO............
...............
........O......
.........O.....
.......OOO.....
...............
........O......
.........O.....
.......OOO.....
...............
.O.............
..O............
OOO............
...............
\`

async function main() {
  const world = World.fromText(pattern)
  world.frameDelay = 50

  await world.evolve(1000)
}

main()
`.trim()
