export enum SubGridPlace
{
	TopLeft,
	TopRight,
	BottomLeft,
	BottomRight,
	FullSize
};

export class SubGrid
{
	lengthOfSubGridToSolve: number;
	offsetX: number;
	offsetY: number;
	place: SubGridPlace;

	constructor(lengthOfSubGridToSolve: number, offsetX: number, offsetY: number, place?: SubGridPlace)
	{
		this.lengthOfSubGridToSolve = lengthOfSubGridToSolve;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.place = place;
	}

	getSubGrid(position: SubGridPlace): SubGrid
	{
		let newSizeOfGrid = this.lengthOfSubGridToSolve / 2;
		let offsetX = this.offsetX;
		let offsetY = this.offsetY;

		switch (position)
		{
			case SubGridPlace.TopRight:
				offsetX += newSizeOfGrid;
				break;
			case SubGridPlace.BottomLeft:
				offsetY += newSizeOfGrid;
				break;
			case SubGridPlace.BottomRight:
				offsetX += newSizeOfGrid;
				offsetY += newSizeOfGrid;
				break;
			default:
		}

		return new SubGrid(newSizeOfGrid, offsetX, offsetY, position);
	}
}