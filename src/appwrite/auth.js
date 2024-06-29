import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client(); // The Client class is likely part of the Appwrite SDK and is used to interact with the Appwrite backend.
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // setEndpoint(conf.appwriteUrl) sets the API endpoint URL of the Appwrite server.
      .setProject(conf.appwriteProjectId); // setProject(conf.appwriteProjectId) sets the project ID to specify which project on 
      // the Appwrite server the client should interact with.
    this.account = new Account(this.client); // This line initializes the account property by creating a new instance
    // of the Account class, passing the configured client instance as an argument.
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    // incase we are unable to get user accunt
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}
const authService = new AuthService();
export default authService;



