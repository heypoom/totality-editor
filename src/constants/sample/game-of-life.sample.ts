export const BrokenGameOfLife = `
const ctx = canvas.getContext('2d')

const parse = (input: string) =>
  input.trim().split('\n').map(line => line.split('').map(char => Number(char === '*')))

const range = (from: number, to: number): number[] => {
  const list: number[] = []
  for (let n = from; n < to; n++) list.push(n)

  return list
}

const irange = (from: number, to: number) => range(from, to + 1)
const direction = irange(-1, 1)

const SIZE = 50
const PADDING = 80

function paintCell(row: number, col: number, style: string) {
  ctx.fillStyle = style
  ctx.fillRect((col * SIZE) + PADDING, (row * SIZE) + PADDING, SIZE, SIZE)
}

function draw(grid: number[][]) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      // paintCell(row, col, grid[row][col] ? '#eb4d4b' : '#ff7979')
      paintCell(row, col, grid[row][col] === 1 ? '#badc58' : '#6ab04c')
    }
  }
}

ctx.fillStyle = '#2d2d30'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Any live cell with fewer than two live neighbors dies, as if caused by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

class World {
  cells: number[][]
  future: number[][]

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
  
        // await tick() 
        
        // paintCell(row + r, col + c, cell ? '#f6e58d' : '#686de0') 
        // paintCell(row, col, '#be2edd')
  
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
  
    paintCell(row, col, this.future[row][col] === 1 ? '#badc58' : '#6ab04c')

    await tick() 
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
    for (let iteration = 0; iteration <= maxIteration; iteration++) {
      await this.update() 
      await draw(this.cells)
    }
  }
}

// Any live cell with fewer than two live neighbors dies, as if caused by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

const pattern = \`
.....
.....
.***.
.....
.....
\`

async function main() {
  const world = World.fromText(pattern)

  await draw(world.cells)
  await world.evolve(1000)
}

main()
`.trim()
