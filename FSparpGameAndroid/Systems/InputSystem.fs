[<AutoOpen>]
module InputSystem
open System
open Microsoft.Xna.Framework
open Microsoft.Xna.Framework.Input
open Microsoft.Xna.Framework.Input.Touch

let mutable timeToFire = 0.0f
(** Get Player Input *)
let InputSystem (kbState:KeyboardState, msState:MouseState, tcState:TouchCollection, delta:float32, game:EcsGame) entity =

    let rec HandleKeys keys =
        match keys with
        | [] -> 
            0
        | x :: xs ->
            match x with
            | Keys.Z -> 
                timeToFire <- timeToFire - delta
                if timeToFire <= 0.0f then
                    game.AddBullet((Vector2(entity.Position.X-27.f, entity.Position.Y)))
                    game.AddBullet((Vector2(entity.Position.X+27.f, entity.Position.Y)))
                    timeToFire <- 0.1f
                HandleKeys xs 
            | _ -> 
                HandleKeys xs 

    match entity.EntityType with
    | Player -> 

        let position =
            if tcState.Count > 0 then
                let p = tcState.[0].Position
                let newPosition = Vector2(float32 (p.X/2.0f), float32 (p.Y/2.0f))
                timeToFire <- timeToFire - delta
                if timeToFire <= 0.0f then
                    game.AddBullet(Vector2(float32 (newPosition.X-27.0f), float32 (newPosition.Y)))
                    game.AddBullet(Vector2(float32 (newPosition.X+27.0f), float32 (newPosition.Y)))
                    timeToFire <- 0.1f
                newPosition

            else
                entity.Position

        (* Set Player Position *)
        { entity with Position = position;  }

    | _ -> entity
