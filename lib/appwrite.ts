import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";
import { UserType, VideoType } from "..";
import { formDataProps } from "@/app/(tabs)/Create";
import { ImagePickerAsset } from "expo-image-picker";
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
const storage = new Storage(client);

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

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await dbs.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const getAllPosts = async (): Promise<VideoType[]> => {
  try {
    const posts = await dbs.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    const videoPosts: VideoType[] = posts.documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title,
      thembnail: doc.thembnail,
      creator: doc.creator as UserType,
      prompt: doc.prompt,
      videoUrl: doc.video,
    }));

    return videoPosts;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const getLatestPosts = async (): Promise<VideoType[]> => {
  try {
    const posts = await dbs.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    const videoPosts: VideoType[] = posts.documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title,
      thembnail: doc.thembnail,
      creator: doc.creator as UserType,
      prompt: doc.prompt,
      videoUrl: doc.video,
    }));

    return videoPosts;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const searchPosts = async ({
  query,
}: {
  query: string;
}): Promise<VideoType[]> => {
  console.log(query);

  try {
    const posts = await dbs.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    const videoPosts: VideoType[] = posts.documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title,
      thembnail: doc.thembnail,
      creator: doc.creator as UserType,
      prompt: doc.prompt,
      videoUrl: doc.video,
    }));

    return videoPosts;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getUserPosts = async ({
  userId,
}: {
  userId: string;
}): Promise<VideoType[]> => {
  console.log(userId);

  try {
    const posts = await dbs.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    const videoPosts: VideoType[] = posts.documents.map((doc: any) => ({
      $id: doc.$id,
      title: doc.title,
      thembnail: doc.thembnail,
      creator: doc.creator as UserType,
      prompt: doc.prompt,
      videoUrl: doc.video,
    }));

    return videoPosts;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

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

// ///////

// Get File Preview
export async function getFilePreview({
  fileId,
  type,
}: {
  fileId: string;
  type: "image" | "video";
}) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function uploadFile({
  file,
  type,
}: {
  file: ImagePickerAsset | null;
  type: "image" | "video";
}) {
  try {
    if (!file) throw new Error("Missing file!");
    const { mimeType, fileName, fileSize, uri } = file;
    const asset = {
      type: mimeType as string,
      name: fileName as string,
      size: fileSize as number,
      uri,
    };

    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    console.log({ uploadedFile });

    const fileUrl = await getFilePreview({ fileId: uploadedFile.$id, type });
    return fileUrl;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function createPost({
  form,
  userId,
}: {
  form: formDataProps;
  userId: string;
}) {
  try {
    const [thembnailUrl, vidUrl] = await Promise.all([
      uploadFile({ file: form.thembnail, type: "image" }),
      uploadFile({ file: form.video, type: "video" }),
    ]);

    const newPost = await dbs.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thembnail: thembnailUrl,
        video: vidUrl,
        prompt: form.prompt,
        creator: userId,
      }
    );

    return newPost;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
