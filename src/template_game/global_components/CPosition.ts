import Component from "../../pge_engine/ecs/Component";
import { Vector2 } from "../../pge_engine/utils/MathUtils";

export default class CPosition extends Component {
	// meta-data
	public name: string = "CPosition";
	public isDuplicable: boolean = false;
	public dependentComponent: string[] = [];
	protected toLoad: string[] = [];
	// data
	private _position: Vector2;
	public get position(): Vector2 {
		return this._position;
	}

	constructor(x: number, y: number) {
		super();
		this._position = new Vector2(x, y);
	}

	//#region LIFE CYCLE
	public onReady(): void {}

	public update(dt: number): void {}
	//#endregion

	public changePosition(x: number, y: number) {
		this._position.change(x, y);
	}
}
