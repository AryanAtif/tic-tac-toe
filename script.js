function create_gameboard()
{
  let grid = new Array();
  
  for (let i = 0; i < 3; i++)
  {
    let row = new Array();

    for (let j = 0; j < 3; j++)
    {
      row.push(create_cell());
    }
    grid.push(row);
  }
  
 return grid;
}
function check_game_state(symbol)
{
  for (let i = 0; i < 3; i++) // The first row.
  {
    if (gameboard[0][i].get_cell() === symbol)
    {
      if (neighbors_x(0, i, symbol)) return true;
      if (neighbors_y(0, i, symbol)) return true;
    }
  }
  for (let i = 0; i < 3; i++) // The second col.
  {
    if (gameboard[i][1].get_cell() === symbol)
    {
      if (neighbors_x(i, 1, symbol)) return true;
      if (neighbors_y(i, 1, symbol)) return true;
    }
  }
  if (gameboard[1][1].get_cell() === symbol && diagonal(1, 1, symbol)) return true;
}

function neighbors_x (row, col, symbol)
{
  let neighbor1 = undefined;
  let neighbor2 = undefined;
  if (col === 0)
  {
    neighbor1 = 1;
    neighbor2 = 2;
  }
  else if (col === 1)
  {
    neighbor1 = 0;
    neighbor2 = 2;
  }
  else 
  {
    neighbor1 = 0;
    neighbor2 = 1;
  }
  if (gameboard[row][neighbor1].get_cell() === symbol && gameboard[row][neighbor2].get_cell() === symbol) return true;
}

function neighbors_y (row, col, symbol)
{
  let neighbor1 = undefined;
  let neighbor2 = undefined;
  if (row === 0)
  {
    neighbor1 = 1;
    neighbor2 = 2;
  }
  else if (row === 1)
  {
    neighbor1 = 0;
    neighbor2 = 2;
  }
  else 
  {
    neighbor1 = 0;
    neighbor2 = 1;
  }
  if (gameboard[neighbor1][col].get_cell() === symbol && gameboard[neighbor2][col].get_cell() === symbol) return true;
}

function diagonal (row, col, symbol)
{
  if (gameboard[0][0].get_cell() === symbol && gameboard[2][2].get_cell() === symbol) return true;
  else if (gameboard[0][2].get_cell() === symbol && gameboard[2][0].get_cell() === symbol) return true;
}



function  create_cell ()
{
  let value = 0; // 0 = NULL, O = O, X = X 

  function set_cell (input_value) 
  {
    if (input_value == "o" || input_value == "O")
    {
      value = "O";
    }
    else if (input_value == "x" || input_value == "X")
    {
      value = "X";
    }
  }

  function get_cell()
  {
    return value;
  } 
  return {set_cell, get_cell};
}

function create_player()
{
  let last_played = false;

  let score = 0;
  
  function inc_score () {score++};
  function get_score ()  {return score};
  
  function is_last_player () { return last_played; } 
  function mark_played ()  {last_played = true;}
  function mark_not_played () {last_played = false;}

  return {inc_score, get_score, is_last_player, mark_played, mark_not_played};
}

function init()
{
  init_gui();

  gameboard = create_gameboard();
  player1 = create_player();
  player2 = create_player();
  let cell_marked = 0;
 
  let turns_played = 0;
  while(turns_played < 9)
  {
    get_clicked_cell();
    if (check_game_state("O")) break;
    else if (check_game_state("X")) break;
    turns_played++;
  }
}

function get_clicked_cell()
{
  cells.addEventListener("click", () =>
  {
    let i = this.id / 10;
    let j = this.id % 10;
    gameboard[i][j].set_cell("O");
    console.log(gameboard[i][j].get_cell());
  });
}

function init_gui()
{
  const main_container = document.createElement("div");
  main_container.setAttribute("class", "main_container");
  document.body.appendChild(main_container);
  
  const game_container = document.createElement("div");
  game_container.setAttribute("class", "game_container");
  main_container.appendChild(game_container);

  const sidebar = document.createElement("div");
  sidebar.setAttribute("class", "sidebar");
  game_container.appendChild(sidebar);
  
  const gameboard = document.createElement("div");
  gameboard.setAttribute("class", "gameboard");
  game_container.appendChild(gameboard);

  create_grid();
}

function create_grid()
{
  const gameboard = document.querySelector(".gameboard");

  for (let i = 0; i < 3; i++)
  {
    let row = new Array();
    for (let j = 0; j < 3; j++)
    {
      const new_cell = document.createElement("div");
      new_cell.setAttribute("class", "cell");
      new_cell.setAttribute("id", i + j);

      gameboard.appendChild(new_cell);
      row.push(new_cell);
    }
    cells.push(row);
  }
}

let cells = new Array();
init();

