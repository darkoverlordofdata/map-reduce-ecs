open PlatformerGame

[<EntryPoint>]
let main argv = 
//    use game = new Platformer(600, 400, false)
    use game = new Platformer(900, 600, false)
    game.Run()
    0
