let height, width, mines

const startGame = () => {
  height = document.getElementById('height').value
  width =  document.getElementById('width').value
  mines =  document.getElementById('mines').value
  
  console.log(`Hello: ${height}, ${width}, ${mines}`)
  
  menu = document.getElementById('startMenu').remove()
  
  const gameBoard = document.getElementById('gameBoard')
  
  for(let row = 0; row < height; row++){
    let div = document.createElement('div')
    div.className = 'columns'
    div.id = `row${row + 1}`
    
    gameBoard.append(div)
    
    for(let col = 0; col < width; col++){
      let column = document.createElement('div')
      column.className = 'column is-narrow'
      column.id = `column${col + 1}`
      column.style.color = 'black'

      let currentRow = document.getElementById(`row${row + 1}`)
      currentRow.append(column)
    }
  }

  let board = placeRadii(placeMines(initMap(height, width)))
  printBoard(board)
  render(board)
}

const initMap = () => {
  let board = []
  for(let i = 0; i < height; i++){
    let line = []
    for(let j = 0; j < width; j++){
      line.push(0)
    }
    board.push(line)
  }
  return board
}

const placeMines = (board) => {
  for(let i = 0; i < mines; i++){
    let ranX = Math.floor(Math.random() * width)
    let ranY = Math.floor(Math.random() * height)
    if(board[ranY][ranX] != -1){
      board[ranY][ranX] = -1
    }
  }
  return board
}

const placeRadii = (board) => {
  for(let i = 0; i < height; i++){
    for(let j = 0; j < width; j++){
      if(board[i][j] != -1){
        board[i][j] = checkNeighbors(board, i, j)
      }
    }
  }
  return board
}

const checkNeighbors = (board, x, y) => {
  let count = 0
/*
 *  [][   ][]
 *  [][x,y][]
 *  [][   ][]
 */
  //top left
  if(x > 0 && y > 0){
    if(isMine(board, x-1, y-1)) count++
  }
  //top mid
  if(y > 0){
    if(isMine(board, x, y-1)) count++
  }
  //top right
  if(x < width-1 && y > 0){
    if(isMine(board, x+1, y-1)) count++
  }
  //mid left
  if(x > 0){
    if(isMine(board, x-1, y)) count++
  }
  //mid right
  if(x < width-1){
    if(isMine(board, x+1, y)) count++
  }
  //bot left 
  if(x > 0 && y < height-1){
    if(isMine(board, x-1, y+1)) count++
  }
  //bot mid 
  if(y < height-1){
    if(isMine(board, x, y+1)) count++
  }
  //bot right
  if(x < width-1 && y < height-1){
    if(isMine(board, x+1, y+1)) count++
  }
  return count
}

const isMine = (board, x, y) => {
  if(board[x][y] == -1){
    return true
  }else{
    return false
  }
}

const printBoard = (board) => {
  let out = ''
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      out += `[${board[i][j]}]`
    }
    out+= '\n'
  }
  console.log(out)
}

const render = (board) => {
  for(let i = 0; i < board.length; i++){
    let row = document.getElementById(`row${i+1}`)
    for(let j = 0; j < board[i].length; j++){
      let imgCont = document.createElement('figure')
      imgCont.className = 'image is-16x16'
      imgCont.id = `${i}b${j}`
      //let cell = row.getElementsByClassName(`column`)[j]
      //cell.appendChild(imgCont)
      let img = document.createElement('img')

      if(board[i][j] !== -1){
        img.src = `assets/${board[i][j]}.png` 
      }else{ 
        img.src = 'assets/mine.png';
      }
      imgCont.appendChild(img)
      let cell = row.getElementsByClassName(`column`)[j]
      cell.appendChild(imgCont)
    }
  }
}

const remmove = () => {
  this.parentElement.removeChild(this)
}
