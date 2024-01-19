import React, { useEffect, useState } from "react";
import { getSettingsValue } from "../../services/SettingService";
import Footer from "./footer";
//Assets
import Header from "./header";
import { Block } from "../../helpers/Page";

const DefaultLayout = (props) => {
  const { blockList, settings } = props;
  const [settingsData, setSettingData] = useState({});

  const getSetting = async (settings) => {
    const data = await getSettingsValue(settings.settings);
    setSettingData(data);
  };

  useEffect(() => {
    getSetting(settings);
  }, [settings]);
  return (
    <>
      {blockList && blockList.length > 0 ? (
        <>
          {blockList &&
            blockList.length > 0 &&
            blockList.map((list) => {
              let { blockName, permission, blockLayout } = list;
              return list ? (
                <>
                  {blockName == Block.BLOCK_HEADER && (
                    <Header
                      layout={blockLayout}
                      permission={permission}
                      settings={settingsData}
                    />
                  )}
                  {blockName == Block.BLOCK_FOOTER && (
                    <Footer
                      layout={blockLayout}
                      permission={permission}
                      settings={settingsData}
                    />
                  )}
                </>
              ) : (
                ""
              );
            })}
        </>
      ) : (
        "No Components Added"
      )}
    </>
  );
};
export default DefaultLayout;
