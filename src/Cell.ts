import { CellStatus } from "./CellStatus";

export class Cell
{
	state: CellStatus
	constructor(state: CellStatus)
	{
		this.state = state;
	}

	getState(): CellStatus
	{
		return this.state;
	}

	setState(state: CellStatus): void
	{
		this.state = state;
	}
}