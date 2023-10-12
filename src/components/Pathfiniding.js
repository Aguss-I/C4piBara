import EasyStar from "easystarjs";

export default class Pathfinding {
  constructor(scene, map, background, obstacle) {
    this.easystar = new EasyStar.js();
    this.tileWidth = map.tileWidth;
    this.tileHeight = map.tileHeight;

    this.collisionGrid = this.makeGrid(map, background, obstacle);

    this.easystar.setGrid(this.makeGrid(map, background, obstacle));
    this.easystar.setAcceptableTiles([0]);

    this.scene = scene;
  }

  makeGrid(map, background, obstacle) {
    const grid = [];
    const walkableTiles = [0];

    for (let y = 0; y < map.height; y++) {
      const row = [];
      for (let x = 0; x < map.width; x++) {
        const groundTile = background.getTileAt(x, y, true, "Ground");
        const upperTile = obstacle.getTileAt(x, y, true, "Deco");

        const isWalkable = walkableTiles.includes(groundTile.index);

        row.push(isWalkable ? 0 : 1);
      }
      grid.push(row);
    }

    return grid;
  }

  findPath(startX, startY, endX, endY, callback) {
    this.easystar.findPath(startX, startY, endX, endY, callback);
    this.easystar.calculate();
  }
}
