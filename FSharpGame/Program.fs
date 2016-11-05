open ShmupWarzGame

[<EntryPoint>]
let main argv = 
//    use game = new ShmupWarz(600, 400, false)
    use game = new ShmupWarz(900, 600, false)
    game.Run()
    0
