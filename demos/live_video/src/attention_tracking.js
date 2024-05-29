import { drawPath } from "./shared/util";
const KEYPOINT_INDEX_LEFT_CHEEK = 127;
const KEYPOINT_INDEX_RIGHT_CHEEK = 356;
const KEYPOINT_INDEX_NOSE = 6;

let roiOrientationVector = {
  x: 6.152000427246094,
  y: 15.785307884216309,
  z: -66.64615988731384,
};

/**
 * Calculates the face orientation vector based on the given keypoints.
 *
 * @param {Array<{x: number, y: number, z: number}>} keypoints - The array of keypoints representing the face landmarks.
 * @returns {{x: number, y: number, z: number}} The face orientation vector.
 */
export function getFaceOrientationVector(keypoints) {
  const leftCheek = keypoints[KEYPOINT_INDEX_LEFT_CHEEK];
  const rightCheek = keypoints[KEYPOINT_INDEX_RIGHT_CHEEK];
  const nose = keypoints[KEYPOINT_INDEX_NOSE];

  const leftVector = [
    nose.x - leftCheek.x,
    nose.y - leftCheek.y,
    nose.z - leftCheek.z,
  ];
  const rightVector = [
    nose.x - rightCheek.x,
    nose.y - rightCheek.y,
    nose.z - rightCheek.z,
  ];
  return {
    x: (leftVector[0] + rightVector[0]) / 2,
    y: (leftVector[1] + rightVector[1]) / 2,
    z: (leftVector[2] + rightVector[2]) / 2,
  };
}

export function drawFaceOrientation(ctx, face, faceOrientationVector) {
  const { box } = face;
  const centerPoint = {
    x: (box.xMax + box.xMin) / 2,
    y: (box.yMax + box.yMin) / 2,
  };

  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;

  const start = [centerPoint.x, centerPoint.y];
  const end = [
    centerPoint.x + faceOrientationVector.x * 1,
    centerPoint.y + faceOrientationVector.y * 1,
  ];

  console.log(
    Math.abs(faceOrientationVector.x - roiOrientationVector.x),
    Math.abs(faceOrientationVector.y - roiOrientationVector.y)
  );

  if (
    Math.abs(faceOrientationVector.x - roiOrientationVector.x) < 20 &&
    Math.abs(faceOrientationVector.y - roiOrientationVector.y) < 20
  ) {
    ctx.strokeStyle = "#00ff00";
  } else {
    ctx.strokeStyle = "#ff0000";
  }
  drawPath(ctx, [start, end]);
}
