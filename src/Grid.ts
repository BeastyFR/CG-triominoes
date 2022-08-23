import { TLSSocket } from "tls";
import { Cell } from "./Cell";
import { CellStatus } from "./CellStatus";

export class Grid
{
	length: number;
	grid: Cell[];

	constructor(length: number)
	{
		this.length = length;
		this.grid = [];
		for (let i = 0; i < this.length * this.length; i++)
			this.grid.push(new Cell(CellStatus.Empty));

	}

	getLength(): number
	{
		return this.length;
	}

	getCell(x, y): Cell
	{
		return this.grid[y * this.length + x];
	}

	displayCorner(): string
	{
		return '+';
	}

	displayHorizontalBorderBetween(cellTop: Cell, cellBottom: Cell): string
	{
		return "--"
	}

	displayVerticalBorderBetween(cellLeft: Cell, cellRight: Cell): string
	{
		return "|"
	}

	displayCellStatus(cell: Cell): string
	{
		if (cell.getState() == CellStatus.Unfillable)
			return "##";
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
				line2 += this.displayVerticalBorderBetween(this.getCell(x, y - 1), this.getCell(x, y)) + this.displayCellStatus(this.getCell(x, y));
			}

			line1 += "+$";
			line2 += "|$"
			result += line1 + line2;
		}

		result += this.displayEndingLine();

		return result;

	}

}