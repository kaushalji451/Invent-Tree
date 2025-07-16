import { useTranslations } from "next-intl";

const Hero = ({ className }) => {
  const t = useTranslations("HomePage");
  return (
    <section className={className}>
      <div className="flex h-screen w-full items-center justify-center">
        <div>{t("title")}</div>
      </div>
    </section>
  );
};

export default Hero;
