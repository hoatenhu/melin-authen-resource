window.addEventListener("load", function () {
    this.setTimeout(() => {
        var a = document.querySelector("a.RedirectUri");
        if (a) {
            const link = a.href + "?autologin=1";
            window.location = link;
        }
    }, 5000);
});
