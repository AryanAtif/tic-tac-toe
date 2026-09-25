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
    if (gameboard[0][i] == symbol)
    {
      if (check_neighbors_x(0, i, symbol)) return true;
      if (check_neighbors_y(0, i, symbol)) return true;
    }
  }
  for (let i = 0; i < 3; i++) // The second col.
  {
    if (gameboard[i][1] == symbol)
    {
      if (check_neighbors_x(i, 1, symbol)) return true;
      if (check_neighbors_y(i, 1, symbol)) return true;
    }
  }
  if (check_diagonal(1, 1, symbol)) return true;
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
  if (gameboard[row][neighbor1] === symbol && gameboard[row][neighbor2] === symbol) return true;
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
  if (gameboard[neighbor1][col] === symbol && gameboard[neighbor2][col] === symbol) return true;
}

function check_diagonal (row, col, symbol)
{
  let neighbor1 = -1;
  let neighbor2 = +1;
  if (gameboard[row + neighbor1][col + neighbor1] === symbol && gameboard[row + neighbor2][col + neighbor2] === symbol) return true;
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
  gameboard = create_gameboard();
  player1 = create_player();
  player2 = create_player();
  let cell_marked = 0;
  
  while(cell_marked <= 9)
  {
    if (!player1.is_last_player()) // player1 should be the first player
    {
      let row = prompt("Choose the row to place your O, player1");
      let col = prompt("Choose the col to place your O, player1");
      var gameboard_row = gameboard[row];
      gameboard_row[col].set_cell("O");

      player1.mark_played();
      player2.mark_not_played();
      cell_marked++;
    }
    else
    {
      let row = prompt("Choose the row to place your X, player2");
      let col = prompt("Choose the col to place your O, player2");
      
      var gameboard_row = gameboard[row];
      gameboard_row[col].set_cell("X");
      
      player2.mark_played();
      player1.mark_not_played();
      cell_marked++;
    }
  }

}

