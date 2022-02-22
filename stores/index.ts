import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { ExchangeData } from "../models/Exchange.model";
import { OrderServices, TokenServices, UserServices } from "../services";

class RootStore {
  public userStore: UserStore;
  public orderStore: OrderStore;
  public tokenStore: TokenStore;

  public isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.tokenStore = new TokenStore(this);
    this.orderStore = new OrderStore(this);
  }

  public setIsLoading = () => {
    this.isLoading = !this.isLoading;
  };
}

class TokenStore {
  public rootStore: RootStore;

  // service
  public tokenService: TokenServices = new TokenServices();

  // data
  public MTATransactions: any[] = [];
  public MTBTransactions: any[] = [];
  public MTCTransactions: any[] = [];
  public MTDTransactions: any[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  public getTx = async (symbol: string) => {
    this.rootStore.setIsLoading();
    switch (symbol) {
      case "MTA": {
        this.MTATransactions = await this.tokenService.getMTA();
        this.rootStore.setIsLoading();
        return;
      }
      case "MTB": {
        this.MTBTransactions = await this.tokenService.getMTB();
        this.rootStore.setIsLoading();
        return;
      }
      case "MTC": {
        this.MTCTransactions = await this.tokenService.getMTC();
        this.rootStore.setIsLoading();
        return;
      }
      case "MTD": {
        this.MTDTransactions = await this.tokenService.getMTD();
        this.rootStore.setIsLoading();
        return;
      }
      default: {
        return;
      }
    }
  };

  public getHistoryTx = (symbol: string) => {
    switch (symbol) {
      case "MTA": {
        return this.MTATransactions;
      }
      case "MTB": {
        return this.MTBTransactions;
      }
      case "MTC": {
        return this.MTCTransactions;
      }
      case "MTD": {
        return this.MTDTransactions;
      }
      default: {
        return this.MTATransactions;
      }
    }
  };
}

class OrderStore {
  public rootStore: RootStore;

  // service
  public orderService: OrderServices = new OrderServices();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  public exchange: ExchangeData | undefined;

  public createOrder = async ({
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
    this.rootStore.setIsLoading();
    await this.orderService.createOrder({ symbolA, symbolB, amountB, issuer });
    const balances = await this.rootStore.tokenStore.tokenService.getBalance(
      issuer
    );
    this.rootStore.setIsLoading();
    this.rootStore.userStore.setBalances(balances);
  };

  public getRate = async ({
    from,
    to,
  }: {
    from: string;
    to: string;
  }): Promise<ExchangeData> => {
    this.rootStore.setIsLoading();
    const exchange = await this.orderService.getRate({ from, to });
    this.rootStore.setIsLoading();
    this.exchange = exchange;
    return exchange;
  };
}

export interface WalletAmount {
  [name: string]: string;
  MTA: string;
  MTB: string;
  MTC: string;
  MTD: string;
}

class UserStore {
  public rootStore: RootStore;

  // service
  public userService: UserServices = new UserServices();

  account: string | undefined;
  accountList: string[] = [];

  balances: WalletAmount = {
    MTA: "0",
    MTB: "0",
    MTC: "0",
    MTD: "0",
  };

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    this.getAccounts();
  }

  public getAccounts = async () => {
    this.accountList = await this.userService.getUsers();
  };

  public selectAccount = async (idx: number): Promise<void> => {
    if (idx < this.accountList.length) this.account = this.accountList[idx];
    if (!this.account) return;

    this.rootStore.setIsLoading();
    const balances = await this.rootStore.tokenStore.tokenService.getBalance(
      this.accountList[idx]
    );
    this.rootStore.setIsLoading();
    this.setBalances(balances);
    console.log(this.account, this.balances);
  };

  public setBalances = ({
    MTA,
    MTB,
    MTC,
    MTD,
  }: {
    MTA: string;
    MTB: string;
    MTC: string;
    MTD: string;
  }) => {
    this.balances = {
      MTA: MTA ?? this.balances?.MTA,
      MTB: MTB ?? this.balances?.MTB,
      MTC: MTC ?? this.balances?.MTC,
      MTD: MTD ?? this.balances?.MTD,
    };
  };
}

export const rootStore = new RootStore();
export const RootContext = createContext(rootStore);

export const useRootContext = () => useContext(RootContext);
export const useUserContext = () => useContext(RootContext).userStore;
export const useTokenContext = () => useContext(RootContext).tokenStore;
export const useOrderContext = () => useContext(RootContext).orderStore;
