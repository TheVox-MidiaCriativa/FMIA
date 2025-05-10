// Firebase Auth (compat) - CDN Version - No Modules
// As funções de autenticação virão do objeto global firebase.auth()

// Não há imports aqui. Assume-se que firebase_config.js já executou e firebase está inicializado.

/**
 * Registra um novo usuário com email e password.
 * @param {string} email - O email do usuário.
 * @param {string} password - A password do usuário.
 * @returns {Promise<firebase.auth.UserCredential>} Uma promessa que resolve com as credenciais do usuário em caso de sucesso.
 * @throws {Error} Lança um erro se o registo falhar.
 */
async function registerUserGlobal(email, password) {
  // Garante que firebase e firebase.auth() estão disponíveis
  if (typeof firebase === "undefined" || typeof firebase.auth === "undefined") {
    console.error("[Auth] Firebase ou Firebase Auth não está carregado/inicializado.");
    throw new Error("Firebase não está pronto.");
  }
  const auth = firebase.auth();
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log("Utilizador registado com sucesso:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erro ao registar utilizador:", error.code, error.message);
    throw error;
  }
}

/**
 * Autentica um usuário existente com email e password.
 * @param {string} email - O email do usuário.
 * @param {string} password - A password do usuário.
 * @returns {Promise<firebase.auth.UserCredential>} Uma promessa que resolve com as credenciais do usuário em caso de sucesso.
 * @throws {Error} Lança um erro se o login falhar.
 */
async function loginUserGlobal(email, password) {
  if (typeof firebase === "undefined" || typeof firebase.auth === "undefined") {
    console.error("[Auth] Firebase ou Firebase Auth não está carregado/inicializado.");
    throw new Error("Firebase não está pronto.");
  }
  const auth = firebase.auth();
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log("Utilizador autenticado com sucesso:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erro ao autenticar utilizador:", error.code, error.message);
    throw error;
  }
}

// Para que player.js possa aceder a estas funções, podemos anexá-las a um objeto global simples
// ou simplesmente garantir que player.js é carregado depois deste e as chama diretamente.
// Por simplicidade, vamos assumir que player.js as chama como registerUserGlobal e loginUserGlobal.

