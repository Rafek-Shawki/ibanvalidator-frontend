import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl, isJsonContentType, processError, processResponse} from "../utils/requestUtils";
import {IResponse} from "../models/IResponse";
import {IValidationResult} from "../models/IValidationResult.ts";

export const ibanValidationAPI = createApi({
	reducerPath: 'ibanValidationAPI',
	baseQuery: fetchBaseQuery({baseUrl, isJsonContentType}),
	tagTypes: ['IBanValidator'],
	endpoints: (builder) => ({
		validateIban: builder.query<IResponse<IValidationResult>, {
			iban: string
		}>({
			query: (params) => ({
				url: '/iban/validate',
				method: 'POST',
				body: {
					iban: params.iban
				}
			}),
			keepUnusedDataFor: 120,
			transformResponse: processResponse<IValidationResult>,
			transformErrorResponse: processError,
			providesTags: (_result, _error) => ['IBanValidator']
		})
	})
});
