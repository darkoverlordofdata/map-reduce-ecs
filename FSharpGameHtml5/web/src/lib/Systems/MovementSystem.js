define(["exports", "PIXI", "../Entities"], function (exports, _PIXI, _Entities) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.MovementSystem = MovementSystem;

        function MovementSystem(delta, entity) {
                var matchValue = [entity.Velocity, entity.Active];

                var _target1 = function _target1() {
                        return entity;
                };

                if (matchValue[0] != null) {
                        if (matchValue[1]) {
                                var velocity = matchValue[0];
                                var x = entity.Position.x + velocity.x * delta;
                                var y = entity.Position.y + velocity.y * delta;
                                var Position = new _PIXI.Point(x, y);
                                return new _Entities.Entity(entity.Id, entity.Name, entity.Active, entity.EntityType, entity.Layer, Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
                        } else {
                                return _target1();
                        }
                } else {
                        return _target1();
                }
        }
});
//# sourceMappingURL=MovementSystem.js.map