import { groupEnd } from "console";
import { CellStatus } from "./CellStatus";
import { Grid } from "./Grid";
import { SubGrid } from "./SubGrid";

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
				expect(grid.getCell(x, y).getState()).toBe(CellStatus.Empty);
				expect(grid.getCell(x, y).x).toBe(x);
				expect(grid.getCell(x, y).y).toBe(y);

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

	it("A 2x2 Grid can be solved if there is a hole", () =>
	{
		let grid: Grid = new Grid(2);
		grid.getCell(1, 1).setState(CellStatus.Unfillable);
		grid.solve();

		expect(grid.getCell(0, 0).idOfTriomino).toBe(0);
		expect(grid.getCell(1, 0).idOfTriomino).toBe(0);
		expect(grid.getCell(0, 1).idOfTriomino).toBe(0);
		expect(grid.getCell(1, 1).idOfTriomino).toBe(-1);

		let arrayOfEmptyCells = grid.getCellsWithAStatusInSubgrid(new SubGrid(2, 0, 0), CellStatus.Triomino);
		expect(arrayOfEmptyCells.length).toBe(3);

		expect(grid.display()).toBe("+--+--+$|     |$+  +--+$|  |##|$+--+--+");
	});

	it("Ability to get Empty Cells ", () =>
	{
		let grid: Grid = new Grid(2);

		grid.getCell(1, 1).setState(CellStatus.Unfillable);
		let arrayOfEmptyCells = grid.getCellsWithAStatusInSubgrid(new SubGrid(2, 0, 0), CellStatus.Empty);
		arrayOfEmptyCells.map((cell) => { expect(cell.getState()).toBe(CellStatus.Empty) });
		expect(arrayOfEmptyCells.length).toBe(3);
	});

	it("Ability to create a Triomino", () =>
	{
		let grid: Grid = new Grid(2);
		let arrayOfCellForTheTriomino = [];
		arrayOfCellForTheTriomino.push(grid.getCell(0, 0), grid.getCell(1, 0), grid.getCell(0, 1));
		grid.createTriomino(arrayOfCellForTheTriomino);

		expect(grid.getCell(0, 0).idOfTriomino).toBe(0);
		expect(grid.getCell(1, 0).idOfTriomino).toBe(0);
		expect(grid.getCell(0, 1).idOfTriomino).toBe(0);
		expect(grid.getCell(1, 1).idOfTriomino).toBe(-1);
	});


	it("Ability to create a Triomino in a 3x3", () =>
	{
		let grid: Grid = new Grid(3);
		let arrayOfCellForTheTriomino = [];
		arrayOfCellForTheTriomino.push(grid.getCell(1, 1), grid.getCell(1, 0), grid.getCell(1, 2));
		grid.createTriomino(arrayOfCellForTheTriomino);

		expect(grid.getCell(1, 1).idOfTriomino).toBe(0);
		expect(grid.getCell(1, 0).idOfTriomino).toBe(0);
		expect(grid.getCell(1, 2).idOfTriomino).toBe(0);
		expect(grid.getCell(2, 2).idOfTriomino).toBe(-1);
	});

	it("Ability to Find no hole in a 2x2", () =>
	{
		let grid: Grid = new Grid(2);
		let cellWithHole = grid.findHole(new SubGrid(2, 0, 0))
		expect(cellWithHole).toBe(null);
	});

	it("Ability to Find a hole in a 2x2 grid bottom right", () =>
	{
		let grid: Grid = new Grid(2);
		grid.getCell(1, 1).setState(CellStatus.Unfillable);
		let cellWithHole = grid.findHole(new SubGrid(2, 0, 0))
		expect(cellWithHole.getState()).toBe(CellStatus.Unfillable);
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
