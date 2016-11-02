module MyGame

open Microsoft.Xna.Framework
open Microsoft.Xna.Framework.Graphics
open Microsoft.Xna.Framework.Input

type Game1 () as this =
    inherit Game()

    [<DefaultValue>]
    val mutable graphics:GraphicsDeviceManager
    [<DefaultValue>]
    val mutable spriteBatch:SpriteBatch
 

    do 
        this.graphics <- new GraphicsDeviceManager(this)
        this.Content.RootDirectory <- "Content"
        this.graphics.IsFullScreen <- true
        this.graphics.PreferredBackBufferWidth <- 800
        this.graphics.PreferredBackBufferHeight <- 480
        this.graphics.SupportedOrientations <- DisplayOrientation.LandscapeLeft ||| DisplayOrientation.LandscapeRight


    override this.Initialize() =
        base.Initialize()

    override this.LoadContent() =
        this.spriteBatch <- new SpriteBatch(this.GraphicsDevice)


    override this.Update(gameTime) =
        base.Update(gameTime)

    override this.Draw(gameTime) =
        this.GraphicsDevice.Clear(Color.CornflowerBlue)
        base.Draw(gameTime)

