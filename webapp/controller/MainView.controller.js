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
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("addButtonMsg");
            this.fnDisplayMsg(sMsg);
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
            var oInputFNameValue = this.getView().byId("idInptFName").getValue();
            var oInputLNameValue = this.getView().byId("idInptLName").getValue();

            //check if first name and/or last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === "") {
                var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                var sMsg = oTextBundle.getText("requiredFieldBlankMsg");
                this.fnDisplayErrorMsg(sMsg);
            }
        }
    });
});