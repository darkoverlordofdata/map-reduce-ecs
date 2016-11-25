module Entities

(** ShmupWarz Game Demo *)
#if HTML5
open Fable.Core
open Fable.Import
open Fable.Import.Browser
open Fable.Core.JsInterop
#endif
open Bosco
open Components
open System.Collections.Generic
let rnd = System.Random()
let mutable UniqueId = 0
let NextUniqueId() = 
    UniqueId <- UniqueId + 1
    UniqueId

(** Entity is a record of components *)
type Entity = 
    {
        Id              : int;                  (* Unique sequential id *)
        Name            : string;               (* Display name *)
        Active          : bool;                 (* In use *)
        EntityType      : EntityType;           (* Category *)
        Layer           : Layer;                (* Display Layer *)
        Position        : PIXI.Point;           (* Position *)
        Sprite          : PIXI.Sprite option;   (* Sprite *)
        Scale           : PIXI.Point option;    (* Display Scale *)
        Tint            : Color option;         (* Color to use as tint *)
        Bounds          : int option;           (* For Hit Detection *)
        Expires         : float option;         (* Entity duration *)
        Health          : Health option;        (* Points *)
        Tween           : Tween option;         (* Explosion tweens *)
        Size            : PIXI.Point;           (* Sprite size *)
        Velocity        : PIXI.Point option;    (* Movement speed *)
    }

(** Create a Player Entity *)
let CreatePlayer (content:obj) =
    let sprite = PIXI.Sprite(unbox content?fighter?texture)
    sprite.anchor <- PIXI.Point(0.5, 0.5)
    {
        Id = NextUniqueId();
        Name = "Player";
        Active = true;
        EntityType = EntityType.Player; 
        Layer = Layer.PLAYER;
        Position = PIXI.Point(0., 0.); 
        Scale = None;
        Sprite = Some(sprite);
        Tint = None;

        Bounds = Some(43);
        Expires = None;
        Health = Some(CreateHealth(100, 100));
        Velocity = Some(PIXI.Point(0., 0.));
        Tween = None;
        Size = PIXI.Point(float sprite.width, float sprite.height);
    }
     
(** Create a Bullet Entity *)
let CreateBullet (content:obj) =
    let sprite = PIXI.Sprite(unbox content?bullet?texture)
    sprite.anchor <- PIXI.Point(0.5, 0.5)
    {
        Id = NextUniqueId();
        Name = "Bullet";
        Active = false;
        EntityType = EntityType.Bullet; 
        Layer = Layer.BULLET;
        Position = PIXI.Point(0., 0.); 
        Scale = None;
        Sprite = Some(sprite);
        Tint = Some(Color.GreenYellow);

        Bounds = Some(5);
        Expires = Some(0.1);
        Health = None;
        Velocity = Some(PIXI.Point(0., -800.));
        Tween = None;
        Size = PIXI.Point(float sprite.width, float sprite.height);
    }

(** Create Enemy *)
let CreateEnemy1 (content:obj)  =
    let sprite = PIXI.Sprite(unbox content?enemy1?texture)
    sprite.anchor <- PIXI.Point(0.5, 0.5)
    {
        Id = NextUniqueId();
        Name = "Enemy1";
        Active = false;
        EntityType = EntityType.Enemy; 
        Layer = Layer.ENEMY1;
        Position = PIXI.Point(0., 0.); 
        Scale = None;
        Sprite = Some(sprite);
        Tint = None;

        Bounds = Some(20);
        Expires = None
        Health = Some(CreateHealth(10, 10));
        Velocity = Some(PIXI.Point(0., 40.));
        Tween = None;
        Size = PIXI.Point(float sprite.width, float sprite.height);
    }
(** Create Enemy *)
let CreateEnemy2 (content:obj) =
    let sprite = PIXI.Sprite(unbox content?enemy2?texture)
    sprite.anchor <- PIXI.Point(0.5, 0.5)
    {
        Id = NextUniqueId();
        Name = "Enemy2";
        Active = false;
        EntityType = EntityType.Enemy; 
        Layer = Layer.ENEMY2;
        Position = PIXI.Point(0., 0.); 
        Scale = None;
        Sprite = Some(sprite);
        Tint = None;

        Bounds = Some(40);
        Expires = None
        Health = Some(CreateHealth(20, 20));
        Velocity = Some(PIXI.Point(0., 30.));
        Tween = None;
        Size = PIXI.Point(float sprite.width, float sprite.height);
    }

(** Create Enemy *)
let CreateEnemy3 (content:obj)  =
    let sprite = PIXI.Sprite(unbox content?enemy3?texture)
    sprite.anchor <- PIXI.Point(0.5, 0.5)
    {
        Id = NextUniqueId();
        Name = "Enemy3";
        Active = false;
        EntityType = EntityType.Enemy; 
        Layer = Layer.ENEMY3;
        Position = PIXI.Point(0., 0.); 
        Scale = None;
        Sprite = Some(sprite);
        Tint = None;

        Bounds = Some(70);
        Expires = None
        Health = Some(CreateHealth(60, 60));
        Velocity = Some(PIXI.Point(0., 20.));
        Tween = None;
        Size = PIXI.Point(float sprite.width, float sprite.height);
    }

(** Create Big Explosion *)
let CreateExplosion (content:obj) =
    let sprite = PIXI.Sprite(unbox content?explosion?texture)
    sprite.anchor <- PIXI.Point(0.5, 0.5)
    {
        Id = NextUniqueId();
        Name = "Explosion";
        Active = false;
        EntityType = EntityType.Explosion; 
        Layer = Layer.EXPLOSION;
        Position = PIXI.Point(0., 0.); 
        Scale = Some(PIXI.Point(1., 1.))
        Sprite = Some(sprite);
        Tint = Some(Color.LightGoldenrodYellow);

        Bounds = None;
        Expires = Some(0.5);
        Health = None;
        Velocity = None;
        Tween = Some(CreateTween(1./100., 1., -3., false, true));
        Size = PIXI.Point(float sprite.width, float sprite.height);
    }

let CreateBang (content:obj) =
    let sprite = PIXI.Sprite(unbox content?bang?texture)
    sprite.anchor <- PIXI.Point(0.5, 0.5)
    {
        Id = NextUniqueId();
        Name = "Bang";
        Active = false;
        EntityType = EntityType.Explosion; 
        Layer = Layer.BANG;
        Position = PIXI.Point(0., 0.); 
        Scale = Some(PIXI.Point(1., 1.))
        Sprite = Some(sprite);
        Tint = Some(Color.PaleGoldenrod);

        Bounds = None;
        Expires = Some(0.5);
        Health = None;
        Velocity = None;
        Tween = Some(CreateTween(1./100., 1., -3., false, true));
        Size = PIXI.Point(float sprite.width, float sprite.height);
    }

