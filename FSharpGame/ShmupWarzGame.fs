module ShmupWarzGame

open System
open Microsoft.Xna.Framework
open Microsoft.Xna.Framework.Graphics
open Microsoft.Xna.Framework.Input
open Microsoft.Xna.Framework.Input.Touch

open System.Collections.Generic


type ShmupWarz (height, width, mobile) as this =
    inherit EcsGame(height, width, mobile)

    let mutable Entities = lazy(CreateEntityDB(this.Content, width, height))

    (** Initialize MonoGame *)
    override this.Initialize() =
        this.IsMouseVisible <- true
        base.Initialize()

    (** Load Resources *)
    override this.LoadContent() =
        Entities.Force() |> ignore
        

    (** Game Logic Loop *)
    override this.Update (gameTime) =
        if GamePad.GetState(PlayerIndex.One).Buttons.Back = ButtonState.Pressed then 
            this.Exit()

        let delta = float32 gameTime.ElapsedGameTime.TotalSeconds
        let current = Entities.Value

        Entities <-  // Everything happens here:
            lazy (current
                 |> List.map(InputSystem(Keyboard.GetState(), Mouse.GetState(), TouchPanel.GetState(), delta, mobile, this))
                 |> List.map(EntitySystem(this, width, height))
                 |> List.map(MovementSystem(delta))
                 |> List.map(ExpiringSystem(delta))
                 |> List.map(ScaleAnimationSystem(delta, this))
                 |> List.map(RemoveOffscreenShipsSystem(this, width, height))
                 |> CollisionSystem(this)
                 |> EnemySpawningSystem(delta, this)
                 )

        this.EntityList <- (ActiveEntities (Entities.Force()) [])

    (** Deactivate an Entity *)
    override this.RemoveEntity(entity:IEntity) =
        this.Deactivate <- entity.Id :: this.Deactivate

    (** Activate a Bullet *)
    override this.AddBullet(position : Vector2) =
        this.Bullets <- CreateTBullet(position) :: this.Bullets

    (** Activate an Enemy *)
    override this.AddEnemy(enemy : Enemies) =
        match enemy with 
        | Enemies.Enemy1 -> this.Enemies1 <- CreateTEnemy(enemy) :: this.Enemies1
        | Enemies.Enemy2 -> this.Enemies2 <- CreateTEnemy(enemy) :: this.Enemies2
        | Enemies.Enemy3 -> this.Enemies3 <- CreateTEnemy(enemy) :: this.Enemies3
        | _ -> ()

    (** Activate an Explosion *)
    override this.AddExplosion(position : Vector2, scale : float32) =
        this.Explosions <- CreateTExplosion(position, scale) :: this.Explosions


