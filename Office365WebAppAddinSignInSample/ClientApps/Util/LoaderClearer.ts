export class LoaderClearer {
    public static StopLoader(): void {
        var winAny = <any>window;
        window.clearInterval(winAny.loaderInterval);
        $(".loader-container").hide();
        $("#app-container").show();
    }
}