import { CellStatus } from "./CellStatus";

export class Cell
{
	state: CellStatus;
	x: number;
	y: number;
	idOfTriomino: number = -1;

	constructor(state: CellStatus, x: number, y: number)
	{
		this.state = state;
		this.x = x;
		this.y = y;
	}

	getState(): CellStatus
	{
		return this.state;
	}

	setState(state: CellStatus): void
	{
		this.state = state;
	}

	isTriomino(): boolean
	{
		return this.state == CellStatus.Triomino;
	}
}