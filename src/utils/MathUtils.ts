class Vector2 {
	public x: number;
	public y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public isZero() {
		return this.x === 0 && this.y === 0;
	}

	public change(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public setZero() {
		this.x = 0;
		this.y = 0;
	}
}

export { Vector2 };
