export class loginDetails {
  loginPayload = {
    EmailId: 'test11@dummy.com',
    Password: '1234',
  };
  apiContext;
  constructor(apiContext: any) {
    this.apiContext = apiContext;
  }
  token: string = '';
  async getuserDetails() {
    const loginResponse = await this.apiContext.post(
      'https://projectapi.gerasim.in/api/UserApp/login',
      { data: this.loginPayload },
    );
    const loginResponseJson = await loginResponse.json();
    this.token = await loginResponseJson.data.token;
    const userDetails = await loginResponseJson.data;
    return userDetails;
  }
  async getUsers() {
    const apiUserDetailResponse = await this.apiContext.get(
      'https://jsonplaceholder.typicode.com/users',
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );
    return await apiUserDetailResponse.json();
  }
}
