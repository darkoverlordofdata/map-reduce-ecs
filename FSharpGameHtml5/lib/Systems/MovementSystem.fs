namespace Systems

#if HTML5
open Fable.Core
open Fable.Import
open Fable.Import.Browser
open Fable.Core.JsInterop
#endif
open Bosco
open Components
open Entities
open SystemInterface
open System.Collections.Generic

[<AutoOpen>]
module MovementSystemModule =
    (** Movement System *)
    let MovementSystem (delta:float) entity =

        match entity.Velocity, entity.Active with

        | Some(velocity), true ->
            let x = entity.Position.x + velocity.x * delta
            let y = entity.Position.y + velocity.y * delta
            { entity with Position = PIXI.Point(float x, float y)}

        | _ -> entity

