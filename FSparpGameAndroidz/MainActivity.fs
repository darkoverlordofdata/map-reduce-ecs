namespace FSparpGameAndroid

open Android.App
open Android.Content.PM
open Android.OS
open Android.Views
open MyGame

[<Activity (Label = "FSparpGameAndroid"
    , MainLauncher = true
    , Icon = "@drawable/icon"
    , AlwaysRetainTaskState = true
    , LaunchMode = Android.Content.PM.LaunchMode.SingleInstance
    , ScreenOrientation = ScreenOrientation.SensorLandscape
    , ConfigurationChanges = (ConfigChanges.Orientation ||| ConfigChanges.Keyboard ||| ConfigChanges.KeyboardHidden ||| ConfigChanges.ScreenSize)
    )>]
type MainActivity () =
    inherit Microsoft.Xna.Framework.AndroidGameActivity()

    override this.OnCreate (bundle) =
        base.OnCreate (bundle)
        let g = new Game1()
        let v = g.Services.GetService(typedefof<View>)
        this.SetContentView(v :?> View)
        g.Run()


