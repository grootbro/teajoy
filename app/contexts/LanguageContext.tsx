import { createContext, useEffect, useState } from "react";
import { translations } from "../utils/translations";
import { Language } from "../types";

export const LanguageContext = createContext<{
  text: Record<string, string>;
  language: "en" | "de" | "tr";
  handleChangeLanguage: (language: "en" | "de" | "tr") => void;
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
        break;
      }
      case "de":
        setLanguage("de");
        setText(translations.de);
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046413/hyt7twgjvsphu8n8ttkj.jpg"
        );
        break;
      case "tr": {
        setLanguage("tr");
        setText(translations.tr);
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725045522/wk7bqinl964ctegvdl8x.png"
        );
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

      case "de":
        setLanguage("de");
        setText(translations.de);
        setCountry("Germany");
        setFlag(
          "https://res.cloudinary.com/dov6nv91n/image/upload/v1725046413/hyt7twgjvsphu8n8ttkj.jpg"
        );
        break;

      case "tr":
        setLanguage("tr");
        setText(translations.tr);
        setCountry("Turkey");
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
    getBrowserLanguage();
  }, []);

  const data = { text, language, handleChangeLanguage, flag, setFlag };

  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  );
};
