import Game from "./PGEngine/Game";
import * as PIXI from "pixi.js";
import KeyboardInputHandler from "./PGEngine/KeyboardInputHandler";

export default class NewGame extends Game {
	public static inputHandler: KeyboardInputHandler = new KeyboardInputHandler(
		document
	);

	/* TODO rightclickmouse et leftclickmouse sont inversés et aussi pas de fonction
	public pour exposés les etats de mouse */

	constructor() {
		super({
			view: document.getElementById("game-canvas") as HTMLCanvasElement,
			width: 640,
			height: 640,
			backgroundColor: 0x4287f5,
			fps: 60,
			toLoad: [
				{ name: "test", url: "testdata.json" },
				{ name: "smiley", url: "smiley.png" },
			],
		});
	}

	protected create() {
		const helloWorld = new PIXI.Text(
			"Hello World !",
			new PIXI.TextStyle({ fill: ["#ffffff"] })
		);
		helloWorld.x = this.renderer.width / 2 - helloWorld.width / 2;
		helloWorld.y = this.renderer.height / 2 - helloWorld.height / 2;

		const smileyTexture = this.GetLoadedTexture("smiley");
		if (smileyTexture) {
			const smileySprite = new PIXI.Sprite(smileyTexture);
			smileySprite.x = 0;
			smileySprite.y = 0;
			this.stage.addChild(smileySprite);
		} else {
			console.error("smiley texture not found");
		}

		this.stage.addChild(helloWorld);
	}

	protected update(dt: number) {
		super.update(dt);
		NewGame.inputHandler.update(dt);

		if (NewGame.inputHandler.GetMouseLeftButtonDown()) {
			console.log("clique gauche appuyé");
		}

		if (NewGame.inputHandler.GetMouseLeftButtonJustDown()) {
			console.log("clique gauche juste appuyé");
		}
	}

	protected draw() {
		super.draw();
		this.graphics.beginFill(0);
		this.graphics.drawCircle(
			this.renderer.width / 2,
			this.renderer.height / 2,
			100
		);
		this.graphics.endFill();
	}
}

const gi = new NewGame();
gi.start();
