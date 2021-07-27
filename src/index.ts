import * as PIXI from "pixi.js";
import Player from "./template_game/player/Player";
import Game from "./pge_engine/Game";
import KeyboardInputHandler from "./pge_engine/KeyboardInputHandler";

export default class TemplateGame extends Game {
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
			toLoad: [],
		});
	}

	protected create() {
		const testPlayer = this.addEntity(new Player(0, 0));
	}

	protected update(dt: number) {
		super.update(dt);
		TemplateGame.inputHandler.update(dt);
	}

	protected draw() {
		super.draw();
	}
}

const gi = new TemplateGame();
gi.start();
