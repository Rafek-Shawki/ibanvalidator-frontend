import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
	en: {
		translation: {
			welcome: "Welcome to the IBAN Validator",
			instruction: "Please enter a german IBAN to check if it’s valid and to show bank details if possible.",
			ibanLabel: "Enter IBAN",
			verify: "Verify",
			ibanValid: "IBAN is valid!",
			ibanInvalid: "IBAN is invalid.",
			validationResult: "IBAN Validation Result:",
			bankNumber: "Bank Number",
			accountNumber: "Account Number",
			bankName: "Bank Name",
			bic: "BIC",
			valid: "Valid",
			validReason: "Reason",
			iban: "IBAN",
			yes: "Yes",
			no: "No",
			invalidityCode1: "That was not a german IBAN",
			invalidityCode2: "IBAN is invalid.",
			ibanValidationFailed: "Failed to validate IBAN. Please try again.",
			theme: "Switch Light/Dark Mode",
			language: "Change Language",
		},
	},
	de: {
		translation: {
			welcome: "Willkommen beim IBAN-Validator",
			instruction: "Bitte geben Sie eine deutsche IBAN ein, um zu prüfen, ob sie gültig ist, und um die Bankdaten wenn möglich anzuzeigen.",
			ibanLabel: "IBAN eingeben",
			verify: "Überprüfen",
			ibanValid: "IBAN ist gültig!",
			ibanInvalid: "IBAN ist ungültig.",
			validationResult: "IBAN-Validierungsergebnis:",
			bankNumber: "Bankleitzahl",
			accountNumber: "Kontonummer",
			bankName: "Bankname",
			bic: "BIC",
			valid: "Gültig",
			validReason: "Grund",
			iban: "IBAN",
			yes: "Ja",
			no: "Nein",
			invalidityCode1: "Das ist keine deutsche IBAN",
			invalidityCode2: "IBAN ist ungültig",
			ibanValidationFailed: "IBAN konnte nicht validiert werden. Bitte versuchen Sie es erneut.",
			theme: "Licht-/Dunkelmodus umschalten",
			language: "Sprache ändern",
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
