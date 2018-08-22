/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

const WelcomeViewModel = require("./welcome-view-model");

function onNavigatingTo(args) {
    const page = args.object;
    page.cssClasses.add("welcome-page-background");
    const view = page.getViewById("slide-content");
    page.bindingContext = new WelcomeViewModel(view);
}

exports.onNavigatingTo = onNavigatingTo;
