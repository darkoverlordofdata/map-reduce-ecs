open System
open ShmupWarzGame


[<EntryPoint>]
let main argv = 
//    use game = new ShmupWarz(600, 400, false)
    let height = 750
    let width = float32 height / 1.5f
    use game = new ShmupWarz(int height, int width, false)
    game.Run()
    0



