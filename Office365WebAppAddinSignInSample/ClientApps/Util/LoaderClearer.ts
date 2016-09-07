export class LoaderClearer {
    public static ShowWebApp(): void {
        var winAny = <any>window;
        window.clearInterval(winAny.loaderInterval);
        $(".loader-container").hide();
        $("#web-app").show();
    }
}