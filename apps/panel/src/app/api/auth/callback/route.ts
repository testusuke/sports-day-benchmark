import { NextRequest } from "next/server";
import { gql } from "@/gql/__generated__";
import { makeApolloClient } from "@/util/ApolloClient";
import { cookies } from "next/headers";

const query = gql(`
  mutation Login($code: String!, $redirect_uri: String!) {
    login(input: { code: $code, redirectURL: $redirect_uri }) {
      token
    }
  }
`);

export async function POST(request: NextRequest) {
  //  form data
  const form = await request.formData();
  //  get state and code
  const code = form.get("code");
  //  redirect uri
  const redirectUri = process.env.NEXT_PUBLIC_OIDC_REDIRECT_URL;
  //  post code to the backend using fetch
  const client = makeApolloClient();
  const { data, errors } = await client.mutate({
    mutation: query,
    variables: {
      code: code as string,
      redirect_uri: redirectUri as string,
    },
  });

  if (errors) {
    return new Response(null, {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //  get cookie from response
  const token = data?.login.token;
  const subDirectory = process.env.SUB_DIRECTORY
    ? process.env.SUB_DIRECTORY
    : "/";

  if (token) {
    //  set cookie
    cookies().set("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 3600,
    });
  }

  //  redirect to root page
  return new Response(null, {
    status: 301,
    headers: {
      Location: subDirectory,
    },
  });
}
