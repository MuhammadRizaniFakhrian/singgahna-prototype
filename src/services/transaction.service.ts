
import { apiSlice } from "./base-query";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    // Check listing availability
    checkAvailability: build.mutation<any, any>({
      query: (payload) => ({
        url: "/transaction/is-available",
        method: "POST",
        body: payload,
      }),
    }),

    // Create booking transaction
    transaction: build.mutation<any, any>({
      query: (payload) => ({
        url: "/transaction",
        method: "POST",
        body: payload,
      }),
    }),

    // Get transactions belonging to logged-in user
    getTransactions: build.query<any, { page?: number } | void>({
      query: (arg) => ({
        url: "/transaction",
        method: "GET",
        params: arg && "page" in arg ? { page: arg.page } : {},
      }),
    }),

    // Get transaction detail
    getDetailTransaction: build.query<any, string | number>({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "GET",
      }),
    }),

    // Get transaction summary
    getTransactionSummary: build.query<any, void>({
      query: () => ({
        url: "/transaction/summary",
        method: "GET",
      }),
    }),

  }),
});

export const {
  useCheckAvailabilityMutation,
  useTransactionMutation,
  useGetTransactionsQuery,
  useGetDetailTransactionQuery,
  useGetTransactionSummaryQuery,
} = transactionApi;
