sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */


function(Controller, MessageToast, History) {
    "use strict";

    return Controller.extend("com.training.exer5lopez.controller.ReviewPage", {
        onInit: function() {
            // Get the router object
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteReviewPage").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            // Get the passed value from arguments
            var aArgs = oEvent.getParameter("arguments");

            // Display the first name value from previous page
            MessageToast.show(aArgs.firstName);
        },

        onPressBack: function() {
            // Go back to MainView using the router
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            var oRouter = this.getOwnerComponent().getRouter();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                oRouter.navTo("RouteMainView", {}, true);
            }
        },

        onAddItem: function() {
            // Instantiate the fragment

                // create dialog lazily
                if (!this.oDialog) {
                    // By using loadFragment, we are adding the fragment as a dependent to the View
                    // By doing so, we can use the functions inside the view's controller
                    this.oDialog = this.loadFragment({
                        name: "com.training.exer5lopez.fragment.ProductDialog"
                    });
                } 
                this.oDialog.then(function(oDialog) {
                    oDialog.open();
                });
        },

        // function to close the dialog
        onCloseDialog: function() {
            this.getView().byId("idProductDialog").close();
        }
    });
});