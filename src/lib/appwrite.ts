import { Buffer } from "buffer";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Models,
  OAuthProvider,
  Query,
  TablesDB,
} from "react-native-appwrite";

export const config = {
  platform: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new TablesDB(client);

//———————————————————————————————— Login Function ————————————————————————————————
export async function login() {
  try {
    const redirectURL = Linking.createURL("/");

    // Start OAuth flow
    const response = await account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: redirectURL,
    });

    if (!response) throw new Error("Failed to Login using Google");

    // Open loginUrl and listen for the scheme redirect
    const browserSession = await WebBrowser.openAuthSessionAsync(
      `${response}`,
      redirectURL
    );

    if (browserSession.type !== "success")
      throw new Error("Failed to Login using Google");

    // Extract credentials from OAuth redirect URL
    const url = new URL(browserSession.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!userId || !secret) throw new Error("Failed to Login using Google");

    // Create session with OAuth credentials
    const userSession = await account.createSession({
      userId: userId!,
      secret: secret!,
    });

    if (!userSession) throw new Error("Failed to Create a Session");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

//———————————————————————————————— Logout Function ————————————————————————————————
export async function logout() {
  try {
    const result = await account.deleteSession({
      sessionId: "current",
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

//———————————————————————————————— Fetch User Information ————————————————————————————————
export async function fetchUserInfo() {
  try {
    const response = await account.get();

    if (response.$id) {
      // Get the avatar as binary data (ArrayBuffer)
      const buffer = await avatar.getInitials({
        name: response.name,
        background: "d6bda4",
      });

      // Convert ArrayBuffer → Base64
      const base64String = Buffer.from(buffer).toString("base64");

      // Build a data URI for <Image>
      const avatarUri = `data:image/png;base64,${base64String}`;

      // Return user info + avatar URI
      return { ...response, avatar: avatarUri };
    }
  } catch (error) {
    console.log(error);
  }
}

//———————————————————————————————— Fetch Featured Properties ————————————————————————————————
export async function fetchProperties({
  filter,
  query,
  limit = 5,
}: {
  filter?: string;
  query?: string;
  limit?: number;
} = {}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];

    if (filter && filter !== "all") {
      buildQuery.push(Query.equal("category", filter));
    }

    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("title", query),
          Query.search("description", query),
          Query.search("location", query),
          Query.search("category", query),
        ])
      );
    }

    if (limit) {
      buildQuery.push(Query.limit(limit));
    }

    const result = await databases.listRows({
      databaseId: config.databaseId!,
      tableId: config.propertiesCollectionId!,
      queries: buildQuery,
    });

    return result?.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//———————————————————————————————— Fetch Latest Properties ————————————————————————————————
export async function fetchLatestProperties() {
  try {
    const result = await databases.listRows({
      databaseId: config.databaseId!,
      tableId: config.propertiesCollectionId!,
      queries: [Query.orderAsc("$createdAt"), Query.limit(5)],
    });

    return result?.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//———————————————————————————————— Fetch property by id ————————————————————————————————
export async function fetchPropertyById(params?: {
  id: string;
}): Promise<Models.DefaultRow> {
  try {
    if (!params?.id) throw new Error("Property ID is required");

    const result = await databases.getRow({
      databaseId: config.databaseId!,
      tableId: config.propertiesCollectionId!,
      rowId: params.id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return {} as Models.DefaultRow;
  }
}

//———————————————————————————————— Fetch property reviews ————————————————————————————————
export async function fetchPropertyReviews(params?: {
  id: string;
}): Promise<Models.DefaultRow[]> {
  try {
    if (!params?.id) throw new Error("Property ID is required");

    const result = await databases.listRows({
      databaseId: config.databaseId!,
      tableId: config.reviewsCollectionId!,
      queries: [Query.equal("property", params.id)],
    });

    return result.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}
//———————————————————————————————— Fetch property reviews ————————————————————————————————
export async function fetchPropertyAgent(params?: {
  agentId: string;
}): Promise<Models.DefaultRow> {
  try {
    if (!params?.agentId) throw new Error("Agent ID is required");

    const result = await databases.getRow({
      databaseId: config.databaseId!,
      tableId: config.agentsCollectionId!,
      rowId: params.agentId,
    });

    return result;
  } catch (error) {
    console.log(error);
    return {} as Models.DefaultRow;
  }
}
