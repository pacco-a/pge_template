import * as PIXI from "pixi.js";

interface Key {
	down: boolean;
	justDown: boolean;
	framesDown: number;
}

export default class KeyboardInputHandler {
	private rightKey: Key = { down: false, justDown: false, framesDown: 0 };
	private leftKey: Key = { down: false, justDown: false, framesDown: 0 };
	private upKey: Key = { down: false, justDown: false, framesDown: 0 };
	private downKey: Key = { down: false, justDown: false, framesDown: 0 };

	private keys: Key[] = [
		this.rightKey,
		this.leftKey,
		this.upKey,
		this.downKey,
	];

	constructor(pageDocument: Document) {
		pageDocument.addEventListener(
			"keydown",
			(e) => this.keyDownHandler(e),
			false
		);

		pageDocument.addEventListener(
			"keyup",
			(e) => this.keyUpHandler(e),
			false
		);

		// EXEMPLE : mouse input
		// pageDocument.addEventListener("mousedown", (e) => {
		// 	console.log(e.x);
		// });
	}

	keyDownHandler(event: KeyboardEvent) {
		if (event.code == "ArrowRight") {
			this.rightKey.down = true;
		} else if (event.code == "ArrowLeft") {
			this.leftKey.down = true;
		}

		if (event.code == "ArrowUp") {
			this.upKey.down = true;
		} else if (event.code == "ArrowDown") {
			this.downKey.down = true;
		}
	}

	keyUpHandler(event: KeyboardEvent) {
		if (event.code == "ArrowRight") {
			this.rightKey.down = false;
		} else if (event.code == "ArrowLeft") {
			this.leftKey.down = false;
		}

		if (event.code == "ArrowUp") {
			this.upKey.down = false;
		} else if (event.code == "ArrowDown") {
			this.downKey.down = false;
		}
	}

	//#region public methods (key getters)

	// right key
	public GetRightKeyDown(): boolean {
		return this.rightKey.down;
	}

	public GetRightKeyJustDown(): boolean {
		return this.rightKey.justDown;
	}

	// left key
	public GetLeftKeyDown(): boolean {
		return this.leftKey.down;
	}

	public GetLeftKeyJustDown(): boolean {
		return this.leftKey.justDown;
	}

	// up key
	public GetUpKeyDown(): boolean {
		return this.upKey.down;
	}

	public GetUpKeyJustDown(): boolean {
		return this.upKey.justDown;
	}

	// down key
	public GetDownKeyDown(): boolean {
		return this.downKey.down;
	}

	public GetDownKeyJustDown(): boolean {
		return this.downKey.justDown;
	}

	//#endregion

	/**
	 * La classe InputHandler doit être updatée dans la boucle principale
	 * de la scene pour fonctionner correctement.
	 * @param dt le deltaTime (en secondes, ex : 0.0016)
	 */
	public update(dt: number): void {
		// sert à gérer le "just down"
		for (const key of this.keys) {
			if (key.down === true) {
				if (key.framesDown === 0) {
					key.justDown = true;
				} else {
					key.justDown = false;
				}

				key.framesDown++;
			} else {
				key.framesDown = 0;
			}
		}
	}
}
