export class LoaderClearer {
    public static ClearInterval(): void {
        var winAny = <any>window;
        window.clearInterval(winAny.loaderInterval);
        $(".loader-container").hide();
        $("#web-app").show();
    }
}