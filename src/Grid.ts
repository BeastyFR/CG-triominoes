import { format } from "path";
import { Cell } from "./Cell";
import { CellStatus } from "./CellStatus";
import { SubGrid, SubGridPlace } from "./SubGrid";

export class Grid
{
	length: number;
	grid: Cell[];
	nextTriominoId = 0;

	constructor(length: number)
	{
		this.length = length;
		this.grid = this.generateGridOfEmptyCell(length);
	}

	generateGridOfEmptyCell(length): Cell[]
	{
		return [...new Array<Cell>(length * length)].map((x, index) =>
		{
			return new Cell(CellStatus.Empty, this.getXCoordinateWithIndex(index), this.getYCoordinateWithIndex(index));
		});
	}

	getLength(): number
	{
		return this.length;
	}

	getXCoordinateWithIndex(index)
	{
		return index % this.length;
	}

	getYCoordinateWithIndex(index)
	{
		return Math.trunc(index / this.length);
	}

	getCell(x, y): Cell | null
	{
		if (x < 0 || x >= this.length || y < 0 || y >= this.length) return null;
		return this.grid[y * this.length + x];
	}

	displayCorner(): string
	{
		return "+";
	}

	displayHorizontalBorderBetween(cellTop: Cell, cellBottom: Cell): string
	{
		if (cellTop && cellTop.isTriomino() && cellTop.idOfTriomino == cellBottom.idOfTriomino) return "  ";
		return "--";
	}

	displayVerticalBorderBetween(cellLeft: Cell, cellRight: Cell): string
	{
		if (cellLeft && cellLeft.isTriomino() && cellLeft.idOfTriomino == cellRight.idOfTriomino) return " ";
		return "|";
	}

	displayCellStatus(cell: Cell): string
	{
		if (cell.getState() == CellStatus.Unfillable) return "##";
		if (cell.getState() == CellStatus.Hole) return "OO";
		return "  ";
	}

	displayEndingLine(): string
	{
		return "+--".repeat(this.length) + "+";
	}

	display(): string
	{
		let result = "";
		for (let y = 0; y < this.length; y++)
		{
			let line1 = "";
			let line2 = "";

			for (let x = 0; x < this.length; x++)
			{
				line1 += this.displayCorner() + this.displayHorizontalBorderBetween(this.getCell(x, y - 1), this.getCell(x, y));
				line2 +=
					this.displayVerticalBorderBetween(this.getCell(x - 1, y), this.getCell(x, y)) +
					this.displayCellStatus(this.getCell(x, y));
			}

			line1 += "+$";
			line2 += "|$";
			result += line1 + line2;
		}

		result += this.displayEndingLine();

		return result;
	}

	solve()
	{
		this.solvePartOfGrid(new SubGrid(this.length, 0, 0, SubGridPlace.FullSize));
	}

	createTriomino(arrayOfCell: Cell[])
	{
		if (arrayOfCell.length != 3) throw "Not enough cells to create a Triomino";
		let triominoId = this.nextTriominoId++;

		arrayOfCell.map(cell =>
		{
			cell.idOfTriomino = triominoId;
			cell.state = CellStatus.Triomino;
		});
	}

	addHoleInOppositeDirection(subGrid: SubGrid): void
	{
		let holeX, holeY;
		switch (subGrid.place)
		{
			case SubGridPlace.TopLeft:
				holeX = subGrid.offsetX + subGrid.lengthOfSubGridToSolve - 1;
				holeY = subGrid.offsetY + subGrid.lengthOfSubGridToSolve - 1;
				this.getCell(holeX, holeY).state = CellStatus.Hole;
				console.error(`adding Hole in Grid of ${holeX} ${holeY}`);
				break;

			case SubGridPlace.TopRight:
				holeX = subGrid.offsetX;
				holeY = subGrid.offsetY + subGrid.lengthOfSubGridToSolve - 1;
				this.getCell(holeX, holeY).state = CellStatus.Hole;
				console.error(`adding Hole in Grid of ${holeX} ${holeY}`);

				break;
			case SubGridPlace.BottomLeft:
				holeX = subGrid.offsetX + subGrid.lengthOfSubGridToSolve - 1;
				holeY = subGrid.offsetY;
				this.getCell(holeX, holeY).state = CellStatus.Hole;
				console.error(`adding Hole in Grid of ${holeX} ${holeY}`);

				break;
			case SubGridPlace.BottomRight:
				holeX = subGrid.offsetX;
				holeY = subGrid.offsetY;
				this.getCell(holeX, holeY).state = CellStatus.Hole;
				console.error(`adding Hole in Grid of ${holeX} ${holeY}`);

				break;
			default:
				console.error(`adding no Hole in Grid`);
				break;
		}
	}

	areTwoCellConnex(cell1: Cell, cell2: Cell)
	{
		if (cell1.x == cell2.x && (cell1.y == cell2.y + 1 || cell1.y == cell2.y - 1)) return true;
		if (cell1.y == cell2.y && (cell1.x == cell2.x + 1 || cell1.x == cell2.x - 1)) return true;

		return false;
	}

	getConnexCells(arrayOfCells: Cell[])
	{
		let resultArray = [];
		for (let currentCell of arrayOfCells)
		{
			let foundConnex = false;
			for (let otherCell of arrayOfCells)
			{
				if (this.areTwoCellConnex(currentCell, otherCell))
				{
					foundConnex = true;
				}
			}

			if (foundConnex)
			{
				resultArray.push(currentCell);
			}
		}
		return resultArray;
	}

	solve2x2Grid(subGrid: SubGrid): void
	{
		let arrayOfCell = this.getCellsWithAStatusInSubgrid(subGrid, CellStatus.Empty);
		this.createTriomino(arrayOfCell);
	}

	solveNxNGrid(subGrid: SubGrid): void
	{
		this.solvePartOfGrid(subGrid.getSubGrid(SubGridPlace.TopLeft));
		this.solvePartOfGrid(subGrid.getSubGrid(SubGridPlace.TopRight));
		this.solvePartOfGrid(subGrid.getSubGrid(SubGridPlace.BottomLeft));
		this.solvePartOfGrid(subGrid.getSubGrid(SubGridPlace.BottomRight));

		let arrayOfCell = this.getCellsWithAStatusInSubgrid(subGrid, CellStatus.Hole);
		arrayOfCell = this.getConnexCells(arrayOfCell);

		this.createTriomino(arrayOfCell);
	}

	solveSubGrid(subGrid: SubGrid): void
	{
		if (subGrid.lengthOfSubGridToSolve == 2)
			this.solve2x2Grid(subGrid);
		else
			this.solveNxNGrid(subGrid);
	}

	solvePartOfGrid(subGrid: SubGrid)
	{
		let cellWithHole: Cell = this.findHole(subGrid);
		if (!cellWithHole)
			this.addHoleInOppositeDirection(subGrid);

		this.solveSubGrid(subGrid);
	}

	findHole(subGrid: SubGrid): Cell | null
	{
		let arrayOfUnfillable = this.getCellsWithAStatusInSubgrid(subGrid, CellStatus.Unfillable);
		if (arrayOfUnfillable.length > 0) return arrayOfUnfillable[0];

		let arrayOfHoles = this.getCellsWithAStatusInSubgrid(subGrid, CellStatus.Hole);
		if (arrayOfHoles.length > 0) return arrayOfHoles[0];

		return null;
	}

	getCellsWithAStatusInSubgrid(subGrid: SubGrid, status: CellStatus): Cell[]
	{
		let arrayOfCells = [];
		for (let x = subGrid.offsetX; x < subGrid.offsetX + subGrid.lengthOfSubGridToSolve; x++)
		{
			for (let y = subGrid.offsetY; y < subGrid.offsetY + subGrid.lengthOfSubGridToSolve; y++)
			{
				let cellToCheck: Cell = this.getCell(x, y);
				if (cellToCheck.getState() == status)
				{
					arrayOfCells.push(cellToCheck);
				}
			}
		}
		return arrayOfCells;
	}
}
