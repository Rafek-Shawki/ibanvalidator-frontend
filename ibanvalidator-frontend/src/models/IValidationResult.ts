import {IBankInfo} from "./IBankInfo.ts";

export interface IValidationResult {
	isValid: boolean;
	iban: string;
	accountNumber: string;
	bankInfoDTO: IBankInfo;
	invalidityCode: number;
}