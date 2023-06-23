export interface SignInResponse {
  data: {
    data: {
      accessToken: string;
      user: { name: string; email: string; id: string };
    };
    message: string;
    statusCode: number;
  };
}
