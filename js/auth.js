import { getFirebaseApp } from './firebase_config.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const app = getFirebaseApp();
const auth = getAuth(app);

/**
 * Registra um novo usuário com email e password.
 * @param {string} email - O email do usuário.
 * @param {string} password - A password do usuário.
 * @returns {Promise<UserCredential>} Uma promessa que resolve com as credenciais do usuário em caso de sucesso.
 * @throws {Error} Lança um erro se o registo falhar.
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Utilizador registado com sucesso:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erro ao registar utilizador:", error.code, error.message);
    throw error;
  }
};

/**
 * Autentica um usuário existente com email e password.
 * @param {string} email - O email do usuário.
 * @param {string} password - A password do usuário.
 * @returns {Promise<UserCredential>} Uma promessa que resolve com as credenciais do usuário em caso de sucesso.
 * @throws {Error} Lança um erro se o login falhar.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Utilizador autenticado com sucesso:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erro ao autenticar utilizador:", error.code, error.message);
    throw error;
  }
};

// Poderíamos adicionar aqui mais funções de autenticação como logout, password reset, etc. mais tarde.

