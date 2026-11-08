import { apiSlice } from "./base-query";

export const listingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Mengambil semua listing untuk homepage
    getAllListing: builder.query<any, { page?: number } | void>({
      query: (arg) => ({
        url: "/listing",
        method: "GET",
        params: arg && "page" in arg ? { page: arg.page } : {},
      }),
    }),

    // Mengambil listing milik user yang sedang login
    getMyListings: builder.query<any, { page?: number } | void>({
      query: (arg) => ({
        url: "/my-listings",
        method: "GET",
        params: arg && "page" in arg ? { page: arg.page } : {},
      }),
    }),

    // Detail listing berdasarkan slug
    getDetailListing: builder.query({
      query: (slug: string) => ({
        url: `/listing/${slug}`,
        method: "GET",
      }),
    }),

    // Mengambil tanggal yang tidak tersedia untuk booking
    getDisabledDates: builder.query<string[], number>({
      query: (listingId) => ({
        url: `/listing/${listingId}/disabled-dates`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetAllListingQuery,
  useGetMyListingsQuery,
  useGetDetailListingQuery,
  useGetDisabledDatesQuery,
} = listingApi;