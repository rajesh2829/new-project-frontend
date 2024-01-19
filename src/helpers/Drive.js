// Nav List
export const Navlist = { DOCS_NAV_DETAILS : "DocsDetails" };

/**
 * Get User Side Nav List
 *
 * @returns {Array}
 */
export function getDocsNavList() {
  let docsNavList = [];
  // Return User Nav Object
  const getDocsNavList = (tab, subtab = "", subSection = "") => {
    return {
      name: tab,
      defaultSubTab: subtab,
      defaultSubSection: subSection,
    };
  };
  docsNavList = [...docsNavList, getDocsNavList(Navlist.DOCS_NAV_DETAILS)];
  // Return Portal Details Nav List
  return docsNavList;
}
