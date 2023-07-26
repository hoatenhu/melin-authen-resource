$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

$.validator.addMethod("Alphanumeric",
    function (value, element, params) {
        return value.trim().match(/^[A-Z0-9]+$/i);
    }, "");

$.validator.addMethod("Alphabet",
    function (value, element, params) {
        return value.trim().match(/^[A-Z ]+$/i);
    }, "");

$.validator.addMethod("AddressFormat",
    function (value, element, params) {
        return value.trim().match(/^[A-Z0-9-_.,;: ]+$/i);
    }, "");

$.validator.addMethod("MobileFormat",
    function (value, element, params) {
        if (params[0] === "MY")
            return value.trim().match(/^(601)[02-46-9]*[0-9]{7}$|^(601)[1]*[0-9]{8}$/g);
        else if (params[0] === "TH")
            return value.trim().match(/^((66)([0-9]{1,2}?[0-9]{3}?[0-9]{3,4}))$/g);
    }, "");

$.validator.addMethod("InternationalMobile",
    function (value, element, params) {
        return value.trim().match(/^[0-9]{0,14}$/g);
    }, "");

$.validator.addMethod("EmailFormat",
    function (value, element, params) {
        return value.trim().match(/^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
    }, "");

$.validator.addMethod("PNRFormat",
    function (value, element, params) {
        if (value === "")
            return true;

        return value.trim().match(/^[A-Z0-9-]+$/i);
    }, "");

$.validator.addMethod("DateFormat",
    function (value, element, params) {
        return value.trim().match(/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/g);
    }, "");

var BaseLoading = {
    ShowLoadingOverlay: function () {
        $.blockUI();
    },
    HideLoadingOverlay: function () {
        $.unblockUI();
    }
};

var HttpTypes = {
    GET: "GET",
    POST: "POST"
};

var iPass = {
    Validate: function (iPassForm, ErrorMessages) {
        $(iPassForm).validate({
            rules: {
                ArrivalDate: {
                    required: true,
                    DateFormat: true
                },
                DepartureDate: {
                    required: true,
                    DateFormat: true
                },
                Nationality: "required",
                DepartCountry: "required",
                InsuredNo: "required"
            },
            messages: {
                ArrivalDate: {
                    required: ErrorMessages.ArrivalDateRequired,
                    DateFormat: ErrorMessages.ArrivalDateInvalidFormat
                },
                DepartureDate: {
                    required: ErrorMessages.DepartureDateRequired,
                    DateFormat: ErrorMessages.DepartureDateInvalidFormat
                },
                Nationality: ErrorMessages.NationalityRequired,
                DepartCountry: ErrorMessages.DepartCountryRequired,
                InsuredNo: ErrorMessages.InsuredNoRequired
            },
            onfocusout: function (element) {
                $(element).valid();
            }
        });
    },
    UnderwriterValidate: function (iPassForm, ErrorMessages) {
        $(iPassForm).validate({
            rules: {
                UnderwriterQuestion: "required"
            },
            messages: {
                UnderwriterQuestion: ErrorMessages.UnderwriterQuestionRequired
            }
        });
    },
    ProfileValidate: function (iPassForm, ErrorMessages, CountryCode) {
        $(iPassForm).validate({
            rules: {
                FirstName: {
                    required: true,
                    Alphabet: true
                },
                LastName: {
                    required: true,
                    Alphabet: true
                },
                Passport: {
                    required: true,
                    Alphanumeric: true
                },
                Gender: "required",
                Nationality: "required",
                BirthDate: {
                    required: true,
                    DateFormat: true
                },
                Mobile: {
                    required: true,
                    InternationalMobile: true
                },
                Email: {
                    required: true,
                    EmailFormat: true
                },
                PNR: {
                    required: function () {
                        if (CountryCode === "TH" || CountryCode === "MY")
                            return true;

                        return false;
                    },
                    maxlength: 6,
                    PNRFormat: true
                },
                AddressLine1: {
                    required: true,
                    AddressFormat: true
                },
                AddressLine2: {
                    required: true,
                    AddressFormat: true
                },
                State: "required",
                Postal: {
                    required: true,
                    number: true
                }
            },
            messages: {
                FirstName: {
                    required: ErrorMessages.FirstNameRequired,
                    Alphabet: ErrorMessages.FirstNameInvalidFormat
                },
                LastName: {
                    required: ErrorMessages.LastNameRequired,
                    Alphabet: ErrorMessages.LastNameInvalidFormat
                },
                Passport: {
                    required: ErrorMessages.PassportRequired,
                    Alphanumeric: ErrorMessages.PassportInvalidFormat
                },
                Gender: ErrorMessages.GenderRequired,
                Nationality: ErrorMessages.NationalityRequired,
                BirthDate: {
                    required: ErrorMessages.BirthDateRequired,
                    DateFormat: ErrorMessages.BirthDateInvalidFormat
                },
                Mobile: {
                    required: ErrorMessages.MobileRequired,
                    InternationalMobile: ErrorMessages.MobileInvalidFormat
                },
                Email: {
                    required: ErrorMessages.EmailRequired,
                    EmailFormat: ErrorMessages.EmailInvalidFormat
                },
                PNR: {
                    required: ErrorMessages.PNRRequired,
                    maxlength: ErrorMessages.PNRExceedMaximumLength,
                    PNRFormat: ErrorMessages.PNRInvalidFormat
                },
                AddressLine1: {
                    required: ErrorMessages.AddressLine1Required,
                    AddressFormat: ErrorMessages.AddressLine1InvalidFormat
                },
                AddressLine2: {
                    required: ErrorMessages.AddressLine2Required,
                    AddressFormat: ErrorMessages.AddressLine2InvalidFormat
                },
                State: ErrorMessages.StateRequired,
                Postal: {
                    required: ErrorMessages.PostalRequired,
                    number: ErrorMessages.PostalInvalidFormat
                }
            },
            onfocusout: function (element) {
                $(element).valid();
            }
        });
    },
    SummaryValidate: function (iPassForm, ErrorMessages) {
        $(iPassForm).validate({
            rules: {
                Acknowledgement: "required",
                ConsentAgreement: "required",
                Payment: "required",
                eGHLTermsConditions: "required"
            },
            messages: {
                Acknowledgement: ErrorMessages.AcknowledgementRequired,
                ConsentAgreement: ErrorMessages.ConsentAgreementRequired,
                Payment: ErrorMessages.PaymentRequired,
                eGHLTermsConditions: ErrorMessages.eGHLTermsConditionsRequired
            },
            onfocusout: function (element) {
                $(element).valid();
            }
        });
    },
    CallWebService: function (WebServiceURL, WebServiceCallback, HttpType, SubmittedData, FailedMessage) {
        if (WebServiceURL === undefined || WebServiceURL === null || WebServiceURL === "")
            return;

        if (WebServiceCallback === undefined || WebServiceCallback === null || WebServiceCallback === "")
            return;

        if (HttpType === undefined || HttpType === null || HttpType === "")
            HttpType = HttpTypes.GET;

        if (SubmittedData === undefined || SubmittedData === null || SubmittedData === "")
            SubmittedData = {};

        if (FailedMessage === undefined || FailedMessage === null || FailedMessage === "")
            FailedMessage = "There is something wrong when retrieving : " + WebServiceURL.split('/')[1];

        return $.ajax({
            type: HttpType,
            data: JSON.stringify(SubmittedData),
            url: WebServiceURL,
            beforeSend: function () {
                BaseLoading.ShowLoadingOverlay();
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                data = data.d;

                if ((data.Data === undefined || data.Data === null || data.Data === "") && (data.Message !== undefined || data.Message !== null || data.Message !== "")) {
                    alert(data.Message);
                } else {
                    WebServiceCallback(data.Data);

                    BaseLoading.HideLoadingOverlay();
                }
            },
            error: function () {
                alert(FailedMessage);
            }
        });
    },
    GetQueryParameter: function (Name) {
        Name = Name.replace(/[\[\]]/g, "\\$&");

        let Regex = new RegExp("[?&]" + Name + "(=([^&#]*)|&|#|$)");
        let Results = Regex.exec(window.location.href);

        if (!Results)
            return null;

        if (!Results[2])
            return "";

        return decodeURIComponent(Results[2].replace(/\+/g, " "));
    }
};