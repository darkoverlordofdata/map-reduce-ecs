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
module ExpiringSystemModule =
    (** 
    * Expiring System 
    *
    * Destroy entities when their time is up
    *)
    let ExpiringSystem (delta:float) entity =
        match entity.Expires, entity.Active with
        | Some(v), true ->
            let exp = v - delta
            let active = if exp > 0. then true else false
            { 
                entity with 
                    Expires = Some(exp);
                    Active = active;
            }
        | _ -> entity
