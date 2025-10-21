import { createContext, useEffect, useState } from "react";
import { translations } from "../utils/translations";
import { Language } from "../types";

export const LanguageContext = createContext<{
  text: Record<string, string>;
  language: "en" | "ru" | "th";
  handleChangeLanguage: (language: "en" | "ru" | "th") => void;
  flag: string;
  setFlag: React.Dispatch<React.SetStateAction<string>>;
}>({
  text: translations.en,
  language: "en",
  handleChangeLanguage: () => {},
  flag: "",
  setFlag: () => {},
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [text, setText] = useState(translations[language]);
  const [country, setCountry] = useState("United States");
  const [flag, setFlag] = useState("");

  const handleChangeLanguage = (language: string) => {
    switch (language) {
      case "en": {
        setLanguage("en");
        setText(translations.en);
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046378/uotz4byg4gmnrvd2dc8n.jpg"
        );
        localStorage.setItem("language", "en");
        break;
      }
      case "ru":
        setLanguage("ru");
        setText(translations.ru);
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046413/hyt7twgjvsphu8n8ttkj.jpg"
        );
        localStorage.setItem("language", "ru");
        break;
      case "th": {
        setLanguage("th");
        setText(translations.th);
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725045522/wk7bqinl964ctegvdl8x.png"
        );
        localStorage.setItem("language", "th");
        break;
      }

      default:
        break;
    }
  };

  const getBrowserLanguage = () => {
    switch (navigator.language) {
      case "en":
        setLanguage("en");
        setText(translations.en);
        setCountry("United States");
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046378/uotz4byg4gmnrvd2dc8n.jpg"
        );
        break;

      case "ru":
        setLanguage("ru");
        setText(translations.ru);
        setCountry("Russia");
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046413/hyt7twgjvsphu8n8ttkj.jpg"
        );
        break;

      case "th":
        setLanguage("th");
        setText(translations.th);
        setCountry("Thailand");
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725045522/wk7bqinl964ctegvdl8x.png"
        );
        break;

      default:
        setLanguage("en");
        setText(translations.en);
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046378/uotz4byg4gmnrvd2dc8n.jpg"
        );
        break;
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru" || savedLanguage === "th")) {
      handleChangeLanguage(savedLanguage);
    } else {
      getBrowserLanguage();
    }
  }, []);

  const data = { text, language, handleChangeLanguage, flag, setFlag };

  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  );
};
