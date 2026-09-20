function create_gameboard()
{
  let gameboard = new Array();
  
  for (let i = 0; i < 9; i++)
    gameboard.push(create_cell());

  return gameboard;
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


gameboard = create_gameboard();

