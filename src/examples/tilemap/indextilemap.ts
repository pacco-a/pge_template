import * as PIXI from "pixi.js";
import Game from "../../pge_engine/Game";
import KeyboardInputHandler from "../../pge_engine/KeyboardInputHandler";
import LDTKProject from "../../pge_engine/LDtk/LDTKProject";

export default class NewGame extends Game {
	public static inputHandler: KeyboardInputHandler = new KeyboardInputHandler(
		document
	);

	constructor() {
		super({
			view: document.getElementById("game-canvas") as HTMLCanvasElement,
			width: 640,
			height: 640,
			backgroundColor: 0x4287f5,
			fps: 60,
			toLoad: [
				{ name: "ldtk", url: "/examples/mini-land-ldtk-project.json" },
				{ name: "spritesheet", url: "/examples/maptileset.json" },
			],
		});
	}

	protected create() {
		const ldtkProject = this.GetLoadedData("ldtk");
		const spritesheet = this.GetLoadedSpriteseet("spritesheet");

		if (!spritesheet) {
			console.error("spritesheet not found !");
			return;
		}

		spritesheet.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

		const ldtkProjectObj = new LDTKProject(ldtkProject, spritesheet);

		const testLevel = ldtkProjectObj.GetLevel("Map1");

		if (!testLevel) {
			console.error("level not found");
			return;
		}

		for (const tilemapLayer of testLevel.GetTileMapLayers()) {
			tilemapLayer.scale.set(8, 8);
			this.AddToStage(5, tilemapLayer);
		}
	}

	protected update(dt: number) {
		super.update(dt);
		NewGame.inputHandler.update(dt);
	}

	protected draw() {
		super.draw();
	}
}

const gi = new NewGame();
gi.start();
