define(["exports", "fable-core/Symbol", "fable-core/Util", "PIXI", "fable-core/List", "./Mouse", "./Keyboard", "fable-core/Lazy", "fable-core/Seq"], function (exports, _Symbol2, _Util, _PIXI, _List, _Mouse, _Keyboard, _Lazy, _Seq) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.game = exports.ShmupWarz = exports.timeToFire = exports.enemyT3 = exports.enemyT2 = exports.enemyT1 = exports.EcsGame = exports.Entity = exports.UniqueId = exports.rnd = exports.BulletQueItem = exports.ExplosionQueItem = exports.EnemyQueItem = exports.Tween = exports.Health = exports.Game = undefined;
    exports.CreateHealth = CreateHealth;
    exports.CreateTween = CreateTween;
    exports.EnemyQue = EnemyQue;
    exports.ExplosionQue = ExplosionQue;
    exports.BulletQue = BulletQue;
    exports.NextUniqueId = NextUniqueId;
    exports.CreatePlayer = CreatePlayer;
    exports.CreateBullet = CreateBullet;
    exports.CreateEnemy1 = CreateEnemy1;
    exports.CreateEnemy2 = CreateEnemy2;
    exports.CreateEnemy3 = CreateEnemy3;
    exports.CreateExplosion = CreateExplosion;
    exports.CreateBang = CreateBang;
    exports.CreateEntityDB = CreateEntityDB;
    exports.ActiveEntities = ActiveEntities;
    exports.EntitySystem = EntitySystem;
    exports.BoundingRect = BoundingRect;
    exports.CollisionSystem = CollisionSystem;
    exports.EnemySpawningSystem = EnemySpawningSystem;
    exports.InputSystem = InputSystem;
    exports.MovementSystem = MovementSystem;
    exports.ExpiringSystem = ExpiringSystem;
    exports.RemoveOffscreenShipsSystem = RemoveOffscreenShipsSystem;
    exports.TweenSystem = TweenSystem;

    var _Symbol3 = _interopRequireDefault(_Symbol2);

    var PIXI = _interopRequireWildcard(_PIXI);

    var _List2 = _interopRequireDefault(_List);

    var _Lazy2 = _interopRequireDefault(_Lazy);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Game = exports.Game = function () {
        _createClass(Game, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return (0, _Util.extendInfo)(Game, {
                    type: "ShmupWarz.Game",
                    interfaces: [],
                    properties: {
                        fps: "number",
                        spriteBatch: _PIXI.Container
                    }
                });
            }
        }]);

        function Game(width, height, images) {
            _classCallCheck(this, Game);

            this.this = {
                contents: null
            };
            {
                var _this = this.this;
            }
            this.images = images;
            this.this.contents = this;
            this.previousTime = 0;
            this.elapsedTime = 0;
            this.totalFrames = 0;
            this.renderer = new _PIXI.WebGLRenderer(width, height);
            document.body.appendChild(this.renderer.view);
            this["spriteBatch@"] = new _PIXI.Container();
            this["fps@"] = 0;
            this["init@16"] = 1;
        }

        _createClass(Game, [{
            key: "Initialize",
            value: function Initialize() {
                this.LoadContent();
            }
        }, {
            key: "Run",
            value: function Run() {
                var _this2 = this;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var forLoopVar = _step.value;
                        PIXI.loader.add(forLoopVar[0], forLoopVar[1]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return PIXI.loader.load(function (loader, resources) {
                    _this2.Content = resources;

                    _this2.Initialize();

                    {
                        var timeStamp = 0;

                        _this2.animate(timeStamp);
                    }
                });
            }
        }, {
            key: "animate",
            value: function animate(timeStamp) {
                var _this3 = this;

                var t = this.previousTime > 0 ? this.previousTime : timeStamp;
                this.previousTime = timeStamp;
                var delta = (timeStamp - t) * 0.001;
                this.totalFrames = this.totalFrames + 1;
                this.elapsedTime = this.elapsedTime + delta;

                if (this.elapsedTime > 1) {
                    this.this.contents.fps = this.totalFrames;
                    this.totalFrames = 0;
                    this.elapsedTime = 0;
                }

                window.requestAnimationFrame(function (delegateArg0) {
                    (function (timeStamp_1) {
                        _this3.animate(timeStamp_1);
                    })(delegateArg0);
                });
                this.this.contents.Update(delta);
                this.this.contents.Draw(delta);
                this.renderer.render(this.this.contents.spriteBatch);
            }
        }, {
            key: "spriteBatch",
            get: function get() {
                return this["spriteBatch@"];
            }
        }, {
            key: "fps",
            get: function get() {
                return this["fps@"];
            },
            set: function set(v) {
                this["fps@"] = v;
            }
        }]);

        return Game;
    }();

    (0, _Util.declare)(Game);

    var Health = exports.Health = function () {
        function Health(curHealth, maxHealth) {
            _classCallCheck(this, Health);

            this.CurHealth = curHealth;
            this.MaxHealth = maxHealth;
        }

        _createClass(Health, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return {
                    type: "ShmupWarz.Health",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        CurHealth: "number",
                        MaxHealth: "number"
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return (0, _Util.equalsRecords)(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return (0, _Util.compareRecords)(this, other);
            }
        }]);

        return Health;
    }();

    (0, _Util.declare)(Health);

    function CreateHealth(curHealth, maxHealth) {
        return new Health(curHealth, maxHealth);
    }

    var Tween = exports.Tween = function () {
        function Tween(min, max, speed, repeat, active) {
            _classCallCheck(this, Tween);

            this.Min = min;
            this.Max = max;
            this.Speed = speed;
            this.Repeat = repeat;
            this.Active = active;
        }

        _createClass(Tween, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return {
                    type: "ShmupWarz.Tween",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        Min: "number",
                        Max: "number",
                        Speed: "number",
                        Repeat: "boolean",
                        Active: "boolean"
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return (0, _Util.equalsRecords)(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return (0, _Util.compareRecords)(this, other);
            }
        }]);

        return Tween;
    }();

    (0, _Util.declare)(Tween);

    function CreateTween(min, max, speed, repeat, active) {
        return new Tween(min, max, speed, repeat, active);
    }

    var EnemyQueItem = exports.EnemyQueItem = function () {
        function EnemyQueItem(enemy) {
            _classCallCheck(this, EnemyQueItem);

            this.Enemy = enemy;
        }

        _createClass(EnemyQueItem, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return {
                    type: "ShmupWarz.EnemyQueItem",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        Enemy: "number"
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return (0, _Util.equalsRecords)(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return (0, _Util.compareRecords)(this, other);
            }
        }]);

        return EnemyQueItem;
    }();

    (0, _Util.declare)(EnemyQueItem);

    function EnemyQue(enemy) {
        return new EnemyQueItem(enemy);
    }

    var ExplosionQueItem = exports.ExplosionQueItem = function () {
        function ExplosionQueItem(x, y, scale) {
            _classCallCheck(this, ExplosionQueItem);

            this.X = x;
            this.Y = y;
            this.Scale = scale;
        }

        _createClass(ExplosionQueItem, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return {
                    type: "ShmupWarz.ExplosionQueItem",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        X: "number",
                        Y: "number",
                        Scale: "number"
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return (0, _Util.equalsRecords)(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return (0, _Util.compareRecords)(this, other);
            }
        }]);

        return ExplosionQueItem;
    }();

    (0, _Util.declare)(ExplosionQueItem);

    function ExplosionQue(x, y, scale) {
        return new ExplosionQueItem(x, y, scale);
    }

    var BulletQueItem = exports.BulletQueItem = function () {
        function BulletQueItem(x, y) {
            _classCallCheck(this, BulletQueItem);

            this.X = x;
            this.Y = y;
        }

        _createClass(BulletQueItem, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return {
                    type: "ShmupWarz.BulletQueItem",
                    interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                    properties: {
                        X: "number",
                        Y: "number"
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return (0, _Util.equalsRecords)(this, other);
            }
        }, {
            key: "CompareTo",
            value: function CompareTo(other) {
                return (0, _Util.compareRecords)(this, other);
            }
        }]);

        return BulletQueItem;
    }();

    (0, _Util.declare)(BulletQueItem);

    function BulletQue(x, y) {
        return new BulletQueItem(x, y);
    }

    var rnd = exports.rnd = {};
    var UniqueId = exports.UniqueId = 0;

    function NextUniqueId() {
        exports.UniqueId = UniqueId = UniqueId + 1;
        return UniqueId;
    }

    var Entity = exports.Entity = function () {
        function Entity(id, name, active, entityType, layer, position, sprite, scale, tint, bounds, expires, health, tween, size, velocity) {
            _classCallCheck(this, Entity);

            this.Id = id;
            this.Name = name;
            this.Active = active;
            this.EntityType = entityType;
            this.Layer = layer;
            this.Position = position;
            this.Sprite = sprite;
            this.Scale = scale;
            this.Tint = tint;
            this.Bounds = bounds;
            this.Expires = expires;
            this.Health = health;
            this.Tween = tween;
            this.Size = size;
            this.Velocity = velocity;
        }

        _createClass(Entity, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return {
                    type: "ShmupWarz.Entity",
                    interfaces: ["FSharpRecord", "System.IEquatable"],
                    properties: {
                        Id: "number",
                        Name: "string",
                        Active: "boolean",
                        EntityType: "number",
                        Layer: "number",
                        Position: _PIXI.Point,
                        Sprite: (0, _Util.Option)(_PIXI.Sprite),
                        Scale: (0, _Util.Option)(_PIXI.Point),
                        Tint: (0, _Util.Option)("number"),
                        Bounds: (0, _Util.Option)("number"),
                        Expires: (0, _Util.Option)("number"),
                        Health: (0, _Util.Option)(Health),
                        Tween: (0, _Util.Option)(Tween),
                        Size: _PIXI.Point,
                        Velocity: (0, _Util.Option)(_PIXI.Point)
                    }
                };
            }
        }, {
            key: "Equals",
            value: function Equals(other) {
                return (0, _Util.equalsRecords)(this, other);
            }
        }]);

        return Entity;
    }();

    (0, _Util.declare)(Entity);

    function CreatePlayer(content, x, y) {
        var position = new _PIXI.Point(0, 0);
        var sprite = new _PIXI.Sprite(content.fighter.texture);
        sprite.anchor = new _PIXI.Point(0.5, 0.5);
        var Id = NextUniqueId();
        var Name = "Player";
        var Active = true;
        var EntityType = 5;
        var Layer = 7;
        var Scale = null;
        var Sprite = sprite;
        var Tint = null;
        var Bounds = 43;
        var Expires = null;
        var Health_1 = CreateHealth(100, 100);
        var Velocity = new _PIXI.Point(0, 0);
        return new Entity(Id, Name, Active, EntityType, Layer, position, Sprite, Scale, Tint, Bounds, Expires, Health_1, null, new _PIXI.Point(sprite.width, sprite.height), Velocity);
    }

    function CreateBullet(content, x, y) {
        var position = new _PIXI.Point(x, y);
        var sprite = new _PIXI.Sprite(content.bullet.texture);
        sprite.anchor = new _PIXI.Point(0.5, 0.5);
        var Id = NextUniqueId();
        var Name = "Bullet";
        var Active = false;
        var EntityType = 1;
        var Layer = 8;
        var Scale = null;
        var Sprite = sprite;
        var Tint = 11403055;
        var Bounds = 5;
        var Expires = 0.1;
        var Health_1 = null;
        var Velocity = new _PIXI.Point(0, -800);
        return new Entity(Id, Name, Active, EntityType, Layer, position, Sprite, Scale, Tint, Bounds, Expires, Health_1, null, new _PIXI.Point(sprite.width, sprite.height), Velocity);
    }

    function CreateEnemy1(content, width, height) {
        var position = new _PIXI.Point(Math.floor(Math.random() * (width - 0)) + 0, 100);
        var sprite = new _PIXI.Sprite(content.enemy1.texture);
        sprite.anchor = new _PIXI.Point(0.5, 0.5);
        var Id = NextUniqueId();
        var Name = "Enemy1";
        var Active = false;
        var EntityType = 2;
        var Layer = 4;
        var Scale = null;
        var Sprite = sprite;
        var Tint = null;
        var Bounds = 20;
        var Expires = null;
        var Health_1 = CreateHealth(10, 10);
        var Velocity = new _PIXI.Point(0, 40);
        return new Entity(Id, Name, Active, EntityType, Layer, position, Sprite, Scale, Tint, Bounds, Expires, Health_1, null, new _PIXI.Point(sprite.width, sprite.height), Velocity);
    }

    function CreateEnemy2(content, width, height) {
        var position = new _PIXI.Point(Math.floor(Math.random() * (width - 0)) + 0, 200);
        var sprite = new _PIXI.Sprite(content.enemy2.texture);
        sprite.anchor = new _PIXI.Point(0.5, 0.5);
        var Id = NextUniqueId();
        var Name = "Enemy2";
        var Active = false;
        var EntityType = 2;
        var Layer = 5;
        var Scale = null;
        var Sprite = sprite;
        var Tint = null;
        var Bounds = 40;
        var Expires = null;
        var Health_1 = CreateHealth(20, 20);
        var Velocity = new _PIXI.Point(0, 30);
        return new Entity(Id, Name, Active, EntityType, Layer, position, Sprite, Scale, Tint, Bounds, Expires, Health_1, null, new _PIXI.Point(sprite.width, sprite.height), Velocity);
    }

    function CreateEnemy3(content, width, height) {
        var position = new _PIXI.Point(Math.floor(Math.random() * (width - 0)) + 0, 300);
        var sprite = new _PIXI.Sprite(content.enemy3.texture);
        sprite.anchor = new _PIXI.Point(0.5, 0.5);
        var Id = NextUniqueId();
        var Name = "Enemy3";
        var Active = false;
        var EntityType = 2;
        var Layer = 6;
        var Scale = null;
        var Sprite = sprite;
        var Tint = null;
        var Bounds = 70;
        var Expires = null;
        var Health_1 = CreateHealth(60, 60);
        var Velocity = new _PIXI.Point(0, 20);
        return new Entity(Id, Name, Active, EntityType, Layer, position, Sprite, Scale, Tint, Bounds, Expires, Health_1, null, new _PIXI.Point(sprite.width, sprite.height), Velocity);
    }

    function CreateExplosion(content, x, y, scale) {
        var position = new _PIXI.Point(x, y);
        var sprite = new _PIXI.Sprite(content.explosion.texture);
        sprite.anchor = new _PIXI.Point(0.5, 0.5);
        var Id = NextUniqueId();
        var Name = "Explosion";
        var Active = false;
        var EntityType = 3;
        var Layer = 9;
        var Scale = new _PIXI.Point(scale, scale);
        var Sprite = sprite;
        var Tint = 16448210;
        var Bounds = null;
        var Expires = 0.5;
        var Health_1 = null;
        var Velocity = null;
        return new Entity(Id, Name, Active, EntityType, Layer, position, Sprite, Scale, Tint, Bounds, Expires, Health_1, CreateTween(scale / 100, scale, -3, false, true), new _PIXI.Point(sprite.width, sprite.height), Velocity);
    }

    function CreateBang(content, x, y, scale) {
        var position = new _PIXI.Point(x, y);
        var sprite = new _PIXI.Sprite(content.bang.texture);
        sprite.anchor = new _PIXI.Point(0.5, 0.5);
        var Id = NextUniqueId();
        var Name = "Bang";
        var Active = false;
        var EntityType = 3;
        var Layer = 10;
        var Scale = new _PIXI.Point(scale, scale);
        var Sprite = sprite;
        var Tint = 15657130;
        var Bounds = null;
        var Expires = 0.5;
        var Health_1 = null;
        var Velocity = null;
        return new Entity(Id, Name, Active, EntityType, Layer, position, Sprite, Scale, Tint, Bounds, Expires, Health_1, CreateTween(scale / 100, scale, -3, false, true), new _PIXI.Point(sprite.width, sprite.height), Velocity);
    }

    function CreateEntityDB(content, width, height) {
        return (0, _List.ofArray)([CreatePlayer(content, 0, 0), CreateBang(content, 0, 0, 1), CreateBang(content, 0, 0, 1), CreateBang(content, 0, 0, 1), CreateBang(content, 0, 0, 1), CreateBang(content, 0, 0, 1), CreateBang(content, 0, 0, 1), CreateBang(content, 0, 0, 1), CreateBang(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateExplosion(content, 0, 0, 1), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateBullet(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy1(content, 0, 0), CreateEnemy2(content, 0, 0), CreateEnemy2(content, 0, 0), CreateEnemy2(content, 0, 0), CreateEnemy2(content, 0, 0), CreateEnemy2(content, 0, 0), CreateEnemy2(content, 0, 0), CreateEnemy3(content, 0, 0), CreateEnemy3(content, 0, 0), CreateEnemy3(content, 0, 0), CreateEnemy3(content, 0, 0)]);
    }

    var EcsGame = exports.EcsGame = function (_Game) {
        _inherits(EcsGame, _Game);

        _createClass(EcsGame, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return (0, _Util.extendInfo)(EcsGame, {
                    type: "ShmupWarz.EcsGame",
                    interfaces: [],
                    properties: {
                        Bangs: (0, _Util.makeGeneric)(_List2.default, {
                            T: ExplosionQueItem
                        }),
                        Bullets: (0, _Util.makeGeneric)(_List2.default, {
                            T: BulletQueItem
                        }),
                        Deactivate: (0, _Util.makeGeneric)(_List2.default, {
                            T: "number"
                        }),
                        Enemies1: (0, _Util.makeGeneric)(_List2.default, {
                            T: EnemyQueItem
                        }),
                        Enemies2: (0, _Util.makeGeneric)(_List2.default, {
                            T: EnemyQueItem
                        }),
                        Enemies3: (0, _Util.makeGeneric)(_List2.default, {
                            T: EnemyQueItem
                        }),
                        Explosions: (0, _Util.makeGeneric)(_List2.default, {
                            T: ExplosionQueItem
                        })
                    }
                });
            }
        }]);

        function EcsGame(height, width, images) {
            _classCallCheck(this, EcsGame);

            var _this4 = _possibleConstructorReturn(this, (EcsGame.__proto__ || Object.getPrototypeOf(EcsGame)).call(this, height, width, images));

            _this4["Bullets@"] = new _List2.default();
            _this4["Deactivate@"] = new _List2.default();
            _this4["Enemies1@"] = new _List2.default();
            _this4["Enemies2@"] = new _List2.default();
            _this4["Enemies3@"] = new _List2.default();
            _this4["Explosions@"] = new _List2.default();
            _this4["Bangs@"] = new _List2.default();
            _this4["init@437-1"] = 1;
            return _this4;
        }

        _createClass(EcsGame, [{
            key: "Bullets",
            get: function get() {
                return this["Bullets@"];
            },
            set: function set(v) {
                this["Bullets@"] = v;
            }
        }, {
            key: "Deactivate",
            get: function get() {
                return this["Deactivate@"];
            },
            set: function set(v) {
                this["Deactivate@"] = v;
            }
        }, {
            key: "Enemies1",
            get: function get() {
                return this["Enemies1@"];
            },
            set: function set(v) {
                this["Enemies1@"] = v;
            }
        }, {
            key: "Enemies2",
            get: function get() {
                return this["Enemies2@"];
            },
            set: function set(v) {
                this["Enemies2@"] = v;
            }
        }, {
            key: "Enemies3",
            get: function get() {
                return this["Enemies3@"];
            },
            set: function set(v) {
                this["Enemies3@"] = v;
            }
        }, {
            key: "Explosions",
            get: function get() {
                return this["Explosions@"];
            },
            set: function set(v) {
                this["Explosions@"] = v;
            }
        }, {
            key: "Bangs",
            get: function get() {
                return this["Bangs@"];
            },
            set: function set(v) {
                this["Bangs@"] = v;
            }
        }]);

        return EcsGame;
    }(Game);

    (0, _Util.declare)(EcsGame);

    function ActiveEntities(input) {
        var _activeEntities = function _activeEntities(input_1) {
            return function (output) {
                var _target1 = function _target1() {
                    return input_1.tail == null ? output : _activeEntities(input_1.tail)(output);
                };

                if (input_1.tail != null) {
                    if (input_1.head.Active) {
                        var x = input_1.head;
                        var xs = input_1.tail;
                        return _activeEntities(xs)(new _List2.default(x, output));
                    } else {
                        return _target1();
                    }
                } else {
                    return _target1();
                }
            };
        };

        return _activeEntities(input)(new _List2.default());
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
            return new Entity(entity.Id, entity.Name, Active, entity.EntityType, entity.Layer, entity.Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
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
                                $var1 = new Entity(entity.Id, entity.Name, Active, entity.EntityType, entity.Layer, Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
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

                                var Health_1 = CreateHealth(10, 10);
                                $var1 = new Entity(entity.Id, entity.Name, _Active, entity.EntityType, entity.Layer, _Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, Health_1, entity.Tween, entity.Size, entity.Velocity);
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

                                var _Health_ = CreateHealth(20, 20);

                                $var1 = new Entity(entity.Id, entity.Name, _Active2, entity.EntityType, entity.Layer, _Position2, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, _Health_, entity.Tween, entity.Size, entity.Velocity);
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

                                var _Health_2 = CreateHealth(60, 60);

                                $var1 = new Entity(entity.Id, entity.Name, _Active3, entity.EntityType, entity.Layer, _Position3, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, _Health_2, entity.Tween, entity.Size, entity.Velocity);
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

                                $var1 = new Entity(entity.Id, entity.Name, _Active4, entity.EntityType, entity.Layer, _Position4, entity.Sprite, Scale, entity.Tint, entity.Bounds, _Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
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

                                $var1 = new Entity(entity.Id, entity.Name, _Active5, entity.EntityType, entity.Layer, _Position5, entity.Sprite, _Scale, entity.Tint, entity.Bounds, _Expires2, entity.Health, entity.Tween, entity.Size, entity.Velocity);
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

    function BoundingRect(entity) {
        var x = entity.Position.x;
        var y = entity.Position.y;
        var w = entity.Size.x;
        var h = entity.Size.y;
        return new _PIXI.Rectangle(x - w / 2, y - h / 2, w, h);
    }

    function CollisionSystem(game, entities) {
        var findCollision = function findCollision(a) {
            return function (b) {
                var matchValue = [a.EntityType, a.Active, b.EntityType, b.Active];

                var _target1 = function _target1() {
                    return a;
                };

                if (matchValue[0] === 2) {
                    if (matchValue[1]) {
                        if (matchValue[2] === 1) {
                            if (matchValue[3]) {
                                game.AddBang(b.Position.x, b.Position.y, 1);
                                game.RemoveEntity(b.Id);

                                if (a.Health == null) {
                                    return a;
                                } else {
                                    var health = a.Health.CurHealth - 1;

                                    if (health <= 0) {
                                        game.AddExplosion(b.Position.x, b.Position.y, 0.5);
                                        var Active = false;
                                        return new Entity(a.Id, a.Name, Active, a.EntityType, a.Layer, a.Position, a.Sprite, a.Scale, a.Tint, a.Bounds, a.Expires, a.Health, a.Tween, a.Size, a.Velocity);
                                    } else {
                                        var Health_1 = CreateHealth(health, a.Health.MaxHealth);
                                        return new Entity(a.Id, a.Name, a.Active, a.EntityType, a.Layer, a.Position, a.Sprite, a.Scale, a.Tint, a.Bounds, a.Expires, Health_1, a.Tween, a.Size, a.Velocity);
                                    }
                                }
                            } else {
                                return _target1();
                            }
                        } else {
                            return _target1();
                        }
                    } else {
                        return _target1();
                    }
                } else {
                    return _target1();
                }
            };
        };

        var figureCollisions = function figureCollisions(entity) {
            return function (sortedEntities) {
                return sortedEntities.tail != null ? function () {
                    var a = BoundingRect(entity).contains(sortedEntities.head.Position.x, sortedEntities.head.Position.y) ? findCollision(entity)(sortedEntities.head) : entity;
                    return figureCollisions(a)(sortedEntities.tail);
                }() : entity;
            };
        };

        var fixCollisions = function fixCollisions(toFix) {
            return function (alreadyFixed) {
                return toFix.tail != null ? function () {
                    var a = figureCollisions(toFix.head)(alreadyFixed);
                    return fixCollisions(toFix.tail)(new _List2.default(a, alreadyFixed));
                }() : alreadyFixed;
            };
        };

        return fixCollisions(entities)(new _List2.default());
    }

    var enemyT1 = exports.enemyT1 = 2;
    var enemyT2 = exports.enemyT2 = 7;
    var enemyT3 = exports.enemyT3 = 13;

    function EnemySpawningSystem(delta, game) {
        var spawnEnemy = function spawnEnemy(tupledArg) {
            var delta_1 = tupledArg[0] - delta;

            if (delta_1 < 0) {
                game.AddEnemy(tupledArg[1]);
                var $var2 = null;

                switch (tupledArg[1]) {
                    case 0:
                        {
                            $var2 = 2;
                            break;
                        }

                    case 1:
                        {
                            $var2 = 7;
                            break;
                        }

                    case 2:
                        {
                            $var2 = 13;
                            break;
                        }

                    default:
                        {
                            $var2 = 0;
                        }
                }

                return $var2;
            } else {
                return delta_1;
            }
        };

        exports.enemyT1 = enemyT1 = spawnEnemy([enemyT1, 0]);
        exports.enemyT2 = enemyT2 = spawnEnemy([enemyT2, 1]);
        exports.enemyT3 = enemyT3 = spawnEnemy([enemyT3, 2]);
    }

    var timeToFire = exports.timeToFire = 0;

    function InputSystem(delta, mobile, game, entity) {
        var pf = mobile ? 2 : 1;

        if (entity.EntityType === 5) {
            var position = function () {
                var newPosition = _Mouse.position;

                if ((0, _Keyboard.isPressed)(90)) {
                    exports.timeToFire = timeToFire = timeToFire - delta;

                    if (timeToFire <= 0) {
                        game.AddBullet(newPosition.x - 27, newPosition.y);
                        game.AddBullet(newPosition.x + 27, newPosition.y);
                        exports.timeToFire = timeToFire = 0.1;
                    }

                    return newPosition;
                } else {
                    if (_Mouse.down) {
                        exports.timeToFire = timeToFire = timeToFire - delta;

                        if (timeToFire <= 0) {
                            game.AddBullet(newPosition.x - 27, newPosition.y);
                            game.AddBullet(newPosition.x + 27, newPosition.y);
                            exports.timeToFire = timeToFire = 0.1;
                        }

                        return newPosition;
                    } else {
                        return newPosition;
                    }
                }
            }();

            return new Entity(entity.Id, entity.Name, entity.Active, entity.EntityType, entity.Layer, position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
        } else {
            return entity;
        }
    }

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
                return new Entity(entity.Id, entity.Name, entity.Active, entity.EntityType, entity.Layer, Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
            } else {
                return _target1();
            }
        } else {
            return _target1();
        }
    }

    function ExpiringSystem(delta, entity) {
        var matchValue = [entity.Expires, entity.Active];

        var _target1 = function _target1() {
            return entity;
        };

        if (matchValue[0] != null) {
            if (matchValue[1]) {
                var v = matchValue[0];
                var exp = v - delta;
                var active = exp > 0 ? true : false;
                var Expires = exp;
                return new Entity(entity.Id, entity.Name, active, entity.EntityType, entity.Layer, entity.Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
            } else {
                return _target1();
            }
        } else {
            return _target1();
        }
    }

    function RemoveOffscreenShipsSystem(game, width, height, entity) {
        var matchValue = [entity.EntityType, entity.Active];

        var _target1 = function _target1() {
            return entity;
        };

        if (matchValue[0] === 2) {
            if (matchValue[1]) {
                if ((entity.Position.y + 0x80000000 >>> 0) - 0x80000000 > height) {
                    var Active = false;
                    return new Entity(entity.Id, entity.Name, Active, entity.EntityType, entity.Layer, entity.Position, entity.Sprite, entity.Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, entity.Tween, entity.Size, entity.Velocity);
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

    function TweenSystem(delta, game, entity) {
        var matchValue = [entity.Scale, entity.Tween, entity.Active];

        var _target1 = function _target1() {
            return entity;
        };

        if (matchValue[0] != null) {
            if (matchValue[1] != null) {
                if (matchValue[2]) {
                    var sa = matchValue[1];
                    var scale = matchValue[0];
                    {
                        var x = scale.x + sa.Speed * delta;
                        var y = scale.y + sa.Speed * delta;
                        var active = sa.Active;

                        if (x > sa.Max) {
                            x = sa.Max;
                            y = sa.Max;
                            active = false;
                        } else {
                            if (x < sa.Min) {
                                x = sa.Min;
                                y = sa.Min;
                                active = false;
                            }
                        }

                        var Scale = new _PIXI.Point(x, y);
                        var Tween_1 = CreateTween(sa.Min, sa.Max, sa.Speed, sa.Repeat, active);
                        return new Entity(entity.Id, entity.Name, entity.Active, entity.EntityType, entity.Layer, entity.Position, entity.Sprite, Scale, entity.Tint, entity.Bounds, entity.Expires, entity.Health, Tween_1, entity.Size, entity.Velocity);
                    }
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

    var ShmupWarz = exports.ShmupWarz = function (_EcsGame) {
        _inherits(ShmupWarz, _EcsGame);

        _createClass(ShmupWarz, [{
            key: _Symbol3.default.reflection,
            value: function value() {
                return (0, _Util.extendInfo)(ShmupWarz, {
                    type: "ShmupWarz.ShmupWarz",
                    interfaces: [],
                    properties: {}
                });
            }
        }]);

        function ShmupWarz(height, width0, mobile) {
            var _this6 = this;

            _classCallCheck(this, ShmupWarz);

            var _this5 = _possibleConstructorReturn(this, (ShmupWarz.__proto__ || Object.getPrototypeOf(ShmupWarz)).call(this, height, width0, (0, _List.ofArray)([["background", "images/BackdropBlackLittleSparkBlack.png"], ["bang", "images/bang.png"], ["bullet", "images/bullet.png"], ["enemy1", "images/enemy1.png"], ["enemy2", "images/enemy2.png"], ["enemy3", "images/enemy3.png"], ["explosion", "images/explosion.png"], ["fighter", "images/fighter.png"], ["font", "images/tom-thumb-white.png"]])));

            var _this = {
                contents: null
            };
            var _this_1 = _this5;
            _this5.height = height;
            _this5.mobile = mobile;
            _this5.contents = _this5;
            var pixelFactor = _this5.mobile ? 2 : 1;
            _this5.width = width0 / pixelFactor;
            _this5.entities = new _Lazy2.default(function () {
                return CreateEntityDB(_this5.contents.Content, (_this6.width + 0x80000000 >>> 0) - 0x80000000, (_this6.height + 0x80000000 >>> 0) - 0x80000000);
            });
            var fntImage = new _Lazy2.default(function () {
                return new _PIXI.Sprite(_this5.contents.Content.font.texture);
            });
            _this5.bgdImage = new _Lazy2.default(function () {
                return new _PIXI.Sprite(_this5.contents.Content.background.texture);
            });
            var bgdRect = new _PIXI.Rectangle(0, 0, _this5.width, _this5.height);
            var scaleX = _this5.width / 320;
            var scaleY = _this5.height / 480;
            _this5["init@748-2"] = 1;
            return _this5;
        }

        _createClass(ShmupWarz, [{
            key: "Initialize",
            value: function Initialize() {
                _get(ShmupWarz.prototype.__proto__ || Object.getPrototypeOf(ShmupWarz.prototype), "Initialize", this).call(this);
            }
        }, {
            key: "LoadContent",
            value: function LoadContent() {
                this.entities.value;
            }
        }, {
            key: "Draw",
            value: function Draw(gameTime) {
                var _this7 = this;

                this.spriteBatch.children.length = 0;
                this.spriteBatch.addChild(this.bgdImage.value);
                (0, _Seq.iterate)(function (spriteBatch) {
                    return function (entity) {
                        _this7.drawSprite(spriteBatch, entity);
                    };
                }(this.spriteBatch), (0, _Seq.toList)((0, _Seq.sortWith)(function (x, y) {
                    return (0, _Util.compare)(function (e) {
                        return e.Layer;
                    }(x), function (e) {
                        return e.Layer;
                    }(y));
                }, ActiveEntities(this.entities.value))));
            }
        }, {
            key: "Update",
            value: function Update(gameTime) {
                var _this8 = this;

                var current = this.entities.value;
                EnemySpawningSystem(gameTime, this);
                this.entities = new _Lazy2.default(function () {
                    return function (entities) {
                        return CollisionSystem(_this8, entities);
                    }((0, _List.map)(function () {
                        var arg = [_this8, (_this8.width + 0x80000000 >>> 0) - 0x80000000, (_this8.height + 0x80000000 >>> 0) - 0x80000000];
                        return function (entity) {
                            return RemoveOffscreenShipsSystem(arg[0], arg[1], arg[2], entity);
                        };
                    }(), (0, _List.map)(function () {
                        var arg = [gameTime, _this8];
                        return function (entity) {
                            return TweenSystem(arg[0], arg[1], entity);
                        };
                    }(), (0, _List.map)(function (entity) {
                        return ExpiringSystem(gameTime, entity);
                    }, (0, _List.map)(function (entity) {
                        return MovementSystem(gameTime, entity);
                    }, (0, _List.map)(function () {
                        var arg = [_this8, (_this8.width + 0x80000000 >>> 0) - 0x80000000, (_this8.height + 0x80000000 >>> 0) - 0x80000000];
                        return function (entity) {
                            return EntitySystem(arg[0], arg[1], arg[2], entity);
                        };
                    }(), (0, _List.map)(function () {
                        var arg = [gameTime, _this8.mobile, _this8];
                        return function (entity) {
                            return InputSystem(arg[0], arg[1], arg[2], entity);
                        };
                    }(), current)))))));
                });
            }
        }, {
            key: "RemoveEntity",
            value: function RemoveEntity(id) {
                this.Deactivate = new _List2.default(id, this.Deactivate);
            }
        }, {
            key: "AddBullet",
            value: function AddBullet(x, y) {
                this.Bullets = new _List2.default(BulletQue(x, y), this.Bullets);
            }
        }, {
            key: "AddEnemy",
            value: function AddEnemy(enemy) {
                switch (enemy) {
                    case 0:
                        {
                            this.Enemies1 = new _List2.default(EnemyQue(enemy), this.Enemies1);
                            break;
                        }

                    case 1:
                        {
                            this.Enemies2 = new _List2.default(EnemyQue(enemy), this.Enemies2);
                            break;
                        }

                    case 2:
                        {
                            this.Enemies3 = new _List2.default(EnemyQue(enemy), this.Enemies3);
                            break;
                        }

                    default:
                        {}
                }
            }
        }, {
            key: "AddExplosion",
            value: function AddExplosion(x, y, scale) {
                this.Explosions = new _List2.default(ExplosionQue(x, y, scale), this.Explosions);
            }
        }, {
            key: "AddBang",
            value: function AddBang(x, y, scale) {
                this.Bangs = new _List2.default(ExplosionQue(x, y, scale), this.Bangs);
            }
        }, {
            key: "drawSprite",
            value: function drawSprite(spriteBatch, entity) {
                if (entity.Sprite == null) {} else {
                    var scale = entity.Scale == null ? new _PIXI.Point(1, 1) : entity.Scale;
                    var color = entity.Tint == null ? 16777215 : entity.Tint;
                    entity.Sprite.x = entity.Position.x;
                    entity.Sprite.y = entity.Position.y;
                    entity.Sprite.scale = scale;
                    entity.Sprite.tint = color;
                    spriteBatch.addChild(entity.Sprite);
                }
            }
        }]);

        return ShmupWarz;
    }(EcsGame);

    (0, _Util.declare)(ShmupWarz);
    (0, _Keyboard.init)();
    (0, _Mouse.init)();
    var game = exports.game = new ShmupWarz(320 * 1.5, 480 * 1.5, false);
    game.Run();
});
//# sourceMappingURL=ShmupWarz.js.map