[<AutoOpen>]
module ComponentsModule
open System
open Microsoft.Xna.Framework
open Microsoft.Xna.Framework.Graphics
open Microsoft.Xna.Framework.Content


(** Layer - All entities need a display layer *)
type Layer =
    | DEFAULT           = 0
    | BACKGROUND        = 1
    | TEXT              = 2
    | LIVES             = 3
    | ENEMY1            = 4
    | ENEMY2            = 5
    | ENEMY3            = 6
    | PLAYER            = 7
    | BULLET            = 8
    | EXPLOSION         = 9
    | PARTICLE          = 10
    | HUD               = 11


(** EntityType Component *)
type EntityType =
    | Background        = 0
    | Bullet            = 1
    | Enemy             = 2
    | Explosion         = 3
    | Particle          = 4
    | Player            = 5

(** Sound Effect Component *)
type Effect =
    | PEW               = 0
    | ASPLODE           = 1
    | SMALLASPLODE      = 2


(** Enemy Type Component *)
type Enemies =
    | Enemy1            = 0
    | Enemy2            = 1
    | Enemy3            = 2


(** Health Component *)
type Health =
    {
        CurHealth: int;
        MaxHealth: int;
    }

(** ScaleAnimation Component *)
type ScaleAnimation =
    {
        Min : float32;
        Max : float32;
        Speed : float32;
        Repeat : bool;
        Active : bool;
    }


(** Request an enemy *)
type TEnemy =
    {
        Enemy : Enemies;
    }

(** Request an explosion *)
type TExplosion =
    {
        Position : Vector2;
        Scale : float32;
    }
(** Request a bullet *)
type TBullet =
    {
        Position : Vector2;
    }


(** Entity is a record of components *)
type Entity =
    {
                                            (* *Core Items* *)
        Id              : int;              (* Unique sequential id *)
        Name            : string;           (* Display name *)
        Active          : bool;             (* In use *)
        EntityType      : EntityType;       (* Category *)
        Layer           : Layer;            (* Display Layer *)
        Size            : Vector2;          (* Size *)
        Position        : Vector2;          (* Position *)
        Sprite          : Sprite option;    (* Sprite *)
        Scale           : Vector2 option;   (* Display Scale *)

                                            (* *ShmupWarz Items* *)
        Bounds          : int option;
        Expires         : float32 option;
        Health          : Health option;
        Velocity        : Vector2 option;
        ScaleAnimation  : ScaleAnimation option;
    }
    interface IEntity with
        member self.Id with get() = self.Id
        member self.Name with get() = self.Name
        member self.Active with get() = self.Active
        member self.EntityType with get() = int self.EntityType
        member self.Layer with get() = int self.Layer
        member self.Size with get() = self.Size
        member self.Position with get() = self.Position
        member self.Sprite with get() = self.Sprite
        member self.Scale with get() = self.Scale

(**
 * The abstract EscGame provides interface and lists to
 * use for adding and removing entities
 *)
[<AbstractClass>]
type EcsGame(height, width, mobile)=
    inherit AbstractGame(height, width, mobile)
    //inherit Game()

    member val Bullets = List.empty<TBullet> with get,set
    member val Deactivate = List.empty<int> with get,set
    member val Enemies1 = List.empty<TEnemy> with get,set
    member val Enemies2 = List.empty<TEnemy> with get,set
    member val Enemies3 = List.empty<TEnemy> with get,set
    member val Explosions = List.empty<TExplosion> with get,set

    abstract member AddBullet : Vector2 -> unit
    abstract member AddEnemy : Enemies -> unit 
    abstract member AddExplosion : Vector2 * float32 -> unit
    abstract member RemoveEntity: IEntity -> unit


(**
 * Returns a list of active entities for drawing.
 * No need to rev the returned list, they will be sorted by layer.
 *)
let rec ActiveEntities (input:Entity list) (output:IEntity list) =
    match input with
    | x::xs when x.Active -> ActiveEntities xs ((x:>IEntity)::output)
    | _::xs -> ActiveEntities xs output 
    | [] -> output

