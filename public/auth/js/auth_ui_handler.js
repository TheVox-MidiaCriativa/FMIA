// Firebase Player Logic (compat) - CDN Version - No Modules
// Este ficheiro agora não precisará de importar módulos Firebase diretamente se usarmos a CDN.
// As funções de autenticação virão do objeto global firebase.auth()

// Não há imports de firebase_config.js ou auth.js aqui, pois eles
// serão carregados sequencialmente no HTML e suas definições (firebase init, registerUserGlobal, loginUserGlobal)
// estarão disponíveis globalmente ou no escopo da janela.

document.addEventListener("DOMContentLoaded", () => {
    console.log("[FMIA Player] DOMContentLoaded - Script a iniciar (CDN version - No Modules).");

    // Firebase App já deve estar inicializado por firebase_config.js
    // e firebase.auth() estará disponível globalmente devido aos scripts CDN.
    if (typeof firebase === "undefined" || typeof firebase.auth === "undefined") {
        console.error("[FMIA Player] ERRO: Firebase SDK ou Firebase Auth não está carregado. Verifique os scripts CDN e firebase_config.js no HTML.");
        alert("Erro crítico: Não foi possível carregar componentes essenciais. A aplicação pode não funcionar.");
        return;
    }
    const auth = firebase.auth();

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

    if (!loginFormContainer || !registerFormContainer || !passwordResetFormContainer || 
        !showRegisterLink || !showLoginLink || !showPasswordResetLink || !backToLoginLink ||
        !loginErrorP || !registerErrorP || !resetMessageP || !realAuthSection || !userDashboardSection) {
        console.error("[FMIA Player] ERRO: Um ou mais elementos de UI cruciais não foram encontrados.");
        return;
    }
    console.log("[FMIA Player] Elementos de UI carregados.");

    function showLoginForm() {
        loginFormContainer.style.display = "block";
        registerFormContainer.style.display = "none";
        passwordResetFormContainer.style.display = "none";
        realAuthSection.style.display = "block";
        userDashboardSection.style.display = "none";
    }

    function showRegisterForm() {
        loginFormContainer.style.display = "none";
        registerFormContainer.style.display = "block";
        passwordResetFormContainer.style.display = "none";
    }
    
    function showPasswordResetForm() {
        loginFormContainer.style.display = "none";
        registerFormContainer.style.display = "none";
        passwordResetFormContainer.style.display = "block";
    }

    function showUserDashboard(user) {
        realAuthSection.style.display = "none";
        userDashboardSection.style.display = "block";
        if(userEmailDisplay) userEmailDisplay.textContent = user.email;
    }

    function displayAuthError(element, message) {
        if(element) {
            element.textContent = message;
            element.style.display = "block";
        } else { console.warn("[FMIA Player] Tentativa de mostrar erro num elemento não existente."); }
    }

    function clearAuthError(element) {
        if(element) {
            element.textContent = "";
            element.style.display = "none";
        } else { console.warn("[FMIA Player] Tentativa de limpar erro num elemento não existente."); }
    }
    
    function clearResetMessage() {
        if(resetMessageP) {
            resetMessageP.textContent = "";
            resetMessageP.style.display = "none";
        } else { console.warn("[FMIA Player] Tentativa de limpar mensagem de reset num elemento não existente."); }
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("[FMIA Player] Utilizador logado (onAuthStateChanged):", user.email);
            showUserDashboard(user);
        } else {
            console.log("[FMIA Player] Nenhum utilizador logado (onAuthStateChanged).");
            showLoginForm();
        }
    });

    if(loginButtonReal) {
        loginButtonReal.addEventListener("click", async () => {
            clearAuthError(loginErrorP);
            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;
            if (!email || !password) {
                displayAuthError(loginErrorP, "Por favor, preencha o email e a password.");
                return;
            }
            try {
                // Chama a função global definida em auth.js
                if (typeof loginUserGlobal !== "function") throw new Error("Função loginUserGlobal não encontrada.");
                await loginUserGlobal(email, password);
            } catch (error) {
                displayAuthError(loginErrorP, `Erro no login: ${error.message}`);
            }
        });
    }

    if(registerButtonReal) {
        registerButtonReal.addEventListener("click", async () => {
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
                // Chama a função global definida em auth.js
                if (typeof registerUserGlobal !== "function") throw new Error("Função registerUserGlobal não encontrada.");
                await registerUserGlobal(email, password);
            } catch (error) {
                displayAuthError(registerErrorP, `Erro no registo: ${error.message}`);
            }
        });
    }
    
    if(logoutButton) {
        logoutButton.addEventListener("click", async () => {
            try {
                await auth.signOut();
                console.log("[FMIA Player] Logout bem-sucedido.");
            } catch (error) {
                console.error("[FMIA Player] Erro ao fazer logout:", error);
                alert("Ocorreu um erro ao tentar sair. Por favor, tente novamente.");
            }
        });
    }

    if(passwordResetButton) {
        passwordResetButton.addEventListener("click", async () => {
            clearResetMessage();
            const email = resetEmailInput.value;
            if (!email) {
                resetMessageP.textContent = "Por favor, introduza o seu email.";
                resetMessageP.style.display = "block";
                resetMessageP.className = "error-message";
                return;
            }
            try {
                await auth.sendPasswordResetEmail(email);
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
    }

    showRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        clearAuthError(loginErrorP);
        showRegisterForm();
    });

    showLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        clearAuthError(registerErrorP);
        showLoginForm();
    });
    
    showPasswordResetLink.addEventListener("click", (e) => {
        e.preventDefault();
        clearAuthError(loginErrorP);
        clearResetMessage();
        showPasswordResetForm();
    });

    backToLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        clearResetMessage();
        showLoginForm();
    });

    console.log("[FMIA Player] Script player.js carregado e configurado (CDN version - No Modules).");
});

