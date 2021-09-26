export const BrokenGameOfLife = `
const ctx = canvas.getContext('2d')

const parse = (input: string) =>
  input.trim().split('\n').map(line => line.split('').map(char => Number(char === '*')))

let TRACK = 0

const hsl = (i = 1, count = 8, s = 90, l = 60) =>
  \`hsl(\${i * Math.trunc(360 / count)}, \${s}%, \${l}%)\`

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
      paintCell(row, col, grid[row][col] ? '#eb4d4b' : '#ff7979')
    }
  }
}

ctx.fillStyle = '#2d2d30'
ctx.fillRect(0, 0, canvas.width, canvas.height)

// Any live cell with fewer than two live neighbors dies, as if caused by under population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

async function updateCell(pos: [row: number, col: number], grid: number[][]) {
  const [row, col] = pos
  let liveNeighbors = 0

  for (const r of direction) {
    if (!grid[row + r]) continue

    for (const c of direction) {
      const cell = grid[row + r][col + c]
      paintCell(row, col, '#be2edd')

      if (grid[row + r][col + c] === undefined) continue

      await delay(20)
      paintCell(row + r, col + c, cell ? '#f6e58d' : '#686de0')
      await delay(20)
      paintCell(row + r, col + c, cell ? '#f9ca24' : '#4834d4')

      liveNeighbors += cell
    }
  }

  liveNeighbors -= grid[row][col]

  // Cell is alive?
  if (grid[row][col]) {
    // Death by underpopulation OR overpopulation.
    const shouldBeDead = liveNeighbors < 2 || liveNeighbors > 3
    grid[row][col] = Number(!shouldBeDead) 
  } else {
    // Live by reproduction.
    if (liveNeighbors === 3) grid[row][col] = 1
  }

  delay(200)

  paintCell(row, col, grid[row][col] ? '#f9ca24' : '#4834d4')

  return grid
}

async function update(grid: number[][]) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      await updateCell([row, col], grid)
    }
  }
}

async function animate(grid, maxIter = 10) {
  for (let iter = 0; iter < maxIter; iter++) {
    draw(grid)
    await update(grid)
    await delay(200)
  }
}

const grid = parse(\`
.....
..*..
.*.*.
..*..
.....
\`)

async function main() {
  await draw(grid)
  await update(grid)
}

main()
`.trim()
