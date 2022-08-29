import { CellStatus } from "./CellStatus";
import { Grid } from "./Grid";

export function run()
{
	/**
   * Auto-generated code below aims at helping you parse
   * the standard input according to the problem statement.
   **/

	const n = Math.pow(2, parseInt(readline()));
	var inputs = readline().split(' ');
	const x = parseInt(inputs[0]);
	const y = parseInt(inputs[1]);

	let grid: Grid = new Grid(n);
	console.error(`N : ${n} | X : ${x} | Y : ${y}`);
	grid.getCell(x, y).setState(CellStatus.Unfillable);

	grid.solve();
	const gridDisplayAsString = grid.display();

	const gridDisplayArray = gridDisplayAsString.split('$');
	for (const line of gridDisplayArray)
	{
		console.log(line);
	}
}
