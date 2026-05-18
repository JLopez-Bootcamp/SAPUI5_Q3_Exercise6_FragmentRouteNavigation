sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], 
    /*
    @param {typeof sap.ui.core.mvc.Controller} Controller
    */

(Controller, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("com.training.exer5lopez.controller.MainView", {
        onInit() {
        },

        onAddItem: function() {
            /* COMMENT OUT FOR FRAGMENTS, ROUTE AND NAVIGATION ACTIVITY
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("addButtonMsg");
            this.fnDisplayMsg(sMsg);
            */

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

        onCloseDialog: function() {
            this.getView().byId("idProductDialog").close();
        },
        
        fnDisplayMsg: function(sMsg) {
            MessageToast.show(sMsg);
        },

        fnDisplayErrorMsg: function(sMsg) {
            MessageBox.error(sMsg);
        },


        onChangeMOP: function(oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");

            // check if gcash is selected
            var oMobileLabel = this.getView().byId("idLblPhone");
            var oMobileInput = this.getView().byId("idInputPhone");
            if (sSelectedKey === "GCASH") {
                // show the mobile field
                oMobileLabel.setVisible(true);
                oMobileInput.setVisible(true);
            } else {
                oMobileLabel.setVisible(false);
                oMobileInput.setVisible(false);
            }

            // check if credit card is selected
            var oCreditCardLabel = this.getView().byId("idLblCreditCard");
            var oCreditCardInput = this.getView().byId("idInputCreditCard");
            if (sSelectedKey === "CC") {
                // show the credit card field
                oCreditCardLabel.setVisible(true);
                oCreditCardInput.setVisible(true);
            } else {
                oCreditCardLabel.setVisible(false);
                oCreditCardInput.setVisible(false);
            }

            // show selected mode of payment in message toast
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = "";
            if (sSelectedKey === "GCASH") {
                sMsg = oTextBundle.getText("gCashLbl");
            } else if (sSelectedKey === "CC") {
                sMsg = oTextBundle.getText("creditCardLbl");
            } else {
                sMsg = oTextBundle.getText("cashOnDeliveryLbl");
            }
            this.fnDisplayMsg(sMsg);
        },

        onPressCheckout: function() {
            /* COMMENT OUT FOR FRAGMENTS, ROUTE AND NAVIGATION ACTIVITY
            var oInputFNameValue = this.getView().byId("idInptFName").getValue();
            var oInputLNameValue = this.getView().byId("idInptLName").getValue();

            //check if first name and/or last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === "") {
                var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                var sMsg = oTextBundle.getText("requiredFieldBlankMsg");
                this.fnDisplayErrorMsg(sMsg);
            }
            */

            var oInputFNameValue = this.getView().byId("idInptFName");
            var oInputLNameValue = this.getView().byId("idInptLName");
            var oInputFNameValue = oInputFNameValue.getValue();
            var oInputLNameValue = oInputLNameValue.getValue();

            // Check if first name and/or last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === "") {

                // set value state to error
                this.getView().byId("idInptFName").setValueState("Error");
                this.getView().byId("idInptLName").setValueState("Error");
            } else {
                this.getView().byId("idInptFName").setValueState("None");
                this.getView().byId("idInptLName").setValueState("None");

                // Navigate to review page passing first
                oRouter.navTo("RoutReviewPage", {
                    firstName: oInputFNameValue
                });
            }

        }
    });
});