import { createContext, useContext, useState } from "react"

const translations = {
    en: {
        login: "Login",
        register: "Register",
        tagline: "Online Shopping Made Easy",
        welcome: "Welcome to",
        description: "Discover products from the best shops. Fast delivery, great prices, easy returns.",
        getStarted: "Get Started",
        signIn: "Sign In",
        fastDelivery: "Fast Delivery",
        fastDeliveryDesc: "Get your orders delivered quickly to your door.",
        securePayments: "Secure Payments",
        securePaymentsDesc: "Your transactions are safe and encrypted.",
        easyReturns: "Easy Returns",
        easyReturnsDesc: "Not satisfied? Return it hassle-free.",
        footer: "© 2024 CleverStore. All rights reserved.",
    },
    fr: {
        login: "Connexion",
        register: "S'inscrire",
        tagline: "Achats en ligne simplifiés",
        welcome: "Bienvenue à",
        description: "Découvrez des produits des meilleurs magasins. Livraison rapide, prix avantageux, retours faciles.",
        getStarted: "Commencer",
        signIn: "Se connecter",
        fastDelivery: "Livraison rapide",
        fastDeliveryDesc: "Recevez vos commandes rapidement à votre porte.",
        securePayments: "Paiements sécurisés",
        securePaymentsDesc: "Vos transactions sont sûres et cryptées.",
        easyReturns: "Retours faciles",
        easyReturnsDesc: "Pas satisfait? Retournez-le sans tracas.",
        footer: "© 2024 CleverStore. Tous droits réservés.",
    },
    rw: {
        login: "Injira",
        register: "Iyandikishe",
        tagline: "Kugura kumurongo byoroshye",
        welcome: "Murakaza neza kuri",
        description: "Shakisha ibicuruzwa biva mu maduka meza. Gutanga vuba, ibiciro byiza, gusubiza byoroshye.",
        getStarted: "Tangira",
        signIn: "Injira",
        fastDelivery: "Gutanga vuba",
        fastDeliveryDesc: "Ibicuruzwa byawe bizagufikira vuba.",
        securePayments: "Kwishyura birinzwe",
        securePaymentsDesc: "Ibikorwa byawe biri mu mutekano kandi byashingiwe.",
        easyReturns: "Gusubiza byoroshye",
        easyReturnsDesc: "Ntabwo wanyuzwe? Byisubize nta kibazo.",
        footer: "© 2024 CleverStore. Uburenganzira bwose burahagaritswe.",
    }
}

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("en")

    const t = (key) => translations[language][key] || key

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}
