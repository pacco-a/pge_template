import { CompositeRectTileLayer, CompositeTilemap } from "@pixi/tilemap";
import * as PIXI from "pixi.js";

export default class LDTKLevel {
	public name: string;
	private levelObj: any;
	private tileMapLayers: CompositeTilemap[];
	private intGrids: number[][][] = [];

	constructor(
		levelObject: any,
		levelName: string,
		projectSpritesheet: PIXI.Spritesheet
	) {
		this.levelObj = levelObject;
		this.name = levelName;

		// make the tilemaps
		this.tileMapLayers = this.MakeTileMapFromFormatSpritesheet(
			projectSpritesheet
		);
	}

	/**
	 * Créer les CompositeTilemap (layers) à partir d'un spritesheet (object) au format
	 * adapté (qui peut être généré dans tools/spritesheet).
	 * @param spritesheet Le PIXI.Spritesheet utilisé par le projet
	 */
	public MakeTileMapFromFormatSpritesheet(
		spritesheet: PIXI.Spritesheet
	): CompositeTilemap[] {
		const tilemapLayers: CompositeTilemap[] = [];

		for (
			let index = this.levelObj.layerInstances.length;
			index > 0;
			index--
		) {
			const layerInstance = this.levelObj.layerInstances[index - 1];

			if (layerInstance.__type === "Tiles") {
				const layer = new CompositeTilemap();

				for (const tile of layerInstance.gridTiles as {
					px: number[];
					src: number[];
					f: number;
					t: number;
					d: number[];
				}[]) {
					const textureToAdd = spritesheet.textures[
						`${tile.src[0]},${tile.src[1]}`
					] as PIXI.Texture;

					layer.addFrame(textureToAdd, tile.px[0], tile.px[1]);
				}
				tilemapLayers.push(layer);
			} else if (layerInstance.__type === "IntGrid") {
				const xMax = layerInstance.__cWid;
				let xIndex = 0;
				let yIndex = 0;
				let intIndex = 0;

				const newList: number[][] = [];

				while (yIndex <= layerInstance.__cHei) {
					if (xIndex === 0) {
						newList.push([]);
					}

					newList[yIndex].push(layerInstance.intGridCsv[intIndex]);

					xIndex++;
					intIndex++;

					if (xIndex > xMax - 1) {
						yIndex++;
						xIndex = 0;
					}
				}

				console.log(newList);

				this.intGrids.push(newList);
			}
		}

		return tilemapLayers;
	}

	public GetTileMapLayers(): CompositeTilemap[] {
		return this.tileMapLayers;
	}
}
