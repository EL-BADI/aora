import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
// Init your React Native SDK
const client = new Client();

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.badi.aora",
  profjectId: "669970c300020c96442b",
  databaseId: "66998c1a003e76352c68",
  userCollectionId: "66998c650005350894d0",
  videoCollectionId: "66998c87003d2f5a59ce",
  storageId: "66998e420029928fb840",
};

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.profjectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

//////

const account = new Account(client);
const avatars = new Avatars(client);
const dbs = new Databases(client);

export const createUser = async ({
  email,
  password,
  userName,
}: {
  email: string;
  password: string;
  userName: string;
}) => {
  try {
    const newAcc = await account.create(ID.unique(), email, password, userName);

    if (!newAcc) throw Error;

    const avatarUrl = avatars.getInitials(userName);

    await signIn({ email, password });

    const newUser = await dbs.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      { accountId: newAcc.$id, email, username: userName, avatar: avatarUrl }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
