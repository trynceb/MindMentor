import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: [],
  endpoints: (build) => ({
    postAiCareer: build.mutation({
      query: (payload) => ({
        url: "openai/career",
        method: "POST",
        body: payload,
      }),
    }),
    postAiMotivate: build.mutation({
      query: (payload) => ({
        url: "openai/motivate",
        method: "POST",
        body: payload,
      }),
    }),
    postAiNutrition: build.mutation({
      query: (payload) => ({
        url: "openai/nutrition",
        method: "POST",
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostAiCareerMutation,
  usePostAiMotivateMutation,
  usePostAiNutritionMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api;
