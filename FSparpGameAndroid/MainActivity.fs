namespace FSparpGameAndroid

open System
open Android.App
open Android.Content.PM
open Android.OS
open Android.Views
open PlatformerGame


[<Activity (Label = "FSparpGameAndroid"
    , MainLauncher = true
    , Icon = "@drawable/icon"
    , AlwaysRetainTaskState = true
    , LaunchMode = Android.Content.PM.LaunchMode.SingleInstance
    , ScreenOrientation = ScreenOrientation.Portrait
    , ConfigurationChanges = (ConfigChanges.Orientation ||| ConfigChanges.Keyboard ||| ConfigChanges.KeyboardHidden ||| ConfigChanges.ScreenSize)
    )>]
type MainActivity () =
    inherit Microsoft.Xna.Framework.AndroidGameActivity()

    override this.OnCreate (bundle) =
        
        base.OnCreate (bundle)

        let g = new Platformer(this.Resources.DisplayMetrics.HeightPixels, this.Resources.DisplayMetrics.WidthPixels)
        //let v = g.Services.GetService(typedefof<View>)
        this.SetContentView(g.Services.GetService(typedefof<View>) :?> View)
        g.Run()



//type MainActivity () =
//    inherit Activity ()
//
//    let mutable count:int = 1
//
//    override this.OnCreate (bundle) =
//
//        base.OnCreate (bundle)
//
//        // Set our view from the "main" layout resource
//        this.SetContentView (Resource_Layout.Main)
//
//        // Get our button from the layout resource, and attach an event to it
//        let button = this.FindViewById<Button>(Resource_Id.MyButton)
//        button.Click.Add (fun args -> 
//            button.Text <- sprintf "%d clicks!" count
//            count <- count + 1
//        )



