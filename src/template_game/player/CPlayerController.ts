import TemplateGame from "../..";
import Component from "../../pge_engine/ecs/Component";
import Entity from "../../pge_engine/ecs/Entity";
import CPosition from "../global_components/CPosition";

export default class CPlayerController extends Component {
	// meta-data
	public name: string = "CPlayerController";
	public isDuplicable: boolean = false;
	public dependentComponent: string[] = ["CPosition"];
	// data
	public parentEntity!: Entity;
	private _playerPosition!: CPosition;

	constructor() {
		super();
	}

	public onReady(): void {
		this.parentEntity = this.getParentEntity();
		this._playerPosition =
			this.parentEntity.getComponent<CPosition>("CPosition");
	}

	public update(dt: number): void {
		if (TemplateGame.inputHandler.GetRightKeyDown()) {
			this._playerPosition.changePosition(
				this._playerPosition.position.x + 5,
				this._playerPosition.position.y
			);
		}

		if (TemplateGame.inputHandler.GetLeftKeyDown()) {
			this._playerPosition.changePosition(
				this._playerPosition.position.x - 5,
				this._playerPosition.position.y
			);
		}

		if (TemplateGame.inputHandler.GetDownKeyDown()) {
			this._playerPosition.changePosition(
				this._playerPosition.position.x,
				this._playerPosition.position.y + 5
			);
		}

		if (TemplateGame.inputHandler.GetUpKeyDown()) {
			this._playerPosition.changePosition(
				this._playerPosition.position.x,
				this._playerPosition.position.y - 5
			);
		}
	}
}
