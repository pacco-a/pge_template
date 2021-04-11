import * as PIXI from "pixi.js";

export default class Game {
	// pixi renderer
	protected renderer: PIXI.Renderer;
	protected stage: PIXI.Container;
	protected graphics: PIXI.Graphics;
	// pixi ticker
	protected ticker: PIXI.Ticker;

	constructor(config: IGameConfig) {
		// create renderer
		this.renderer = new PIXI.Renderer({
			view: config.view,
			width: config.width,
			height: config.height,
			backgroundColor: config.backgroundColor,
		});

		// document.body.appendChild(this.renderer.view);

		// graphics (drawings)

		this.graphics = new PIXI.Graphics();

		// stage

		this.stage = new PIXI.Container();
		this.stage.addChild(this.graphics);

		// execute create function

		this.create();

		// ticker

		this.ticker = new PIXI.Ticker();
		this.ticker.add(() => {
			// update
			this.update(this.ticker.elapsedMS / 1000);
			// draw
			this.draw();
		});
	}

	// fonction create qui s'execute une fois avant update
	protected create(): void {}

	protected update(dt: number): void {
		// render the stage
		this.renderer.render(this.stage);
	}

	protected draw() {
		this.graphics.clear();
	}

	public start() {
		this.ticker.start();
	}
}

interface IGameConfig {
	width: number;
	height: number;
	backgroundColor: number;
	fps: number;
	view: HTMLCanvasElement;
}
