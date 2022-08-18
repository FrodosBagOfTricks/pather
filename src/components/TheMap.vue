<template>
  <canvas
    ref="canvas"
    :width="gameGrid.width"
    :height="gameGrid.height"
    @mouseup="onMouseUp"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import mapImage from "@/assets/map.png";

const mapWidth = 1818.7;
const mapHeight = 1210.6;

const canvas: Ref<HTMLCanvasElement | null | undefined> = ref(null);
const matrix: Ref<DOMMatrix | null | undefined> = ref(null);

const gameGrid = ref({
  height: 2143,
  width: 2143,
});

onMounted((): void => {
  const canv = canvas.value;

  if (canv) {
    const context: CanvasRenderingContext2D | null = canv.getContext("2d");

    if (context) {
      const image = new Image(mapWidth, mapHeight);
      image.src = mapImage;
      image.onload = () => {
        // Find the offset of the grid from canvas
        const dx = (gameGrid.value.width - mapWidth) / 2;
        const dy = (gameGrid.value.height - mapHeight) / 2;

        // Draw map to 1:1 with gameGrid
        context.drawImage(image, dx, dy, image.width, image.height);

        // Translate point of origin to centre of map
        context.translate(gameGrid.value.width / 2, gameGrid.value.height / 2);

        // Orientate grid isometrically
        context.rotate((45 * Math.PI) / 180);

        // Return point of origin to default
        context.translate(
          -gameGrid.value.width / 2,
          -gameGrid.value.height / 2
        );

        // Game uses the cartesian coordinate system so move point of origin to bottom
        // of gameGrid and flip horizontally, placing point of origin bottom left.
        context.translate(0, gameGrid.value.height);
        context.scale(1, -1);

        // Preserve transfomed matrix to apply to subsequent positionings
        matrix.value = context.getTransform();

        //Revert back to screen Coordinate System
        context.resetTransform();

        plotSignificantLocations();
      };
    }
  }
});

function onMouseUp(e: MouseEvent): void {
  const canv = canvas.value;
  if (canv) {
    const cRect = canv.getBoundingClientRect();

    // Get location of canvas is relation to mouse click
    const canvasX = e.clientX - cRect.left;
    const canvasY = e.clientY - cRect.top;

    const point = {
      x: canvasX,
      y: canvasY,
    };

    printScreenPoint(point);
  }
}

// Place a point on the game grid.  Use when origin of the point is derived
// from the game's coordinate system.  Eg, refering to a location in game.
function printGamePoint(point: Point): void {
  const canv = canvas.value;
  if (canv) {
    const context: CanvasRenderingContext2D | null = canv.getContext("2d");

    if (context) {
      const transfomedPoint = applyMapGridTransform(point);

      context.fillStyle = "#05EFFF";
      context.fillRect(transfomedPoint.x, transfomedPoint.y, 4, 4);

      context.fillText(
        `(${Math.round(point.x)}, ${Math.round(point.y)})`,
        transfomedPoint.x + 5,
        transfomedPoint.y + 6
      );
    }
  }
}

// Place a point on the screen.  Use when origin of the point is derived
// from the screen coordinate system.  Eg, mouse click.
function printScreenPoint(point: Point): void {
  const canv = canvas.value;
  if (canv) {
    const context: CanvasRenderingContext2D | null = canv.getContext("2d");

    if (context) {
      const transfomedPoint = applyMapGridTransform(point);

      context.fillStyle = "#05EFFF";
      context.fillRect(point.x, point.y, 4, 4);

      context.fillText(
        `(${Math.round(transfomedPoint.x)}, ${Math.round(transfomedPoint.y)})`,
        point.x + 5,
        point.y + 6
      );
    }
  }
}

function applyMapGridTransform(point: Point): Point {
  if (!matrix.value) {
    throw Error("matrix undefined");
  }

  const transformedPoint = {
    x: matrix.value.a * point.x + matrix.value.c * point.y + matrix.value.e,
    y: matrix.value.b * point.x + matrix.value.d * point.y + matrix.value.f,
  };
  return transformedPoint;
}

interface Point {
  x: number;
  y: number;
}

function plotSignificantLocations(): void {
  printGamePoint({ x: 1, y: 857 });
  printGamePoint({ x: 857, y: 1 });
  printGamePoint({ x: 1287, y: 2143 });
  printGamePoint({ x: 2143, y: 1287 });
  printGamePoint({ x: 1151, y: 1331 });
  printGamePoint({ x: 1063, y: 350 });
  printGamePoint({ x: 787, y: 1470 });
  printGamePoint({ x: 1079, y: 1338 });
  printGamePoint({ x: 666, y: 1438 });
  printGamePoint({ x: 1463, y: 1088 });
  printGamePoint({ x: 490, y: 1003 });
  printGamePoint({ x: 1521, y: 1451 });
  printGamePoint({ x: 1309, y: 782 });
  printGamePoint({ x: 1334, y: 1373 });
  printGamePoint({ x: 862, y: 1323 });
  printGamePoint({ x: 748, y: 1011 });
  printGamePoint({ x: 1332, y: 1810 });
  printGamePoint({ x: 1335, y: 1605 });
  printGamePoint({ x: 1161, y: 1496 });
  printGamePoint({ x: 1467, y: 1342 });
  printGamePoint({ x: 1091, y: 1689 });
  printGamePoint({ x: 1353, y: 946 });
  printGamePoint({ x: 1435, y: 1525 });
  printGamePoint({ x: 893, y: 963 });
  printGamePoint({ x: 930, y: 1190 });
  printGamePoint({ x: 1254, y: 1498 });
  printGamePoint({ x: 1254, y: 1146 });
  printGamePoint({ x: 1004, y: 1704 });
  printGamePoint({ x: 1335, y: 1945 });
  printGamePoint({ x: 1724, y: 1515 });
  printGamePoint({ x: 1316, y: 1273 });
  printGamePoint({ x: 453, y: 1161 });
  printGamePoint({ x: 850, y: 744 });
  printGamePoint({ x: 1767, y: 1159 });
  printGamePoint({ x: 544, y: 745 });
  printGamePoint({ x: 851, y: 1186 });
  printGamePoint({ x: 661, y: 675 });
  printGamePoint({ x: 709, y: 1325 });
  printGamePoint({ x: 1136, y: 963 });
  printGamePoint({ x: 311, y: 727 });
  printGamePoint({ x: 360, y: 1179 });
  printGamePoint({ x: 749, y: 1560 });
  printGamePoint({ x: 1075, y: 932 });
  printGamePoint({ x: 1548, y: 1251 });
  printGamePoint({ x: 1424, y: 1738 });
  printGamePoint({ x: 844, y: 1578 });
  printGamePoint({ x: 409, y: 837 });
  printGamePoint({ x: 1568, y: 859 });
  printGamePoint({ x: 1623, y: 1563 });
  printGamePoint({ x: 1196, y: 1826 });
  printGamePoint({ x: 1022, y: 986 });
  printGamePoint({ x: 1473, y: 1115 });
  printGamePoint({ x: 1576, y: 999 });
  printGamePoint({ x: 2000, y: 1352 });
  printGamePoint({ x: 1915, y: 1167 });
  printGamePoint({ x: 1294, y: 836 });
  printGamePoint({ x: 1227, y: 777 });
  printGamePoint({ x: 1516, y: 976 });
  printGamePoint({ x: 1063, y: 1227 });
  printGamePoint({ x: 722, y: 831 });
  printGamePoint({ x: 1058, y: 643 });
  printGamePoint({ x: 293, y: 988 });
  printGamePoint({ x: 634, y: 1274 });
  printGamePoint({ x: 1176, y: 1918 });
  printGamePoint({ x: 1793, y: 1452 });
  printGamePoint({ x: 709, y: 1177 });
  printGamePoint({ x: 1723, y: 1250 });
  printGamePoint({ x: 1527, y: 1723 });
  printGamePoint({ x: 563, y: 943 });
  printGamePoint({ x: 1014, y: 1530 });
  printGamePoint({ x: 1002, y: 805 });
  printGamePoint({ x: 801, y: 1250 });
  printGamePoint({ x: 1167, y: 1263 });
  printGamePoint({ x: 1313, y: 1470 });
  printGamePoint({ x: 1012, y: 1809 });
  printGamePoint({ x: 1165, y: 1163 });
  printGamePoint({ x: 1083, y: 1643 });
  printGamePoint({ x: 1012, y: 882 });
}
</script>

<style scoped></style>
