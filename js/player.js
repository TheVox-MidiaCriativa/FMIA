import { getFirebaseApp } from './firebase_config.js';
import { getAuth, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { registerUser, loginUser } from './auth.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("[FMIA Player] DOMContentLoaded - Script a iniciar.");

    const app = getFirebaseApp();
    const auth = getAuth(app);

    // Elementos da UI de Autenticação Real
    const realAuthSection = document.getElementById("real-auth-section");
    const loginFormContainer = document.getElementById("login-form-container");
    const registerFormContainer = document.getElementById("register-form-container");
    const passwordResetFormContainer = document.getElementById("password-reset-form-container");

    const loginEmailInput = document.getElementById("login-email");
    const loginPasswordInput = document.getElementById("login-password");
    const loginButtonReal = document.getElementById("login-button-real");
    const loginErrorP = document.getElementById("login-error");

    const registerEmailInput = document.getElementById("register-email");
    const registerPasswordInput = document.getElementById("register-password");
    const registerConfirmPasswordInput = document.getElementById("register-confirm-password");
    const registerButtonReal = document.getElementById("register-button-real");
    const registerErrorP = document.getElementById("register-error");

    const resetEmailInput = document.getElementById("reset-email");
    const passwordResetButton = document.getElementById("password-reset-button");
    const resetMessageP = document.getElementById("reset-message");

    // Links de Navegação entre Forms
    const showRegisterLink = document.getElementById("show-register-link");
    const showLoginLink = document.getElementById("show-login-link");
    const showPasswordResetLink = document.getElementById("show-password-reset-link");
    const backToLoginLink = document.getElementById("back-to-login-link");

    // Secção do Dashboard do Utilizador
    const userDashboardSection = document.getElementById("user-dashboard");
    const userEmailDisplay = document.getElementById("user-email-display");
    const logoutButton = document.getElementById("logout-button");

    // Verificar se os elementos cruciais para navegação foram encontrados
    if (!loginFormContainer || !registerFormContainer || !passwordResetFormContainer || 
        !showRegisterLink || !showLoginLink || !showPasswordResetLink || !backToLoginLink ||
        !loginErrorP || !registerErrorP || !resetMessageP) {
        console.error("[FMIA Player] ERRO: Um ou mais elementos de formulário/link/mensagem não foram encontrados. A navegação e a exibição de erros podem falhar.");
        // alert("Erro crítico ao carregar a página. Alguns controlos podem não funcionar."); // Descomentar para alerta visível
        return; // Interrompe a execução se elementos essenciais faltarem
    }
    console.log("[FMIA Player] Elementos de formulário, links de navegação e mensagens carregados.");

    // --- Funções Auxiliares de UI ---
    function showLoginForm() {
        console.log("[FMIA Player] A mostrar formulário de Login.");
        loginFormContainer.style.display = "block";
        registerFormContainer.style.display = "none";
        passwordResetFormContainer.style.display = "none";
        realAuthSection.style.display = "block";
        userDashboardSection.style.display = "none";
    }

    function showRegisterForm() {
        console.log("[FMIA Player] A mostrar formulário de Registo.");
        loginFormContainer.style.display = "none";
        registerFormContainer.style.display = "block";
        passwordResetFormContainer.style.display = "none";
    }
    
    function showPasswordResetForm() {
        console.log("[FMIA Player] A mostrar formulário de Recuperação de Password.");
        loginFormContainer.style.display = "none";
        registerFormContainer.style.display = "none";
        passwordResetFormContainer.style.display = "block";
    }

    function showUserDashboard(user) {
        console.log("[FMIA Player] A mostrar Dashboard do Utilizador.");
        realAuthSection.style.display = "none";
        userDashboardSection.style.display = "block";
        if(userEmailDisplay) userEmailDisplay.textContent = user.email;
    }

    function displayAuthError(element, message) {
        if(element) {
            element.textContent = message;
            element.style.display = "block";
        } else {
            console.warn("[FMIA Player] Tentativa de mostrar erro num elemento não existente.");
        }
    }

    function clearAuthError(element) {
        if(element) {
            element.textContent = "";
            element.style.display = "none";
        } else {
            console.warn("[FMIA Player] Tentativa de limpar erro num elemento não existente.");
        }
    }
    
    function clearResetMessage() {
        if(resetMessageP) {
            resetMessageP.textContent = "";
            resetMessageP.style.display = "none";
        } else {
            console.warn("[FMIA Player] Tentativa de limpar mensagem de reset num elemento não existente.");
        }
    }

    // --- Lógica de Autenticação Firebase ---
    console.log("[FMIA Player] A configurar onAuthStateChanged listener.");
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("[FMIA Player] Utilizador logado detectado:", user.email);
            showUserDashboard(user);
        } else {
            console.log("[FMIA Player] Nenhum utilizador logado detectado.");
            showLoginForm();
        }
    });

    if(loginButtonReal) {
        loginButtonReal.addEventListener("click", async () => {
            console.log("[FMIA Player] Botão Login clicado.");
            clearAuthError(loginErrorP);
            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;
            if (!email || !password) {
                displayAuthError(loginErrorP, "Por favor, preencha o email e a password.");
                return;
            }
            try {
                await loginUser(email, password);
            } catch (error) {
                displayAuthError(loginErrorP, `Erro no login: ${error.message}`);
            }
        });
    } else { console.error("[FMIA Player] Botão loginButtonReal não encontrado."); }

    if(registerButtonReal) {
        registerButtonReal.addEventListener("click", async () => {
            console.log("[FMIA Player] Botão Registar clicado.");
            clearAuthError(registerErrorP);
            const email = registerEmailInput.value;
            const password = registerPasswordInput.value;
            const confirmPassword = registerConfirmPasswordInput.value;
            if (!email || !password || !confirmPassword) {
                displayAuthError(registerErrorP, "Por favor, preencha todos os campos.");
                return;
            }
            if (password !== confirmPassword) {
                displayAuthError(registerErrorP, "As passwords não coincidem.");
                return;
            }
            if (password.length < 6) {
                displayAuthError(registerErrorP, "A password deve ter pelo menos 6 caracteres.");
                return;
            }
            try {
                await registerUser(email, password);
            } catch (error) {
                displayAuthError(registerErrorP, `Erro no registo: ${error.message}`);
            }
        });
    } else { console.error("[FMIA Player] Botão registerButtonReal não encontrado."); }
    
    if(logoutButton) {
        logoutButton.addEventListener("click", async () => {
            console.log("[FMIA Player] Botão Logout clicado.");
            try {
                await signOut(auth);
                console.log("[FMIA Player] Logout bem-sucedido.");
            } catch (error) {
                console.error("[FMIA Player] Erro ao fazer logout:", error);
                alert("Ocorreu um erro ao tentar sair. Por favor, tente novamente.");
            }
        });
    } else { console.error("[FMIA Player] Botão logoutButton não encontrado."); }

    if(passwordResetButton) {
        passwordResetButton.addEventListener("click", async () => {
            console.log("[FMIA Player] Botão Recuperar Password clicado.");
            clearResetMessage();
            const email = resetEmailInput.value;
            if (!email) {
                resetMessageP.textContent = "Por favor, introduza o seu email.";
                resetMessageP.style.display = "block";
                resetMessageP.className = "error-message";
                return;
            }
            try {
                await sendPasswordResetEmail(auth, email);
                resetMessageP.textContent = "Email de recuperação enviado com sucesso! Verifique a sua caixa de entrada.";
                resetMessageP.className = "success-message";
                resetMessageP.style.display = "block";
                if(resetEmailInput) resetEmailInput.value = "";
            } catch (error) {
                console.error("[FMIA Player] Erro ao enviar email de recuperação:", error);
                resetMessageP.textContent = `Erro ao enviar email: ${error.message}`;
                resetMessageP.className = "error-message";
                resetMessageP.style.display = "block";
            }
        });
    } else { console.error("[FMIA Player] Botão passwordResetButton não encontrado."); }

    // --- Navegação UI ---
    console.log("[FMIA Player] A adicionar event listeners de navegação de formulários.");
    showRegisterLink.addEventListener("click", (e) => {
        console.log("[FMIA Player] Link 'Registe-se' clicado.");
        e.preventDefault();
        clearAuthError(loginErrorP);
        showRegisterForm();
    });

    showLoginLink.addEventListener("click", (e) => {
        console.log("[FMIA Player] Link 'Login' (voltar de registo) clicado.");
        e.preventDefault();
        clearAuthError(registerErrorP);
        showLoginForm();
    });
    
    showPasswordResetLink.addEventListener("click", (e) => {
        console.log("[FMIA Player] Link 'Esqueceu-se da password?' clicado.");
        e.preventDefault();
        clearAuthError(loginErrorP);
        clearResetMessage();
        showPasswordResetForm();
    });

    backToLoginLink.addEventListener("click", (e) => {
        console.log("[FMIA Player] Link 'Voltar ao Login' (de reset) clicado.");
        e.preventDefault();
        clearResetMessage();
        showLoginForm();
    });

    console.log("[FMIA Player] Script player.js carregado e configurado.");
});

