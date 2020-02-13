import * as s from 'module://sumerian-common/api';
const MathUtils = s.math.MathUtils;

export default function(ctx) {
     
    const hammer = new Hammer.Manager(document.body);

    const pinch = new Hammer.Pinch();
    hammer.add(pinch);

    const rotate = new Hammer.Rotate();
    hammer.add(rotate);

    pinch.recognizeWith(rotate);

    // Scale gesture

    let baseScale;

    hammer.on('pinchstart', (gesture) => {
        baseScale = ctx.entity.scale.clone();
    });

    hammer.on('pinch', (gesture) => {
        const newScale = baseScale.clone().scale(gesture.scale);
        ctx.entity.scale.set(newScale);
    });

    // Rotation gesture

    let baseEntityRotation;
    let baseGestureRotation;

    hammer.on('rotatestart', (gesture) => {
        const yRadians = ctx.entity.rotation.y;
        baseEntityRotation = MathUtils.degFromRad(yRadians);
        baseGestureRotation = gesture.rotation;
    });

    hammer.on('rotate', (gesture) => {
        const rotationDelta = gesture.rotation - baseGestureRotation;
        const rotationDegrees = baseEntityRotation - rotationDelta;
        const rotationRadians = MathUtils.radFromDeg(rotationDegrees);
        ctx.entity.rotation.y = rotationRadians;
    });
}