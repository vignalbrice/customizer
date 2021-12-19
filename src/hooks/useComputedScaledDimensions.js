import React from "react";

export const useComputedScaledDimensions = (texture, camera, textureScale) => {
  // return some default values if the image hasn't loaded yet
  if (!texture.image) {
    return [1, 1];
  }

  // return if it's a video and if the video hasn't loaded yet
  if (texture.image.videoWidth === 0 && texture.image.videoHeight === 0) {
    return [1, 1];
  }

  const sourceWidth =
    texture?.image.naturalWidth ||
    texture?.image.videoWidth ||
    texture?.image.clientWidth;
  const sourceHeight =
    texture?.image.naturalHeight ||
    texture?.image.videoHeight ||
    texture?.image.clientHeight;

  const ratio = sourceWidth / sourceHeight;

  const ratioCamera = camera.aspect;
  const widthCamera = 1;
  const heightCamera = widthCamera * (1 / ratioCamera);
  let widthScaled;
  let heightScaled;

  const height = widthCamera * (1 / ratio);
  heightScaled = 1 / ((height / heightCamera) * textureScale);
  widthScaled = 1 / textureScale;

  return [widthScaled, heightScaled];
};
