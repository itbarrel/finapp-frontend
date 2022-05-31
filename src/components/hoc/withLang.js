import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import AppLocale from "../../lngProvider";

const currentAppLocale = AppLocale.en;
// eslint-disable-next-line react/display-name
const withLang = (ComposedComponent) => (props) => {
  return (
    <>
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <ComposedComponent {...props} />
        </IntlProvider>
      </ConfigProvider>
    </>
  );
};

export default withLang;
