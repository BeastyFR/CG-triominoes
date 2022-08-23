import { Cell } from "./Cell";
import { CellStatus } from "./CellStatus";

describe("Cell", () =>
{
	it("The cell can be instantiated", () =>
	{
		let cell: Cell = new Cell(CellStatus.Empty);
		expect(cell.getState()).toBe(CellStatus.Empty);
	});

	it("Can change the State", () =>
	{
		let cell: Cell = new Cell(CellStatus.Empty);
		cell.setState(CellStatus.Hole);
		expect(cell.getState()).toBe(CellStatus.Hole);
	});
});
