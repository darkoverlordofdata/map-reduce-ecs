define(["exports", "fable-core/List", "../Entities", "PIXI", "../Components"], function (exports, _List, _Entities, _PIXI, _Components) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.EntitySystem = EntitySystem;

    var _List2 = _interopRequireDefault(_List);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function EntitySystem(game, width, height, entity) {
        return entity.Active ? function () {
            var removed = false;

            var removeIf = function removeIf(l) {
                return function (predicate) {
                    return l.tail != null ? predicate(l.head) ? function () {
                        removed = true;
                        return removeIf(l.tail)(predicate);
                    }() : new _List2.default(l.head, removeIf(l.tail)(predicate)) : new _List2.default();
                };
            };

            var len = game.Deactivate.length;
            game.Deactivate = removeIf(game.Deactivate)(function (id) {
                return id === entity.Id;
            });
            var Active = !removed;
            return new _Entities.Entity(entity.Id, entity.Name, Active, entity.EntityType, entity.Layer, entity.Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
        }() : function () {
            var $var1 = null;

            switch (entity.Layer) {
                case 8:
                    {
                        {
                            var matchValue = game.Bullets;

                            if (matchValue.tail != null) {
                                game.Bullets = matchValue.tail;
                                var Active = true;
                                var Expires = 0.5;
                                var Position = new _PIXI.Point(matchValue.head.X, matchValue.head.Y);
                                $var1 = new _Entities.Entity(entity.Id, entity.Name, Active, entity.EntityType, entity.Layer, Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
                            } else {
                                $var1 = entity;
                            }
                        }
                        break;
                    }

                case 4:
                    {
                        {
                            var _matchValue = game.Enemies1;

                            if (_matchValue.tail != null) {
                                game.Enemies1 = _matchValue.tail;
                                var _Active = true;

                                var _Position = new _PIXI.Point(Math.floor(Math.random() * (width - 35 - 0)) + 0, 91 / 2);

                                var Health = (0, _Components.CreateHealth)(10, 10);
                                $var1 = new _Entities.Entity(entity.Id, entity.Name, _Active, entity.EntityType, entity.Layer, _Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, Health, entity.Tween, entity.Size, entity.Velocity);
                            } else {
                                $var1 = entity;
                            }
                        }
                        break;
                    }

                case 5:
                    {
                        {
                            var _matchValue2 = game.Enemies2;

                            if (_matchValue2.tail != null) {
                                game.Enemies2 = _matchValue2.tail;
                                var _Active2 = true;

                                var _Position2 = new _PIXI.Point(Math.floor(Math.random() * (width - 86 - 0)) + 0, 172 / 2);

                                var _Health = (0, _Components.CreateHealth)(20, 20);

                                $var1 = new _Entities.Entity(entity.Id, entity.Name, _Active2, entity.EntityType, entity.Layer, _Position2, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, _Health, entity.Tween, entity.Size, entity.Velocity);
                            } else {
                                $var1 = entity;
                            }
                        }
                        break;
                    }

                case 6:
                    {
                        {
                            var _matchValue3 = game.Enemies3;

                            if (_matchValue3.tail != null) {
                                game.Enemies3 = _matchValue3.tail;
                                var _Active3 = true;

                                var _Position3 = new _PIXI.Point(Math.floor(Math.random() * (width - 160 - 0)) + 0, 320 / 2);

                                var _Health2 = (0, _Components.CreateHealth)(60, 60);

                                $var1 = new _Entities.Entity(entity.Id, entity.Name, _Active3, entity.EntityType, entity.Layer, _Position3, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, _Health2, entity.Tween, entity.Size, entity.Velocity);
                            } else {
                                $var1 = entity;
                            }
                        }
                        break;
                    }

                case 9:
                    {
                        {
                            var _matchValue4 = game.Explosions;

                            if (_matchValue4.tail != null) {
                                game.Explosions = _matchValue4.tail;
                                var _Active4 = true;
                                var _Expires = 0.2;
                                var Scale = new _PIXI.Point(_matchValue4.head.Scale, _matchValue4.head.Scale);

                                var _Position4 = new _PIXI.Point(_matchValue4.head.X, _matchValue4.head.Y);

                                $var1 = new _Entities.Entity(entity.Id, entity.Name, _Active4, entity.EntityType, entity.Layer, _Position4, entity.Sprite, Scale, entity.Tint, entity.Bounds, _Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
                            } else {
                                $var1 = entity;
                            }
                        }
                        break;
                    }

                case 10:
                    {
                        {
                            var _matchValue5 = game.Bangs;

                            if (_matchValue5.tail != null) {
                                game.Bangs = _matchValue5.tail;
                                var _Active5 = true;
                                var _Expires2 = 0.2;

                                var _Scale = new _PIXI.Point(_matchValue5.head.Scale, _matchValue5.head.Scale);

                                var _Position5 = new _PIXI.Point(_matchValue5.head.X, _matchValue5.head.Y);

                                $var1 = new _Entities.Entity(entity.Id, entity.Name, _Active5, entity.EntityType, entity.Layer, _Position5, entity.Sprite, _Scale, entity.Tint, entity.Bounds, _Expires2, entity.Health, entity.Tween, entity.Size, entity.Velocity);
                            } else {
                                $var1 = entity;
                            }
                        }
                        break;
                    }

                default:
                    {
                        $var1 = entity;
                    }
            }

            return $var1;
        }();
    }
});
//# sourceMappingURL=EntitySystem.js.map