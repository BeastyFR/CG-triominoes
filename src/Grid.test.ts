import { CellStatus } from "./CellStatus";
import { Grid } from "./Grid";

describe("Grid", () =>
{
	it("it should generate a grid  of n*n", () =>
	{
		let grid: Grid = new Grid(2);
		expect(grid.getLength()).toBe(2);
	});

	it("every Cell should be accessible", () =>
	{
		let sizeOfGrid = 3;
		let grid: Grid = new Grid(sizeOfGrid);
		for (let x = 0; x < sizeOfGrid; x++)
		{
			for (let y = 0; y < sizeOfGrid; y++)
			{
				expect(grid.getCell(x, y).getState() == CellStatus.Empty);
			}
		}
	});

	it("should be change a Cell State", () =>
	{
		let sizeOfGrid = 3;
		let grid: Grid = new Grid(sizeOfGrid);
		grid.getCell(1, 2).setState(CellStatus.Unfillable);
		expect(grid.getCell(1, 2).getState()).toBe(CellStatus.Unfillable);
	});

	it("A 1x1 Grid is displayed correctly", () =>
	{
		let grid: Grid = new Grid(1);
		expect(grid.display()).toBe("+--+$|  |$+--+");
	});

	it("A 2x2 Grid is displayed correctly", () =>
	{
		let grid: Grid = new Grid(2);
		expect(grid.display()).toBe("+--+--+$|  |  |$+--+--+$|  |  |$+--+--+");
	});

	it("A 3x3 Grid is displayed correctly", () =>
	{
		let grid: Grid = new Grid(3);
		expect(grid.display()).toBe("+--+--+--+$|  |  |  |$+--+--+--+$|  |  |  |$+--+--+--+$|  |  |  |$+--+--+--+");
	});

	it("A 3x3 Grid with Hole is displayed correctly", () =>
	{
		let grid: Grid = new Grid(3);
		grid.getCell(1, 1).setState(CellStatus.Unfillable);
		expect(grid.display()).toBe("+--+--+--+$|  |  |  |$+--+--+--+$|  |##|  |$+--+--+--+$|  |  |  |$+--+--+--+");
	});

});

/*
+--+--+--+--+
|  |  |  |  |
+--+--+--+--+
|##|  |  |  |
+--+--+--+--+
|  |  |  |  |
+--+--+--+--+
|  |  |  |  |
+--+--+--+--+
*/
