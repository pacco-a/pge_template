import Entity from "../../pge_engine/ecs/Entity";
import CPosition from "../global_components/CPosition";
import CSprite from "../global_components/CSprite";
import TemplateGame from "../..";
import { Vector2 } from "../../pge_engine/utils/MathUtils";
import CPlayerController from "./CPlayerController";

export default class Player extends Entity {
	// meta-data
	protected urlsToLoad: string[] = ["assets/sprites/mario_sprite.png"];
	// data
	private _playerXY: number[];
	private _cPosition!: CPosition;

	constructor(x: number, y: number) {
		super();
		this._playerXY = [x, y];
	}

	public onReady(): void {
		this._cPosition = this.addComponent(
			new CPosition(this._playerXY[0], this._playerXY[1])
		);
		this.addComponent(new CPlayerController());
		this.addComponent(
			new CSprite(
				TemplateGame.Instance.GetLoadedTexture(
					"assets/sprites/mario_sprite.png"
				),
				5,
				{ scale: new Vector2(0.1, 0.1) }
			)
		);
	}

	public update(dt: number): void {
		super.update(dt);
	}
}
