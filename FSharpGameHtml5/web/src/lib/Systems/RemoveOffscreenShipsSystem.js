define(["exports", "../Entities"], function (exports, _Entities) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RemoveOffscreenShipsSystem = RemoveOffscreenShipsSystem;

    function RemoveOffscreenShipsSystem(game, width, height, entity) {
        var matchValue = [entity.EntityType, entity.Active];

        var _target1 = function _target1() {
            return entity;
        };

        if (matchValue[0] === 2) {
            if (matchValue[1]) {
                if ((entity.Position.y + 0x80000000 >>> 0) - 0x80000000 > height) {
                    var Active = false;
                    return new _Entities.Entity(entity.Id, entity.Name, Active, entity.EntityType, entity.Layer, entity.Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
                } else {
                    return _target1();
                }
            } else {
                return _target1();
            }
        } else {
            return _target1();
        }
    }
});
//# sourceMappingURL=RemoveOffscreenShipsSystem.js.map