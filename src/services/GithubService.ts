import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN || "";

/**
 * Obtener repositorios del usuario autenticado
 * @returns Repositorios del usuario
 */
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
      },
    });

    const reposData: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description || null,
      imageUrl: repo.owner?.avatar_url || null,
      owner: repo.owner?.login || null,
      language: repo.language || null,
    }));

    return reposData;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

/**
 * Crear repositorios
 * @param repo 
 */
export const createRepository = async (repo : RepositoryItem): Promise<void> => {
  try {
    const response = await axios.post(`${GITHUB_API_URL}/user/repos`, repo, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      }
    });
    console.log("Repositorio ingresado ", response.data);
  } catch (error) {
    console.error("Error creating repository:", error);
  }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};