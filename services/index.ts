import axios from "axios";

const url = "http://192.168.0.100:5000";

export class TokenServices {
  public baseUrl: string = `${url}/token`;

  getMTA = async () => {
    try {
      return (await axios.get<any[]>(`${this.baseUrl}/MTA`)).data;
    } catch (error) {
      return [];
    }
  };

  getMTB = async () => {
    try {
      return (await axios.get<any[]>(`${this.baseUrl}/MTB`)).data;
    } catch (error) {
      return [];
    }
  };

  getMTC = async () => {
    try {
      return (await axios.get<any[]>(`${this.baseUrl}/MTC`)).data;
    } catch (error) {
      return [];
    }
  };

  getMTD = async () => {
    try {
      return (await axios.get<any[]>(`${this.baseUrl}/MTD`)).data;
    } catch (error) {
      return [];
    }
  };

  getBalance = async (user: string) => {
    try {
      return (await axios.get(`${this.baseUrl}/balance/${user}`)).data;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
    }
  };
}

export class OrderServices {
  public baseUrl: string = `${url}/order`;

  createOrder = async ({
    symbolA,
    symbolB,
    amountB,
    issuer,
  }: {
    symbolA: string;
    symbolB: string;
    amountB: number;
    issuer: string;
  }) => {
    try {
      return await axios.post(`${this.baseUrl}`, {
        symbolA,
        symbolB,
        amountB,
        issuer,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
    }
  };

  getRate = async ({ from, to }: { from: string; to: string }) => {
    try {
      const data = (
        await axios.get(`${this.baseUrl}/rate/from=${from}/to=${to}`)
      ).data;
      if (data.length === 0) throw new Error("Rate not found!");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) return error.response?.data;
    }
  };
}

export class UserServices {
  public baseUrl: string = url;

  getUsers = async () => {
    try {
      return (await axios.get<string[]>(`${this.baseUrl}/user`)).data;
    } catch (error) {
      return [];
    }
  };
}
