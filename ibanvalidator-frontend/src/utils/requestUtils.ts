import {IResponse} from "../models/IResponse";

export const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export const isJsonContentType = (headers: Headers) => ['application/json'].includes(headers.get('Content-Type')?.trimEnd()!);

export const processResponse = <T>(response: IResponse<T>, _meta: any, _arg: unknown): IResponse<T> => {
	console.log({response});
	return response;
};

export const processError = (error: { status: number, data: IResponse<void> }, _meta: unknown, _arg: unknown): {
	status: number;
	data: IResponse<void>;
} => {
	console.log({error});
	return error;
};
